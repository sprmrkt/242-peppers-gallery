import { create } from "zustand";

interface FilterState {
  globalCurrentFilterType: "All" | "Room" | "Suite";
  setGlobalCurrentFilterType: (globalCurrentFilterType: "All" | "Room" | "Suite") => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  globalCurrentFilterType: "All",
  setGlobalCurrentFilterType: (globalCurrentFilterType) => set({ globalCurrentFilterType }),
}));
