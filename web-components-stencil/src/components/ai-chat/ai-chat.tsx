import { Component, h, Prop } from "@stencil/core";
import type { Message } from "./ai-chat.types";

@Component({
  tag: "sk-ai-chat",
  styleUrl: "./ai-chat.css",
  shadow: true,
})
export class AiChat {
  @Prop() header = "AI Chat";
  @Prop() subheader = "Ask questions and explore answers";
  @Prop() inputPlaceholder = "Ask anything...";
  @Prop() inputButtonLabel = "Send";
  @Prop() suggestionsLabel = "Suggested prompts";
  @Prop() messages: Message[] = [];
  @Prop() showMockMessages = true;
  @Prop() suggestedPrompts: string[] = [
    "Create a summary from notes",
    "Draft a release checklist",
    "Explain this API surface",
  ];

  private readonly mockMessages: Message[] = [
    {
      id: "m-1",
      role: "user",
      content: "Can you summarize the release notes into 3 bullets?",
      timestamp: "09:41",
      avatarLabel: "ME",
    },
    {
      id: "m-2",
      role: "assistant",
      content:
        "Sure.\n1) Build pipeline is now faster with incremental caching.\n2) Design tokens were standardized across buttons and inputs.\n3) ai-chat now supports structured message rendering with metadata.",
      timestamp: "09:42",
      avatarLabel: "AI",
    },
    {
      id: "m-3",
      role: "user",
      content: "Great, also include one risk callout.",
      timestamp: "09:42",
      avatarLabel: "ME",
    },
    {
      id: "m-4",
      role: "assistant",
      content:
        "Risk: teams may rely on mock data in production demos if `showMockMessages` is not disabled when real data wiring is introduced.",
      timestamp: "09:43",
      avatarLabel: "AI",
    },
  ];

  render() {
    const renderedMessages = this.messages.length > 0 ? this.messages : this.showMockMessages ? this.mockMessages : [];
    const hasAnswers = renderedMessages.some((message) => message.role === "assistant");

    return (
      <section class="chat__wrapper" part="wrapper" aria-label="AI chat layout">
        <header class="chat__header">
          <div class="chat__heading-group">
            <p>{this.subheader}</p>
            <h1>{this.header}</h1>
          </div>
          <div class="chat__header-actions">
            <slot name="header-actions" />
          </div>
        </header>

        <section
          class={{
            chat__messages: true,
            "chat__messages--hidden": !hasAnswers,
          }}
          part="messages"
          aria-label="Conversation"
          hidden={!hasAnswers}
        >
          {renderedMessages.map((message) => (
            <sk-message
              key={message.id}
              messageRole={message.role}
              content={message.content}
              timestamp={message.timestamp}
              avatarLabel={message.avatarLabel}
            ></sk-message>
          ))}
        </section>

        <footer class="chat__footer" part="footer">
          <section class="chat__suggested" aria-label="Suggested prompts">
            <p>{this.suggestionsLabel}</p>
            <div class="chat__suggestion-list">

                {this.suggestedPrompts.map((prompt) => (
                  <sk-button size="s" ui="ghost">{prompt}</sk-button>
                ))}
            </div>
          </section>

          <sk-input inputPlaceholder={this.inputPlaceholder} inputButtonLabel={this.inputButtonLabel}></sk-input>
        </footer>
      </section>
    );
  }
}