import { create } from "zustand";

interface SettingsStore {
  soundEnabled: boolean;
  toggleSound: () => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));
