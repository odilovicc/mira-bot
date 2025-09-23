import { Question, Answer, ChatContext, LLMResponse } from '../models';

// Abstract LLM Client interface
export interface ILLMClient {
  ask(question: string): Promise<LLMResponse>;
  isHealthy(): Promise<boolean>;
}

// Abstract Bot Transport interface
export interface IBotTransport {
  sendMessage(chatId: string, text: string): Promise<void>;
  showTyping(chatId: string): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
}

// Answer Service interface
export interface IAnswerService {
  handleQuestion(question: Question, context: ChatContext): Promise<Answer>;
}