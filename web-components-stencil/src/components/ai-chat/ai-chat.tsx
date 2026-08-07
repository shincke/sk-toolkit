import { Component, Event, EventEmitter, h, Prop, Watch } from "@stencil/core";
import type {
  AiChatLayout,
  AiChatStatus,
  AiChatTextConfig,
  ChatResponse,
  Suggestion,
} from "./ai-chat.types";

@Component({
  tag: "sk-ai-chat",
  styleUrl: "./ai-chat.css",
  shadow: true,
})
export class AiChat {
  @Prop() status: AiChatStatus = "idle";
  @Prop() layout: AiChatLayout = "full";
  @Prop() streamingAssistantContent = "";
  @Prop() showSuggestions?: boolean;
  @Prop() suggestions: Suggestion[] = [
    { id: "1", label: "Create a summary from notes" },
    { id: "2", label: "Draft a release checklist" },
    { id: "3", label: "Explain this API surface" },
  ];
  @Prop() text: Partial<AiChatTextConfig> = {};
  @Prop() responses: ChatResponse[] = [];

  @Event({ eventName: "suggestionSelect" }) suggestionSelect: EventEmitter<Suggestion>;
  @Event({ eventName: "suggestionClick" }) suggestionClick: EventEmitter<string>;
  @Event({ eventName: "messageSubmit" }) messageSubmit: EventEmitter<string>;

  private messagesEl?: HTMLElement;
  private shouldAutoScroll = false;

  private readonly defaultText: AiChatTextConfig = {
    header: "AI Chat",
    subheader: "Ask questions and explore answers",
    inputPlaceholder: "Ask anything...",
    inputButtonLabel: "Send",
    suggestionsLabel: "Suggested prompts",
    emptyTitle: "Start a conversation",
    emptyDescription: "Ask a question below or choose one of the suggested prompts.",
    errorMessage: "We could not load the conversation right now.",
    retryLabel: "Retry",
    loadingLabel: "Assistant is typing",
  };

  private get resolvedText(): AiChatTextConfig {
    return {
      ...this.defaultText,
      ...(this.text || {}),
    };
  }

  private get isErrorState(): boolean {
    return this.status === "error";
  }

  private get isDisabledState(): boolean {
    return this.status === "disabled";
  }

  private get isLoadingState(): boolean {
    return this.status === "loading";
  }

  private normalizeSuggestion(item: Suggestion, index: number): Suggestion {
    return {
      id: item.id || `suggestion-${index}`,
      label: item.label,
      description: item.description,
      icon: item.icon,
      category: item.category,
      payload: item.payload,
      metadata: item.metadata,
    };
  }

  private get normalizedSuggestions(): Suggestion[] {
    return this.suggestions
      .map((item, index) => this.normalizeSuggestion(item, index))
      .filter((item) => item.label && item.label.trim().length > 0);
  }

  private onMessageSubmit = (event: CustomEvent<string>) => {
    if (this.isDisabledState || this.isErrorState) {
      return;
    }

    const userContent = (event.detail ?? "").trim();
    if (!userContent) {
      return;
    }

    this.messageSubmit.emit(userContent);
  };

  private onSuggestionClick = (suggestion: Suggestion) => {
    if (this.isDisabledState || this.isErrorState) {
      return;
    }

    this.suggestionSelect.emit(suggestion);
    this.suggestionClick.emit(suggestion.label);
  };

  @Watch("responses")
  onResponsesChange() {
    this.queueAutoScroll();
  }

