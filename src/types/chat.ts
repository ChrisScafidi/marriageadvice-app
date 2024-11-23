export interface ChatMessage {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  resources?: Array<{ title: string; url: string }>;
}

export interface AIResponse {
  message: string;
  resources?: Array<{ title: string; url: string }>;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}