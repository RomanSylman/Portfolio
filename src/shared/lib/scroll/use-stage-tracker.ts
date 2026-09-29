"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

import { useScrollStore } from "./scroll-store";

gsap.registerPlugin(ScrollTrigger);

const STAGE_SELECTOR = "[data-stage]";

function measure(sections: HTMLElement[]) {
  return sections.map(
    (section) => section.getBoundingClientRect().top + window.scrollY,
  );
}

export function useStageTracker() {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(STAGE_SELECTOR);
    if (sections.length === 0) return;

    let positions = measure(sections);

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      const probe = window.scrollY;

      let stage = sections.length - 1;
      for (let index = 0; index < positions.length - 1; index += 1) {
        const start = positions[index] ?? 0;
        const end = positions[index + 1] ?? start;
        if (probe < end) {
          const span = end - start;
          stage = span > 0 ? index + (probe - start) / span : index;
          break;
        }
      }

      if (window.scrollY <= 1) stage = 0;

      const store = useScrollStore.getState();
      store.setProgress(Math.min(Math.max(progress, 0), 1));
      store.setStage(Math.max(stage, 0));
    };

    const onRefresh = () => {
      positions = measure(sections);
      update();
    };

    update();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: update,
    });

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      trigger.kill();
    };
  }, []);
}
