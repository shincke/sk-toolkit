import { Component, Event, EventEmitter, h, Prop, State, Watch } from "@stencil/core";
import type { Message } from "./ai-chat.types";

@Component({
  tag: "sk-ai-chat",
  styleUrl: "./ai-chat.css",
  shadow: true,
})
export class AiChat {
  @State() localMessages: Message[] = [];
  @State() mockLoadingActive = false;
  @State() mockStreamingContent = "";

  @Prop() header: string;
  @Prop() subheader: string;
  @Prop() inputPlaceholder: string;
  @Prop() inputButtonLabel: string;
  @Prop() suggestionsLabel: string;
  @Prop() loading = false;
  @Prop() streamingAssistantContent = "";
  @Prop() mockLoading = true;
  @Prop() mockLoadingDelay = 900;
  @Prop() mockStreaming = true;
  @Prop() full = true;
  @Prop() auto = false;
  @Prop() loadingLabel = "Assistant is typing";
  @Prop() suggestions: string[] = [
    "Create a summary from notes",
    "Draft a release checklist",
    "Explain this API surface",
  ];
  @Prop() messages: Message[] = [];

  @Event({ eventName: "suggestionClick" }) suggestionClick: EventEmitter<string>;

  private messageCounter = 0;
  // TODO: remove mock
  private readonly assistantReply = "This is a mocked AI response. It always answers with the same message so you can visualize the full chat flow.";
  private messagesEl?: HTMLElement;
  private shouldAutoScroll = false;
  private mockLoadingTimeout?: number;
  private mockStreamingInterval?: number;

  componentWillLoad() {
    this.localMessages = [...this.messages];
    this.messageCounter = this.localMessages.length;
  }

