import TelegramBot from 'node-telegram-bot-api';
import { IBotTransport } from '../../domain/services';
import { config } from '../../config';
import { logger } from '../../utils/logger';

export class TelegramTransport implements IBotTransport {
  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN, { polling: false });
  }

  async sendMessage(chatId: string, text: string): Promise<void> {
    try {
      await this.bot.sendMessage(chatId, text);
      logger.debug({ chatId, messageLength: text.length }, 'Message sent to Telegram');
    } catch (error) {
      logger.error({ error, chatId }, 'Failed to send message to Telegram');
      throw error;
    }
  }

  async showTyping(chatId: string): Promise<void> {
    try {
      await this.bot.sendChatAction(chatId, 'typing');
      logger.debug({ chatId }, 'Typing indicator sent');
    } catch (error) {
      logger.error({ error, chatId }, 'Failed to send typing indicator');
      // Don't throw here - typing indicator is not critical
    }
  }

  async start(): Promise<void> {
    try {
      await this.bot.startPolling();
      logger.info('Telegram bot started polling');
    } catch (error) {
      logger.error({ error }, 'Failed to start Telegram bot');
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      await this.bot.stopPolling();
      logger.info('Telegram bot stopped polling');
    } catch (error) {
      logger.error({ error }, 'Failed to stop Telegram bot');
      throw error;
    }
  }

  onMessage(handler: (msg: any) => void): void {
    this.bot.on('message', handler);
  }

  getBotInstance(): TelegramBot {
    return this.bot;
  }
}