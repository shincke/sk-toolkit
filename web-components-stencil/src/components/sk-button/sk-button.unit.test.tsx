import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { SkButton } from './sk-button';

describe('sk-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button>Label</sk-button>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.classList.contains('variant-primary')).toBe(true);
    expect(button?.classList.contains('size-md')).toBe(true);
    expect(button?.textContent).toContain('Label');
  });

  it('reflects variant and size props', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button variant="destructive" size="lg">Delete</sk-button>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('variant-destructive')).toBe(true);
    expect(button?.classList.contains('size-lg')).toBe(true);
  });

  it('disables the native button when disabled is set', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button disabled>Disabled</sk-button>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.disabled).toBe(true);
  });

  it('emits skClick on click', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button>Press</sk-button>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skClick', handler);

    const button = page.root?.shadowRoot?.querySelector('button');
    button?.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('shows spinner and disables button when loading', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button loading>Saving</sk-button>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    const spinner = page.root?.shadowRoot?.querySelector('sk-loading');
    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(spinner).not.toBeNull();
  });

  it('renders an anchor when href is provided', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button href="/catalog">Open catalog</sk-button>',
    });

    const anchor = page.root?.shadowRoot?.querySelector('a');
    const button = page.root?.shadowRoot?.querySelector('button');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('/catalog');
    expect(button).toBeNull();
  });

  it('keeps disabled buttons focusable when focusable-when-disabled is set', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button disabled focusable-when-disabled>Disabled</sk-button>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.disabled).toBe(false);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
    expect(button?.getAttribute('tabindex')).toBe('0');
    expect(button?.classList.contains('is-disabled')).toBe(true);
  });

  it('emits focus and blur events from the control element', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button>Focusable</sk-button>',
    });

    const focusHandler = vi.fn();
    const blurHandler = vi.fn();

    page.root?.addEventListener('skFocus', focusHandler);
    page.root?.addEventListener('skBlur', blurHandler);

    const button = page.root?.shadowRoot?.querySelector('button');
    button?.dispatchEvent(new FocusEvent('focus'));
    button?.dispatchEvent(new FocusEvent('blur'));

    expect(focusHandler).toHaveBeenCalledTimes(1);
    expect(blurHandler).toHaveBeenCalledTimes(1);
  });

  it('renders full width and icon only states', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button full-width icon-only aria-label="Search"><span slot="iconLeft">+</span></sk-button>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    const label = page.root?.shadowRoot?.querySelector('.label');
    expect(button?.classList.contains('is-full-width')).toBe(true);
    expect(button?.classList.contains('is-icon-only')).toBe(true);
    expect(button?.getAttribute('aria-label')).toBe('Search');
    expect(label).toBeNull();
  });
});