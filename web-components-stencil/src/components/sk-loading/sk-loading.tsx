import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-loading',
  styleUrl: './sk-loading.css',
  shadow: true,
})
export class SkLoading {
  @Prop({ reflect: true }) size: 14 | 20 | 28 | 40 = 40;
  @Prop() label = '';

  render() {
    return (
      <Host>
        <div class={{ spinner: true, [`size-${this.size}`]: true }} role="status" aria-label={this.label || 'Loading'}>
          <svg viewBox="0 0 40 40" class="spinner-svg">
            <circle class="spinner-track" cx="20" cy="20" r="18" />
            <circle class="spinner-circle" cx="20" cy="20" r="18" />
          </svg>
        </div>
        {this.label ? <sk-caption class="label">{this.label}</sk-caption> : null}
      </Host>
    );
  }
}
