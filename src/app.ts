import { Output } from '@jfonx/console-utils';
import * as TelegramInstance from 'node-telegram-bot-api'
import { AskQuestion } from './scenarios/askQuestion';
import * as fs from 'fs'
import { ChromaDB } from './modules/chromadb';

export default async function boot() {
    await ChromaDB.teach()
    await AskQuestion.init()
    Output.success('App started')

    // Telegram logic
    const telegram = new TelegramInstance(process.env.TELEGRAM_BOT_TOKEN as string, {polling: true})


    telegram.on('message', (msg) => {
        const chatId = msg.chat.id
        telegram.sendChatAction(chatId, "typing")

        AskQuestion.ask(msg.text as string)
            .then((data: any) => {
                telegram.sendMessage(chatId, data.response)
            })
            .catch((err) => Output.error(err))
    })
}