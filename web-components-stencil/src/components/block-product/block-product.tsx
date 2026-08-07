import { Component, h, Prop } from "@stencil/core";
import type { ProductBlock } from "../ai-chat/ai-chat.types";

@Component({
  tag: "sk-block-product",
  styleUrl: "./block-product.css",
  shadow: true,
})
export class BlockProduct {
  @Prop() block?: ProductBlock;

  render() {
    if (!this.block?.product) {
      return null;
    }

    const product = this.block.product;

    return (
      <article class="block-product">
        <p class="block-product__name">{product.title}</p>
        {product.description && <p>{product.description}</p>}
      </article>
    );
  }
}
