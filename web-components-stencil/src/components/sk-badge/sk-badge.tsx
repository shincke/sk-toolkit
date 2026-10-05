import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'sk-badge',
  styleUrl: './sk-badge.css',
  shadow: true,
})
export class SkBadge {
  @Prop({ reflect: true }) variant: 'status' | 'filled' | 'category' | 'ai-chip' = 'status';
  @Prop({ reflect: true }) color: 'success' | 'warning' | 'error' | 'accent' | 'secondary' | 'default' = 'default';
  @Prop() label = '';

  @Event() skClick!: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    this.skClick.emit(event);
  };

  private renderContent() {
    const content = this.label ? this.label : <slot />;

    if (this.variant === 'ai-chip') {
      return <sk-text size="sm">{content}</sk-text>;
    }

    return <sk-caption>{content}</sk-caption>;
  }

  render() {
    return (
      <Host>
        <button
          type="button"
          class={{
            badge: true,
            [`variant-${this.variant}`]: true,
            [`color-${this.color}`]: true,
          }}
          onClick={this.handleClick}
        >
          {this.renderContent()}
        </button>
      </Host>
    );
  }
}