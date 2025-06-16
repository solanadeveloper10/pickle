# Clicker Game API

A simple clicker game API with MongoDB integration and leaderboard functionality.

## Prerequisites

- Node.js
- MongoDB (running locally or a MongoDB Atlas connection)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Make sure MongoDB is running locally or update the connection string in `server.js` to point to your MongoDB instance.

3. Start the server:

```bash
node server.js
```

The server will run on port 3000 by default.

## API Endpoints

### Connect Wallet

- **POST** `/api/connect`
- **Body**: `{ "walletAddress": "your-solana-wallet-address" }`
- **Response**: Player data and connection status

### Click

- **POST** `/api/click`
- **Body**:

```json
{
  "walletAddress": "your-wallet-address",
  "clicks": 1
}
```

- **Response**: Updated player data including score and total clicks

### Get Player Stats

- **GET** `/api/stats/:walletAddress`
- **Response**: Player's current stats (score, clicks, last click time)

### Get Leaderboard

- **GET** `/api/leaderboard`
- **Response**: Top 100 players sorted by score

## Features

- MongoDB database integration
- Automatic player creation on first click
- Real-time leaderboard
- Player statistics tracking

## Security

- Wallet verification on each request
- Rate limiting for clicks
- Input validation for wallet addresses

## Database Schema

### Player

- `walletAddress` (String, unique): Player's wallet address
- `score` (Number): Total score
- `clicks` (Number): Total number of clicks
- `lastClick` (Date): Timestamp of last click
- `createdAt` (Date): Account creation timestamp
- `updatedAt` (Date): Last update timestamp
