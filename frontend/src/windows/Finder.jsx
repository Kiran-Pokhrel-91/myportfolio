import WindowControls from "#components/WindowControls";
import { FILETYPE_TO_WINDOW, locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const contentRef = useRef(null);
  const didDrag = useRef(false);
  const [breadcrumb, setBreadcrumb] = useState(() => [activeLocation]);

  const navigateTo = useCallback((location) => {
    setActiveLocation(location);
    setBreadcrumb([location]);
  }, [setActiveLocation]);

  const openItem = useCallback((item) => {
    if (item.kind === "folder") {
      setActiveLocation(item);
      setBreadcrumb((prev) => [...prev, item]);
      return;
    }
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

  const handleBreadcrumbClick = (index) => {
    const target = breadcrumb[index];
    setBreadcrumb((prev) => prev.slice(0, index + 1));
    setActiveLocation(target);
  };

  const goHome = () => {
    setBreadcrumb([]);
    setActiveLocation(locations.work);
  };

  const goBack = useCallback(() => {
    if (breadcrumb.length > 1) {
      const prev = breadcrumb[breadcrumb.length - 2];
      setBreadcrumb((prev) => prev.slice(0, -1));
      setActiveLocation(prev);
    } else {
      const { closeWindow } = useWindowStore.getState();
      closeWindow("finder");
    }
  }, [breadcrumb]);

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
        <WindowControls target="finder" title="Files" onGoBack={goBack} />
        <div className="hidden sm:flex items-center ml-auto mr-3">
          <Search size={15} strokeWidth={2} className="text-[var(--panel-muted)]" />
        </div>
      </div>

      <div className="breadcrumb hidden max-sm:flex">
        <button className="text-blue-500 text-sm" onClick={goHome}>Portfolio</button>
        {breadcrumb.map((loc, i) => (
          <span key={loc.id} className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-gray-400 mx-1" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
            <button className="text-blue-500 text-sm line-clamp-1 text-left" onClick={() => handleBreadcrumbClick(i)}>{loc.name}</button>
          </span>
        ))}
      </div>

      <div className="flex">
        <div className="sidebar">
          <h3>Favorites</h3>
          <ul>
            {Object.values(locations).map((item) => (
              <li
                className={clsx(
                  breadcrumb.length === 0 ? item.id === activeLocation.id : item.id === breadcrumb[0].id ? "active" : "not-active"
                )}
                key={item.id}
                onClick={() => navigateTo(item)}
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
                onClick={() => openItem(item)}
              >
                <img src={item.icon} className="w-4" alt={item.name} />
                <p className="text-sm font-medium truncate">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="content">
          <div className="finder-gallery">
            <ul ref={contentRef}>
              {activeLocation?.children.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  style={{ cursor: "grab", userSelect: "none" }}
                >
                  <div className="finder-item">
                    <img src={item.icon} alt={item.name} className="size-16" />
                    <p className="item-name">{item.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
