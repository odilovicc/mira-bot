import { ChromaClient } from "chromadb";
import * as fs from 'fs'

export class ChromaDB {
    public static client = new ChromaClient({
        port: 8000
    })

    public static async getCollection(name: string) {
        return await this.client.getOrCreateCollection({
            name,
            embeddingFunction: undefined
        })
    }

    static async teach() {
        const file = fs.readFileSync('./mirabot-model/datasets/data.txt', 'utf-8')
        const policies = file.toString().split('---').map(line => line.trim()).filter(line => line.length > 0)

        const dataCollection = await ChromaDB.getCollection('data')
        await dataCollection.add({
            documents: policies,
            ids: policies.map((_, idx) => `policy-${Date.now()}-${idx}`),
            metadatas: policies.map((_, i) => ({
                line: i.toString()
            }))
        })
    }
}