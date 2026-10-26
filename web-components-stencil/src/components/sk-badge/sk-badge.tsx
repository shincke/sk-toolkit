import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import { BADGE_COLOR_DEFAULT, BADGE_INTERACTIVE_DEFAULT, BADGE_SIZE_DEFAULT, BADGE_VARIANT_DEFAULT, type BadgeColor, type BadgeSize, type BadgeVariant } from './sk-badge.types';

/**
 * sk-badge is a small label for quick recognition and navigation.
 * status and filled variants are used for status labels, static and non-interactive.
 * category is the only clickable variant and can be used for filtering and metadata.
 *
 * @slot - Badge text content used when the label prop is not provided
 */

@Component({
  tag: 'sk-badge',
  styleUrl: './sk-badge.css',
  shadow: true,
})
export class SkBadge {
  @Element() hostEl!: HTMLElement;

  @Prop({ reflect: true }) variant: BadgeVariant = BADGE_VARIANT_DEFAULT;
  @Prop({ reflect: true }) color: BadgeColor = BADGE_COLOR_DEFAULT;
  @Prop({ reflect: true }) size: BadgeSize = BADGE_SIZE_DEFAULT;
  @Prop() label = '';
  @Prop() disabled = false;
  @Prop() ariaLabel = this.label?.trim() || "Badge";

  @Event() skClick!: EventEmitter<MouseEvent | KeyboardEvent>;

  private get isInteractiveVariant(): boolean {
    return this.variant === BADGE_INTERACTIVE_DEFAULT;
  }

  private get badgeClassNames() {
    return {
      badge: true,
      'is-interactive': this.isInteractiveVariant,
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true,
      [`color-${this.color}`]: true,
    };
  }

  private handleClick = (event: MouseEvent | KeyboardEvent) => {
    if (!this.isInteractiveVariant) {
      return;
    }

    this.skClick.emit(event);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.isInteractiveVariant) {
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.handleClick(event);
  };

  render(): JSX.Element {
    const Tag = this.isInteractiveVariant ? 'button' : 'span';

    return (
      <Host>
        <Tag
          class={this.badgeClassNames}
          aria-label={this.ariaLabel}
          {...(this.isInteractiveVariant
            ? {
                type: 'button',
                onClick: this.handleClick,
                onKeyDown: this.handleKeyDown,
              }
            : {
                role: 'status',
              })}
        >
          <sk-caption>{this.label ? this.label : <slot />}</sk-caption>
        </Tag>
      </Host>
    );
  }
}