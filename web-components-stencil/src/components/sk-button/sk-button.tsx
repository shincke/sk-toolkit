import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { ButtonSize, ButtonVariant, ButtonType } from './sk-button.types';

/**
 * sk-button triggers an action with a single click or tap and acts as a clear call to action.
 * Variants express a hierarchy of importance so users can quickly identify the main, alternative, supplementary, and destructive actions on a page.
 * It can be used as a button or as a link, depending on whether the `href` property is set.
 *
 * @slot Text content placed within button
 * @slot iconLeft - Optional leading icon content
 * @part button - The button or anchor element rendered within the component
 * @slot iconRight - Optional trailing icon content
 */
@Component({
  tag: 'sk-button',
  styleUrl: './sk-button.css',
  shadow: true,
})
export class SkButton {
  @Prop({ reflect: true }) variant: ButtonVariant = 'primary';
  @Prop({ reflect: true }) size: ButtonSize = 'md';
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) loading = false;
  @Prop({ reflect: true, attribute: 'full-width' }) fullWidth = false;
  @Prop({ reflect: true, attribute: 'icon-only' }) iconOnly = false;
  @Prop({ reflect: true, attribute: 'focusable-when-disabled' }) focusableWhenDisabled = false;
  @Prop({ reflect: true }) pressed?: boolean;

  // The type of the button. This is only relevant when the button is rendered as a <button> element. When the button is rendered as an <a> element, this property has no effect.
  @Prop() type: ButtonType = 'button';
  // The href of the button. If this property is set, the button will be rendered as an <a> element instead of a <button> element.
  @Prop() href?: string;
  // Can be used in combination with `href` property
  @Prop() download?: string;
  // Can be used in combination with `href` property
  @Prop() rel?: string;
  // Can be used in combination with `href` property
  @Prop() target?: string;
  @Prop({ attribute: 'aria-label' }) accessibleLabel?: string;

  @Event() skClick!: EventEmitter<MouseEvent | KeyboardEvent>;
  @Event() skFocus!: EventEmitter<void>;
  @Event() skBlur!: EventEmitter<void>;

  @State() private isActive = false;

  private controlEl?: HTMLAnchorElement | HTMLButtonElement;

  private bindControl = (el?: HTMLAnchorElement | HTMLButtonElement) => {
    this.controlEl = el;
  };

  private handleClick = (event: MouseEvent) => {
    if (this.isInteractionBlocked()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.skClick.emit(event);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== ' ' && event.key !== 'Spacebar') {
      return;
    }

    if (!this.shouldRenderAnchor() && !this.isFocusableDisabled()) {
      return;
    }

    event.preventDefault();
    this.isActive = true;
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key !== ' ' && event.key !== 'Spacebar') {
      return;
    }

    if (this.shouldRenderAnchor()) {
      event.preventDefault();
      this.isActive = false;
      this.controlEl?.click();
      return;
    }

    if (this.isFocusableDisabled()) {
      event.preventDefault();
      this.isActive = false;
    }
  };

  private handleFocus = () => {
    this.skFocus.emit();
  };

  private handleBlur = () => {
    this.isActive = false;
    this.skBlur.emit();
  };

  render() {
    const isDisabled = this.isDisabled();
    const accessibleLabel = this.getAccessibleLabel();
    const controlClass = {
      button: true,
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true,
      'is-active': this.isActive,
      'is-disabled': this.isFocusableDisabled(),
      'is-loading': this.loading,
      'is-full-width': this.fullWidth,
      'is-icon-only': this.iconOnly,
      'is-pressed': this.pressed === true,
    };

    return (
      <Host>
        {this.shouldRenderAnchor() ? (
          <a
            ref={this.bindControl}
            class={controlClass}
            href={this.href}
            download={this.download}
            rel={this.rel}
            target={this.target}
            aria-label={accessibleLabel}
            aria-pressed={this.pressed === undefined ? undefined : this.pressed ? 'true' : 'false'}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            part="button"
          >
            {this.renderContent()}
          </a>
        ) : (
          <button
            ref={this.bindControl}
            class={controlClass}
            type={this.type}
            disabled={isDisabled && !this.isFocusableDisabled()}
            tabIndex={this.isFocusableDisabled() ? 0 : undefined}
            aria-busy={this.loading ? 'true' : 'false'}
            aria-disabled={this.isFocusableDisabled() ? 'true' : undefined}
            aria-label={accessibleLabel}
            aria-pressed={this.pressed === undefined ? undefined : this.pressed ? 'true' : 'false'}
            onClick={this.handleClick}
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            part="button"
          >
            {this.renderContent()}
          </button>
        )}
      </Host>
    );
  }

  private renderContent() {
    return [
      <span class="content">
        <span class="icon icon-left">
          <slot name="iconLeft" />
        </span>

        {!this.iconOnly ? (
          <span class="label">
            <slot />
          </span>
        ) : null}

        <span class="icon icon-right">
          <slot name="iconRight" />
        </span>
      </span>,
      this.loading ? <sk-loading size={this.getLoadingSize()} aria-hidden="true" /> : null,
    ];
  }

  private getAccessibleLabel() {
    if (this.accessibleLabel) {
      return this.accessibleLabel;
    }

    if (this.iconOnly) {
      return 'Button';
    }

    return undefined;
  }

  private shouldRenderAnchor() {
    return Boolean(this.href) && !this.isDisabled();
  }

  private isDisabled() {
    return this.disabled || this.loading;
  }

  private isInteractionBlocked() {
    return this.isDisabled();
  }

  private isFocusableDisabled() {
    return this.disabled && this.focusableWhenDisabled && !this.loading;
  }

  private getLoadingSize(): 14 | 20 | 28 {
    switch (this.size) {
      case 'sm':
        return 14;
      case 'md':
        return 20;
      case 'lg':
        return 28;
      default:
        return 20;
    }
  }
}