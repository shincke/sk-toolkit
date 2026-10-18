import { h, render } from '@stencil/vitest';
import { describe, expect, it, vi } from 'vitest';

describe('sk-drawer', () => {
  it('renders nothing when closed', async () => {
    const { root } = await render(<sk-drawer title="Selection"></sk-drawer>);

    expect(root.shadowRoot?.querySelector('.panel')).toBeNull();
  });

  it('renders dialog when open', async () => {
    const { root } = await render(<sk-drawer open title="Selection"></sk-drawer>);

    const panel = root.shadowRoot?.querySelector('.panel');
    expect(panel?.getAttribute('role')).toBe('dialog');
    expect(panel?.getAttribute('aria-modal')).toBe('true');
    expect(panel?.getAttribute('aria-label')).toBe('Selection');
    expect(panel?.className).toContain('is-open');
  });

  it('renders default title and close button in header', async () => {
    const { root } = await render(<sk-drawer open title="Selection"></sk-drawer>);

    const heading = root.shadowRoot?.querySelector('.title');
    const closeButton = root.shadowRoot?.querySelector('.close-button');

    expect(heading?.textContent).toBe('Selection');
    expect(closeButton).toBeTruthy();
  });

  it('supports custom header slot', async () => {
    const { root } = await render(
      <sk-drawer open>
        <div slot="header">Custom header</div>
      </sk-drawer>,
    );

    const heading = root.shadowRoot?.querySelector('sk-heading');
    expect(heading).toBeNull();
    expect(root.shadowRoot?.querySelector('slot[name="header"]')).toBeTruthy();
  });

  it('closes and emits skClose on close button click', async () => {
    const { root, waitForChanges } = await render(<sk-drawer open title="Selection"></sk-drawer>);
    const drawerRoot = root as HTMLSkDrawerElement;

    const handler = vi.fn();
    root.addEventListener('skClose', handler);

    const closeButton = root.shadowRoot?.querySelector('.close-button') as HTMLButtonElement;
    closeButton.click();
    await waitForChanges();

    expect(drawerRoot.open).toBe(false);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape key', async () => {
    const { root, waitForChanges } = await render(<sk-drawer open title="Selection"></sk-drawer>);
    const drawerRoot = root as HTMLSkDrawerElement;

    const handler = vi.fn();
    root.addEventListener('skClose', handler);

    const drawerInstance = (root as any).__stencil__getHostRef().$lazyInstance$;
    const event = { key: 'Escape', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    drawerInstance.handleKeyDown(event);
    await waitForChanges();

    expect(drawerRoot.open).toBe(false);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('uses configured width on desktop', async () => {
    const { root } = await render(<sk-drawer open title="Selection" width={480}></sk-drawer>);

    const panel = root.shadowRoot?.querySelector('.panel');
    expect(panel?.getAttribute('style')).toContain('width: 480px');
  });

  it('uses full viewport width on mobile', async () => {
    const { root } = await render(<sk-drawer open title="Selection" is-mobile></sk-drawer>);

    const panel = root.shadowRoot?.querySelector('.panel');
    expect(panel?.className).toContain('is-mobile');
    expect(panel?.getAttribute('style')).toContain('width: 100vw');
  });
});