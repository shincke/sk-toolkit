import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it } from 'vitest';

import { SkHeading } from './sk-heading';

describe('sk-heading', () => {
  it('renders medium heading by default', async () => {
    const page = await newSpecPage({
      components: [SkHeading],
      html: '<sk-heading>Spatial Memory</sk-heading>',
    });

    const heading = page.root?.shadowRoot?.querySelector('h2');
    expect(heading?.className).toContain('heading-md');
    expect(heading?.textContent).toBe('Spatial Memory');
  });

  it('renders display size as h1', async () => {
    const page = await newSpecPage({
      components: [SkHeading],
      html: '<sk-heading size="display">Graphic Form</sk-heading>',
    });

    expect(page.root?.shadowRoot?.querySelector('h1')?.className).toContain('heading-display');
  });

  it('applies center alignment', async () => {
    const page = await newSpecPage({
      components: [SkHeading],
      html: '<sk-heading align="center">Centered</sk-heading>',
    });

    expect(page.root?.shadowRoot?.querySelector('h2')?.className).toContain('align-center');
  });
});