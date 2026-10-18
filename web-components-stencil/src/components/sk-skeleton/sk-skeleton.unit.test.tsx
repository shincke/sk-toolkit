import { h, render } from '@stencil/vitest';
import { describe, expect, it } from 'vitest';

describe('sk-skeleton', () => {
  it('renders with default text-block variant', async () => {
    const { root } = await render(<sk-skeleton></sk-skeleton>);

    const container = root.shadowRoot?.querySelector('.variant-text-block');
    expect(container).toBeTruthy();
  });

  it('renders with grid variant', async () => {
    const { root } = await render(<sk-skeleton variant="grid"></sk-skeleton>);

    const container = root.shadowRoot?.querySelector('.variant-grid');
    expect(container).toBeTruthy();
    expect(root.getAttribute('variant')).toBe('grid');

    const cards = root.shadowRoot?.querySelectorAll('.grid-card');
    expect(cards?.length).toBe(1);
  });

  it('renders with list variant', async () => {
    const { root } = await render(<sk-skeleton variant="list"></sk-skeleton>);

    const container = root.shadowRoot?.querySelector('.variant-list');
    expect(container).toBeTruthy();
    expect(root.getAttribute('variant')).toBe('list');

    const items = root.shadowRoot?.querySelectorAll('.list-item');
    expect(items?.length).toBe(1);
  });

  it('supports custom width', async () => {
    const { root } = await render(<sk-skeleton variant="grid" width="320px"></sk-skeleton>);

    const container = root.shadowRoot?.querySelector('.variant-grid');
    expect(container?.getAttribute('style')).toContain('width: 320px');
  });

  it('renders with text-block variant', async () => {
    const { root } = await render(<sk-skeleton variant="text-block"></sk-skeleton>);

    const container = root.shadowRoot?.querySelector('.variant-text-block');
    expect(container).toBeTruthy();
    expect(root.getAttribute('variant')).toBe('text-block');
  });

  it('has proper accessibility attributes', async () => {
    const { root } = await render(<sk-skeleton></sk-skeleton>);

    const container = root.shadowRoot?.querySelector('[role="status"]');
    expect(container?.getAttribute('role')).toBe('status');
    expect(container?.getAttribute('aria-busy')).toBe('true');
    expect(container?.getAttribute('aria-label')).toBe('Loading content');
  });

  it('grid variant renders correct structure', async () => {
    const { root } = await render(<sk-skeleton variant="grid"></sk-skeleton>);

    const images = root.shadowRoot?.querySelectorAll('.grid-image');
    const content = root.shadowRoot?.querySelectorAll('.grid-content');
    
    expect(images?.length).toBe(1);
    expect(content?.length).toBe(1);
  });

  it('list variant renders correct structure', async () => {
    const { root } = await render(<sk-skeleton variant="list"></sk-skeleton>);

    const avatars = root.shadowRoot?.querySelectorAll('.list-avatar');
    const footers = root.shadowRoot?.querySelectorAll('.list-footer');
    
    expect(avatars?.length).toBe(1);
    expect(footers?.length).toBe(1);
  });

  it('text-block variant renders correct structure', async () => {
    const { root } = await render(<sk-skeleton variant="text-block"></sk-skeleton>);

    const lines = root.shadowRoot?.querySelectorAll('.text-line');
    const boxes = root.shadowRoot?.querySelectorAll('.text-box');
    
    expect(lines?.length).toBe(4);
    expect(boxes?.length).toBe(2);
  });
});
