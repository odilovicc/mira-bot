import dotenv from 'dotenv';
import { MiraBot } from './modules/telegram';
import { Ollama } from './modules/ollama';

// Load environment variables from .env file
dotenv.config();

async function boot() {
    console.log("Starting up Telegram bot...");

    try {
        // Initialize Ollama service
        await Ollama.initOllama();
        
        // Initialize and start Telegram bot
        await MiraBot.initBot();
        
        console.log("Bot is running successfully!");
    } catch (error) {
        console.error("Failed to start bot:", error);
        process.exit(1);
    }
}

boot()