"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";

import { useReducedMotion } from "@/shared/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

type RevealTag = "h1" | "h2" | "p" | "span";
type RevealTrigger = "intro" | "scroll";

interface RevealTextProps {
  as?: RevealTag;
  trigger?: RevealTrigger;
  children: string;
  className?: string;
}

export function RevealText({
  as: Tag = "span",
  trigger = "scroll",
  children,
  className,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    let split: SplitText | undefined;

    const context = gsap.context(() => {
      split = SplitText.create(element, {
        type: "lines,chars",
        mask: "lines",
        linesClass: "overflow-hidden",
      });

      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.018,
        delay: trigger === "intro" ? 0.35 : 0,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: element, start: "top 85%", once: true }
            : undefined,
      });
    }, element);

    return () => {
      context.revert();
      split?.revert();
    };
  }, [children, reducedMotion, trigger]);

  return (
    <Tag
      ref={(node) => {
        ref.current = node;
      }}
      className={className}
      aria-label={children}
    >
      {children}
    </Tag>
  );
}
