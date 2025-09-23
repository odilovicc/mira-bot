import { ofetch } from "ofetch"

export class Ollama {
    constructor() {
    }

    public static async initOllama() {
        console.log("Ollama service is set up and ready.");
    }

    public static async askOllama(question: string): Promise<string> {
        try {
            const response = await ofetch('http://localhost:11434/api/generate', {
                method: "POST",
                body: {
                    model: "mistral",
                    prompt: question,
                    stream: false
                }
            });
            
            return response.response || "Извините, не удалось получить ответ от AI.";
        } catch (err) {
            console.error("Error calling Ollama:", err);
            throw new Error(`Ollama API error: ${err}`);
        }
    }
}
