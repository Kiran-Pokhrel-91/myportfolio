import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const THEME_STORAGE_KEY = "portfolio-theme";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const initializeTheme = () => {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) ?? "system";
  const resolvedTheme = storedTheme === "system" ? getSystemTheme() : storedTheme;

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
};

initializeTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
