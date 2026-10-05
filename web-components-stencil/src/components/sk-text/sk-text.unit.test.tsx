import { newSpecPage } from '@stencil/core/testing';
import { describe, expect, it } from 'vitest';

import { SkText } from './sk-text';

describe('sk-text', () => {
  it('renders medium text by default', async () => {
    const page = await newSpecPage({
      components: [SkText],
      html: '<sk-text>Body copy</sk-text>',
    });

    const text = page.root?.shadowRoot?.querySelector('p');
    expect(text?.className).toContain('text-md');
    expect(text?.textContent).toBe('Body copy');
  });

  it('renders large text variant', async () => {
    const page = await newSpecPage({
      components: [SkText],
      html: '<sk-text size="lg">Lead copy</sk-text>',
    });

    expect(page.root?.shadowRoot?.querySelector('p')?.className).toContain('text-lg');
  });

  it('applies center alignment', async () => {
    const page = await newSpecPage({
      components: [SkText],
      html: '<sk-text align="center">Centered text</sk-text>',
    });

    expect(page.root?.shadowRoot?.querySelector('p')?.className).toContain('align-center');
  });
});