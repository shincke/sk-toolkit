import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-text',
  styleUrl: './sk-text.css',
  shadow: true,
})
export class SkText {
  @Prop({ reflect: true }) size: 'lg' | 'md' | 'sm' = 'md';
  @Prop({ reflect: true }) align: 'left' | 'center' = 'left';

  render() {
    return (
      <Host>
        <p class={`text text-${this.size} align-${this.align}`}>
          <slot />
        </p>
      </Host>
    );
  }
}