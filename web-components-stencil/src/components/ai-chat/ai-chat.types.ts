export type MessageRole = 'user' | 'assistant';

export type AiChatStatus = 'idle' | 'loading' | 'error' | 'disabled';

export type AiChatLayout = 'full' | 'auto';

export interface AiChatTextConfig {
  header: string;
  subheader: string;
  inputPlaceholder: string;
  inputButtonLabel: string;
  suggestionsLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  errorMessage: string;
  retryLabel: string;
  loadingLabel: string;
}

export type ConversationBlockType = 'text' | 'markdown' | 'video' | 'product' | 'citation' | 'action' | 'divider' | 'typing' | 'image' | 'playlist' | 'tool-result';

export interface BaseBlock {
  id: string;
  type: ConversationBlockType;
  metadata?: Record<string, unknown>;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  text: string;
}

export interface MarkdownBlock extends BaseBlock {
  type: 'markdown';
  markdown: string;
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  src: string;
  title?: string;
  poster?: string;
  provider?: 'native' | 'youtube' | 'vimeo' | 'other';
}

export interface ProductBlock extends BaseBlock {
  type: 'product';
  product: {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    currency?: string;
    url?: string;
  };
}

export interface CitationBlock extends BaseBlock {
  type: 'citation';
  citations: MessageCitation[];
}

export interface ActionBlock extends BaseBlock {
  type: 'action';
  actions: MessageAction[];
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
  label?: string;
}

export interface TypingBlock extends BaseBlock {
  type: 'typing';
  label?: string;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
}

export interface PlaylistBlock extends BaseBlock {
  type: 'playlist';
  idRef?: string;
  title: string;
  items: PlaylistItem[];
}

export interface ToolResultBlock extends BaseBlock {
  type: 'tool-result';
  result: ToolResult;
}

export type ResponseBlock =
  | TextBlock
  | MarkdownBlock
  | VideoBlock
  | ProductBlock
  | CitationBlock
  | ActionBlock
  | DividerBlock
  | TypingBlock
  | ImageBlock
  | PlaylistBlock
  | ToolResultBlock;

export interface ChatResponse {
  id: string | number;
  role: MessageRole;
  state?: MessageState;
  blocks: ResponseBlock[];
  createdAt?: string;
  updatedAt?: string;
  timestamp?: string;
  avatarLabel?: string;
  provider?: SourceProvider;
  metadata?: Record<string, unknown>;
}

export interface Conversation {
  id: string;
  responses: ChatResponse[];
  metadata?: Record<string, unknown>;
}

export interface Suggestion {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category?: string;
  payload?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export type MessageFormat = 'text' | 'markdown' | 'rich';

export type MessageState = 'complete' | 'loading' | 'streaming' | 'error';

export type SourceProvider = 'chatgpt' | 'claude' | 'perplexity' | 'custom';

export interface MessageCitation {
  id: string;
  title: string;
  url: string;
  snippet?: string;
  source?: string;
  domain?: string;
  publishedAt?: string;
  score?: number;
  metadata?: Record<string, unknown>;
}

export interface MessageAction {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  actionType?: 'callback' | 'link' | 'submit-prompt' | 'invoke-tool' | 'copy';
  href?: string;
  payload?: Record<string, unknown>;
  disabled?: boolean;
  icon?: string;
  tooltip?: string;
}

export interface ToolResult {
  toolName: string;
  invocationId: string;
  status: 'success' | 'error' | 'partial';
  input?: Record<string, unknown>;
  output?: unknown;
  error?: {
    code?: string;
    message: string;
  };
  startedAt?: string;
  finishedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface PlaylistItem {
  id: string;
  title: string;
  subtitle?: string;
  thumbnailUrl?: string;
  durationMs?: number;
  url?: string;
  metadata?: Record<string, unknown>;
}

export interface MessageImageBlock {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface MessageVideoBlock {
  type: 'video';
  src: string;
  title?: string;
  poster?: string;
  provider?: 'native' | 'youtube' | 'vimeo' | 'other';
  autoplay?: boolean;
  controls?: boolean;
  durationMs?: number;
}

export interface MessageTextBlock {
  type: 'text';
  text: string;
}

export interface MessageMarkdownBlock {
  type: 'markdown';
  markdown: string;
}

export interface MessageProductCardBlock {
  type: 'product-card';
  product: {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    currency?: string;
    url?: string;
    metadata?: Record<string, unknown>;
  };
}

export interface MessagePlaylistBlock {
  type: 'playlist';
  id: string;
  title: string;
  description?: string;
  items: PlaylistItem[];
  provider?: string;
}

export interface MessageCitationsBlock {
  type: 'citations';
  citations: MessageCitation[];
}

export interface MessageActionsBlock {
  type: 'actions';
  actions: MessageAction[];
}

export interface MessageToolResultBlock {
  type: 'tool-result';
  result: ToolResult;
}

export interface MessageLoadingBlock {
  type: 'loading';
  label?: string;
}

export interface MessageStreamingBlock {
  type: 'streaming';
  text: string;
  done?: boolean;
}

export type MessageBlock =
  | MessageTextBlock
  | MessageMarkdownBlock
  | MessageImageBlock
  | MessageVideoBlock
  | MessageProductCardBlock
  | MessagePlaylistBlock
  | MessageCitationsBlock
  | MessageActionsBlock
  | MessageToolResultBlock
  | MessageLoadingBlock
  | MessageStreamingBlock;

export interface Message {
  id: string | number;
  role: MessageRole;
  content: string;
  format?: MessageFormat;
  state?: MessageState;
  provider?: SourceProvider;
  blocks?: MessageBlock[];
  citations?: MessageCitation[];
  actions?: MessageAction[];
  toolResults?: ToolResult[];
  metadata?: Record<string, unknown>;
  error?: {
    code?: string;
    message: string;
    recoverable?: boolean;
  };
  streaming?: {
    streamId?: string;
    chunkIndex?: number;
    delta?: string;
    done?: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
  timestamp?: string;
  avatarLabel?: string;
}
