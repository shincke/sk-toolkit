import { Component, h, Prop } from "@stencil/core";
import type {
  ActionBlock,
  ChatResponse,
  CitationBlock,
  MarkdownBlock,
  ProductBlock,
  ResponseBlock,
  TextBlock,
  VideoBlock,
} from "../ai-chat/ai-chat.types";

@Component({
  tag: "sk-chat-response",
  styleUrl: "./chat-response.css",
  shadow: true,
})
export class ChatResponseComponent {
  @Prop() response?: ChatResponse;

  private renderBlock(block: ResponseBlock) {
    switch (block.type) {
      case "text":
        return <sk-block-text block={block as TextBlock}></sk-block-text>;
      case "markdown":
        return <sk-block-markdown block={block as MarkdownBlock}></sk-block-markdown>;
      case "video":
        return <sk-block-video block={block as VideoBlock}></sk-block-video>;
      case "product":
        return <sk-block-product block={block as ProductBlock}></sk-block-product>;
      case "citation":
        return <sk-block-citation block={block as CitationBlock}></sk-block-citation>;
      case "action":
        return <sk-block-actions block={block as ActionBlock}></sk-block-actions>;
      default:
        return null;
    }
  }

  render() {
    if (!this.response) {
      return null;
    }

    const response = this.response;
    const timestamp = response.createdAt
      ? new Date(response.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <sk-message
        messageRole={response.role}
        avatarLabel={response.avatarLabel || ""}
        timestamp={timestamp}
      >
        {response.blocks?.map((block) => this.renderBlock(block))}
        <slot name="message-actions" slot="message-actions" />
        <slot name="message-footer" slot="message-footer" />
      </sk-message>
    );
  }
}
