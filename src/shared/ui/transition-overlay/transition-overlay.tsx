"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { usePathname } from "@/shared/i18n";
import {
  endPageTransition,
  usePageTransitionStore,
} from "@/shared/lib/page-transition";

const FADE_OUT_DURATION = 0.4;

export function TransitionOverlay() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const overlay = usePageTransitionStore((state) => state.overlay);

  useEffect(() => {
    if (previousPath.current === pathname) return;

    const from = previousPath.current;
    previousPath.current = pathname;

    const { overlay: current, setOverlay } = usePageTransitionStore.getState();

    if (current === 0) {
      endPageTransition();
      return;
    }

    const motion = { overlay: current };
    const tween = gsap.to(motion, {
      overlay: 0,
      duration: FADE_OUT_DURATION,
      ease: "power2.out",
      onUpdate: () => {
        setOverlay(motion.overlay);
      },
      onComplete: () => {
        endPageTransition();
      },
    });

    return () => {
      tween.kill();
      previousPath.current = from;
    };
  }, [pathname]);

  return (
    <div
      aria-hidden
      data-transition-keep
      className="bg-background pointer-events-none fixed inset-0 z-50"
      style={{ opacity: overlay }}
    />
  );
}
