import { h, render } from '@stencil/vitest';
import { describe, expect, it } from 'vitest';

describe('sk-caption', () => {
  it('renders caption text', async () => {
    const { root } = await render(<sk-caption>Fig. 01 - Osaka, 1970</sk-caption>);

    const caption = root.shadowRoot?.querySelector('p');
    expect(caption?.className).toContain('caption');
    expect(root.textContent).toContain('Fig. 01 - Osaka, 1970');
  });

  it('applies center alignment', async () => {
    const { root } = await render(<sk-caption align="center">Centered caption</sk-caption>);

    expect(root.shadowRoot?.querySelector('p')?.className).toContain('align-center');
  });
});