import { h, render } from '@stencil/vitest';
import { describe, expect, it } from 'vitest';

describe('sk-heading', () => {
  it('renders medium heading by default', async () => {
    const { root } = await render(<sk-heading>Spatial Memory</sk-heading>);

    const heading = root.shadowRoot?.querySelector('h2');
    expect(heading?.className).toContain('heading-md');
    expect(root.textContent).toContain('Spatial Memory');
  });

  it('renders display size as h1', async () => {
    const { root } = await render(<sk-heading size="display">Graphic Form</sk-heading>);

    expect(root.shadowRoot?.querySelector('h1')?.className).toContain('heading-display');
  });

  it('applies center alignment', async () => {
    const { root } = await render(<sk-heading align="center">Centered</sk-heading>);

    expect(root.shadowRoot?.querySelector('h2')?.className).toContain('align-center');
  });
});