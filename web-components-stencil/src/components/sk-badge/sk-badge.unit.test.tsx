import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

import { BADGE_COLOR_DEFAULT, BADGE_VARIANT_AI_CHIP, BADGE_VARIANT_DEFAULT } from './sk-badge.types';

describe('sk-badge', () => {
  it('renders status badge by default', async () => {
    const { root } = await render(<sk-badge label="Published"></sk-badge>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button?.className).toContain(`variant-${BADGE_VARIANT_DEFAULT}`);
    expect(button?.className).toContain(`color-${BADGE_COLOR_DEFAULT}`);
  });

  it('renders filled variant and color classes', async () => {
    const { root } = await render(<sk-badge variant="filled" color="success" label="Published"></sk-badge>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button?.className).toContain('variant-filled');
    expect(button?.className).toContain('color-success');
  });

  it('renders ai-chip text treatment', async () => {
    const { root } = await render(<sk-badge variant={BADGE_VARIANT_AI_CHIP} label="Something atmospheric"></sk-badge>);

    expect(root.shadowRoot?.querySelector('sk-text')).toBeTruthy();
  });

  it('uses slot content when label is not provided', async () => {
    const { root } = await render(<sk-badge>Archive</sk-badge>);

    expect(root.shadowRoot?.querySelector('sk-caption')).toBeTruthy();
  });

  it('emits skClick on click', async () => {
    const { root, waitForChanges } = await render(<sk-badge label="Featured"></sk-badge>);

    const handler = vi.fn();
    root.addEventListener('skClick', handler);

    const button = root.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();
    await waitForChanges();

    expect(handler).toHaveBeenCalledTimes(1);
  });
});