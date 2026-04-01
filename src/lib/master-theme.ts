import config from "../../company-config.json";

export const theme = {
  colors: {
    primary: config.branding.colors.primary,
    secondary: config.branding.colors.secondary,
    accent: config.branding.colors.accent,
    background: config.branding.colors.background,
    foreground: config.branding.colors.foreground,
    muted: config.branding.colors.muted,
    mutedForeground: config.branding.colors.mutedForeground,
  },
  fonts: {
    heading: config.branding.fonts.heading,
    body: config.branding.fonts.body,
    accent: config.branding.fonts.accent,
  },
  borderRadius: config.branding.borderRadius,
  shadows: config.branding.shadows,
} as const;

export type Theme = typeof theme;
