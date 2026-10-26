import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import { TAG_COLOR_DEFAULT, TAG_INTERACTIVE_DEFAULT, TAG_SIZE_DEFAULT, TAG_VARIANT_DEFAULT, type TagColor, type TagSize, type TagVariant } from './sk-tag.types';

/**
 * <sk-tag> is a small label for quick recognition and navigation.
 * Status and filled variants are used for static and non-interactive tags.
 * Interactive is the only clickable variant and can be used for filtering and performing actions.
 * If variant is interactive, checkbox and radio attr will work, otherwise they will be ignored.
 *
 * @slot text - Optional content used when the label prop is not provided
 * @slot icon - Optional leading icon content
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
  @Prop({ reflect: true }) checkbox = false;
  @Prop({ reflect: true }) radio = false;
  @Prop({ reflect: true, mutable: true }) checked = false;
  @Prop() label = '';
  @Prop() disabled = false;
  @Prop({ reflect: true }) href?: string;
  @Prop({ reflect: true }) external = false;
  @Prop() ariaLabel?: string;

  @Event() skClick!: EventEmitter<MouseEvent | KeyboardEvent>;
  @Event() skChange!: EventEmitter<boolean>;

  private emitChange = () => {
    if (this.isToggleInteraction) {
      this.skChange.emit(this.checked);
    }
  };

  private get hasIconSlot(): boolean {
    return Boolean(this.hostEl?.querySelector('[slot="icon"]'));
  }

  private get hasTextContent(): boolean {
    const text = this.label?.trim() || this.hostEl?.textContent?.trim() || '';
    return text.length > 0;
  }

  private get isInteractiveVariant(): boolean {
    return this.variant === TAG_INTERACTIVE_DEFAULT;
  }

  private get isLinkInteraction(): boolean {
    return this.isInteractiveVariant && Boolean(this.href);
  }

  private get isCheckboxInteraction(): boolean {
    return this.isInteractiveVariant && this.checkbox;
  }

  private get isRadioInteraction(): boolean {
    return this.isInteractiveVariant && this.radio;
  }

  private get tagRole(): 'button' | 'checkbox' | 'radio' | undefined {
    if (this.isCheckboxInteraction) return 'checkbox';
    if (this.isRadioInteraction) return 'radio';
    if (this.isLinkInteraction) return undefined;
    return 'button';
  }

  private get isToggleInteraction(): boolean {
    return this.isCheckboxInteraction || this.isRadioInteraction;
  }

  private get tagClassNames() {
    return {
      tag: true,
      'is-interactive': this.isInteractiveVariant,
      'is-checked': this.checked,
      'is-link': this.isLinkInteraction,
      'is-checkbox': this.isCheckboxInteraction,
      'is-radio': this.isRadioInteraction,
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true,
      [`color-${this.color}`]: true,
    };
  }

  private handleClick = (event: MouseEvent | KeyboardEvent) => {
    if (!this.isInteractiveVariant || this.disabled) {
      return;
    }

    if (this.isCheckboxInteraction || this.isRadioInteraction) {
      this.checked = !this.checked;
      this.emitChange();
    }

    if (this.isRadioInteraction) {
      this.checked = true;
      this.emitChange();
    }

    this.skClick.emit(event);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.isInteractiveVariant || this.disabled) {
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.handleClick(event);
  };

  private renderContent() {
    return (
      <span class="content">
        {this.hasIconSlot && (
          <span class="icon">
            <slot name="icon" />
          </span>
        )}
        {this.hasTextContent && (
          <span class="label">
            <sk-caption>{this.label ? this.label : <slot />}</sk-caption>
          </span>
        )}
      </span>
    );
  }

  render(): JSX.Element {
    const content = this.renderContent();

    if (!this.isInteractiveVariant) {
      return (
        <Host>
          <span class={this.tagClassNames} role="status">
            {content}
          </span>
        </Host>
      );
    }

    if (this.isLinkInteraction) {
      return (
        <Host>
          <a
            class={this.tagClassNames}
            href={this.href}
            target={this.external ? '_blank' : undefined}
            rel={this.external ? 'noopener noreferrer' : undefined}
            aria-label={this.ariaLabel?.trim() || this.label?.trim() || 'Tag'}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
          >
            {content}
          </a>
        </Host>
      );
    }

    return (
      <Host>
        <button
          class={this.tagClassNames}
          type="button"
          role={this.tagRole}
          aria-label={this.ariaLabel?.trim() || this.label?.trim() || 'Tag'}
          aria-pressed={this.isToggleInteraction ? undefined : this.checked ? 'true' : 'false'}
          aria-checked={this.isToggleInteraction ? (this.checked ? 'true' : 'false') : undefined}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          disabled={this.disabled}
        >
          {content}
        </button>
      </Host>
    );
  }
}