  private getTimestamp(): string {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  private createMessage(role: "user" | "assistant", content: string): Message {
    this.messageCounter += 1;

    return {
      id: `m-${this.messageCounter}`,
      role,
      content,
      timestamp: this.getTimestamp(),
      avatarLabel: role === "assistant" ? "AI" : "ME",
    };
  }

  private appendConversationTurn(rawContent: string) {
    const userContent = rawContent.trim();

    if (!userContent) {
      return;
    }

    const nextMessages = [...this.localMessages, this.createMessage("user", userContent)];
    const shouldRunMockLoading = this.mockLoading && !this.loading && this.streamingAssistantContent.trim().length === 0;

    if (this.loading || shouldRunMockLoading) {
      this.localMessages = nextMessages;
    } else {
      this.localMessages = [...nextMessages, this.createMessage("assistant", this.assistantReply)];
    }

    if (shouldRunMockLoading) {
      this.runMockLoadingFlow();
    }

    this.queueAutoScroll();
  }

  private clearMockTimers() {
    if (this.mockLoadingTimeout) {
      window.clearTimeout(this.mockLoadingTimeout);
      this.mockLoadingTimeout = undefined;
    }

    if (this.mockStreamingInterval) {
      window.clearInterval(this.mockStreamingInterval);
      this.mockStreamingInterval = undefined;
    }
  }

  private finishMockLoadingFlow(finalContent: string) {
    this.mockLoadingActive = false;
    this.mockStreamingContent = "";
    this.localMessages = [...this.localMessages, this.createMessage("assistant", finalContent)];
    this.queueAutoScroll();
  }

  private runMockLoadingFlow() {
    this.clearMockTimers();
    this.mockLoadingActive = true;
    this.mockStreamingContent = "";
    this.queueAutoScroll();

    this.mockLoadingTimeout = window.setTimeout(() => {
      if (!this.mockStreaming) {
        this.finishMockLoadingFlow(this.assistantReply);
        return;
      }

      const fullText = this.assistantReply;
      let cursor = 0;

      this.mockLoadingActive = false;
      this.mockStreamingInterval = window.setInterval(() => {
        cursor += 3;
        this.mockStreamingContent = fullText.slice(0, cursor);
        this.queueAutoScroll();

        if (cursor >= fullText.length) {
          this.clearMockTimers();
          this.finishMockLoadingFlow(fullText);
        }
      }, 24);
    }, this.mockLoadingDelay);
  }

  private onMessageSubmit = (event: CustomEvent<string>) => {
    this.appendConversationTurn(event.detail ?? "");
  };

  private onSuggestionClick = (suggestion: string) => {
    this.suggestionClick.emit(suggestion);
    this.appendConversationTurn(suggestion);
  };

  @Watch("loading")
  onLoadingChange() {
    this.queueAutoScroll();
  }

  @Watch("streamingAssistantContent")
  onStreamingAssistantContentChange() {
    this.queueAutoScroll();
  }

  private queueAutoScroll() {
    this.shouldAutoScroll = true;
  }

  private scrollMessagesToBottom() {
    if (!this.messagesEl) {
      return;
    }

    this.messagesEl.scrollTo({
      top: this.messagesEl.scrollHeight,
      behavior: "smooth",
    });
  }

  componentDidRender() {
    if (!this.shouldAutoScroll) {
      return;
    }

    this.scrollMessagesToBottom();
    this.shouldAutoScroll = false;
  }

  disconnectedCallback() {
    this.clearMockTimers();
  }

  render() {
    const renderedMessages = this.localMessages;
    const effectiveLoading = this.loading || this.mockLoadingActive;
    const effectiveStreamingContent = this.streamingAssistantContent.trim().length > 0 ? this.streamingAssistantContent : this.mockStreamingContent;
    const hasConversation = renderedMessages.length > 0 || effectiveLoading || effectiveStreamingContent.trim().length > 0;
    const hasUserMessage = renderedMessages.some((message) => message.role === "user");
    const showSuggestions = !hasUserMessage && this.suggestions.length > 0;
    const showStreamingAssistant = effectiveLoading || effectiveStreamingContent.trim().length > 0;
    const useAutoLayout = this.auto;
    const useFullLayout = !this.auto && this.full;

    return (
      <section
        class={{
          chat__wrapper: true,
          "chat__wrapper--empty": !hasConversation,
          "chat__wrapper--has-messages": hasConversation,
          "chat__wrapper--full": useFullLayout,
          "chat__wrapper--auto": useAutoLayout,
          "chat__wrapper--auto-collapsed": useAutoLayout && !hasConversation,
          "chat__wrapper--auto-expanded": useAutoLayout && hasConversation,
        }}
        part="wrapper"
        aria-label="AI chat layout"
      >
        <header class="chat__header">
          <div class="chat__heading-group">
            <p>{this.subheader}</p>
            <h1>{this.header}</h1>
          </div>
          <div class="chat__header-actions">
            <slot name="header-actions" />
          </div>
        </header>

{/* messages are displayed when there is a conversation. As they are not always in the message format...
as they could be videos, images, and other types of media...
... they will be showed via slot and the logic should be applied from consumer side */}
        <section
          class={{
            chat__messages: true,
            "chat__messages--hidden": !hasConversation,
          }}
          part="messages"
          aria-label="Conversation"
          hidden={!hasConversation}
          ref={(el) => {
            this.messagesEl = el as HTMLElement;
          }}
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

          {showStreamingAssistant && (
            <sk-message key="m-streaming" messageRole="assistant" avatarLabel="AI">
              {effectiveStreamingContent.trim().length > 0 ? (
                effectiveStreamingContent
              ) : (
                <sk-loading active={effectiveLoading} label={this.loadingLabel}>
                  <sk-typing-indicator></sk-typing-indicator>
                </sk-loading>
              )}
            </sk-message>
          )}
        </section>

        {/* suggestions are displayed when there are no user messages - initial state */}
        <footer class="chat__footer" part="footer">
          {showSuggestions && (
            <section class="chat__suggested" aria-label="Suggested prompts">
              <p>{this.suggestionsLabel}</p>
              <div class="chat__suggestion-list">
                {this.suggestions.map((suggestion) => (
                  <sk-button size="s" ui="ghost" onClick={() => this.onSuggestionClick(suggestion)}>
                    {suggestion}
                  </sk-button>
                ))}
              </div>
            </section>
          )}

          <sk-input
            inputPlaceholder={this.inputPlaceholder}
            inputButtonLabel={this.inputButtonLabel}
            onMessageSubmit={this.onMessageSubmit}
          ></sk-input>
        </footer>
      </section>
    );
  }
}