import { dockApps } from "#constants";
import useWindowStore from "#store/window";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";

const DYNAMIC_APPS = [
  { id: "text", name: "Text", icon: "txt.png", canOpen: true },
  { id: "image", name: "Image", icon: "image.png", canOpen: true },
];

function hasOpenInstance(windows, prefix) {
  return Object.keys(windows).some(
    (k) => k.startsWith(prefix) && windows[k].isOpen,
  );
}

function getTopInstance(windows, prefix) {
  const matches = Object.entries(windows)
    .filter(([k, w]) => k.startsWith(prefix) && w.isOpen)
    .sort((a, b) => b[1].zIndex - a[1].zIndex);
  return matches[0] ?? null;
}

const Dock = () => {
  const {
    openWindow,
    minimizeWindow,
    focusWindow,
    windows,
  } = useWindowStore();
  const dockRef = useRef();

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll("img");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance * distance) / 2000);
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcon = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        }),
      );

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcon);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcon);
    };
  }, []);

  const isMultiInstance = (id) => DYNAMIC_APPS.some((a) => a.id === id);

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    if (isMultiInstance(app.id)) {
      const prefix = app.id + "-";
      const top = getTopInstance(windows, prefix);
      if (!top) return;
      const [key, win] = top;
      if (win.isMinimized) {
        focusWindow(key);
      } else {
        minimizeWindow(key);
      }
      return;
    }

    const win = windows[app.id];
    if (!win) {
      console.error(`Window not found for app: ${app.id}`);
      return;
    }
    if (!win.isOpen) {
      openWindow(app.id);
    } else if (win.isMinimized) {
      focusWindow(app.id);
    } else {
      minimizeWindow(app.id);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => {
          const open = canOpen && windows[id]?.isOpen;

          return (
            <div key={id} className="relative flex flex-col items-center">
              <button
                type="button"
                className="dock-icon"
                data-app={id}
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-60"}
                />
              </button>
              {open && <span className="dock-dot" />}
            </div>
          );
        })}

        {DYNAMIC_APPS.filter((a) => hasOpenInstance(windows, a.id + "-")).map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex flex-col items-center">
            <button
              type="button"
              className="dock-icon"
              data-app={id}
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img src={`/images/${icon}`} alt={name} loading="lazy" />
            </button>
            <span className="dock-dot" />
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
