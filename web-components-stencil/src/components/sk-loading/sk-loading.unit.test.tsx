import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it } from 'vitest';

import { SkLoading } from './sk-loading';

describe('sk-loading', () => {
  it('renders with default size 40', async () => {
    const page = await newSpecPage({
      components: [SkLoading],
      html: '<sk-loading></sk-loading>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-40')).toBe(true);
    expect(page.root?.getAttribute('size')).toBe('40');
  });

  it('renders with size 14', async () => {
    const page = await newSpecPage({
      components: [SkLoading],
      html: '<sk-loading size="14"></sk-loading>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-14')).toBe(true);
  });

  it('renders with size 20', async () => {
    const page = await newSpecPage({
      components: [SkLoading],
      html: '<sk-loading size="20"></sk-loading>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-20')).toBe(true);
  });

  it('renders with size 28', async () => {
    const page = await newSpecPage({
      components: [SkLoading],
      html: '<sk-loading size="28"></sk-loading>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-28')).toBe(true);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [SkLoading],
      html: '<sk-loading label="Loading data..."></sk-loading>',
    });

    const label = page.root?.shadowRoot?.querySelector('.label');
    expect(label?.textContent).toBe('Loading data...');
  });

  it('renders without label when not provided', async () => {
    const page = await newSpecPage({
      components: [SkLoading],
      html: '<sk-loading></sk-loading>',
    });

    const label = page.root?.shadowRoot?.querySelector('.label');
    expect(label).toBeNull();
  });

  it('has proper aria attributes', async () => {
    const page = await newSpecPage({
      components: [SkLoading],
      html: '<sk-loading label="Processing"></sk-loading>',
    });

    const spinnerDiv = page.root?.shadowRoot?.querySelector('[role="status"]');
    expect(spinnerDiv?.getAttribute('aria-label')).toBe('Processing');
  });

  it('uses default aria-label when no label provided', async () => {
    const page = await newSpecPage({
      components: [SkLoading],
      html: '<sk-loading></sk-loading>',
    });

    const spinnerDiv = page.root?.shadowRoot?.querySelector('[role="status"]');
    expect(spinnerDiv?.getAttribute('aria-label')).toBe('Loading');
  });

  it('renders SVG circle', async () => {
    const page = await newSpecPage({
      components: [SkLoading],
      html: '<sk-loading></sk-loading>',
    });

    const svg = page.root?.shadowRoot?.querySelector('.spinner-svg');
    const circle = page.root?.shadowRoot?.querySelector('.spinner-circle');
    expect(svg).toBeTruthy();
    expect(circle).toBeTruthy();
  });
});
