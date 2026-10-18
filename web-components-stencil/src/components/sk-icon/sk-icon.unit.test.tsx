import { h, render } from '@stencil/vitest';
import { describe, expect, it } from 'vitest';

describe('sk-icon', () => {
  it('renders with default arrow icon', async () => {
    const { root } = await render(<sk-icon></sk-icon>);

    const svg = root.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('width')).toBe('16');
    expect(svg?.getAttribute('height')).toBe('16');
    expect(svg?.getAttribute('role')).toBe('presentation');
  });

  it('renders different icon by name prop', async () => {
    const { root } = await render(<sk-icon name="plus"></sk-icon>);

    const svg = root.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 16 16');
  });

  it('respects size prop', async () => {
    const { root } = await render(<sk-icon size={24}></sk-icon>);

    const svg = root.shadowRoot?.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('applies chevron direction', async () => {
    const { root } = await render(<sk-icon name="chevron" dir="left"></sk-icon>);

    const svg = root.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders with aria-label when provided', async () => {
    const { root } = await render(<sk-icon name="search" aria-label="Search"></sk-icon>);

    const svg = root.shadowRoot?.querySelector('svg');
    expect(svg?.getAttribute('aria-label')).toBe('Search');
    expect(svg?.getAttribute('role')).toBe('img');
  });

  it('reflects name and size props', async () => {
    const { root } = await render(<sk-icon name="close" size={32}></sk-icon>);

    expect(root.getAttribute('name')).toBe('close');
    expect(root.getAttribute('size')).toBe('32');
  });

  it('shows placeholder for invalid icon name', async () => {
    const { root } = await render(<sk-icon name={'invalid-icon' as any}></sk-icon>);

    const placeholder = root.shadowRoot?.querySelector('.icon-placeholder');
    expect(placeholder?.textContent).toContain('?');
  });
});
