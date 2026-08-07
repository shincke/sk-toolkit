import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import type { ActionBlock } from "../ai-chat/ai-chat.types";

@Component({
  tag: "sk-block-actions",
  styleUrl: "./block-actions.css",
  shadow: true,
})
export class BlockActions {
  @Prop() block?: ActionBlock;

  @Event({ eventName: "actionBlockSelect" }) actionBlockSelect: EventEmitter<string>;

  private onActionClick = (actionId: string) => {
    this.actionBlockSelect.emit(actionId);
  };

  render() {
    if (!this.block?.actions?.length) {
      return null;
    }

    return (
      <div class="block-actions">
        {this.block.actions.map((action) => (
          <sk-button
            size="s"
            ui="ghost"
            disabled={Boolean(action.disabled)}
            onClick={() => this.onActionClick(action.id)}
          >
            {action.label}
          </sk-button>
        ))}
      </div>
    );
  }
}
