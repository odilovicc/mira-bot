import TelegramBot from 'node-telegram-bot-api';
import { AnswerQuestion } from '../application/usecases/answerQuestion';

export class MiraBot {
    public static async bot() {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if (!token) {
            throw new Error("TELEGRAM_BOT_TOKEN is not set in environment variables");
        }

        const telegramBot = new TelegramBot(token, { polling: true });

        telegramBot.on('message', async (msg: any) => {
            const chatId = msg.chat.id;
            const messageText = msg.text;

            console.log(`Received message from ${chatId}: ${messageText}`);

            try {
                await telegramBot.sendChatAction(chatId, 'typing');

                const answer = await AnswerQuestion.answer(messageText);
                
                console.log(`Sending answer: ${answer}`);

                await telegramBot.sendMessage(chatId, answer);
            } catch (error) {
                console.error('Error processing message:', error);
                await telegramBot.sendMessage(chatId, 'Извините, произошла ошибка при обработке вашего сообщения.');
            }
        });

        console.log("Telegram bot initialized and polling for messages.");

        return {
            telegramBot
        }
    }
}