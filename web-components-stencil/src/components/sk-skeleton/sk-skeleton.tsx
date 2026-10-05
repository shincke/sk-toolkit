import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-skeleton',
  styleUrl: './sk-skeleton.css',
  shadow: true,
})
export class SkSkeleton {
  @Prop() width: string | number = '100%';
  @Prop({ reflect: true }) variant: 'grid' | 'list' | 'text-block' = 'text-block';

  render() {
    const style = {
      width: this.getSize(this.width),
    };

    return (
      <Host>
        <div class={`variant-${this.variant}`} style={style} aria-busy="true" role="status" aria-label="Loading content">
          {this.renderVariant()}
        </div>
      </Host>
    );
  }

  private renderVariant() {
    switch (this.variant) {
      case 'grid':
        return this.renderGridVariant();
      case 'list':
        return this.renderListVariant();
      case 'text-block':
        return this.renderTextBlockVariant();
    }
  }

  private renderGridVariant() {
    return (
      <div class="grid-container">
        <div class="grid-card">
          <div class="grid-image"></div>
          <div class="grid-content">
            <div class="grid-line short"></div>
            <div class="grid-line"></div>
            <div class="grid-footer">
              <div class="grid-line small"></div>
              <div class="grid-line small"></div>
              <div class="grid-line small"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderListVariant() {
    return (
      <div class="list-container">
        <div class="list-item">
          <div class="list-avatar"></div>
          <div class="list-content">
            <div class="list-line long"></div>
            <div class="list-line medium"></div>
            <div class="list-footer">
              <div class="list-line small"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private getSize(value: string | number): string {
    if (typeof value === 'number') {
      return `${value}px`;
    }

    return value;
  }

  private renderTextBlockVariant() {
    return (
      <div class="text-block-container">
        <div class="text-line short"></div>
        <div class="text-line long"></div>
        <div class="text-line extra-long"></div>
        <div class="text-line medium"></div>
        <div class="text-footer">
          <div class="text-box"></div>
          <div class="text-box"></div>
        </div>
      </div>
    );
  }
}
