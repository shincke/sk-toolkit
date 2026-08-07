export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string | number;
  role: MessageRole;
  content: string;
  timestamp?: string;
  avatarLabel?: string;
}
