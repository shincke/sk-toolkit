export type BadgeVariant = 'status' | 'filled' | 'category';
export type BadgeInteractive = 'category';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export type BadgeColor = 'success' | 'warning' | 'error' | 'accent' | 'secondary' | 'default';

export const BADGE_STATIC_COLORS: BadgeColor[] = ['success', 'warning', 'error'];
export const BADGE_INTERACTIVE_COLORS: BadgeColor[] = ['accent', 'secondary', 'default'];

export const BADGE_VARIANT_DEFAULT: BadgeVariant = 'status';
export const BADGE_COLOR_DEFAULT: BadgeColor = 'default';
export const BADGE_SIZE_DEFAULT: BadgeSize = 'sm';
export const BADGE_INTERACTIVE_DEFAULT: BadgeInteractive = 'category';
