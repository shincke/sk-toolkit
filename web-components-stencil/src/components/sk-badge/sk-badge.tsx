import { Component, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import { BADGE_COLOR_DEFAULT, BADGE_VARIANT_AI_CHIP, BADGE_VARIANT_DEFAULT, type BadgeColor, type BadgeVariant } from './sk-badge.types';

/**
 * sk-badge displays short status labels, category chips, and AI suggestion tags.
 *
 * @slot - Badge text content used when the label prop is not provided
 */

@Component({
  tag: 'sk-badge',
  styleUrl: './sk-badge.css',
  shadow: true, // it could be scoped too, however shadow is more performant
})

// TODO: Add a11y support for sk-badge, including keyboard navigation and screen reader support
// TODO: 

// extends HTMLElement will be done by Stencil in build process
export class SkBadge {
  // adds an attribute to the HTML element <sk-side-drawer title="...">
  // watch for changes inside the component, not coming from parent
  @Prop({ reflect: true }) variant: BadgeVariant = BADGE_VARIANT_DEFAULT;
  @Prop({ reflect: true }) color: BadgeColor = BADGE_COLOR_DEFAULT;
  @Prop() label = '';

  @Event() skClick!: EventEmitter<MouseEvent>;

  private get buttonClassNames() {
    return {
      badge: true,
      [`variant-${this.variant}`]: true,
      [`color-${this.color}`]: true,
    };
  }

  private handleClick = (event: MouseEvent) => {
    this.skClick.emit(event);
  };

  private get isAiChipVariant() {
    return this.variant === BADGE_VARIANT_AI_CHIP;
  }

  private get content(): JSX.Element | string {
    return this.label ? this.label : <slot />;
  }

  private renderContent(): JSX.Element {
    if (this.isAiChipVariant) {
      return this.renderAiChipContent();
    }

    return this.renderBadgeContent();
  }

  private renderAiChipContent(): JSX.Element {
    return <sk-text size="sm">{this.content}</sk-text>;
  }

  private renderBadgeContent(): JSX.Element {
    return <sk-caption>{this.content}</sk-caption>;
  }

  render(): JSX.Element {
    return (
      <Host>
        <button type="button" class={this.buttonClassNames} onClick={this.handleClick}>
          {this.renderContent()}
        </button>
      </Host>
    );
  }
}