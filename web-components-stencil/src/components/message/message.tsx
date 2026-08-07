import { Component, h, Prop } from "@stencil/core";

type MessageRole = "user" | "assistant";

@Component({
  tag: "sk-message",
  styleUrl: "./message.css",
  shadow: true,
})
export class Message {
  @Prop({ reflect: true }) messageRole: MessageRole = "assistant";
  @Prop() content = "";
  @Prop() timestamp?: string;
  @Prop() avatarLabel?: string;

  private getAvatarText(): string {
    if (this.avatarLabel && this.avatarLabel.trim().length > 0) {
      return this.avatarLabel.trim().slice(0, 2).toUpperCase();
    }

    return this.messageRole === "assistant" ? "AI" : "U";
  }

  render() {
    return (
      <article class="message" aria-label={`${this.messageRole} message`}>
        <div class="message__avatar" aria-hidden="true">
          {this.getAvatarText()}
        </div>
        <div class="message__content-wrap">
          <div class="message__meta">
            <span class="message__role">{this.messageRole === "assistant" ? "Assistant" : "You"}</span>
            {this.timestamp && <time class="message__time">{this.timestamp}</time>}
          </div>
          <div class="message__body" data-markdown-ready="true">
            <slot>{this.content}</slot>
          </div>
          <div class="message__actions">
            <slot name="message-actions" />
          </div>
          <div class="message__footer">
            <slot name="message-footer" />
          </div>
        </div>
      </article>
    );
  }
}