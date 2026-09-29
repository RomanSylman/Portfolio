"use client";

import { type MouseEvent } from "react";

import { useRouter } from "@/shared/i18n";
import {
  isPageTransitionActive,
  playPageTransition,
} from "@/shared/lib/page-transition";
import { useReducedMotion } from "@/shared/lib/use-reduced-motion";
import { useWebGLEnabled } from "@/shared/lib/webgl";

export function useOpenProject(href: string) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const webglEnabled = useWebGLEnabled();

  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    if (reducedMotion || !webglEnabled) return;

    if (isPageTransitionActive()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    playPageTransition(event.currentTarget, () => {
      router.push(href);
    });
  };
}
