import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

import { TAG_COLOR_DEFAULT, TAG_VARIANT_DEFAULT } from './sk-tag.types';

describe('sk-tag', () => {
  it('renders status tag as a static non-interactive tag by default', async () => {
    const { root } = await render(<sk-tag label="Published"></sk-tag>);

    const staticTag = root.shadowRoot?.querySelector('span');
    const button = root.shadowRoot?.querySelector('button');

    expect(staticTag).toBeTruthy();
    expect(button).toBeNull();
    expect(staticTag?.getAttribute('role')).toBe('status');
    expect(staticTag?.className).toContain(`variant-${TAG_VARIANT_DEFAULT}`);
    expect(staticTag?.className).toContain(`color-${TAG_COLOR_DEFAULT}`);
    expect(staticTag?.className).toContain('size-sm');
  });

  it('renders filled variant and honors the passed color and size', async () => {
    const { root } = await render(<sk-tag variant="filled" color="success" size="lg" label="Published"></sk-tag>);

    const staticTag = root.shadowRoot?.querySelector('span');
    expect(staticTag).toBeTruthy();
    expect(staticTag?.className).toContain('variant-filled');
    expect(staticTag?.className).toContain('color-success');
    expect(staticTag?.className).toContain('size-lg');
  });

  it('renders interactive as the clickable tag and keeps the passed color', async () => {
    const { root } = await render(<sk-tag variant="interactive" color="error" size="md" label="Research"></sk-tag>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('type')).toBe('button');
    expect(button?.getAttribute('aria-label')).toBe('Research');
    expect(button?.className).toContain('color-error');
    expect(button?.className).toContain('size-md');
  });

  it('uses slot content when label is not provided', async () => {
    const { root } = await render(<sk-tag>Archive</sk-tag>);

    expect(root.shadowRoot?.querySelector('sk-caption')).toBeTruthy();
  });

  it('does not emit skClick for static tags', async () => {
    const { root, waitForChanges } = await render(<sk-tag label="Published"></sk-tag>);
    const handler = vi.fn();

    root.addEventListener('skClick', handler);

    const staticTag = root.shadowRoot?.querySelector('span') as HTMLElement;
    staticTag?.click();
    await waitForChanges();

    expect(handler).not.toHaveBeenCalled();
  });

  it('emits skClick on click for interactive tag', async () => {
    const { root, waitForChanges } = await render(<sk-tag variant="interactive" color="accent" size="lg" label="Featured"></sk-tag>);

    const handler = vi.fn();
    root.addEventListener('skClick', handler);

    const button = root.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();
    await waitForChanges();

    expect(button?.className).toContain('color-accent');
    expect(button?.className).toContain('size-lg');
    expect(handler).toHaveBeenCalledTimes(1);
  });
});