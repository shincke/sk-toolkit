import { Component, Prop, h } from '@stencil/core';
import { IconName, ChevronDirection, getIcon } from '../../utils/icons';

/**
 * sk-icon: Scalable SVG icon component
 *
 * Icons inherit color from the text color (currentColor) and can be sized via the size prop.
 *
 * @example
 * <sk-icon name="arrow" size="24"></sk-icon>
 * <sk-icon name="chevron" dir="left"></sk-icon>
 */
@Component({
  tag: 'sk-icon',
  styleUrl: './sk-icon.css',
  shadow: true,
})
export class SkIcon {
  /**
   * The name of the icon to display
   */
  @Prop({ reflect: true }) name: IconName = 'arrow';

  /**
   * The size of the icon in pixels
   */
  @Prop({ reflect: true }) size: number = 16;

  /**
   * Direction for chevron icon (down, up, left, right)
   * Only used when name is 'chevron'
   */
  @Prop({ reflect: true, attribute: 'dir' }) direction: ChevronDirection = 'down';

  /**
   * Optional aria-label for accessibility
   */
  @Prop({ attribute: 'aria-label' }) accessibleLabel?: string;

  render() {
    const icon = getIcon(this.name, this.direction);

    if (!icon) {
      console.warn(`sk-icon: Icon "${this.name}" not found`);
      return <div class="icon-placeholder">?</div>;
    }

    return (
      <svg
        width={this.size}
        height={this.size}
        viewBox={icon.viewBox}
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        class="icon"
        aria-label={this.accessibleLabel}
        role={this.accessibleLabel ? 'img' : 'presentation'}
      >
        {icon.render(this.direction)}
      </svg>
    );
  }
}
