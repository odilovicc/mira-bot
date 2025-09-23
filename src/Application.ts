import { config } from './config';
import { logger } from './utils/logger';
import { OllamaClient } from './integrations/ollama/OllamaClient';
import { TelegramTransport } from './transport/telegram/TelegramTransport';
import { HandleQuestionUseCase } from './application/usecases/HandleQuestionUseCase';
import { Question, ChatContext } from './domain/models';

export class Application {
  private ollamaClient: OllamaClient;
  private telegramTransport: TelegramTransport;
  private handleQuestionUseCase: HandleQuestionUseCase;

  constructor() {
    // Initialize dependencies
    this.ollamaClient = new OllamaClient();
    this.telegramTransport = new TelegramTransport();
    this.handleQuestionUseCase = new HandleQuestionUseCase(
      this.ollamaClient,
      this.telegramTransport
    );
  }

  async start(): Promise<void> {
    logger.info({ config: { ...config, TELEGRAM_BOT_TOKEN: '***' } }, 'Starting application');

    try {
      // Health check for Ollama
      const isOllamaHealthy = await this.ollamaClient.isHealthy();
      if (!isOllamaHealthy) {
        logger.warn('Ollama service is not available, but continuing...');
      } else {
        logger.info('Ollama service is healthy');
      }

      // Set up message handler
      this.telegramTransport.onMessage(async (msg: any) => {
        await this.handleMessage(msg);
      });

      // Start Telegram bot
      await this.telegramTransport.start();
      
      logger.info('🚀 Bot is running successfully!');

    } catch (error) {
      logger.error({ error }, 'Failed to start application');
      throw error;
    }
  }

  async stop(): Promise<void> {
    logger.info('Stopping application');
    
    try {
      await this.telegramTransport.stop();
      logger.info('Application stopped successfully');
    } catch (error) {
      logger.error({ error }, 'Error during application shutdown');
      throw error;
    }
  }

  private async handleMessage(msg: any): Promise<void> {
    try {
      const question: Question = {
        text: msg.text || '',
        userId: msg.from?.id?.toString() || 'unknown',
        chatId: msg.chat?.id?.toString() || 'unknown',
        timestamp: new Date(),
      };

      const context: ChatContext = {
        userId: question.userId,
        chatId: question.chatId,
        username: msg.from?.username,
      };

      // Skip non-text messages
      if (!question.text) {
        logger.debug({ messageType: msg.type }, 'Skipping non-text message');
        return;
      }

      logger.info(
        { 
          userId: context.userId, 
          chatId: context.chatId, 
          username: context.username,
          messageText: question.text.substring(0, 100) // Log first 100 chars
        }, 
        'Received message'
      );

      await this.handleQuestionUseCase.handleQuestion(question, context);

    } catch (error) {
      logger.error({ error, msg }, 'Error handling message');
    }
  }
}