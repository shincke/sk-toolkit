import { h, render } from '@stencil/vitest';
import { describe, expect, it } from 'vitest';

describe('sk-text', () => {
  it('renders medium text by default', async () => {
    const { root } = await render(<sk-text>Body copy</sk-text>);

    const text = root.shadowRoot?.querySelector('p');
    expect(text?.className).toContain('text-md');
    expect(root.textContent).toContain('Body copy');
  });

  it('renders large text variant', async () => {
    const { root } = await render(<sk-text size="lg">Lead copy</sk-text>);

    expect(root.shadowRoot?.querySelector('p')?.className).toContain('text-lg');
  });

  it('applies center alignment', async () => {
    const { root } = await render(<sk-text align="center">Centered text</sk-text>);

    expect(root.shadowRoot?.querySelector('p')?.className).toContain('align-center');
  });
});