import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { renderImagePlaceholder } from '../../utils/image-placeholder';

@Component({
  tag: 'sk-card',
  styleUrl: './sk-card.css',
  shadow: true,
})
export class SkCard {
  @Element() hostEl!: HTMLElement;

  @Prop({ attribute: 'title' }) cardTitle = '';
  @Prop() subtitle = '';
  @Prop() imageSrc = '';
  @Prop() imageAlt = '';
  @Prop({ reflect: true }) variant: 'default' | 'image' | 'selected' = 'default';
  @Prop({ mutable: true, reflect: true }) selected = false;
  @Prop({ attribute: 'aria-label' }) accessibleLabel?: string;

  @Event() skClick!: EventEmitter<MouseEvent | KeyboardEvent>;

  private handleClick = (event: MouseEvent) => {
    if (this.variant === 'selected') {
      this.selected = !this.selected;
    }

    this.skClick.emit(event);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    if (this.variant === 'selected') {
      this.selected = !this.selected;
    }

    this.skClick.emit(event);
  };

  private hasNamedSlot(name: string): boolean {
    return Array.from(this.hostEl.children).some((child) => child.getAttribute('slot') === name);
  }

  private hasDefaultSlotContent(): boolean {
    return Array.from(this.hostEl.childNodes).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return !(node as HTMLElement).hasAttribute('slot');
      }

      return node.nodeType === Node.TEXT_NODE && (node.textContent?.trim().length ?? 0) > 0;
    });
  }

  private getAccessibleLabel(): string {
    return this.accessibleLabel || this.cardTitle || this.subtitle || 'Card';
  }

  render() {
    const hasBody = this.hasDefaultSlotContent();
    const hasFooter = this.hasNamedSlot('footer-start') || this.hasNamedSlot('footer-end');
    const showMedia = this.variant === 'image';
    const showSelectionMark = this.variant === 'selected';

    return (
      <Host
        role="button"
        tabindex="0"
        aria-label={this.getAccessibleLabel()}
        aria-pressed={this.selected ? 'true' : 'false'}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
      >
        <article
          class={{
            card: true,
            [`variant-${this.variant}`]: true,
            'has-image': showMedia,
            'has-footer': hasFooter,
            'is-selected': this.variant === 'selected' && this.selected,
          }}
        >
          {showSelectionMark ? (
            <div class={{ 'selection-mark': true, 'is-checked': this.selected }} aria-hidden="true">
              {this.selected ? <sk-icon name="check" size={16}></sk-icon> : null}
            </div>
          ) : null}

          {showMedia ? (
            <div class="media-wrap">
              {this.imageSrc ? <img class="media" src={this.imageSrc} alt={this.imageAlt} /> : renderImagePlaceholder()}
            </div>
          ) : null}

          <div class="content">
            {this.subtitle ? <sk-caption class="subtitle">{this.subtitle}</sk-caption> : null}
            {this.cardTitle ? <sk-heading size="lg">{this.cardTitle}</sk-heading> : null}

            {hasBody ? (
              <div class="body">
                <slot />
              </div>
            ) : null}

            {hasFooter ? (
              <div class="footer">
                <div class="footer-start">
                  <slot name="footer-start" />
                </div>
                <div class="footer-end">
                  <slot name="footer-end" />
                </div>
              </div>
            ) : null}
          </div>
        </article>
      </Host>
    );
  }
}