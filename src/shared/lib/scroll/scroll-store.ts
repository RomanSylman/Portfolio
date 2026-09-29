import { create } from "zustand";

interface ScrollState {
  /** Overall page progress, 0 at the top and 1 at the bottom. */
  progress: number;
  /**
   * Fractional stage index. The integer part is the active section, the
   * fractional part is the transition progress towards the next one.
   */
  stage: number;
  setProgress: (progress: number) => void;
  setStage: (stage: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  stage: 0,
  setProgress: (progress) => {
    set({ progress });
  },
  setStage: (stage) => {
    set({ stage });
  },
}));
