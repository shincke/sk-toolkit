import { Component, Element, h, Host, Prop } from '@stencil/core';
import { SPINNER_SIZE_DEFAULT, type SpinnerSize } from './sk-spinner.types';

/**
 * sk-spinner is used as a sign that something is loading or being processed on a page.
 * 
 * @prop size - The size of the spinner. Can be one of 'sm', 'md', 'lg', or 'xl'. Default is 'md'.
 * @prop label - The accessible label for the spinner.
 * @prop paused - If true, the spinner animation is paused. Default is false.
 */
@Component({
  tag: 'sk-spinner',
  styleUrl: './sk-spinner.css',
  shadow: true,
})
export class SkSpinner {
  @Element() hostEl!: HTMLElement;

  @Prop({ reflect: true }) size: SpinnerSize = SPINNER_SIZE_DEFAULT;
  @Prop() label = '';
  @Prop({ reflect: true }) paused = false;

  private get spinnerLabel(): string {
    return this.label?.trim() || 'Loading';
  }

  render() {
    return (
      <Host>
        <div
          class={{
            spinner: true,
            [`size-${this.size}`]: true,
            'is-paused': this.paused,
          }}
          role="status"
          aria-live="polite"
          aria-label={this.spinnerLabel}
        >
          <svg class="spinner-svg" viewBox="0 0 40 40" aria-hidden="true">
            <circle class="spinner-track" cx="20" cy="20" r="18" />
            <circle class="spinner-circle" cx="20" cy="20" r="18" />
          </svg>
        </div>
        {this.label ? <sk-caption class="label">{this.label}</sk-caption> : null}
      </Host>
    );
  }
}
