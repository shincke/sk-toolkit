import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-caption',
  styleUrl: './sk-caption.css',
  shadow: true,
})
export class SkCaption {
  @Prop({ reflect: true }) align: 'left' | 'center' = 'left';

  render() {
    return (
      <Host>
        <p class={`caption align-${this.align}`}>
          <slot />
        </p>
      </Host>
    );
  }
}