import { newSpecPage } from '@stencil/core/testing';
import { SkIcon } from './sk-icon';
import { describe, expect, it } from 'vitest';

describe('sk-icon', () => {
  it('renders with default arrow icon', async () => {
    const page = await newSpecPage({
      components: [SkIcon],
      html: '<sk-icon></sk-icon>',
    });

    expect(page.root).toEqualHtml(`
      <sk-icon>
        <template shadowroot="open">
          <svg class="icon" fill="none" height="16" role="presentation" stroke="currentColor" stroke-width="1.5" viewBox="0 0 16 16" width="16">
          </svg>
        </template>
      </sk-icon>
    `);
  });

  it('renders different icon by name prop', async () => {
    const page = await newSpecPage({
      components: [SkIcon],
      html: '<sk-icon name="plus"></sk-icon>',
    });

    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 16 16');
  });

  it('respects size prop', async () => {
    const page = await newSpecPage({
      components: [SkIcon],
      html: '<sk-icon size="24"></sk-icon>',
    });

    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('applies chevron direction', async () => {
    const page = await newSpecPage({
      components: [SkIcon],
      html: '<sk-icon name="chevron" dir="left"></sk-icon>',
    });

    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders with aria-label when provided', async () => {
    const page = await newSpecPage({
      components: [SkIcon],
      html: '<sk-icon name="search" aria-label="Search"></sk-icon>',
    });

    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg?.getAttribute('aria-label')).toBe('Search');
    expect(svg?.getAttribute('role')).toBe('img');
  });

  it('reflects name and size props', async () => {
    const page = await newSpecPage({
      components: [SkIcon],
      html: '<sk-icon name="close" size="32"></sk-icon>',
    });

    expect(page.root?.getAttribute('name')).toBe('close');
    expect(page.root?.getAttribute('size')).toBe('32');
  });

  it('shows placeholder for invalid icon name', async () => {
    const page = await newSpecPage({
      components: [SkIcon],
      html: '<sk-icon name="invalid-icon"></sk-icon>',
    });

    const placeholder = page.root?.shadowRoot?.querySelector('.icon-placeholder');
    expect(placeholder?.textContent).toContain('?');
  });
});
