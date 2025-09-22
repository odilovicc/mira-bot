import { Ollama } from "../modules/ollama"
import { MiraBot } from "../modules/telegram"

export class AnswerQuestion {
    public static async answer(): Promise<string> {

        return new Promise(async (res, rej) => {
            const miraBotInstance = await MiraBot.getInstance();
            miraBotInstance.telegramBot.on('message', (msg => {
                miraBotInstance.telegramBot.sendChatAction(msg.chat.id, 'typing');

                Ollama.askOllama(msg.text)
                    .then((answer) => {
                        miraBotInstance.telegramBot.sendMessage(msg.chat.id, answer);
                        res(answer);
                    })
                    .catch((err) => {
                        rej("Error in answering OLLAMA ====>" + err)
                    })
            }))
        })

    }
}