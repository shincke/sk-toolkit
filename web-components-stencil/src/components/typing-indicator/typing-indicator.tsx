import { Component, h } from "@stencil/core";

@Component({
  tag: "sk-typing-indicator",
  styleUrl: "./typing-indicator.css",
  shadow: true,
})
export class TypingIndicator {
  render() {
    return (
      <span class="typing" role="status" aria-label="Typing">
        <span class="typing__dot"></span>
        <span class="typing__dot"></span>
        <span class="typing__dot"></span>
      </span>
    );
  }
}
