import { Ollama } from "../../modules/ollama"

export class AnswerQuestion {
    public static async answer(question: string): Promise<string> {
        try {
            const answer = await Ollama.askOllama(question);
            return answer;
        } catch (error) {
            console.error("Error in AnswerQuestion:", error);
            return "Извините, произошла ошибка при получении ответа от AI.";
        }
    }
}