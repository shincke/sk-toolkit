import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { SkDrawer } from './sk-drawer';

describe('sk-drawer', () => {
  it('renders nothing when closed', async () => {
    const page = await newSpecPage({
      components: [SkDrawer],
      html: '<sk-drawer title="Selection"></sk-drawer>',
    });

    expect(page.root?.shadowRoot?.querySelector('.panel')).toBeNull();
  });

  it('renders dialog when open', async () => {
    const page = await newSpecPage({
      components: [SkDrawer],
      html: '<sk-drawer open title="Selection"></sk-drawer>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.panel');
    expect(panel?.getAttribute('role')).toBe('dialog');
    expect(panel?.getAttribute('aria-modal')).toBe('true');
    expect(panel?.getAttribute('aria-label')).toBe('Selection');
    expect(panel?.className).toContain('is-open');
  });

  it('renders default title and close button in header', async () => {
    const page = await newSpecPage({
      components: [SkDrawer],
      html: '<sk-drawer open title="Selection"></sk-drawer>',
    });

    const heading = page.root?.shadowRoot?.querySelector('.title');
    const closeButton = page.root?.shadowRoot?.querySelector('.close-button');

    expect(heading?.textContent).toBe('Selection');
    expect(closeButton).toBeTruthy();
  });

  it('supports custom header slot', async () => {
    const page = await newSpecPage({
      components: [SkDrawer],
      html: '<sk-drawer open><div slot="header">Custom header</div></sk-drawer>',
    });

    const heading = page.root?.shadowRoot?.querySelector('sk-heading');
    expect(heading).toBeNull();
    expect(page.root?.shadowRoot?.querySelector('slot[name="header"]')).toBeTruthy();
  });

  it('closes and emits skClose on close button click', async () => {
    const page = await newSpecPage({
      components: [SkDrawer],
      html: '<sk-drawer open title="Selection"></sk-drawer>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skClose', handler);

    const closeButton = page.root?.shadowRoot?.querySelector('.close-button') as HTMLButtonElement;
    closeButton.click();
    await page.waitForChanges();

    expect(page.root?.open).toBe(false);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape key', async () => {
    const page = await newSpecPage({
      components: [SkDrawer],
      html: '<sk-drawer open title="Selection"></sk-drawer>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skClose', handler);

    const panel = page.root?.shadowRoot?.querySelector('.panel') as HTMLElement;
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await page.waitForChanges();

    expect(page.root?.open).toBe(false);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('uses configured width on desktop', async () => {
    const page = await newSpecPage({
      components: [SkDrawer],
      html: '<sk-drawer open title="Selection" width="480"></sk-drawer>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.panel');
    expect(panel?.getAttribute('style')).toContain('width: 480px');
  });

  it('uses full viewport width on mobile', async () => {
    const page = await newSpecPage({
      components: [SkDrawer],
      html: '<sk-drawer open title="Selection" is-mobile></sk-drawer>',
    });

    const panel = page.root?.shadowRoot?.querySelector('.panel');
    expect(panel?.className).toContain('is-mobile');
    expect(panel?.getAttribute('style')).toContain('width: 100vw');
  });
});