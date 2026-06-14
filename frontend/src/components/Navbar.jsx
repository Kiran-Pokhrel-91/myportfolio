import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants";

const THEME_STORAGE_KEY = "portfolio-theme";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const Navbar = () => {
  const [themePreference, setThemePreference] = useState(() =>
    window.localStorage.getItem(THEME_STORAGE_KEY) ?? "system",
  );
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
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialPreference = storedTheme ?? "system";
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (preference) => {
      const resolvedTheme =
        preference === "system" ? getSystemTheme() : preference;

      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.style.colorScheme = resolvedTheme;
    };

    setThemePreference(initialPreference);
    applyTheme(initialPreference);

    const handleSystemThemeChange = () => {
      const currentPreference =
        window.localStorage.getItem(THEME_STORAGE_KEY) ?? "system";

      if (currentPreference === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleSystemThemeChange);

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
      if (event.key === "Escape") {
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      media.removeEventListener("change", handleSystemThemeChange);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const updateTheme = (nextTheme) => {
    const resolvedTheme = nextTheme === "system" ? getSystemTheme() : nextTheme;

    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
    setThemePreference(nextTheme);
    setThemeMenuOpen(false);
  };

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold italic">Kiran's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
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
                        aria-checked={themePreference === optionId}
                        className={`theme-option ${
                          themePreference === optionId ? "is-active" : ""
                        }`}
                        onClick={() => updateTheme(optionId)}
                      >
                        <span>{label}</span>
                        {themePreference === optionId ? <span>•</span> : null}
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
