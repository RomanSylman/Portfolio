import { create } from "zustand";

export interface TransitionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PageTransitionState {
  progress: number;
  overlay: number;
  rect: TransitionRect | null;
  setProgress: (progress: number) => void;
  setOverlay: (overlay: number) => void;
  setRect: (rect: TransitionRect | null) => void;
  reset: () => void;
}

export const usePageTransitionStore = create<PageTransitionState>((set) => ({
  progress: 0,
  overlay: 0,
  rect: null,
  setProgress: (progress) => {
    set({ progress });
  },
  setOverlay: (overlay) => {
    set({ overlay });
  },
  setRect: (rect) => {
    set({ rect });
  },
  reset: () => {
    set({ progress: 0, overlay: 0, rect: null });
  },
}));
