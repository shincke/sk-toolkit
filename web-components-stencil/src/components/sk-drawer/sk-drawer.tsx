import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'sk-drawer',
  styleUrl: './sk-drawer.css',
  shadow: true,
})
export class SkDrawer {
  @Element() hostEl!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop({ attribute: 'title' }) drawerTitle = '';
  @Prop() width: number | string = 400;
  @Prop({ reflect: true }) type: 'selection' | 'profile-logged-in' | 'profile-logged-out' = 'selection';
  @Prop({ reflect: true, attribute: 'is-mobile' }) isMobile = false;
  @Prop({ attribute: 'aria-label' }) accessibleLabel?: string;

  @State() isVisible = false;
  @State() isActive = false;

  @Event() skClose!: EventEmitter<void>;

  private previousActiveElement: HTMLElement | null = null;
  private closeTimer?: number;

  componentWillLoad() {
    this.isVisible = this.open;
    this.isActive = this.open;
  }

  @Watch('open')
  handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      if (this.closeTimer) {
        window.clearTimeout(this.closeTimer);
        this.closeTimer = undefined;
      }

      this.isVisible = true;
      this.previousActiveElement = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => {
        this.isActive = true;
        document.body.style.overflow = 'hidden';
        this.focusFirstElement();
      });
      return;
    }

    this.isActive = false;
    document.body.style.overflow = '';

    this.closeTimer = window.setTimeout(() => {
      this.isVisible = false;
      this.previousActiveElement?.focus();
      this.closeTimer = undefined;
    }, 220);
  }

  disconnectedCallback() {
    document.body.style.overflow = '';
    if (this.closeTimer) {
      window.clearTimeout(this.closeTimer);
      this.closeTimer = undefined;
    }
  }

  componentDidLoad() {
    if (this.open) {
      this.handleOpenChange(true);
    }
  }

  private getDrawerWidth(): string {
    if (typeof this.width === 'number') {
      return `${this.width}px`;
    }

    return this.width;
  }

  private emitClose() {
    this.open = false;
    this.skClose.emit();
  }

  private handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      this.emitClose();
    }
  };

  private handleCloseClick = () => {
    this.emitClose();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.emitClose();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  };

  private focusFirstElement() {
    const focusableElements = this.getFocusableElements();
    focusableElements[0]?.focus();
  }

  private trapFocus(event: KeyboardEvent) {
    const focusableElements = this.getFocusableElements();

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement | null;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const selectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const panel = this.hostEl.shadowRoot?.querySelector('.panel');
    if (!panel) {
      return [];
    }

    const shadowFocusable = Array.from(panel.querySelectorAll<HTMLElement>(selectors));
    const slottedFocusable = Array.from(panel.querySelectorAll('slot')).flatMap((slot) =>
      slot
        .assignedElements({ flatten: true })
        .flatMap((element) => [element as HTMLElement, ...Array.from(element.querySelectorAll<HTMLElement>(selectors))]),
    );

    return [...new Set([...shadowFocusable, ...slottedFocusable])].filter((element) => !element.hasAttribute('disabled'));
  }

  private hasHeaderSlot(): boolean {
    return Array.from(this.hostEl.children).some((child) => child.getAttribute('slot') === 'header');
  }

  private hasFooterSlot(): boolean {
    return Array.from(this.hostEl.children).some((child) => child.getAttribute('slot') === 'footer');
  }

  private getAccessibleLabel(): string {
    return this.accessibleLabel || this.drawerTitle || 'Drawer';
  }

  render() {
    const widthStyle = this.isMobile ? '100vw' : this.getDrawerWidth();
    const hasFooterSlot = this.hasFooterSlot();

    return (
      <Host>
        {this.isVisible ? (
          <div class={{ backdrop: true, 'is-open': this.isActive }} onClick={this.handleBackdropClick}>
            <aside
              class={{ panel: true, [`type-${this.type}`]: true, 'is-mobile': this.isMobile, 'is-open': this.isActive }}
              style={{ width: widthStyle }}
              role="dialog"
              aria-modal="true"
              aria-label={this.getAccessibleLabel()}
              onKeyDown={this.handleKeyDown}
            >
              <div class="header">
                {this.hasHeaderSlot() ? (
                  <slot name="header" />
                ) : (
                  <>
                    <div class="title">{this.drawerTitle}</div>
                    <button class="close-button" type="button" aria-label="Close drawer" onClick={this.handleCloseClick}>
                      <sk-icon name="close" size={20} aria-label={undefined} />
                    </button>
                  </>
                )}
              </div>

              <div class="body">
                <slot />
              </div>

              {hasFooterSlot ? (
                <div class="footer">
                  <slot name="footer" />
                </div>
              ) : null}
            </aside>
          </div>
        ) : null}
      </Host>
    );
  }
}