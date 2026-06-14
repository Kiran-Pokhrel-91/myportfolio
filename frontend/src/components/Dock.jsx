import React, { useRef } from "react";
import { dockApps } from "#constants";

const Dock = () => {
  const dockRef = useRef(null);

  const toggleApp = (app) => {
    if (!app || !app.canopen) return () => {};
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canopen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canopen}
              onClick={() => toggleApp({ id, canopen })}
            >
              <img
                src={`/images/${icon}`}
                alt={`${name} icon`}
                loading="lazy"
                className={canopen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dock;
