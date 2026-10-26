export type TagInteraction = 'button' | 'checkbox' | 'radio' | 'link';

export type TagVariant = 'status' | 'filled' | 'interactive';
export type TagInteractive = 'interactive';
export type TagSize = 'xs' | 'sm' | 'md' | 'lg';

export type TagColor = 'success' | 'warning' | 'error' | 'accent' | 'secondary' | 'default';

export const TAG_STATIC_COLORS: TagColor[] = ['success', 'warning', 'error'];
export const TAG_INTERACTIVE_COLORS: TagColor[] = ['accent', 'secondary', 'default'];

export const TAG_VARIANT_DEFAULT: TagVariant = 'status';
export const TAG_COLOR_DEFAULT: TagColor = 'default';
export const TAG_SIZE_DEFAULT: TagSize = 'sm';
export const TAG_INTERACTIVE_DEFAULT: TagInteractive = 'interactive';
