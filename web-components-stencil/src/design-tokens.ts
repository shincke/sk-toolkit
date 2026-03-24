export const SK_THEMES = ['light', 'dark', 'accent', 'dynamic'] as const;

export type SkTheme = (typeof SK_THEMES)[number];

export const SK_COLOR_TOKENS = [
  '--sk-color-background',
  '--sk-color-surface',
  '--sk-color-surface-elevated',
  '--sk-color-surface-inverse',
  '--sk-color-surface-inverse-text',
  '--sk-color-text-primary',
  '--sk-color-text-muted',
  '--sk-color-border',
  '--sk-color-accent',
  '--sk-color-accent-hover',
  '--sk-color-accent-contrast',
  '--sk-color-overlay',
  '--sk-color-shadow',
  '--sk-color-focus-ring',
] as const;

export const SK_DYNAMIC_COLOR_TOKENS = [
  '--sk-dynamic-color-scheme',
  '--sk-dynamic-background',
  '--sk-dynamic-surface',
  '--sk-dynamic-surface-elevated',
  '--sk-dynamic-surface-inverse',
  '--sk-dynamic-surface-inverse-text',
  '--sk-dynamic-text-primary',
  '--sk-dynamic-text-muted',
  '--sk-dynamic-border',
  '--sk-dynamic-accent',
  '--sk-dynamic-accent-hover',
  '--sk-dynamic-accent-contrast',
  '--sk-dynamic-overlay',
  '--sk-dynamic-shadow',
  '--sk-dynamic-focus-ring',
] as const;
