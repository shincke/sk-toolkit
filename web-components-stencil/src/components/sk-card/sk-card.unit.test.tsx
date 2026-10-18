import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

describe('sk-card', () => {
  it('renders default variant title and subtitle', async () => {
    const { root } = await render(<sk-card title="Graphic Form and Spatial Memory" subtitle="Research · 2024"></sk-card>);

    const heading = root.shadowRoot?.querySelector('sk-heading');
    const subtitle = root.shadowRoot?.querySelector('sk-caption');

    expect(heading).toBeTruthy();
    expect(subtitle).toBeTruthy();
    expect(heading?.textContent).toBe('Graphic Form and Spatial Memory');
    expect(subtitle?.textContent).toBe('Research · 2024');
  });

  it('renders body slot content', async () => {
    const { root } = await render(
      <sk-card title="Graphic Form">
        <sk-text size="lg">Body copy</sk-text>
      </sk-card>,
    );

    const body = root.shadowRoot?.querySelector('.body');
    expect(body).toBeTruthy();
    expect(root.textContent).toContain('Body copy');
  });

  it('renders image variant when image-src is provided', async () => {
    const { root } = await render(<sk-card variant="image" title="Graphic Form" image-src="/cover.jpg" image-alt="Cover art"></sk-card>);

    const image = root.shadowRoot?.querySelector('img');
    expect(image?.getAttribute('src')).toBe('/cover.jpg');
    expect(image?.getAttribute('alt')).toBe('Cover art');
  });

  it('renders the image placeholder fallback only in image variant', async () => {
    const { root } = await render(<sk-card variant="image" title="Graphic Form"></sk-card>);

    const placeholder = root.shadowRoot?.querySelector('.image-placeholder');
    expect(placeholder).toBeTruthy();
  });

  it('does not render the image placeholder in default variant', async () => {
    const { root } = await render(<sk-card title="Graphic Form"></sk-card>);

    const placeholder = root.shadowRoot?.querySelector('.image-placeholder');
    expect(placeholder).toBeFalsy();
  });

  it('renders footer slots when provided', async () => {
    const { root } = await render(
      <sk-card title="Graphic Form">
        <span slot="footer-start">Kamekura, Y. - 12 min</span>
        <span slot="footer-end">Read →</span>
      </sk-card>,
    );

    const footer = root.shadowRoot?.querySelector('.footer');
    expect(footer).toBeTruthy();
    expect(root.textContent).toContain('Kamekura, Y. - 12 min');
    expect(root.textContent).toContain('Read →');
  });

  it('reflects selected state for the selected variant', async () => {
    const { root } = await render(<sk-card variant="selected" title="Graphic Form" selected></sk-card>);

    const card = root.shadowRoot?.querySelector('.card');
    const selectionMark = root.shadowRoot?.querySelector('.selection-mark');

    expect(root.getAttribute('selected')).toBe('');
    expect(root.getAttribute('aria-pressed')).toBe('true');
    expect(card?.className).toContain('is-selected');
    expect(selectionMark).toBeTruthy();
  });

  it('keeps the checkbox visible when deselected in selected variant', async () => {
    const { root } = await render(<sk-card variant="selected" title="Graphic Form"></sk-card>);

    const selectionMark = root.shadowRoot?.querySelector('.selection-mark');
    const icon = root.shadowRoot?.querySelector('.selection-mark sk-icon');

    expect(selectionMark).toBeTruthy();
    expect(selectionMark?.classList.contains('is-checked')).toBe(false);
    expect(icon).toBeNull();
  });

  it('toggles selected state on click for selected variant', async () => {
    const { root, waitForChanges } = await render(<sk-card variant="selected" title="Graphic Form"></sk-card>);
    const cardRoot = root as HTMLSkCardElement;

    const card = root.shadowRoot?.querySelector('.card') as HTMLElement;

    expect(cardRoot.selected).toBe(false);

    root.click();
    await waitForChanges();
    expect(cardRoot.selected).toBe(true);
    expect(root.shadowRoot?.querySelector('.selection-mark')?.classList.contains('is-checked')).toBe(true);
    expect(card.className).toContain('is-selected');

    root.click();
    await waitForChanges();
    expect(cardRoot.selected).toBe(false);
    expect(root.shadowRoot?.querySelector('.selection-mark')?.classList.contains('is-checked')).toBe(false);
    expect(card.className).not.toContain('is-selected');
  });

  it('emits skClick on click', async () => {
    const { root, waitForChanges } = await render(<sk-card title="Graphic Form"></sk-card>);

    const handler = vi.fn();
    root.addEventListener('skClick', handler);

    root.click();
    await waitForChanges();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('emits skClick on Enter key', async () => {
    const { root, waitForChanges } = await render(<sk-card title="Graphic Form"></sk-card>);

    const handler = vi.fn();
    root.addEventListener('skClick', handler);

    const cardInstance = (root as any).__stencil__getHostRef().$lazyInstance$;
    const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    cardInstance.handleKeyDown(event);
    await waitForChanges();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('uses title as fallback accessible label', async () => {
    const { root } = await render(<sk-card title="Graphic Form"></sk-card>);

    expect(root.getAttribute('role')).toBe('button');
    expect(root.getAttribute('tabindex')).toBe('0');
    expect(root.getAttribute('aria-label')).toBe('Graphic Form');
  });
});