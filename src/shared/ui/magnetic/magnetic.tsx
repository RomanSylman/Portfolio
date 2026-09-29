"use client";

import gsap from "gsap";
import { type ReactNode, useEffect, useRef } from "react";

import { cn } from "@/shared/lib/cn";
import { useFinePointer } from "@/shared/lib/use-fine-pointer";
import { useReducedMotion } from "@/shared/lib/use-reduced-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

export function Magnetic({ children, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || !finePointer) return;

    const x = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3.out" });
    const y = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3.out" });

    const reset = () => {
      x(0);
      y(0);
    };

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const shiftX = Number(gsap.getProperty(element, "x")) || 0;
      const shiftY = Number(gsap.getProperty(element, "y")) || 0;
      const dx = event.clientX - (rect.left + rect.width / 2 - shiftX);
      const dy = event.clientY - (rect.top + rect.height / 2 - shiftY);
      const distance = Math.hypot(dx, dy);
      const radius = Math.max(rect.width, rect.height, 88);

      if (distance < radius) {
        x(dx * 0.35);
        y(dy * 0.35);
        return;
      }

      reset();
    };

    window.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", reset);
    };
  }, [finePointer, reducedMotion]);

  return (
    <div ref={ref} className={cn("inline-flex", className)}>
      {children}
    </div>
  );
}
