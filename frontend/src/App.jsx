import { Dock, Home, Navbar, Welcome } from "#components";
import Contact from "#windows/Contact";
import Finder from "#windows/Finder";
import Photos from "#windows/Photos";
import Resume from "#windows/Resume";
import Safari from "#windows/Safari";
import Terminal from "#windows/Terminal";
import TextWindow from "#windows/Text";
import ImageWindow from "#windows/Image";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import useWindowStore from "#store/window";

gsap.registerPlugin(Draggable);

const STATIC_WINDOWS = {
  finder: Finder,
  contact: Contact,
  safari: Safari,
  photos: Photos,
  terminal: Terminal,
};

function isResumeWindow(key) {
  return key.startsWith("resume");
}

function isTextWindow(key) {
  return key.startsWith("text-");
}

function isImageWindow(key) {
  return key.startsWith("image-");
}

function isStatic(key) {
  return STATIC_WINDOWS[key] != null;
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

        if (isResumeWindow(key)) {
          return <Resume key={key} windowKey={key} />;
        }

        if (isTextWindow(key)) {
          return <TextWindow key={key} windowKey={key} />;
        }

        if (isImageWindow(key)) {
          return <ImageWindow key={key} windowKey={key} />;
        }

        if (isStatic(key)) {
          const Component = STATIC_WINDOWS[key];
          return <Component key={key} />;
        }

        return null;
      })}

      <Home />
    </main>
  );
};

export default App;
