#!/bin/bash

# Kill any existing bot processes
echo "Stopping existing bot processes..."
pkill -f "ts-node index.ts" 2>/dev/null || true
pkill -f "node.*index" 2>/dev/null || true
pkill -f "nodemon.*index" 2>/dev/null || true

# Wait a moment for processes to stop
sleep 2

echo "Starting the bot..."
yarn start