# Rummikube Multiplayer Web Game

A real-time multiplayer Rummikube game for playing with friends online.

## Architecture

This is a monorepo with three main packages:

- **packages/backend**: Node.js/Express server with WebSocket (Socket.IO)
- **packages/frontend**: React web application
- **packages/game-logic**: Shared TypeScript game logic module

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
# Start all services in development mode
npm run dev
```

### Building

```bash
# Build all packages
npm run build
```

## Project Structure

```
rummikube/
├── packages/
│   ├── backend/          # Express server + WebSocket
│   ├── frontend/         # React app
│   └── game-logic/       # Core game logic (TypeScript)
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## Features (Roadmap)

### MVP
- [x] Project setup
- [ ] Game logic engine
- [ ] Backend server with WebSocket
- [ ] React UI with tile management
- [ ] User authentication
- [ ] 2-player multiplayer
- [ ] Game lobby and matchmaking

### Phase 2
- [ ] 3-4 player support
- [ ] Reconnection handling
- [ ] Move history

### Phase 3
- [ ] Statistics and leaderboards
- [ ] Game replays
- [ ] Chat system
