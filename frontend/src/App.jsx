import { lazy, Suspense } from "react";
import { Dock, Home, Navbar, Welcome } from "#components";
import Contact from "#windows/Contact";
import Finder from "#windows/Finder";
import Photos from "#windows/Photos";
import Safari from "#windows/Safari";
import Terminal from "#windows/Terminal";
import TextWindow from "#windows/Text";
import ImageWindow from "#windows/Image";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import { STATIC_WINDOW_KEYS } from "#constants";
import useWindowStore from "#store/window";

gsap.registerPlugin(Draggable);

const Resume = lazy(() => import("#windows/Resume"));

const STATIC_WINDOWS = {
  finder: Finder,
  contact: Contact,
  safari: Safari,
  photos: Photos,
  terminal: Terminal,
};

function isStatic(key) {
  return STATIC_WINDOW_KEYS.includes(key);
}

function isTextWindow(key) {
  return key.startsWith("text-");
}

function isImageWindow(key) {
  return key.startsWith("image-");
}

const App = () => {
  const windows = useWindowStore((s) => s.windows);

  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      {Object.entries(windows).map(([key, win]) => {
        if (!win.isOpen) return null;

        if (isStatic(key)) {
          const Component = STATIC_WINDOWS[key];
          if (!Component) return null;
          return <Component key={key} />;
        }

        if (isTextWindow(key)) {
          return <TextWindow key={key} windowKey={key} />;
        }

        if (isImageWindow(key)) {
          return <ImageWindow key={key} windowKey={key} />;
        }

        return null;
      })}

      <Suspense fallback={null}>
        <Resume />
      </Suspense>

      <Home />
    </main>
  );
};

export default App;
