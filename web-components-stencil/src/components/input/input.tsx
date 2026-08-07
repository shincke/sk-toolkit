import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sk-input",
  styleUrl: "./input.css",
  shadow: true,
})
export class Input {
  @Prop() inputPlaceholder = "Ask anything...";
  @Prop() inputButtonLabel = "Send";
  @Prop() inputButtonDisabled = false;

  render() {
    return (
      <section class="input__composer" aria-label="Input area">
        <div class="input__composer-shell">
          <input id="ai-chat-input" type="text" placeholder={this.inputPlaceholder} disabled />
          <sk-button size="s" label={this.inputButtonLabel} disabled={this.inputButtonDisabled}></sk-button>
        </div>
      </section>
    );
  }
}