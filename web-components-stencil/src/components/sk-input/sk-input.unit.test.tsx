import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

describe('sk-input', () => {
  it('renders with empty value by default', async () => {
    const { root } = await render(<sk-input></sk-input>);
    const inputRoot = root as HTMLSkInputElement;

    const input = root.shadowRoot?.querySelector('input');
    expect(input?.value).toBe('');
    expect(inputRoot.value).toBe('');
  });

  it('renders with provided value', async () => {
    const { root } = await render(<sk-input value="test"></sk-input>);
    const inputRoot = root as HTMLSkInputElement;

    const input = root.shadowRoot?.querySelector('input');
    expect(input?.value).toBe('test');
    expect(inputRoot.value).toBe('test');
  });

  it('renders with label', async () => {
    const { root } = await render(<sk-input label="Email"></sk-input>);

    const label = root.shadowRoot?.querySelector('.label');
    expect(label?.textContent).toBe('Email');
  });

  it('renders with placeholder', async () => {
    const { root } = await render(<sk-input placeholder="Enter email"></sk-input>);

    const input = root.shadowRoot?.querySelector('input');
    expect(input?.placeholder).toBe('Enter email');
  });

  it('emits skInput event on input', async () => {
    const { root, waitForChanges } = await render(<sk-input></sk-input>);
    const inputRoot = root as HTMLSkInputElement;

    const handler = vi.fn();
    root.addEventListener('skInput', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      handler(customEvent.detail);
    });

    const input = root.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    await waitForChanges();

    expect(handler).toHaveBeenCalledWith('hello');
    expect(inputRoot.value).toBe('hello');
  });

  it('emits skChange event on change', async () => {
    const { root, waitForChanges } = await render(<sk-input></sk-input>);

    const handler = vi.fn();
    root.addEventListener('skChange', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      handler(customEvent.detail);
    });

    const input = root.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'world';
    input.dispatchEvent(new Event('change'));
    await waitForChanges();

    expect(handler).toHaveBeenCalledWith('world');
  });

  it('emits skBlur event on blur', async () => {
    const { root, waitForChanges } = await render(<sk-input value="test"></sk-input>);

    const handler = vi.fn();
    root.addEventListener('skBlur', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      handler(customEvent.detail);
    });

    const input = root.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));
    await waitForChanges();

    expect(handler).toHaveBeenCalledWith('test');
  });

  it('emits skFocus event on focus', async () => {
    const { root, waitForChanges } = await render(<sk-input value="test"></sk-input>);

    const handler = vi.fn();
    root.addEventListener('skFocus', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      handler(customEvent.detail);
    });

    const input = root.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    await waitForChanges();

    expect(handler).toHaveBeenCalledWith('test');
  });

  it('renders disabled state', async () => {
    const { root } = await render(<sk-input disabled></sk-input>);

    const input = root.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('renders hint text when provided', async () => {
    const { root } = await render(<sk-input hint="Must be a valid email"></sk-input>);

    const description = root.shadowRoot?.querySelector('.description');
    expect(description?.textContent).toBe('Must be a valid email');
  });

  it('renders error state with message', async () => {
    const { root } = await render(<sk-input error="Email is required"></sk-input>);

    const input = root.shadowRoot?.querySelector('input');
    const description = root.shadowRoot?.querySelector('.description.error');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(description?.textContent).toBe('Email is required');
  });

  it('renders with different input types', async () => {
    const { root } = await render(<sk-input type="email"></sk-input>);

    const input = root.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('email');
  });

  it('uses custom aria-label when provided', async () => {
    const { root } = await render(<sk-input aria-label="Custom label"></sk-input>);

    const input = root.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-label')).toBe('Custom label');
  });

  it('falls back to label as aria-label', async () => {
    const { root } = await render(<sk-input label="Email address"></sk-input>);

    const input = root.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-label')).toBe('Email address');
  });
});
