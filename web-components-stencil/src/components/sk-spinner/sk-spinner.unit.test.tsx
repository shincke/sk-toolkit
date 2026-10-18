import { h, render } from '@stencil/vitest';
import { describe, expect, it } from 'vitest';

describe('sk-spinner', () => {
  it('renders with default size m', async () => {
    const { root } = await render(<sk-spinner></sk-spinner>);

    const spinner = root.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-md')).toBe(true);
    expect(root.getAttribute('size')).toBe('md');
  });

  it('renders with size sm', async () => {
    const { root } = await render(<sk-spinner size="sm"></sk-spinner>);

    const spinner = root.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-sm')).toBe(true);
  });

  it('renders with size md', async () => {
    const { root } = await render(<sk-spinner size="md"></sk-spinner>);

    const spinner = root.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-md')).toBe(true);
  });

  it('renders with size lg', async () => {
    const { root } = await render(<sk-spinner size="lg"></sk-spinner>);

    const spinner = root.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-lg')).toBe(true);
  });

  it('renders with size xl', async () => {
    const { root } = await render(<sk-spinner size="xl"></sk-spinner>);

    const spinner = root.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-xl')).toBe(true);
  });

  it('renders with label', async () => {
    const { root } = await render(<sk-spinner label="Loading data..."></sk-spinner>);

    const label = root.shadowRoot?.querySelector('.label');
    expect(label?.textContent).toBe('Loading data...');
  });

  it('renders without label when not provided', async () => {
    const { root } = await render(<sk-spinner></sk-spinner>);

    const label = root.shadowRoot?.querySelector('.label');
    expect(label).toBeNull();
  });

  it('has proper aria attributes', async () => {
    const { root } = await render(<sk-spinner label="Processing"></sk-spinner>);

    const spinnerDiv = root.shadowRoot?.querySelector('[role="status"]');
    expect(spinnerDiv?.getAttribute('aria-label')).toBe('Processing');
  });

  it('uses default aria-label when no label provided', async () => {
    const { root } = await render(<sk-spinner></sk-spinner>);

    const spinnerDiv = root.shadowRoot?.querySelector('[role="status"]');
    expect(spinnerDiv?.getAttribute('aria-label')).toBe('Loading');
  });

  it('renders SVG circle', async () => {
    const { root } = await render(<sk-spinner></sk-spinner>);

    const svg = root.shadowRoot?.querySelector('.spinner-svg');
    const circle = root.shadowRoot?.querySelector('.spinner-circle');
    expect(svg).toBeTruthy();
    expect(circle).toBeTruthy();
  });

  it('reflects paused state', async () => {
    const { root } = await render(<sk-spinner paused></sk-spinner>);

    const spinner = root.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('is-paused')).toBe(true);
    expect(root.getAttribute('paused')).toBe('');
  });
});
