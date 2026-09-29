"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { useFinePointer } from "@/shared/lib/use-fine-pointer";
import { useReducedMotion } from "@/shared/lib/use-reduced-motion";

const HOT_SELECTOR = "a, button, [data-cursor]";

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    const element = cursor.current;
    const marker = dot.current;
    if (!element || !marker || !enabled) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");

    const x = gsap.quickTo(element, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const y = gsap.quickTo(element, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const onMove = (event: PointerEvent) => {
      x(event.clientX);
      y(event.clientY);
      const target = event.target;
      const hot =
        target instanceof Element && target.closest(HOT_SELECTOR) !== null;
      marker.dataset.hot = hot ? "true" : "false";
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      root.classList.remove("custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursor}
      data-transition-keep
      className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference"
      aria-hidden
    >
      <div
        ref={dot}
        className="size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-300 data-[hot=true]:scale-[2.8]"
      />
    </div>
  );
}
