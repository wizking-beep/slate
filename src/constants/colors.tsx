export type ThemeMode = "light" | "dark";

export interface AppColorTokens {
  background: string;       // Overall screen background
  card: string;             // Cards, list items, and containers
  surface: string;          // Dropdowns, modals, sheet surfaces, text inputs
  border: string;           // Dividers, thin borders
  text: string;             // Primary text (high contrast)
  textSecondary: string;    // Secondary text (medium contrast, descriptions)
  textMuted: string;        // Muted text (low contrast, placeholders, dates)
  primary: string;          // Primary action color (buttons, active status, highlights)
  onPrimary: string;        // Text/icon color to be displayed on top of the primary color
  primaryContainer: string; // Subtle primary color containers (active tab background, selected state)
  onPrimaryContainer: string; // Text/icon color to be displayed on top of the primaryContainer
  success: string;          // Success status (e.g. active, completed, checkmarks)
  error: string;            // Error status (e.g. delete button, error text, warnings)
  warning: string;          // Warning status (e.g. pending, archivable status)
}

export const colorSchemes = {
  light: {
    background: "#F4F5FA",
    card: "#FFFFFF",
    surface: "#EBE8F4",
    border: "#E0DBEC",
    text: "#1C1A22",
    textSecondary: "#494554",
    textMuted: "#8F899D",
    primary: "#7A4FD6",
    onPrimary: "#FFFFFF",
    primaryContainer: "#E9DDFF",
    onPrimaryContainer: "#22005C",
    success: "#2E7D32",
    error: "#BA1A1A",
    warning: "#B25E00",
  },
  dark: {
    background: "#0E0C12",
    card: "#18161E",
    surface: "#25222E",
    border: "#332F3D",
    text: "#F4EFF4",
    textSecondary: "#CBC4D9",
    textMuted: "#8F899D",
    primary: "#CFBDFF",
    onPrimary: "#381E72",
    primaryContainer: "#4F378B",
    onPrimaryContainer: "#E9DDFF",
    success: "#81C784",
    error: "#FFB4AB",
    warning: "#FFB74D",
  },
} as const satisfies Record<ThemeMode, AppColorTokens>;

export const colors = colorSchemes;