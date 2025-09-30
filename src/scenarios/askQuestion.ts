import { ChromaDB } from "../modules/chromadb"
import { AskOllama } from "../modules/mistral"
import * as fs from 'fs'

export class AskQuestion {
    static dataCollection: any

    public static async init() {
        this.dataCollection = await ChromaDB.getCollection('data')
    }

    public static async ask(msg: string) {
        try {
            const req = await this.dataCollection.query({
                queryTexts: [msg],
                nResults: 1
            })

            const context = req['documents'][0][0] || "No relevant context found."
            const data = await AskOllama.ask(`Remember, you are Mirabot, ERP support bot. Only answer questions related to ERP system. For non-ERP questions, say: 'Я Mirabot, ERP бот поддержки. Вопрос не связан с ERP, поэтому я не могу помочь.'

Context:\n${context}\n\nQuestion: ${msg}\nAnswer:`)
            return data
        } catch (err) {
            throw err
        }
    }
}