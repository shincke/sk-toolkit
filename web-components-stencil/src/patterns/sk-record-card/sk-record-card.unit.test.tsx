import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

describe('sk-record-card', () => {
  it('renders list variant without tags', async () => {
    const { root } = await render(<sk-record-card variant="list" title="Watering a Flower" artist="Haruomi Hosono" price={32} label="LP" condition="VG+"></sk-record-card>);

    expect(root.shadowRoot?.querySelector('.variant-list')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('.thumb-wrap')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('sk-heading')?.textContent).toBe('Watering a Flower');
    expect(root.shadowRoot?.querySelectorAll('sk-tag')).toHaveLength(0);
  });

  it('renders grid variant with condition tag', async () => {
    const { root } = await render(<sk-record-card variant="grid" title="Technodelic" artist="Yellow Magic Orchestra" price={45} label="LP" year="1981" condition="VG+"></sk-record-card>);

    expect(root.shadowRoot?.querySelector('.variant-grid')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('sk-heading')?.textContent).toBe('Technodelic');
    expect(root.shadowRoot?.querySelector('sk-text')?.textContent).toBe('$45');
    
    const tag = root.shadowRoot?.querySelector('sk-tag');
    expect(tag).toBeTruthy();
    expect(tag?.getAttribute('variant')).toBe('status');
    expect(tag?.getAttribute('color')).toBe('success');
  });

  it('renders detail variant layout with CTA', async () => {
    const { root } = await render(<sk-record-card variant="detail" title="Watering a Flower" artist="Haruomi Hosono" price={32} label="LP" year="1984" condition="VG+" genre="Ambient, Electronic, Japanese"></sk-record-card>);

    expect(root.shadowRoot?.querySelector('.variant-detail')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('sk-button')?.textContent).toBe('Add to selection');
  });

  it('emits skAddToSelection when activated', async () => {
    const { root, waitForChanges } = await render(<sk-record-card variant="detail" title="Watering a Flower" artist="Haruomi Hosono" price={32}></sk-record-card>);

    const handler = vi.fn();
    root.addEventListener('skAddToSelection', handler);

    const button = root.shadowRoot?.querySelector('sk-button') as HTMLElement;
    button.click();
    await waitForChanges();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('falls back to the image placeholder when no image is provided', async () => {
    const { root } = await render(<sk-record-card variant="grid" title="B-2 Unit" artist="Ryuichi Sakamoto" price={38}></sk-record-card>);

    expect(root.shadowRoot?.querySelector('.image-placeholder')).toBeTruthy();
  });
});