import { h } from '@stencil/core';

export function renderImagePlaceholder(label = 'Image') {
  return (
    <div
      class="image-placeholder"
      style={{
        width: '100%',
        height: '100%',
        background: 'color-mix(in srgb, var(--color-border) 10%, var(--color-surface-elevated))',
        border: '1px solid color-mix(in srgb, var(--color-border) 28%, transparent)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        userSelect: 'none',
        color: 'var(--color-text-secondary)',
      }}
      aria-hidden="true"
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="2.5" y="6.5" width="31" height="23" rx="2" stroke="currentColor" stroke-width="1.2" opacity="0.22" />
        <circle cx="11" cy="15" r="3" stroke="currentColor" stroke-width="1.2" opacity="0.22" />
        <path d="M2.5 25.5 L12 16.5 L20 22.5 L26 17 L33.5 25.5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" opacity="0.22" />
      </svg>
      <span
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity: '0.22',
        }}
      >
        {label}
      </span>
    </div>
  );
}