  @Watch("status")
  onStatusChange() {
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

  private getRenderState() {
    const text = this.resolvedText;
    const renderedResponses = this.responses;
    const effectiveLoading = this.isLoadingState;
    const effectiveStreamingContent = this.streamingAssistantContent;
    const hasConversation = renderedResponses.length > 0 || effectiveLoading || effectiveStreamingContent.trim().length > 0;
    const isErrorState = this.isErrorState;
    const isDisabledState = this.isDisabledState;
    const isEmptyState = !isErrorState && !hasConversation;
    const hasUserMessage = renderedResponses.some((response) => response.role === "user");
    const suggestions = this.normalizedSuggestions;
    const defaultShowSuggestions = isEmptyState && !isDisabledState && !effectiveLoading && !hasUserMessage && suggestions.length > 0;
    const showSuggestions = this.showSuggestions ?? defaultShowSuggestions;
    const showStreamingAssistant = !isErrorState && (effectiveLoading || effectiveStreamingContent.trim().length > 0);
    const useAutoLayout = this.layout === "auto";
    const useFullLayout = this.layout === "full";

    return {
      text,
      renderedResponses,
      effectiveLoading,
      effectiveStreamingContent,
      hasConversation,
      isErrorState,
      isDisabledState,
      isEmptyState,
      suggestions,
      showSuggestions,
      showStreamingAssistant,
      useAutoLayout,
      useFullLayout,
    };
  }

  private renderHeader(text: AiChatTextConfig) {
    return (
      <header class="chat__header">
        <slot name="header">
          <sk-chat-header header={text.header} subheader={text.subheader}>
            <slot name="header-actions" slot="actions" />
          </sk-chat-header>
        </slot>
      </header>
    );
  }

  private renderErrorState(text: AiChatTextConfig) {
    return (
      <section class="chat__error-state" part="error-state" aria-live="polite">
        <slot name="error-message">
          <p>{text.errorMessage}</p>
        </slot>
        <button type="button" class="chat__retry" disabled>
          {text.retryLabel}
        </button>
      </section>
    );
  }

  private renderResponseMessages(renderedResponses: ChatResponse[]) {
    return renderedResponses.map((response) => (
      <sk-chat-response key={response.id} response={response}></sk-chat-response>
    ));
  }

  private renderStreamingAssistant(effectiveStreamingContent: string, effectiveLoading: boolean, text: AiChatTextConfig) {
    const streamingResponse: ChatResponse = {
      id: "streaming-response",
      role: "assistant",
      blocks:
        effectiveStreamingContent.trim().length > 0
          ? [
              {
                id: "streaming-text",
                type: "text",
                text: effectiveStreamingContent,
              },
            ]
          : [],
    };

    return (
      <sk-chat-response key="m-streaming" response={streamingResponse}>
        {effectiveStreamingContent.trim().length === 0 && (
          <slot name="loading" slot="message-footer">
            <sk-loading active={effectiveLoading} label={text.loadingLabel}>
              <sk-typing-indicator></sk-typing-indicator>
            </sk-loading>
          </slot>
        )}
      </sk-chat-response>
    );
  }

  private renderMessagesSection(state: ReturnType<AiChat['getRenderState']>) {
    const messageContent = state.isErrorState
      ? this.renderErrorState(state.text)
      : [
          ...this.renderResponseMessages(state.renderedResponses),
          state.showStreamingAssistant &&
            this.renderStreamingAssistant(state.effectiveStreamingContent, state.effectiveLoading, state.text),
        ];

    return (
      <section
        class={{
          chat__messages: true,
          "chat__messages--hidden": state.isEmptyState && !state.isErrorState,
        }}
        part="messages"
        aria-label="Conversation"
        hidden={state.isEmptyState && !state.isErrorState}
        ref={(el) => {
          this.messagesEl = el as HTMLElement;
        }}
      >
        <slot name="messages">{messageContent}</slot>
      </section>
    );
  }

  private renderEmptyScreen(state: ReturnType<AiChat['getRenderState']>) {
    if (!state.isEmptyState) {
      return null;
    }

    return (
      <section class="chat__empty-screen" part="empty-screen" aria-live="polite">
        <slot name="empty-state">
          <sk-chat-empty title={state.text.emptyTitle} description={state.text.emptyDescription}></sk-chat-empty>
        </slot>
      </section>
    );
  }

  private renderSuggestions(state: ReturnType<AiChat['getRenderState']>) {
    if (!state.showSuggestions) {
      return null;
    }

    return (
      <sk-chat-suggestions
        label={state.text.suggestionsLabel}
        suggestions={state.suggestions}
        disabled={state.isDisabledState || state.isErrorState}
        onSuggestionSelect={(event) => this.onSuggestionClick(event.detail)}
      ></sk-chat-suggestions>
    );
  }

  private renderFooter(state: ReturnType<AiChat['getRenderState']>) {
    return (
      <footer class="chat__footer" part="footer">
        <slot name="footer">
          {this.renderSuggestions(state)}

          <slot name="composer">
            <sk-input
              inputPlaceholder={state.text.inputPlaceholder}
              inputButtonLabel={state.text.inputButtonLabel}
              disabled={state.isDisabledState || state.isErrorState}
              onMessageSubmit={this.onMessageSubmit}
            ></sk-input>
          </slot>
        </slot>
      </footer>
    );
  }

  render() {
    const state = this.getRenderState();

    return (
      <section
        class={{
          chat__wrapper: true,
          "chat__wrapper--empty": state.isEmptyState,
          "chat__wrapper--has-messages": state.hasConversation,
          "chat__wrapper--full": state.useFullLayout,
          "chat__wrapper--auto": state.useAutoLayout,
          "chat__wrapper--auto-collapsed": state.useAutoLayout && state.isEmptyState,
          "chat__wrapper--auto-expanded": state.useAutoLayout && state.hasConversation,
          "chat__wrapper--error": state.isErrorState,
          "chat__wrapper--disabled": state.isDisabledState,
        }}
        part="wrapper"
        aria-label="AI chat layout"
      >
        {this.renderHeader(state.text)}
        {this.renderMessagesSection(state)}
        {this.renderEmptyScreen(state)}
        {this.renderFooter(state)}
      </section>
    );
  }
}