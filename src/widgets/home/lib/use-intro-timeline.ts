"use client";

import gsap from "gsap";
import { useLayoutEffect } from "react";

import { useReducedMotion } from "@/shared/lib/use-reduced-motion";

import { useIntroStore } from "../model/intro-store";

const INTRO_SECONDS = 2.4;

export function useIntroTimeline() {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) {
      useIntroStore.getState().setProgress(1);
      return;
    }

    const proxy = { progress: 0 };
    useIntroStore.getState().setProgress(0);

    const tween = gsap.to(proxy, {
      progress: 1,
      duration: INTRO_SECONDS,
      ease: "power3.inOut",
      onUpdate: () => {
        useIntroStore.getState().setProgress(proxy.progress);
      },
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);
}
