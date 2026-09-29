import gsap from "gsap";

import { collectDimTargets } from "./dim-around";
import { usePageTransitionStore } from "./page-transition-store";

const FLIGHT_DURATION = 1.5;
const DIM_DURATION = 1.0;
const DIM_START = 0.12;
const OVERLAY_DURATION = 0.28;
const OVERLAY_START = 1.22;

let playing = false;
let dimmed: HTMLElement[] = [];

export function isPageTransitionActive() {
  return playing;
}

function clearDim() {
  for (const element of dimmed) {
    element.style.removeProperty("opacity");
  }
  dimmed = [];
}

export function endPageTransition() {
  clearDim();
  usePageTransitionStore.getState().reset();
}

function readRect(focus: HTMLElement) {
  const box = focus.getBoundingClientRect();
  return { x: box.x, y: box.y, width: box.width, height: box.height };
}

export function playPageTransition(focus: HTMLElement, onDone: () => void) {
  if (playing) return;
  playing = true;
  clearDim();

  const store = usePageTransitionStore.getState();
  store.setRect(readRect(focus));
  store.setProgress(0);
  store.setOverlay(0);
  dimmed = collectDimTargets(focus);

  const motion = { progress: 0, dim: 1, overlay: 0 };
  const timeline = gsap.timeline({
    onComplete: () => {
      playing = false;
      onDone();
    },
  });

  timeline.to(
    motion,
    {
      progress: 1,
      duration: FLIGHT_DURATION,
      ease: "none",
      onUpdate: () => {
        const live = usePageTransitionStore.getState();
        live.setProgress(motion.progress);
        if (focus.isConnected) live.setRect(readRect(focus));
      },
    },
    0,
  );

  timeline.to(
    motion,
    {
      dim: 0,
      duration: DIM_DURATION,
      ease: "sine.inOut",
      onUpdate: () => {
        for (const element of dimmed) {
          element.style.opacity = String(motion.dim);
        }
      },
    },
    DIM_START,
  );

  timeline.to(
    motion,
    {
      overlay: 1,
      duration: OVERLAY_DURATION,
      ease: "sine.inOut",
      onUpdate: () => {
        usePageTransitionStore.getState().setOverlay(motion.overlay);
      },
    },
    OVERLAY_START,
  );
}
