import useWindowStore from "#store/window";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const ANIM = {
  DURATION: 0.2,
  FAST: 0.15,
  SCALE_CLOSE: 0.92,
  SCALE_MINIMIZE: 0.3,
};

function getDockOffset(el, windowKey) {
  const baseKey = windowKey.split("-")[0];
  const dockIcon = document.querySelector(`#dock [data-app="${baseKey}"]`);
  if (!dockIcon) return { dx: 0, dy: 0 };
  const er = el.getBoundingClientRect();
  const dr = dockIcon.getBoundingClientRect();
  return {
    dx: dr.left + dr.width / 2 - (er.left + er.width / 2),
    dy: dr.top + dr.height / 2 - (er.top + er.height / 2),
  };
}

function animateMinimize(el, windowKey, lastPos) {
  lastPos.current.x = gsap.getProperty(el, "x");
  lastPos.current.y = gsap.getProperty(el, "y");
  const { dx, dy } = getDockOffset(el, windowKey);
  gsap.to(el, {
    x: `+=${dx}`,
    y: `+=${dy}`,
    scale: ANIM.SCALE_MINIMIZE,
    opacity: 0,
    duration: ANIM.DURATION,
    ease: "power2.in",
    onComplete: () => {
      el.style.display = "none";
      el.style.pointerEvents = "";
    },
  });
}

function animateOpen(el, windowKey) {
  el.style.display = "block";
  el.style.pointerEvents = "auto";

  if (windowKey.includes("-") && !windowKey.startsWith("resume")) {
    const main = document.querySelector("main");
    if (main) {
      const mRect = main.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const maxX = mRect.width - rect.width - 20;
      const maxY = mRect.height - rect.height - 20;
      const x = Math.max(10, Math.min(maxX, Math.random() * maxX));
      const y = Math.max(10, Math.min(maxY, Math.random() * maxY));
      gsap.set(el, { x, y });
    }
  }

  gsap.fromTo(
    el,
    { scale: ANIM.SCALE_CLOSE, opacity: 0 },
    { scale: 1, opacity: 1, duration: ANIM.DURATION, ease: "power2.out" },
  );
}

function animateUnminimize(el, lastPos) {
  el.style.display = "block";
  el.style.pointerEvents = "auto";
  gsap.to(el, {
    scale: 1,
    opacity: 1,
    x: lastPos.current.x,
    y: lastPos.current.y,
    duration: ANIM.DURATION,
    ease: "power2.out",
  });
}

function animateClose(el) {
  gsap.to(el, {
    scale: ANIM.SCALE_CLOSE,
    opacity: 0,
    duration: ANIM.FAST,
    ease: "power2.in",
    onComplete: () => {
      el.style.display = "none";
      el.style.pointerEvents = "";
    },
  });
}

function hide(el) {
  el.style.display = "none";
  el.style.pointerEvents = "";
}

function setupDraggable(el) {
  const header = el.querySelector("#window-header");
  if (header) header.style.cursor = "grab";
  const [instance] = Draggable.create(el, {
    type: "x,y",
    trigger: header,
    edgeResistance: 0.15,
    bounds: "main",
    onPress: () => { if (header) header.style.cursor = "grabbing"; },
    onRelease: () => { if (header) header.style.cursor = "grab"; },
  });
  return instance;
}

const WindowWrapper = (Component, defaultKey) => {
  const Wrapped = ({ windowKey: propKey, ...props }) => {
    const resolvedKey = propKey ?? defaultKey;
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, isMaximized, zIndex } = windows[resolvedKey];
    const ref = useRef(null);
    const hasOpened = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });
    const wasMinimized = useRef(false);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      if (window.innerWidth < 640) {
        if (isOpen && !isMinimized) {
          el.style.display = "block";
          el.style.pointerEvents = "auto";
        } else {
          hide(el);
        }
        return;
      }

      gsap.killTweensOf(el);

      if (isMinimized) {
        wasMinimized.current = true;
        animateMinimize(el, resolvedKey, lastPos);
      } else if (hasOpened.current && wasMinimized.current) {
        wasMinimized.current = false;
        animateUnminimize(el, lastPos);
      } else if (isOpen) {
        hasOpened.current = true;
        animateOpen(el, resolvedKey);
      } else if (hasOpened.current) {
        animateClose(el);
      } else {
        hide(el);
      }
    }, [isOpen, isMinimized]); // eslint-disable-line react-hooks/exhaustive-deps

    useLayoutEffect(() => {
      if (window.innerWidth < 640) return;
      const el = ref.current;
      if (!el || !hasOpened.current) return;
      if (isMaximized) {
        gsap.set(el, { clearProps: "transform" });
        el.style.clipPath = "none";
      }
    }, [isMaximized]);

    useEffect(() => {
      if (window.innerWidth < 640) return;
      if (!isOpen || isMinimized || isMaximized) return;
      const el = ref.current;
      if (!el) return;

      const instance = setupDraggable(el);
      return () => instance.kill();
    }, [isOpen, isMinimized, isMaximized]);

    const handleFocus = useCallback(
      (e) => { e.stopPropagation(); focusWindow(resolvedKey); },
      // resolvedKey is immutable per instance — safe to exclude
      [focusWindow], // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
      <section
        className={`window-panel${isMaximized ? " is-maximized" : " absolute"}`}
        id={resolvedKey}
        ref={ref}
        style={{ zIndex }}
        onPointerDown={handleFocus}
      >
        {isMaximized ? (
          <div className="maximized-body">
            <Component {...props} windowKey={resolvedKey} />
          </div>
        ) : (
          <Component {...props} windowKey={resolvedKey} />
        )}
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
