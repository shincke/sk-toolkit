import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sk-chat-empty",
  styleUrl: "./chat-empty.css",
  shadow: true,
})
export class ChatEmpty {
  @Prop() title = "Start a conversation";
  @Prop() description = "Ask a question below or choose one of the suggested prompts.";

  render() {
    return (
      <section class="chat-empty" aria-live="polite">
        <h2>{this.title}</h2>
        <p>{this.description}</p>
      </section>
    );
  }
}
