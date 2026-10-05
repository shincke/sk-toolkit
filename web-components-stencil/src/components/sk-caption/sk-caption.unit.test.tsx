import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it } from 'vitest';

import { SkCaption } from './sk-caption';

describe('sk-caption', () => {
  it('renders caption text', async () => {
    const page = await newSpecPage({
      components: [SkCaption],
      html: '<sk-caption>Fig. 01 - Osaka, 1970</sk-caption>',
    });

    const caption = page.root?.shadowRoot?.querySelector('p');
    expect(caption?.className).toContain('caption');
    expect(caption?.textContent).toBe('Fig. 01 - Osaka, 1970');
  });

  it('applies center alignment', async () => {
    const page = await newSpecPage({
      components: [SkCaption],
      html: '<sk-caption align="center">Centered caption</sk-caption>',
    });

    expect(page.root?.shadowRoot?.querySelector('p')?.className).toContain('align-center');
  });
});