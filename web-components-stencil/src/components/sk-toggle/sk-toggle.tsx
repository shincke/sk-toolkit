import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-toggle',
  styleUrl: './sk-toggle.css',
  shadow: true,
})
export class SkToggle {
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop() label?: string;
  @Prop({ attribute: 'aria-label' }) ariaLabel?: string;

  @Event() skChange!: EventEmitter<boolean>;

  private handleToggle = () => {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;
    this.skChange.emit(this.checked);
  };

  private getAccessibleLabel() {
    if (this.ariaLabel) {
      return this.ariaLabel;
    }

    if (this.label) {
      return this.label;
    }

    return this.checked ? 'Switch to light mode' : 'Switch to dark mode';
  }

  render() {
    return (
      <Host>
        <button
          class={{
            toggle: true,
            'is-checked': this.checked,
          }}
          type="button"
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          aria-label={this.getAccessibleLabel()}
          disabled={this.disabled}
          onClick={this.handleToggle}
        >
          <span class="track" aria-hidden="true">
            <span class="thumb" />
            <span class="thumb-icon">
              <sk-icon name={this.checked ? 'sun' : 'moon'} size={8} aria-label={undefined} />
            </span>
          </span>

          {this.label ? <span class="label">{this.label}</span> : null}
        </button>
      </Host>
    );
  }
}