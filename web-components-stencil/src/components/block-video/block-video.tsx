import { Component, h, Prop } from "@stencil/core";
import type { VideoBlock } from "../ai-chat/ai-chat.types";

@Component({
  tag: "sk-block-video",
  styleUrl: "./block-video.css",
  shadow: true,
})
export class BlockVideo {
  @Prop() block?: VideoBlock;

  render() {
    if (!this.block?.src) {
      return null;
    }

    return (
      <div class="block-video">
        <video controls preload="metadata" src={this.block.src} poster={this.block.poster}></video>
      </div>
    );
  }
}
