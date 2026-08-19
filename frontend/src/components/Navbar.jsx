import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { navLinks, navIcons } from "#constants";
import { useTheme } from "#hooks/useTheme";
import useWindowStore from "#store/window";
import { Wifi, Battery } from "lucide-react";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { preference, update: updateTheme } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < 640
  );
  const menuRef = useRef(null);
  const themeButtonRef = useRef(null);

  const themeOptions = useMemo(
    () => [
      { id: "system", label: "System" },
      { id: "light", label: "Light" },
      { id: "dark", label: "Dark" },
    ],
    []
  );

  useEffect(() => {
    const onResize = () =>
      setIsMobile(window.innerWidth < 640);
    globalThis.addEventListener("resize", onResize);
    return () =>
      globalThis.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      const target = event.target;
      if (
        menuRef.current?.contains(target) ||
        themeButtonRef.current?.contains(target)
      ) {
        return;
      }
      setThemeMenuOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setThemeMenuOpen(false);
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  if (isMobile) {
    return (
      <nav className="grid grid-cols-3 items-center h-12 bg-[var(--nav-bg)] backdrop-blur-2xl px-4" aria-label="Main navigation">
        <time className="text-[12px] font-bold tracking-wider text-[var(--nav-text)]">
          {dayjs().format("h:mm A")}
        </time>
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-black/10 dark:bg-white/10 backdrop-blur-3xl border border-black/15 dark:border-white/15 shadow-sm">
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="size-4"
            />
            <span className="text-xs font-bold whitespace-nowrap text-[var(--nav-text)]">
              Kiran's Portfolio
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1.5">
          <Wifi
            size={13}
            strokeWidth={2}
            className="text-[var(--nav-text)]"
          />
          <Battery
            size={13}
            strokeWidth={2}
            className="text-[var(--nav-text)]"
          />
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label="Main navigation">
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold italic" aria-label="Kiran's Portfolio">
          Kiran's Portfolio
        </p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => openWindow(type)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) =>
            id === 4 ? (
              <li key={id} className="relative">
                <button
                  ref={themeButtonRef}
                  type="button"
                  className="theme-toggle"
                  aria-haspopup="menu"
                  aria-expanded={themeMenuOpen}
                  aria-label="Theme settings"
                  onClick={() =>
                    setThemeMenuOpen((open) => !open)
                  }
                >
                  <img
                    src={img}
                    className="icon-hover"
                    alt="Theme settings"
                  />
                </button>

                {themeMenuOpen ? (
                  <div
                    ref={menuRef}
                    className="theme-menu"
                    role="menu"
                  >
                    {themeOptions.map(
                      ({ id: optionId, label }) => (
                        <button
                          key={optionId}
                          type="button"
                          role="menuitemradio"
                          aria-checked={
                            preference === optionId
                          }
                          className={clsx(
                            "theme-option",
                            preference === optionId &&
                              "is-active"
                          )}
                          onClick={() => {
                            updateTheme(optionId);
                            setThemeMenuOpen(false);
                          }}
                        >
                          <span>{label}</span>
                          {preference === optionId ? (
                            <span>•</span>
                          ) : null}
                        </button>
                      )
                    )}
                  </div>
                ) : null}
              </li>
            ) : (
              <li key={id}>
                <img
                  src={img}
                  className="icon-hover"
                  alt={`Icon ${id}`}
                />
              </li>
            )
          )}
        </ul>

        <time className="tabular-nums">
          {dayjs().format(" ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
