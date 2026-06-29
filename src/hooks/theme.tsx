import useThemeStore from "@/stores/themestore";
import { useShallow } from "zustand/react/shallow";

/**
 * A custom hook to easily access the current theme colors and toggle functions.
 * 
 * @example
 * const { colors, theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  return useThemeStore(
    useShallow((state) => ({
      colors: state.colors,
      theme: state.theme,
      toggleTheme: state.toggleTheme,
      setTheme: state.setTheme,
    }))
  );
}
