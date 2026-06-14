import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { navLinks, navIcons } from "#constants";
import { useTheme } from "#hooks/useTheme";
import useWindowStore from "#store/window";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { preference, update: updateTheme } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const themeButtonRef = useRef(null);

  const themeOptions = useMemo(
    () => [
      { id: "system", label: "System" },
      { id: "light", label: "Light" },
      { id: "dark", label: "Dark" },
    ],
    [],
  );

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

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold italic">Kiran's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id}>
              <button type="button" onClick={() => openWindow(type)}>
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
                  onClick={() => setThemeMenuOpen((open) => !open)}
                >
                  <img src={img} className="icon-hover" alt="Theme settings" />
                </button>

                {themeMenuOpen ? (
                  <div ref={menuRef} className="theme-menu" role="menu">
                    {themeOptions.map(({ id: optionId, label }) => (
                      <button
                        key={optionId}
                        type="button"
                        role="menuitemradio"
                        aria-checked={preference === optionId}
                        className={clsx(
                          "theme-option",
                          preference === optionId && "is-active",
                        )}
                        onClick={() => {
                          updateTheme(optionId);
                          setThemeMenuOpen(false);
                        }}
                      >
                        <span>{label}</span>
                        {preference === optionId ? <span>•</span> : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </li>
            ) : (
              <li key={id}>
                <img src={img} className="icon-hover" alt={`Icon ${id}`} />
              </li>
            ),
          )}
        </ul>

        <time>{dayjs().format(" ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
