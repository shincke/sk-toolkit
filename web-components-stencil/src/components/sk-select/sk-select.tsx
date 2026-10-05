import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-select',
  styleUrl: './sk-select.css',
  shadow: true,
})
export class SkSelect {
  @Prop() options: string[] | string = [];
  @Prop({ mutable: true, reflect: true }) value: string | null = null;
  @Prop() label = '';
  @Prop() placeholder = 'Select...';
  @Prop({ reflect: true }) disabled = false;
  @Prop({ attribute: 'aria-label' }) accessibleLabel?: string;

  @Event() skChange!: EventEmitter<string | null>;

  private getNormalizedOptions(): string[] {
    if (Array.isArray(this.options)) {
      return this.options;
    }

    if (typeof this.options !== 'string' || this.options.trim() === '') {
      return [];
    }

    try {
      const parsed = JSON.parse(this.options);
      return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : [];
    } catch {
      return this.options
        .split(',')
        .map((option) => option.trim())
        .filter(Boolean);
    }
  }

  private handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    this.value = target.value || null;
    this.skChange.emit(this.value);
  };

  private getAccessibleLabel() {
    return this.accessibleLabel || this.label || this.placeholder;
  }

  render() {
    const normalizedOptions = this.getNormalizedOptions();
    const selectedValue = this.value ?? '';

    return (
      <Host>
        <label class={{ wrapper: true, 'is-disabled': this.disabled }}>
          {this.label ? <sk-caption class="label">{this.label}</sk-caption> : null}

          <span class="field">
            <select
              class="select"
              disabled={this.disabled}
              aria-label={this.getAccessibleLabel()}
              onInput={this.handleChange}
              onChange={this.handleChange}
            >
              <option value="" disabled selected={selectedValue === ''}>
                {this.placeholder}
              </option>
              {normalizedOptions.map((option) => (
                <option value={option} selected={selectedValue === option}>
                  {option}
                </option>
              ))}
            </select>

            <span class="icon" aria-hidden="true">
              <sk-icon name="chevron" dir="down" size={18} aria-label={undefined} />
            </span>
          </span>
        </label>
      </Host>
    );
  }
}