import TelegramBot from 'node-telegram-bot-api';

export class MiraBot {
    public static async initBot() {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token) {
            throw new Error("TELEGRAM_BOT_TOKEN is not set in environment variables");
        }

        const telegramBot = new TelegramBot(token, { polling: true });

        return {
            telegramBot
        }
    }

    public static getInstance() {
        return this.initBot();
    }
}