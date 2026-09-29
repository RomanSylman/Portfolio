import { create } from "zustand";

interface IntroState {
  progress: number;
  setProgress: (progress: number) => void;
}

export const useIntroStore = create<IntroState>((set) => ({
  progress: 0,
  setProgress: (progress) => {
    set({ progress });
  },
}));
