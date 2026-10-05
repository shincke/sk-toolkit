import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-input',
  styleUrl: './sk-input.css',
  shadow: true,
})
export class SkInput {
  @Prop({ mutable: true, reflect: true }) value: string = '';
  @Prop() placeholder = '';
  @Prop({ reflect: true }) disabled = false;
  @Prop() type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' = 'text';
  @Prop() label = '';
  @Prop() hint = '';
  @Prop({ reflect: true }) error: string | boolean = false;
  @Prop({ attribute: 'aria-label' }) accessibleLabel?: string;

  @Event() skChange!: EventEmitter<string>;
  @Event() skInput!: EventEmitter<string>;
  @Event() skBlur!: EventEmitter<string>;
  @Event() skFocus!: EventEmitter<string>;

  private handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.skChange.emit(this.value);
  };

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.skInput.emit(this.value);
  };

  private handleBlur = () => {
    this.skBlur.emit(this.value);
  };

  private handleFocus = () => {
    this.skFocus.emit(this.value);
  };

  private getAccessibleLabel() {
    return this.accessibleLabel || this.label || this.placeholder;
  }

  private getErrorMessage(): string {
    return typeof this.error === 'string' ? this.error : '';
  }

  private hasError(): boolean {
    return this.error === true || (typeof this.error === 'string' && this.error.length > 0);
  }

  render() {
    return (
      <Host>
        <label class={{ wrapper: true, 'is-disabled': this.disabled, 'has-error': this.hasError() }}>
          {this.label ? <sk-caption class="label">{this.label}</sk-caption> : null}

          <input
            class="input"
            type={this.type}
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            aria-label={this.getAccessibleLabel()}
            aria-invalid={this.hasError() ? 'true' : 'false'}
            aria-describedby={this.hint || this.getErrorMessage() ? 'description' : undefined}
            onChange={this.handleChange}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />

          {this.hint || this.getErrorMessage() ? (
            <sk-caption id="description" class={{ description: true, error: this.hasError() }}>
              {this.getErrorMessage() || this.hint}
            </sk-caption>
          ) : null}
        </label>
      </Host>
    );
  }
}
