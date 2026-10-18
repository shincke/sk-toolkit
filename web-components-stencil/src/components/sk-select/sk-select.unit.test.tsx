import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

describe('sk-select', () => {
  it('renders label and placeholder', async () => {
    const { root } = await render(<sk-select label="City" placeholder="Choose city"></sk-select>);

    expect(root.shadowRoot?.querySelector('sk-caption')?.textContent).toBe('City');
    expect(root.shadowRoot?.querySelector('select option')?.textContent).toBe('Choose city');
  });

  it('parses options from JSON attribute string', async () => {
    const { root } = await render(<sk-select options='["Tokyo","Osaka"]'></sk-select>);

    const options = root.shadowRoot?.querySelectorAll('option');
    expect(options?.length).toBe(3);
    expect(options?.[1].getAttribute('value')).toBe('Tokyo');
  });

  it('reflects disabled state', async () => {
    const { root } = await render(<sk-select disabled></sk-select>);

    expect(root.shadowRoot?.querySelector('select')?.getAttribute('disabled')).toBe('');
  });

  it('emits skChange and updates value on selection', async () => {
    const { root, waitForChanges } = await render(<sk-select options="Tokyo,Osaka"></sk-select>);
    const selectRoot = root as HTMLSkSelectElement;

    const handler = vi.fn();
    root.addEventListener('skChange', (event: Event) => {
      handler((event as CustomEvent<string | null>).detail);
    });

    const select = root.shadowRoot?.querySelector('select') as HTMLSelectElement;
    select.value = 'Osaka';
    select.dispatchEvent(new Event('change'));
    await waitForChanges();

    expect(selectRoot.value).toBe('Osaka');
    expect(handler).toHaveBeenCalledWith('Osaka');
  });
});