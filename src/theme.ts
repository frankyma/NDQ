import { createTheme } from "@mui/material/styles";

export const zenColors = {
  paper: "#f7f9fb",
  surface: "#ffffff",
  ink: "#27313a",
  muted: "#647082",
  accent: "#5b82ad",
  accentSoft: "#9bb8d6",
  divider: "rgba(39, 49, 58, 0.10)",
  accentRgb: "91, 130, 173",
};

export const fonts = {
  serif: '"Source Serif 4", Georgia, "Times New Roman", serif',
  sans: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
};

export const theme = createTheme({
  palette: {
    background: { default: zenColors.paper, paper: zenColors.surface },
    primary: { main: zenColors.accent },
    text: { primary: zenColors.ink, secondary: zenColors.muted },
    divider: zenColors.divider,
  },
  typography: {
    fontFamily: fonts.sans,
    h1: { fontFamily: fonts.serif },
    h2: { fontFamily: fonts.serif },
    h3: { fontFamily: fonts.serif },
    h4: { fontFamily: fonts.serif, fontWeight: 500 },
    h5: { fontFamily: fonts.serif, fontWeight: 500 },
    h6: { fontFamily: fonts.serif, fontWeight: 500 },
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 10 },
});
