import { Dock, Home, Navbar, Welcome } from "#components";
import { lazy, Suspense } from "react";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import useWindowStore from "#store/window";

gsap.registerPlugin(Draggable);

const Finder = lazy(() => import("#windows/Finder"));
const Contact = lazy(() => import("#windows/Contact"));
const Safari = lazy(() => import("#windows/Safari"));
const Photos = lazy(() => import("#windows/Photos"));
const Terminal = lazy(() => import("#windows/Terminal"));
const Resume = lazy(() => import("#windows/Resume"));
const TextWindow = lazy(() => import("#windows/Text"));
const ImageWindow = lazy(() => import("#windows/Image"));

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

      <Suspense fallback={null}>
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
      </Suspense>

      <Home />
    </main>
  );
};

export default App;
