import { useCallback, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(preference) {
  const resolved = preference === "system" ? getSystemTheme() : preference;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  return resolved;
}

export function useTheme() {
  const [preference, setPreference] = useState(() =>
    localStorage.getItem(THEME_STORAGE_KEY) ?? "system",
  );

  useEffect(() => {
    applyTheme(preference);
  }, [preference]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (localStorage.getItem(THEME_STORAGE_KEY) === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const update = useCallback((next) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setPreference(next);
  }, []);

  return { preference, update };
}

export function initializeTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(stored ?? "system");
}
