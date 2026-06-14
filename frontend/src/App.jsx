import { lazy, Suspense } from "react";
import { Dock, Home, Navbar, Welcome } from "#components";
import Contact from "#windows/Contact";
import Finder from "#windows/Finder";
import Image from "#windows/Image";
import Photos from "#windows/Photos";
import Safari from "#windows/Safari";
import Terminal from "#windows/Terminal";
import Text from "#windows/Text";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

gsap.registerPlugin(Draggable);

const Resume = lazy(() => import("#windows/Resume"));

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Finder />
      <Contact />
      <Suspense fallback={null}>
        <Resume />
      </Suspense>
      <Safari />
      <Photos />
      <Terminal />
      <Text />
      <Image />
      <Home />
    </main>
  );
};

export default App;
