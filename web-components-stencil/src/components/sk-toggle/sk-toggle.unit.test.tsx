import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { SkToggle } from './sk-toggle';

describe('sk-toggle', () => {
  it('renders unchecked by default', async () => {
    const page = await newSpecPage({
      components: [SkToggle],
      html: '<sk-toggle></sk-toggle>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('role')).toBe('switch');
    expect(button?.getAttribute('aria-checked')).toBe('false');
    expect(page.root?.hasAttribute('checked')).toBe(false);
  });

  it('renders label when provided', async () => {
    const page = await newSpecPage({
      components: [SkToggle],
      html: '<sk-toggle label="Dark mode"></sk-toggle>',
    });

    const label = page.root?.shadowRoot?.querySelector('.label');
    expect(label?.textContent).toBe('Dark mode');
  });

  it('toggles checked state and emits event on click', async () => {
    const page = await newSpecPage({
      components: [SkToggle],
      html: '<sk-toggle></sk-toggle>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skChange', (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      handler(customEvent.detail);
    });

    const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();
    await page.waitForChanges();

    expect(page.root?.checked).toBe(true);
    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(handler).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', async () => {
    const page = await newSpecPage({
      components: [SkToggle],
      html: '<sk-toggle disabled></sk-toggle>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skChange', handler);

    const button = page.root?.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();
    await page.waitForChanges();

    expect(page.root?.checked).toBe(false);
    expect(handler).not.toHaveBeenCalled();
  });

  it('uses fallback aria-label when no label is provided', async () => {
    const page = await newSpecPage({
      components: [SkToggle],
      html: '<sk-toggle checked></sk-toggle>',
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('Switch to light mode');
  });
});