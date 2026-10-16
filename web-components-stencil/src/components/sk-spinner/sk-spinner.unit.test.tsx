import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it } from 'vitest';

import { SkSpinner } from './sk-spinner';

describe('sk-spinner', () => {
  it('renders with default size m', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner></sk-spinner>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-md')).toBe(true);
    expect(page.root?.getAttribute('size')).toBe('md');
  });

  it('renders with size sm', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner size="sm"></sk-spinner>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-sm')).toBe(true);
  });

  it('renders with size md', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner size="md"></sk-spinner>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-m')).toBe(true);
  });

  it('renders with size lg', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner size="lg"></sk-spinner>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-lg')).toBe(true);
  });

  it('renders with size xl', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner size="xl"></sk-spinner>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('size-xl')).toBe(true);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner label="Loading data..."></sk-spinner>',
    });

    const label = page.root?.shadowRoot?.querySelector('.label');
    expect(label?.textContent).toBe('Loading data...');
  });

  it('renders without label when not provided', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner></sk-spinner>',
    });

    const label = page.root?.shadowRoot?.querySelector('.label');
    expect(label).toBeNull();
  });

  it('has proper aria attributes', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner label="Processing"></sk-spinner>',
    });

    const spinnerDiv = page.root?.shadowRoot?.querySelector('[role="status"]');
    expect(spinnerDiv?.getAttribute('aria-label')).toBe('Processing');
  });

  it('uses default aria-label when no label provided', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner></sk-spinner>',
    });

    const spinnerDiv = page.root?.shadowRoot?.querySelector('[role="status"]');
    expect(spinnerDiv?.getAttribute('aria-label')).toBe('Loading');
  });

  it('renders SVG circle', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner></sk-spinner>',
    });

    const svg = page.root?.shadowRoot?.querySelector('.spinner-svg');
    const circle = page.root?.shadowRoot?.querySelector('.spinner-circle');
    expect(svg).toBeTruthy();
    expect(circle).toBeTruthy();
  });

  it('reflects paused state', async () => {
    const page = await newSpecPage({
      components: [SkSpinner],
      html: '<sk-spinner paused></sk-spinner>',
    });

    const spinner = page.root?.shadowRoot?.querySelector('.spinner');
    expect(spinner?.classList.contains('is-paused')).toBe(true);
    expect(page.root?.getAttribute('paused')).toBe('');
  });
});
