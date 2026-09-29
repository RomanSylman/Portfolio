"use client";

import { useEffect } from "react";

import { usePointerStore } from "./pointer-store";

export function usePointerTracking() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth === 0 || innerHeight === 0) return;

      usePointerStore
        .getState()
        .setPointer(
          (event.clientX / innerWidth) * 2 - 1,
          -(event.clientY / innerHeight) * 2 + 1,
        );
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
}
