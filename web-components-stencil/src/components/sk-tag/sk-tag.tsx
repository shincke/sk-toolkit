import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import { TAG_COLOR_DEFAULT, TAG_INTERACTIVE_DEFAULT, TAG_SIZE_DEFAULT, TAG_VARIANT_DEFAULT, type TagColor, type TagSize, type TagVariant } from './sk-tag.types';

/**
 * sk-tag is a small label for quick recognition and navigation.
 * status and filled variants are used for static and non-interactive tags.
 * category is the only clickable variant and can be used for filtering and performing actions.
 *
 * @slot - Tag text content used when the label prop is not provided
 */

@Component({
  tag: 'sk-tag',
  styleUrl: './sk-tag.css',
  shadow: true,
})
export class SkTag {
  @Element() hostEl!: HTMLElement;

  @Prop({ reflect: true }) variant: TagVariant = TAG_VARIANT_DEFAULT;
  @Prop({ reflect: true }) color: TagColor = TAG_COLOR_DEFAULT;
  @Prop({ reflect: true }) size: TagSize = TAG_SIZE_DEFAULT;
  @Prop() label = '';
  @Prop() disabled = false;
  @Prop() ariaLabel?: string;

  @Event() skClick!: EventEmitter<MouseEvent | KeyboardEvent>;

  private get resolvedAriaLabel(): string {
    return this.ariaLabel?.trim() || this.label?.trim() || 'Tag';
  }

  private get isInteractiveVariant(): boolean {
    return this.variant === TAG_INTERACTIVE_DEFAULT;
  }

  private get TagClassNames() {
    return {
      tag: true,
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
          class={this.TagClassNames}
          aria-label={this.resolvedAriaLabel}
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