import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { SkSelect } from './sk-select';

describe('sk-select', () => {
  it('renders label and placeholder', async () => {
    const page = await newSpecPage({
      components: [SkSelect],
      html: '<sk-select label="City" placeholder="Choose city"></sk-select>',
    });

    expect(page.root?.shadowRoot?.querySelector('sk-caption')?.textContent).toBe('City');
    expect(page.root?.shadowRoot?.querySelector('select option')?.textContent).toBe('Choose city');
  });

  it('parses options from JSON attribute string', async () => {
    const page = await newSpecPage({
      components: [SkSelect],
      html: '<sk-select options="[&quot;Tokyo&quot;,&quot;Osaka&quot;]"></sk-select>',
    });

    const options = page.root?.shadowRoot?.querySelectorAll('option');
    expect(options?.length).toBe(3);
    expect(options?.[1].getAttribute('value')).toBe('Tokyo');
  });

  it('reflects disabled state', async () => {
    const page = await newSpecPage({
      components: [SkSelect],
      html: '<sk-select disabled></sk-select>',
    });

    expect(page.root?.shadowRoot?.querySelector('select')?.disabled).toBe(true);
  });

  it('emits skChange and updates value on selection', async () => {
    const page = await newSpecPage({
      components: [SkSelect],
      html: '<sk-select options="Tokyo,Osaka"></sk-select>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skChange', (event: Event) => {
      handler((event as CustomEvent<string | null>).detail);
    });

    const select = page.root?.shadowRoot?.querySelector('select') as HTMLSelectElement;
    select.value = 'Osaka';
    select.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(page.root?.value).toBe('Osaka');
    expect(handler).toHaveBeenCalledWith('Osaka');
  });
});