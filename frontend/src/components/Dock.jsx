import { useState, useEffect } from "react";
import { dockApps } from "#constants";
import useWindowStore from "#store/window";
import gsap from "gsap";
import { useRef } from "react";
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

const MOBILE_APPS = ["finder", "safari", "photos", "contact"];

const Dock = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const {
    openWindow,
    minimizeWindow,
    focusWindow,
    windows,
  } = useWindowStore();
  const dockRef = useRef();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    globalThis.addEventListener("resize", onResize);
    return () => globalThis.removeEventListener("resize", onResize);
  }, []);

  const visibleApps = isMobile
    ? dockApps.filter((a) => MOBILE_APPS.includes(a.id))
    : dockApps;

  useEffect(() => {
    if (window.innerWidth < 640) return;
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

  if (isMobile) {
    return (
      <section className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-evenly gap-4 px-6 py-3.5 bg-[var(--dock-bg)] backdrop-blur-2xl rounded-[32px] border border-[var(--dock-border)] shadow-[0_24px_80px_var(--dock-shadow)] z-50">
        {visibleApps.map(({ id, name, icon, canOpen }) => {
          const open = canOpen && windows[id]?.isOpen;
          return (
            <div key={id} className="relative flex flex-col items-center">
              <button
                type="button"
                aria-label={name}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
                className="size-14 flex items-center justify-center rounded-2xl border border-white/20 dark:border-white/10 active:scale-95 transition-transform overflow-hidden"
              >
                <img src={`/images/${icon}`} alt={name} className="size-full rounded-2xl" />
              </button>
              {open && <span className="absolute -bottom-1.5 size-1.5 rounded-full bg-[var(--accent)]" />}
            </div>
          );
        })}
      </section>
    );
  }

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
