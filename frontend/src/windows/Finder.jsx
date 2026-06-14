import WindowControls from "#components/WindowControls";
import { FILETYPE_TO_WINDOW, locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const contentRef = useRef(null);
  const didDrag = useRef(false);

  const openItem = useCallback((item) => {
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href) {
      return window.open(item.href, "_blank");
    }
    const baseKey = FILETYPE_TO_WINDOW[item.fileType];
    if (baseKey) {
      const { activeLocation } = useLocationStore.getState();
      const windowKey = `${baseKey}-${activeLocation.id}-${item.id}`;
      openWindow(windowKey, item);
    }
  }, [openWindow, setActiveLocation]);

  useEffect(() => {
    const grid = contentRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll("li");
    const instances = [];

    items.forEach((item) => {
      const instance = Draggable.create(item, {
        type: "x,y",
        edgeResistance: 0.15,
        bounds: grid,
        onPress: () => {
          didDrag.current = false;
          item.style.zIndex = 50;
          item.style.cursor = "grabbing";
        },
        onDrag: () => {
          didDrag.current = true;
        },
        onRelease: () => {
          item.style.cursor = "grab";
          gsap.to(item, {
            x: 0, y: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.4)",
            onComplete: () => { item.style.zIndex = ""; },
          });
        },
      });
      instances.push(instance[0]);
    });

    return () => instances.forEach((i) => i.kill());
  }, [activeLocation]);

  const handleItemClick = (item) => {
    if (!didDrag.current) openItem(item);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="flex">
        <div className="sidebar">
          <h3>Favorites</h3>
          <ul>
            {Object.values(locations).map((item) => (
              <li
                className={clsx(
                  item.id === activeLocation.id ? "active" : "not-active"
                )}
                key={item.id}
                onClick={() => setActiveLocation(item)}
              >
                <img src={item.icon} className="w-4" alt={item.name} />
                <p className="text-sm font-medium truncate">{item.name}</p>
              </li>
            ))}
          </ul>

          <h3>Work</h3>
          <ul>
            {locations.work.children.map((item) => (
              <li
                className={clsx(
                  item.id === activeLocation.id ? "active" : "not-active"
                )}
                key={item.id}
                onClick={() => setActiveLocation(item)}
              >
                <img src={item.icon} className="w-4" alt={item.name} />
                <p className="text-sm font-medium truncate">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="content">
          <ul ref={contentRef}>
            {activeLocation?.children.map((item) => (
              <li
                key={item.id}
                onClick={() => handleItemClick(item)}
                style={{ cursor: "grab", userSelect: "none" }}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
