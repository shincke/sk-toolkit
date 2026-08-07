import { Component, h, Prop } from "@stencil/core";
import type { CitationBlock } from "../ai-chat/ai-chat.types";

@Component({
  tag: "sk-block-citation",
  styleUrl: "./block-citation.css",
  shadow: true,
})
export class BlockCitation {
  @Prop() block?: CitationBlock;

  render() {
    const citation = this.block?.citations?.[0];

    if (!citation) {
      return null;
    }

    return (
      <a class="block-citation" href={citation.url} target="_blank" rel="noopener noreferrer">
        {citation.title || citation.url}
      </a>
    );
  }
}
