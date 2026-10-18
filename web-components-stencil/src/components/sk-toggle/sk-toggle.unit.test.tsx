import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

describe('sk-toggle', () => {
  it('renders unchecked by default', async () => {
    const { root } = await render(<sk-toggle></sk-toggle>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('role')).toBe('switch');
    expect(button?.getAttribute('aria-checked')).toBe('false');
    expect(root.hasAttribute('checked')).toBe(false);
  });

  it('renders label when provided', async () => {
    const { root } = await render(<sk-toggle label="Dark mode"></sk-toggle>);

    const label = root.shadowRoot?.querySelector('.label');
    expect(label?.textContent).toBe('Dark mode');
  });

  it('toggles checked state and emits event on click', async () => {
    const { root, waitForChanges } = await render(<sk-toggle></sk-toggle>);
    const toggleRoot = root as HTMLSkToggleElement;

    const handler = vi.fn();
    root.addEventListener('skChange', (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      handler(customEvent.detail);
    });

    const button = root.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();
    await waitForChanges();

    expect(toggleRoot.checked).toBe(true);
    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(handler).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', async () => {
    const { root, waitForChanges } = await render(<sk-toggle disabled></sk-toggle>);
    const toggleRoot = root as HTMLSkToggleElement;

    const handler = vi.fn();
    root.addEventListener('skChange', handler);

    const button = root.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();
    await waitForChanges();

    expect(toggleRoot.checked).toBe(false);
    expect(handler).not.toHaveBeenCalled();
  });

  it('uses fallback aria-label when no label is provided', async () => {
    const { root } = await render(<sk-toggle checked></sk-toggle>);

    const button = root.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('Switch to light mode');
  });
});