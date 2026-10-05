import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it } from 'vitest';

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

  it('shows spinner and disables button when loading', async () => {
    const page = await newSpecPage({
      components: [SkButton],
      html: '<sk-button loading>Saving</sk-button>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(spinner).not.toBeNull();
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