import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it, vi } from 'vitest';

import { SkInput } from './sk-input';

describe('sk-input', () => {
  it('renders with empty value by default', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input></sk-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.value).toBe('');
    expect(page.root?.value).toBe('');
  });

  it('renders with provided value', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input value="test"></sk-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.value).toBe('test');
    expect(page.root?.value).toBe('test');
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input label="Email"></sk-input>',
    });

    const label = page.root?.shadowRoot?.querySelector('.label');
    expect(label?.textContent).toBe('Email');
  });

  it('renders with placeholder', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input placeholder="Enter email"></sk-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.placeholder).toBe('Enter email');
  });

  it('emits skInput event on input', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input></sk-input>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skInput', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      handler(customEvent.detail);
    });

    const input = page.root?.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(handler).toHaveBeenCalledWith('hello');
    expect(page.root?.value).toBe('hello');
  });

  it('emits skChange event on change', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input></sk-input>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skChange', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      handler(customEvent.detail);
    });

    const input = page.root?.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'world';
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(handler).toHaveBeenCalledWith('world');
  });

  it('emits skBlur event on blur', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input value="test"></sk-input>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skBlur', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      handler(customEvent.detail);
    });

    const input = page.root?.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));
    await page.waitForChanges();

    expect(handler).toHaveBeenCalledWith('test');
  });

  it('emits skFocus event on focus', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input value="test"></sk-input>',
    });

    const handler = vi.fn();
    page.root?.addEventListener('skFocus', (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      handler(customEvent.detail);
    });

    const input = page.root?.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    await page.waitForChanges();

    expect(handler).toHaveBeenCalledWith('test');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input disabled></sk-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('renders hint text when provided', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input hint="Must be a valid email"></sk-input>',
    });

    const description = page.root?.shadowRoot?.querySelector('.description');
    expect(description?.textContent).toBe('Must be a valid email');
  });

  it('renders error state with message', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input error="Email is required"></sk-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    const description = page.root?.shadowRoot?.querySelector('.description.error');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(description?.textContent).toBe('Email is required');
  });

  it('renders with different input types', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input type="email"></sk-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('email');
  });

  it('uses custom aria-label when provided', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input aria-label="Custom label"></sk-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-label')).toBe('Custom label');
  });

  it('falls back to label as aria-label', async () => {
    const page = await newSpecPage({
      components: [SkInput],
      html: '<sk-input label="Email address"></sk-input>',
    });

    const input = page.root?.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-label')).toBe('Email address');
  });
});
