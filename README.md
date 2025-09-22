# AI Telegram Bot (Mira Bot)

AI-powered Telegram bot that uses Ollama for generating intelligent responses.

## Features

- 🤖 AI-powered responses using Ollama
- ⚡ Fast response times with local AI model
- 🔧 TypeScript for type safety
- 📦 Yarn for efficient package management

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Ollama installed and running locally
- Telegram bot token

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ai-telegram
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your TELEGRAM_BOT_TOKEN
   ```

4. Make sure Ollama is running with the Mistral model:
   ```bash
   ollama run mistral
   ```

## Usage

### Development
```bash
yarn dev
```

### Production
```bash
yarn build
yarn start
```

## Project Structure

```
├── index.ts                 # Main entry point
├── modules/
│   ├── telegram.ts         # Telegram bot initialization
│   └── ollama.ts           # Ollama AI integration
├── scripts/
│   └── answerQuestion.ts   # Question answering logic
├── package.json
├── tsconfig.json
└── .env                    # Environment variables (not in repo)
```

## Environment Variables

- `TELEGRAM_BOT_TOKEN` - Your Telegram bot token from @BotFather

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.