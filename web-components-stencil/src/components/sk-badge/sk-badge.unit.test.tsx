import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { SkBadge } from './sk-badge';

describe('sk-badge', () => {
  it('renders status badge by default', async () => {
    const page = await newSpecPage({
      components: [SkBadge],
      html: '<sk-badge label="Published"></sk-badge>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.className).toContain('variant-status');
    expect(button?.className).toContain('color-default');
  });

  it('renders filled variant and color classes', async () => {
    const page = await newSpecPage({
      components: [SkBadge],
      html: '<sk-badge variant="filled" color="success" label="Published"></sk-badge>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.className).toContain('variant-filled');
    expect(button?.className).toContain('color-success');
  });

  it('renders ai-chip text treatment', async () => {
    const page = await newSpecPage({
      components: [SkBadge],
      html: '<sk-badge variant="ai-chip" label="Something atmospheric"></sk-badge>',
    });

    expect(page.root?.shadowRoot?.querySelector('sk-text')).toBeTruthy();
  });

  it('uses slot content when label is not provided', async () => {
    const page = await newSpecPage({
      components: [SkBadge],
      html: '<sk-badge>Archive</sk-badge>',
    });

    expect(page.root?.shadowRoot?.querySelector('sk-caption')).toBeTruthy();
  });

  it('emits skClick on click', async () => {
    const page = await newSpecPage({
      components: [SkBadge],
      html: '<sk-badge label="Featured"></sk-badge>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skClick', handler);

    const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();
    await page.waitForChanges();

    expect(handler).toHaveBeenCalledTimes(1);
  });
});