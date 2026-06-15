import { WINDOW_KEYS } from "#constants";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import useWindowStore from "#store/window";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");

  const weights = FONT_WEIGHTS[type];
  if (!weights) return () => {};

  const { min, max, default: base } = weights;

  const animateLetter = (letter, weight) => {
    gsap.to(letter, {
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
      fontVariationSettings: `"wght" ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: letterLeft, width } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (letterLeft - left + width / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      const weight = Math.round(min + (max - min) * intensity);
      animateLetter(letter, weight);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const { openWindow } = useWindowStore();

  useLayoutEffect(() => {
    if (window.innerWidth < 640) return;
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");
    const cleanupTitle = setupTextHover(titleRef.current, "title");

    return () => {
      cleanupSubtitle();
      cleanupTitle();
    };
  }, []);

  return (
    <section id="welcome">
      <section id="mobile-home" className="hidden max-sm:absolute max-sm:top-12 max-sm:left-0 max-sm:z-10 max-sm:block">
        <div className="inline-flex items-center gap-5 ml-4 mt-2 px-4 py-3 rounded-2xl">
          <button className="flex flex-col items-center gap-1" onClick={() => openWindow(WINDOW_KEYS.RESUME)}>
            <img alt="pages" src="/images/pdf.png" className="size-14" />
            <span className="text-[11px] font-semibold text-[var(--nav-text)]/90">Resume</span>
          </button>
          <button className="flex flex-col items-center gap-1" onClick={() => openWindow(WINDOW_KEYS.TERMINAL)}>
            <img alt="terminal" src="/images/terminal.png" className="size-16" />
            <span className="text-[11px] font-semibold text-[var(--nav-text)]/90">Skills</span>
          </button>
        </div>
      </section>

      <p ref={subtitleRef} className="max-sm:mt-0">
        {renderText(
          "Hey, I'm Kiran! Welcome to my",
          "text-xl sm:text-2xl lg:text-3xl font-georama text-center leading-relaxed",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-5 sm:mt-7">
        {renderText("Portfolio", "text-5xl sm:text-7xl lg:text-9xl font-bold italic font-georama tracking-tight")}
      </h1>
    </section>
  );
};

export default Welcome;
