import { locations } from '#constants'
import useLocationStore from '#store/location';
import useWindowStore from '#store/window';
import clsx from 'clsx';
import Draggable from 'gsap/Draggable';
import gsap from 'gsap';
import { useEffect, useRef } from 'react'

const projects = locations.work?.children ?? [];

const Home = () => {
    const {setActiveLocation} = useLocationStore();
    const {openWindow} = useWindowStore()
    const didDrag = useRef(false);

    const handleOpenProjectFinder = (project) => {
        if (!didDrag.current) {
            setActiveLocation(project)
            openWindow("finder")
        }
    }

  useEffect(() => {
    Draggable.create(".folder", {
      type: "top,left",
      edgeResistance: 0.15,
      bounds: "main",
      onPress: function () {
        didDrag.current = false;
        gsap.to(this.target, { scale: 1.08, duration: 0.2, ease: "power2.out" });
        this.target.style.zIndex = 50;
        this.target.style.cursor = "grabbing";
      },
      onDrag: function () {
        didDrag.current = true;
      },
      onRelease: function () {
        this.target.style.cursor = "grab";
        gsap.to(this.target, { scale: 1, duration: 0.3, ease: "power2.out" });
      },
      onDragEnd: function () {
        this.target.classList.remove(
          ...Array.from(this.target.classList).filter((c) => c.startsWith("top-"))
        );
        this.target.style.left = this.x + "px";
        this.target.style.top = this.y + "px";
        gsap.set(this.target, { zIndex: "" });
      },
    });
  }, [])
  return (
    <section id='home'>
        <ul>
            {projects.map((project) => (
                <li onClick={() => handleOpenProjectFinder(project)} key={project.id} className={clsx("group folder", project.windowPosition)} style={{ cursor: "grab", userSelect: "none" }}>
                    <img src="/images/folder.png" alt={project.name} />
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Home