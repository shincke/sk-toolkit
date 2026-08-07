import { Component, h, Prop } from "@stencil/core";
import type { TextBlock } from "../ai-chat/ai-chat.types";

@Component({
  tag: "sk-block-text",
  styleUrl: "./block-text.css",
  shadow: true,
})
export class BlockText {
  @Prop() block?: TextBlock;

  render() {
    if (!this.block) {
      return null;
    }

    return <div class="block-text">{this.block.text}</div>;
  }
}
