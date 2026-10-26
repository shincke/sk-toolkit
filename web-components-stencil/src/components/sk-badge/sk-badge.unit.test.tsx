import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

import { BADGE_COLOR_DEFAULT, BADGE_VARIANT_DEFAULT } from './sk-badge.types';

describe('sk-badge', () => {
  it('renders status badge as a static non-interactive tag by default', async () => {
    const { root } = await render(<sk-badge label="Published"></sk-badge>);

    const staticBadge = root.shadowRoot?.querySelector('span.badge');
    const button = root.shadowRoot?.querySelector('button');

    expect(staticBadge).toBeTruthy();
    expect(button).toBeNull();
    expect(staticBadge?.getAttribute('role')).toBe('status');
    expect(staticBadge?.className).toContain(`variant-${BADGE_VARIANT_DEFAULT}`);
    expect(staticBadge?.className).toContain(`color-${BADGE_COLOR_DEFAULT}`);
    expect(staticBadge?.className).toContain('size-sm');
  });

  it('renders filled variant and honors the passed color and size', async () => {
    const { root } = await render(<sk-badge variant="filled" color="success" size="lg" label="Published"></sk-badge>);

    const staticBadge = root.shadowRoot?.querySelector('span.badge');
    expect(staticBadge?.className).toContain('variant-filled');
    expect(staticBadge?.className).toContain('color-success');
    expect(staticBadge?.className).toContain('size-lg');
  });

  it('renders category as the interactive badge and keeps default color', async () => {
    const { root } = await render(<sk-badge variant="category" color="error" size="md" label="Research"></sk-badge>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('type')).toBe('button');
    expect(button?.getAttribute('aria-label')).toBe('Research');
    expect(button?.className).toContain('color-default');
    expect(button?.className).toContain('size-md');
  });

  it('uses slot content when label is not provided', async () => {
    const { root } = await render(<sk-badge>Archive</sk-badge>);

    expect(root.shadowRoot?.querySelector('sk-caption')).toBeTruthy();
  });

  it('does not emit skClick for static badges', async () => {
    const { root, waitForChanges } = await render(<sk-badge label="Published"></sk-badge>);
    const handler = vi.fn();

    root.addEventListener('skClick', handler);

    const staticBadge = root.shadowRoot?.querySelector('span.badge') as HTMLElement;
    staticBadge?.click();
    await waitForChanges();

    expect(handler).not.toHaveBeenCalled();
  });

  it('emits skClick on click for category badge', async () => {
    const { root, waitForChanges } = await render(<sk-badge variant="category" color="accent" size="lg" label="Featured"></sk-badge>);

    const handler = vi.fn();
    root.addEventListener('skClick', handler);

    const button = root.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();
    await waitForChanges();

    expect(button?.className).toContain('color-default');
    expect(button?.className).toContain('size-lg');
    expect(handler).toHaveBeenCalledTimes(1);
  });
});