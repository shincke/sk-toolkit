import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sk-chat-header",
  styleUrl: "./chat-header.css",
  shadow: true,
})
export class ChatHeader {
  @Prop() header = "AI Chat";
  @Prop() subheader = "";

  render() {
    return (
      <div class="chat-header">
        <div class="chat-header__heading-group">
          {this.subheader && <p>{this.subheader}</p>}
          <h1>{this.header}</h1>
        </div>
        <div class="chat-header__actions">
          <slot name="actions" />
        </div>
      </div>
    );
  }
}
