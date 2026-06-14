import useWindowStore from "#store/window";
import { Minimize2, Square, X } from "lucide-react";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, windows } = useWindowStore();
  const win = windows[target];
  const isMaximized = win?.isMaximized;

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