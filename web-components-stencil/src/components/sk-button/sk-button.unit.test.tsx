import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

import { BUTTON_SIZE_DEFAULT, BUTTON_TYPE_DEFAULT, BUTTON_VARIANT_DEFAULT } from './sk-button.types';

describe('sk-button', () => {
  it('renders with default props', async () => {
    const { root } = await render(<sk-button>Label</sk-button>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.classList.contains(`variant-${BUTTON_VARIANT_DEFAULT}`)).toBe(true);
    expect(button?.classList.contains(`size-${BUTTON_SIZE_DEFAULT}`)).toBe(true);
    expect(button?.getAttribute('type')).toBe(BUTTON_TYPE_DEFAULT);
    expect(root.textContent).toContain('Label');
  });

  it('reflects variant and size props', async () => {
    const { root } = await render(<sk-button variant="destructive" size="lg">Delete</sk-button>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('variant-destructive')).toBe(true);
    expect(button?.classList.contains('size-lg')).toBe(true);
  });

  it('disables the native button when disabled is set', async () => {
    const { root } = await render(<sk-button disabled>Disabled</sk-button>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('disabled')).toBe('');
  });

  it('emits skClick on click', async () => {
    const { root, waitForChanges } = await render(<sk-button>Press</sk-button>);

    const handler = vi.fn();
    root.addEventListener('skClick', handler);

    const button = root.shadowRoot?.querySelector('button');
    button?.click();
    await waitForChanges();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('shows spinner and disables button when loading', async () => {
    const { root } = await render(<sk-button loading>Saving</sk-button>);

    const button = root.shadowRoot?.querySelector('button');
    const spinner = root.shadowRoot?.querySelector('sk-spinner');
    expect(button?.getAttribute('disabled')).toBe('');
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(spinner).not.toBeNull();
  });

  it('renders an anchor when href is provided', async () => {
    const { root } = await render(<sk-button href="/catalog">Open catalog</sk-button>);

    const anchor = root.shadowRoot?.querySelector('a');
    const button = root.shadowRoot?.querySelector('button');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('/catalog');
    expect(button).toBeNull();
  });

  it('keeps disabled buttons focusable when focusable-when-disabled is set', async () => {
    const { root } = await render(<sk-button disabled focusable-when-disabled>Disabled</sk-button>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(false);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
    expect(button?.getAttribute('tabindex')).toBe('0');
    expect(button?.classList.contains('is-disabled')).toBe(true);
  });

  it('emits focus and blur events from the control element', async () => {
    const { root, waitForChanges } = await render(<sk-button>Focusable</sk-button>);

    const focusHandler = vi.fn();
    const blurHandler = vi.fn();

    root.addEventListener('skFocus', focusHandler);
    root.addEventListener('skBlur', blurHandler);

    const button = root.shadowRoot?.querySelector('button');
    button?.dispatchEvent(new FocusEvent('focus'));
    button?.dispatchEvent(new FocusEvent('blur'));
    await waitForChanges();

    expect(focusHandler).toHaveBeenCalledTimes(1);
    expect(blurHandler).toHaveBeenCalledTimes(1);
  });

  it('renders full width and icon only states', async () => {
    const { root } = await render(
      <sk-button full-width icon-only aria-label="Search">
        <span slot="iconLeft">+</span>
      </sk-button>,
    );

    const button = root.shadowRoot?.querySelector('button');
    const label = root.shadowRoot?.querySelector('.label');
    expect(button?.classList.contains('is-full-width')).toBe(true);
    expect(button?.classList.contains('is-icon-only')).toBe(true);
    expect(button?.getAttribute('aria-label')).toBe('Search');
    expect(label).toBeNull();
  });
});