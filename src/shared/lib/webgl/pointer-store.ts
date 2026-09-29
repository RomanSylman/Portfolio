import { create } from "zustand";

interface PointerState {
  /** Pointer position in normalized device coordinates, from -1 to 1. */
  x: number;
  y: number;
  setPointer: (x: number, y: number) => void;
}

export const usePointerStore = create<PointerState>((set) => ({
  x: 0,
  y: 0,
  setPointer: (x, y) => {
    set({ x, y });
  },
}));
