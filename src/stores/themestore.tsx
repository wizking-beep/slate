import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import { colorSchemes, type AppColorTokens, type ThemeMode } from "@/constants/colors";

interface ThemeStore {
  theme: ThemeMode;
  colors: AppColorTokens;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const storage: StateStorage = {
  getItem: async (name) => {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }

    return window.localStorage.getItem(name);
  },
  setItem: async (name, value) => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(name, value);
    }
  },
  removeItem: async (name) => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(name);
    }
  },
};

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      colors: colorSchemes.light,
      setTheme: (theme) => set({ theme, colors: colorSchemes[theme] }),
      toggleTheme: () =>
        set((state) => {
          const nextTheme: ThemeMode = state.theme === "light" ? "dark" : "light";
          return { theme: nextTheme, colors: colorSchemes[nextTheme] };
        }),
    }),
    {
      name: "slate-theme",
      storage: createJSONStorage(() => storage),
    }
  )
);

export default useThemeStore;