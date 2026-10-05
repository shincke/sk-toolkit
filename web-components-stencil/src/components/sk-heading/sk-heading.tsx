import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-heading',
  styleUrl: './sk-heading.css',
  shadow: true,
})
export class SkHeading {
  @Prop({ reflect: true }) size: 'display' | 'lg' | 'md' | 'sm' = 'md';
  @Prop({ reflect: true }) align: 'left' | 'center' = 'left';

  private renderTag() {
    const className = `heading heading-${this.size} align-${this.align}`;

    switch (this.size) {
      case 'display':
      case 'lg':
        return (
          <h1 class={className}>
            <slot />
          </h1>
        );
      case 'md':
        return (
          <h2 class={className}>
            <slot />
          </h2>
        );
      case 'sm':
      default:
        return (
          <h3 class={className}>
            <slot />
          </h3>
        );
    }
  }

  render() {
    return <Host>{this.renderTag()}</Host>;
  }
}