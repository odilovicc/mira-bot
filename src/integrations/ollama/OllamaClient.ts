import { ofetch } from 'ofetch';
import { ILLMClient } from '../../domain/services';
import { LLMResponse } from '../../domain/models';
import { config } from '../../config';
import { logger } from '../../utils/logger';

export class OllamaClient implements ILLMClient {
  private readonly baseUrl: string;
  private readonly model: string;

  constructor() {
    this.baseUrl = config.OLLAMA_HOST;
    this.model = config.OLLAMA_MODEL;
  }

  async ask(question: string): Promise<LLMResponse> {
    const startTime = Date.now();
    logger.debug({ question, model: this.model }, 'Sending question to Ollama');

    try {
      const response = await ofetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        body: {
          model: this.model,
          prompt: question,
          stream: false,
        },
        timeout: 30000, // 30 seconds timeout
      });

      const duration = Date.now() - startTime;
      logger.info({ duration, model: this.model }, 'Ollama response received');

      return {
        content: response.response || 'Извините, не удалось получить ответ от AI.',
        model: this.model,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error({ error, duration, question }, 'Ollama request failed');
      
      return {
        content: 'Извините, произошла ошибка при обращении к AI.',
        model: this.model,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      await ofetch(`${this.baseUrl}/api/tags`, {
        timeout: 5000,
      });
      return true;
    } catch (error) {
      logger.warn({ error }, 'Ollama health check failed');
      return false;
    }
  }
}