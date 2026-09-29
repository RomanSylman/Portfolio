"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useLayoutEffect, useRef } from "react";

import { useReducedMotion } from "@/shared/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type RevealTrigger = "intro" | "scroll";

interface RevealProps {
  children: ReactNode;
  className?: string;
  trigger?: RevealTrigger;
}

export function Reveal({
  children,
  className,
  trigger = "scroll",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from(element, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: trigger === "intro" ? 0.9 : 0,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: element, start: "top 88%", once: true }
            : undefined,
      });
    }, element);

    return () => {
      context.revert();
    };
  }, [reducedMotion, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
