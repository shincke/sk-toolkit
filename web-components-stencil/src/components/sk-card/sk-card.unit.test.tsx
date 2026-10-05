import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { SkCard } from './sk-card';

describe('sk-card', () => {
  it('renders default variant title and subtitle', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card title="Graphic Form and Spatial Memory" subtitle="Research · 2024"></sk-card>',
    });

    const heading = page.root?.shadowRoot?.querySelector('sk-heading');
    const subtitle = page.root?.shadowRoot?.querySelector('sk-caption');

    expect(heading?.textContent).toBe('Graphic Form and Spatial Memory');
    expect(subtitle?.textContent).toBe('Research · 2024');
  });

  it('renders body slot content', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card title="Graphic Form"><sk-text size="lg">Body copy</sk-text></sk-card>',
    });

    const body = page.root?.shadowRoot?.querySelector('.body');
    expect(body).toBeTruthy();
    expect(body?.textContent).toContain('Body copy');
  });

  it('renders image variant when image-src is provided', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card variant="image" title="Graphic Form" image-src="/cover.jpg" image-alt="Cover art"></sk-card>',
    });

    const image = page.root?.shadowRoot?.querySelector('img');
    expect(image?.getAttribute('src')).toBe('/cover.jpg');
    expect(image?.getAttribute('alt')).toBe('Cover art');
  });

  it('renders the image placeholder fallback only in image variant', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card variant="image" title="Graphic Form"></sk-card>',
    });

    const placeholder = page.root?.shadowRoot?.querySelector('.image-placeholder');
    expect(placeholder).toBeTruthy();
  });

  it('does not render the image placeholder in default variant', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card title="Graphic Form"></sk-card>',
    });

    const placeholder = page.root?.shadowRoot?.querySelector('.image-placeholder');
    expect(placeholder).toBeFalsy();
  });

  it('renders footer slots when provided', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: `
        <sk-card title="Graphic Form">
          <span slot="footer-start">Kamekura, Y. - 12 min</span>
          <span slot="footer-end">Read →</span>
        </sk-card>
      `,
    });

    const footer = page.root?.shadowRoot?.querySelector('.footer');
    expect(footer).toBeTruthy();
    expect(footer?.textContent).toContain('Kamekura, Y. - 12 min');
    expect(footer?.textContent).toContain('Read →');
  });

  it('reflects selected state for the selected variant', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card variant="selected" title="Graphic Form" selected></sk-card>',
    });

    const card = page.root?.shadowRoot?.querySelector('.card');
    const selectionMark = page.root?.shadowRoot?.querySelector('.selection-mark');

    expect(page.root?.getAttribute('selected')).toBe('');
    expect(page.root?.getAttribute('aria-pressed')).toBe('true');
    expect(card?.className).toContain('is-selected');
    expect(selectionMark).toBeTruthy();
  });

  it('keeps the checkbox visible when deselected in selected variant', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card variant="selected" title="Graphic Form"></sk-card>',
    });

    const selectionMark = page.root?.shadowRoot?.querySelector('.selection-mark');
    const icon = page.root?.shadowRoot?.querySelector('.selection-mark sk-icon');

    expect(selectionMark).toBeTruthy();
    expect(selectionMark?.classList.contains('is-checked')).toBe(false);
    expect(icon).toBeNull();
  });

  it('toggles selected state on click for selected variant', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card variant="selected" title="Graphic Form"></sk-card>',
    });

    const card = page.root?.shadowRoot?.querySelector('.card') as HTMLElement;

    expect(page.root?.selected).toBe(false);

    page.root?.click();
    await page.waitForChanges();
    expect(page.root?.selected).toBe(true);
    expect(page.root?.shadowRoot?.querySelector('.selection-mark')?.classList.contains('is-checked')).toBe(true);
    expect(card.className).toContain('is-selected');

    page.root?.click();
    await page.waitForChanges();
    expect(page.root?.selected).toBe(false);
    expect(page.root?.shadowRoot?.querySelector('.selection-mark')?.classList.contains('is-checked')).toBe(false);
    expect(card.className).not.toContain('is-selected');
  });

  it('emits skClick on click', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card title="Graphic Form"></sk-card>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skClick', handler);

    page.root?.click();
    await page.waitForChanges();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('emits skClick on Enter key', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card title="Graphic Form"></sk-card>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skClick', handler);

    page.root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('uses title as fallback accessible label', async () => {
    const page = await newSpecPage({
      components: [SkCard],
      html: '<sk-card title="Graphic Form"></sk-card>',
    });

    expect(page.root?.getAttribute('role')).toBe('button');
    expect(page.root?.getAttribute('tabindex')).toBe('0');
    expect(page.root?.getAttribute('aria-label')).toBe('Graphic Form');
  });
});