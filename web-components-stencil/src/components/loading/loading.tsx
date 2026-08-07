import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sk-loading",
  styleUrl: "./loading.css",
  shadow: true,
})
export class Loading {
  @Prop() active = false;
  @Prop() label = "Loading";

  render() {
    if (!this.active) {
      return null;
    }

    return (
      <div class="loading" role="status" aria-live="polite" aria-label={this.label}>
        <slot>
          <sk-typing-indicator></sk-typing-indicator>
        </slot>
        <span class="loading__label">{this.label}</span>
      </div>
    );
  }
}
