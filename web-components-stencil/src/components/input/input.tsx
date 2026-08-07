import { Component, Event, EventEmitter, h, Prop, State } from "@stencil/core";

@Component({
  tag: "sk-input",
  styleUrl: "./input.css",
  shadow: true,
})
export class Input {
  @State() draft = "";

  @Prop() inputPlaceholder = "Ask anything...";
  @Prop() inputButtonLabel = "Send";
  @Prop() inputButtonDisabled = false;
  @Prop() disabled = false;

  @Event({ eventName: "messageSubmit", bubbles: false, composed: false }) messageSubmit: EventEmitter<string>;

  private textareaEl?: HTMLTextAreaElement;

  private get isDisabled(): boolean {
    return this.disabled || this.inputButtonDisabled;
  }

  private autoGrowTextarea() {
    if (!this.textareaEl) {
      return;
    }

    const textarea = this.textareaEl;
    textarea.style.height = "auto";

    const computed = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(computed.lineHeight || "20");
    const borderTop = parseFloat(computed.borderTopWidth || "0");
    const borderBottom = parseFloat(computed.borderBottomWidth || "0");
    const verticalBorders = borderTop + borderBottom;
    const maxHeight = lineHeight * 4 + verticalBorders;

    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }

  private onInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.draft = target.value;
    this.autoGrowTextarea();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.submitMessage();
    }
  };

  private submitMessage = () => {
    if (this.isDisabled) {
      return;
    }

    this.messageSubmit.emit(this.draft);
    this.draft = "";

    if (this.textareaEl) {
      this.textareaEl.value = "";
      this.autoGrowTextarea();
    }
  };

  render() {
    return (
      <section class="input__composer" aria-label="Input area">
        <div class="input__composer-shell">
          <textarea
            id="ai-chat-input"
            rows={1}
            placeholder={this.inputPlaceholder}
            value={this.draft}
            disabled={this.isDisabled}
            onInput={this.onInput}
            onKeyDown={this.onKeyDown}
            ref={(el) => {
              this.textareaEl = el as HTMLTextAreaElement;
            }}
          ></textarea>
          <sk-button size="s" disabled={this.isDisabled} onClick={this.submitMessage}>
            {this.inputButtonLabel}
          </sk-button>
        </div>
      </section>
    );
  }
}