import dotenv from 'dotenv';
import { MiraBot } from './src/modules/telegram';
import { Ollama } from './src/modules/ollama';

// Load environment variables from .env file
dotenv.config();

async function boot() {
    console.log("Starting up Telegram bot...");

    try {
        // Initialize Ollama service
        await Ollama.initOllama();
        
        // Initialize Telegram bot
        await MiraBot.bot();
        
        console.log("Bot is running successfully!");
    } catch (error) {
        console.error("Failed to start bot:", error);
        process.exit(1);
    }
}

boot()