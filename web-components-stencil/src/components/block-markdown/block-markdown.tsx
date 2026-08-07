import { Component, h, Prop } from "@stencil/core";
import type { MarkdownBlock } from "../ai-chat/ai-chat.types";

@Component({
  tag: "sk-block-markdown",
  styleUrl: "./block-markdown.css",
  shadow: true,
})
export class BlockMarkdown {
  @Prop() block?: MarkdownBlock;

  render() {
    if (!this.block) {
      return null;
    }

    return <div class="block-markdown">{this.block.markdown}</div>;
  }
}
