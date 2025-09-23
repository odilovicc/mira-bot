export interface Question {
  text: string;
  userId: string;
  chatId: string;
  timestamp: Date;
}

export interface Answer {
  text: string;
  timestamp: Date;
  model: string;
}

export interface ChatContext {
  userId: string;
  chatId: string;
  username?: string;
}

export interface LLMResponse {
  content: string;
  model: string;
  tokensUsed?: number;
  error?: string;
}