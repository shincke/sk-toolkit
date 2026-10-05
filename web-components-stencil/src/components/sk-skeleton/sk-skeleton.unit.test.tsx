import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it } from 'vitest';

import { SkSkeleton } from './sk-skeleton';

describe('sk-skeleton', () => {
  it('renders with default text-block variant', async () => {
    const page = await newSpecPage({
      components: [SkSkeleton],
      html: '<sk-skeleton></sk-skeleton>',
    });

    const container = page.root?.shadowRoot?.querySelector('.variant-text-block');
    expect(container).toBeTruthy();
  });

  it('renders with grid variant', async () => {
    const page = await newSpecPage({
      components: [SkSkeleton],
      html: '<sk-skeleton variant="grid"></sk-skeleton>',
    });

    const container = page.root?.shadowRoot?.querySelector('.variant-grid');
    expect(container).toBeTruthy();
    expect(page.root?.getAttribute('variant')).toBe('grid');

    const cards = page.root?.shadowRoot?.querySelectorAll('.grid-card');
    expect(cards?.length).toBe(1);
  });

  it('renders with list variant', async () => {
    const page = await newSpecPage({
      components: [SkSkeleton],
      html: '<sk-skeleton variant="list"></sk-skeleton>',
    });

    const container = page.root?.shadowRoot?.querySelector('.variant-list');
    expect(container).toBeTruthy();
    expect(page.root?.getAttribute('variant')).toBe('list');

    const items = page.root?.shadowRoot?.querySelectorAll('.list-item');
    expect(items?.length).toBe(1);
  });

  it('supports custom width', async () => {
    const page = await newSpecPage({
      components: [SkSkeleton],
      html: '<sk-skeleton variant="grid" width="320px"></sk-skeleton>',
    });

    const container = page.root?.shadowRoot?.querySelector('.variant-grid');
    expect(container?.getAttribute('style')).toContain('width: 320px');
  });

  it('renders with text-block variant', async () => {
    const page = await newSpecPage({
      components: [SkSkeleton],
      html: '<sk-skeleton variant="text-block"></sk-skeleton>',
    });

    const container = page.root?.shadowRoot?.querySelector('.variant-text-block');
    expect(container).toBeTruthy();
    expect(page.root?.getAttribute('variant')).toBe('text-block');
  });

  it('has proper accessibility attributes', async () => {
    const page = await newSpecPage({
      components: [SkSkeleton],
      html: '<sk-skeleton></sk-skeleton>',
    });

    const container = page.root?.shadowRoot?.querySelector('[role="status"]');
    expect(container?.getAttribute('role')).toBe('status');
    expect(container?.getAttribute('aria-busy')).toBe('true');
    expect(container?.getAttribute('aria-label')).toBe('Loading content');
  });

  it('grid variant renders correct structure', async () => {
    const page = await newSpecPage({
      components: [SkSkeleton],
      html: '<sk-skeleton variant="grid"></sk-skeleton>',
    });

    const images = page.root?.shadowRoot?.querySelectorAll('.grid-image');
    const content = page.root?.shadowRoot?.querySelectorAll('.grid-content');
    
    expect(images?.length).toBe(1);
    expect(content?.length).toBe(1);
  });

  it('list variant renders correct structure', async () => {
    const page = await newSpecPage({
      components: [SkSkeleton],
      html: '<sk-skeleton variant="list"></sk-skeleton>',
    });

    const avatars = page.root?.shadowRoot?.querySelectorAll('.list-avatar');
    const footers = page.root?.shadowRoot?.querySelectorAll('.list-footer');
    
    expect(avatars?.length).toBe(1);
    expect(footers?.length).toBe(1);
  });

  it('text-block variant renders correct structure', async () => {
    const page = await newSpecPage({
      components: [SkSkeleton],
      html: '<sk-skeleton variant="text-block"></sk-skeleton>',
    });

    const lines = page.root?.shadowRoot?.querySelectorAll('.text-line');
    const boxes = page.root?.shadowRoot?.querySelectorAll('.text-box');
    
    expect(lines?.length).toBe(4);
    expect(boxes?.length).toBe(2);
  });
});
