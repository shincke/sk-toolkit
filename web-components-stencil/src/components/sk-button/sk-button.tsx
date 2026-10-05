import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-button',
  styleUrl: './sk-button.css',
  shadow: true,
})
export class SkButton {
  @Prop({ reflect: true }) variant: 'primary' | 'secondary' | 'ghost' | 'destructive' = 'primary';
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) loading = false;
  @Prop({ reflect: true, attribute: 'full-width' }) fullWidth = false;
  @Prop({ reflect: true, attribute: 'icon-only' }) iconOnly = false;

  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop({ attribute: 'aria-label' }) accessibleLabel?: string;

  render() {
    const isDisabled = this.disabled || this.loading;

    return (
      <Host>
        <button
          class={{
            button: true,
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
            'is-loading': this.loading,
            'is-full-width': this.fullWidth,
            'is-icon-only': this.iconOnly,
          }}
          type={this.type}
          disabled={isDisabled}
          aria-busy={this.loading ? 'true' : 'false'}
          aria-label={this.accessibleLabel}
        >
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
          </span>

          {this.loading ? <sk-loading size={this.getLoadingSize()} aria-hidden="true" /> : null}
        </button>
      </Host>
    );
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