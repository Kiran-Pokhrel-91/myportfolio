import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

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

  useLayoutEffect(() => {
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");
    const cleanupTitle = setupTextHover(titleRef.current, "title");

    return () => {
      cleanupSubtitle();
      cleanupTitle();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Kiran! Welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("Portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio designed for desktop/tablet viewing</p>
      </div>
    </section>
  );
};

export default Welcome;
