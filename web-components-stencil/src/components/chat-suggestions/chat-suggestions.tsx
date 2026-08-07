import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import type { Suggestion } from "../ai-chat/ai-chat.types";

@Component({
  tag: "sk-chat-suggestions",
  styleUrl: "./chat-suggestions.css",
  shadow: true,
})
export class ChatSuggestions {
  @Prop() label = "Suggested prompts";
  @Prop() suggestions: Suggestion[] = [];
  @Prop() disabled = false;

  @Event({ eventName: "suggestionSelect" }) suggestionSelect: EventEmitter<Suggestion>;
  @Event({ eventName: "suggestionClick" }) suggestionClick: EventEmitter<string>;

  private onSuggestionClick = (suggestion: Suggestion) => {
    if (this.disabled) {
      return;
    }

    this.suggestionSelect.emit(suggestion);
    this.suggestionClick.emit(suggestion.label);
  };

  render() {
    return (
      <section class="chat-suggestions" aria-label="Suggested prompts">
        <p>{this.label}</p>
        <div class="chat-suggestions__list">
          {this.suggestions.map((suggestion) => (
            <sk-button
              size="s"
              ui="ghost"
              disabled={this.disabled}
              title={suggestion.description || suggestion.label}
              onClick={() => this.onSuggestionClick(suggestion)}
            >
              {suggestion.icon ? `${suggestion.icon} ` : ""}
              {suggestion.label}
            </sk-button>
          ))}
        </div>
      </section>
    );
  }
}
