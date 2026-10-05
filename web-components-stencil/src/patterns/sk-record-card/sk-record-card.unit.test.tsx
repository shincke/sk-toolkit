import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { SkRecordCard } from './sk-record-card';

describe('sk-record-card', () => {
  it('renders list variant without badges', async () => {
    const page = await newSpecPage({
      components: [SkRecordCard],
      html: '<sk-record-card variant="list" title="Watering a Flower" artist="Haruomi Hosono" price="32" label="LP" condition="VG+"></sk-record-card>',
    });

    expect(page.root?.shadowRoot?.querySelector('.variant-list')).toBeTruthy();
    expect(page.root?.shadowRoot?.querySelector('.thumb-wrap')).toBeTruthy();
    expect(page.root?.shadowRoot?.textContent).toContain('Watering a Flower');
    expect(page.root?.shadowRoot?.querySelectorAll('sk-badge')).toHaveLength(0);
  });

  it('renders grid variant with condition badge', async () => {
    const page = await newSpecPage({
      components: [SkRecordCard],
      html: '<sk-record-card variant="grid" title="Technodelic" artist="Yellow Magic Orchestra" price="45" label="LP" year="1981" condition="VG+"></sk-record-card>',
    });

    expect(page.root?.shadowRoot?.querySelector('.variant-grid')).toBeTruthy();
    expect(page.root?.shadowRoot?.textContent).toContain('Technodelic');
    expect(page.root?.shadowRoot?.textContent).toContain('$45');
    
    const badge = page.root?.shadowRoot?.querySelector('sk-badge');
    expect(badge).toBeTruthy();
    expect(badge?.getAttribute('label')).toBe('VG+');
    expect(badge?.getAttribute('variant')).toBe('status');
  });

  it('renders detail variant layout with CTA', async () => {
    const page = await newSpecPage({
      components: [SkRecordCard],
      html: '<sk-record-card variant="detail" title="Watering a Flower" artist="Haruomi Hosono" price="32" label="LP" year="1984" condition="VG+" genre="Ambient, Electronic, Japanese"></sk-record-card>',
    });

    expect(page.root?.shadowRoot?.querySelector('.variant-detail')).toBeTruthy();
    expect(page.root?.shadowRoot?.querySelector('sk-button')).toBeTruthy();
    expect(page.root?.shadowRoot?.textContent).toContain('Add to selection');
  });

  it('emits skAddToSelection when activated', async () => {
    const page = await newSpecPage({
      components: [SkRecordCard],
      html: '<sk-record-card variant="detail" title="Watering a Flower" artist="Haruomi Hosono" price="32"></sk-record-card>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skAddToSelection', handler);

    const button = page.root?.shadowRoot?.querySelector('sk-button') as HTMLSkButtonElement;
    button.click();
    await page.waitForChanges();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('falls back to the image placeholder when no image is provided', async () => {
    const page = await newSpecPage({
      components: [SkRecordCard],
      html: '<sk-record-card variant="grid" title="B-2 Unit" artist="Ryuichi Sakamoto" price="38"></sk-record-card>',
    });

    expect(page.root?.shadowRoot?.querySelector('.image-placeholder')).toBeTruthy();
  });
});