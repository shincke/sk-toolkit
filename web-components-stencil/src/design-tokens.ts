export const SK_THEMES = ['light', 'dark'] as const;

export type SkTheme = (typeof SK_THEMES)[number];

export const SK_THEME_TOKENS = [
  '--color-background',
  '--color-surface',
  '--color-surface-elevated',
  '--color-text-primary',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-text-inverse',
  '--color-border',
  '--color-border-strong',
  '--color-border-soft',
  '--color-primary',
  '--color-primary-fg',
  '--color-primary-hover',
  '--color-secondary',
  '--color-secondary-fg',
  '--color-accent',
  '--color-accent-fg',
  '--color-success',
  '--color-warning',
  '--color-error',
  '--color-focus',
  '--color-shadow',
  '--font-display',
  '--font-sans',
  '--font-mono',
] as const;

export const SK_COLOR_TOKENS = [
  '--color-background',
  '--color-surface',
  '--color-surface-elevated',
  '--color-text-primary',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-text-inverse',
  '--color-border',
  '--color-border-strong',
  '--color-border-soft',
  '--color-primary',
  '--color-primary-fg',
  '--color-primary-hover',
  '--color-secondary',
  '--color-secondary-fg',
  '--color-accent',
  '--color-accent-fg',
  '--color-success',
  '--color-warning',
  '--color-error',
  '--color-focus',
  '--color-shadow',
] as const;

export const SK_DYNAMIC_COLOR_TOKENS = SK_COLOR_TOKENS;

export const SK_TYPOGRAPHY_TOKENS = [
  '--font-display',
  '--font-sans',
  '--font-mono',
] as const;

export const SK_GLOBAL_TOKENS = [
  '--space-4',
  '--space-8',
  '--space-12',
  '--space-16',
  '--space-24',
  '--space-32',
  '--space-48',
  '--space-64',
  '--radius-none',
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
  '--radius-full',
  '--border-hairline',
  '--border-default',
  '--border-strong',
  '--shadow-none',
  '--shadow-offset-sm',
  '--shadow-offset-md',
  '--shadow-offset-lg',
] as const;

export const SK_SPACING_TOKENS = [
  '--space-4',
  '--space-8',
  '--space-12',
  '--space-16',
  '--space-24',
  '--space-32',
  '--space-48',
  '--space-64',
] as const;

export const SK_RADIUS_TOKENS = [
  '--radius-none',
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
  '--radius-full',
] as const;

export const SK_BORDER_WIDTH_TOKENS = [
  '--border-hairline',
  '--border-default',
  '--border-strong',
] as const;

export const SK_SHADOW_TOKENS = [
  '--shadow-none',
  '--shadow-offset-sm',
  '--shadow-offset-md',
  '--shadow-offset-lg',
] as const;

export const SK_ANIMATION_CLASSES = [
  'skeleton-pulse',
  'spinner-rotate',
] as const;
