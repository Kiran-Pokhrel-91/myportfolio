import { useState, useEffect } from "react";
import useWindowStore from "#store/window";
import { Minimize2, Square, X } from "lucide-react";

const WindowControls = ({ target, title, onGoBack }) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const { closeWindow, minimizeWindow, maximizeWindow, windows } = useWindowStore();
  const win = windows[target];
  const isMaximized = win?.isMaximized;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    globalThis.addEventListener("resize", onResize);
    return () => globalThis.removeEventListener("resize", onResize);
  }, []);

  if (isMobile) {
    return (
      <div id="mobile-window-header" className="flex items-center justify-between w-full px-3 pb-3 pt-5 relative z-10">
        <div className="flex items-center gap-2 cursor-pointer whitespace-nowrap" onClick={(e) => { e.stopPropagation(); onGoBack ? onGoBack() : closeWindow(target); }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <p className="text-sm text-blue-500 whitespace-nowrap">Go Back</p>
        </div>
        <p className="absolute left-1/2 -translate-x-1/2 text-lg font-georama text-black dark:text-white line-clamp-1">{title || ""}</p>
      </div>
    );
  }

  return (
    <div id="window-controls">
      <button className="close group" type="button" onClick={(e) => { e.stopPropagation(); closeWindow(target); }}>
        <X size={10} color="#4a0000" strokeWidth={3} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      <button className="minimize group" type="button" onClick={(e) => { e.stopPropagation(); minimizeWindow(target); }}>
        <Minimize2 size={10} color="#8a6a00" strokeWidth={3} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      <button className="maximize group" type="button" onClick={(e) => { e.stopPropagation(); maximizeWindow(target); }}>
        {isMaximized ? (
          <Minimize2 size={10} color="#005a00" strokeWidth={3} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        ) : (
          <Square size={9} color="#005a00" strokeWidth={3} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    </div>
  );
};

export default WindowControls;