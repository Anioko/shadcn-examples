import { create } from "zustand";

export const breakpoints = {
  ["desktop"]: 100,
  ["tablet"]: 50,
  ["mobile"]: 0
};

export interface BreakpointType {
  id: string;
  value: string;
}

interface BreakpointState {
  breakpoints: BreakpointType[];
  setBreakpoint: (breakpoint: BreakpointType) => void;
}

export const breakpointsStore = create<BreakpointState>((set) => ({
  breakpoints: [],
  setBreakpoint: (breakpoint) =>
    set((state) => {
      const existingIndex = state.breakpoints.findIndex((b) => b.id === breakpoint.id);
      if (existingIndex !== -1) {
        const updated = [...state.breakpoints];
        updated[existingIndex] = breakpoint;
        return { breakpoints: updated };
      }
      return { breakpoints: [...state.breakpoints, breakpoint] };
    })
}));
