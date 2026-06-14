import useWindowStore from "#store/window";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useLayoutEffect, useRef } from "react";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const hasOpened = useRef(false);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      gsap.killTweensOf(el);

      if (isOpen) {
        hasOpened.current = true;
        el.style.display = "block";
        el.style.pointerEvents = "auto";
        gsap.fromTo(
          el,
          { scale: 0.85, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "back.out(1.4)",
          }
        );
      } else if (hasOpened.current) {
        gsap.to(el, {
          scale: 0.85,
          opacity: 0,
          y: 20,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
            el.style.pointerEvents = "";
          },
        });
      } else {
        el.style.display = "none";
        el.style.pointerEvents = "";
      }
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      const el = ref.current;
      if (!el) return;

      const header = el.querySelector("#window-header");
      if (header) header.style.cursor = "grab";

      const [instance] = Draggable.create(el, {
        type: "x,y",
        trigger: header,
        edgeResistance: 0.15,
        bounds: "main",
        onPress: function () {
          if (header) header.style.cursor = "grabbing";
        },
        onRelease: function () {
          if (header) header.style.cursor = "grab";
        },
      });

      return () => instance.kill();
    }, [isOpen, windowKey, focusWindow]);

    return (
      <section
        className="absolute window-panel"
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;
  return Wrapped;
};

export default WindowWrapper;