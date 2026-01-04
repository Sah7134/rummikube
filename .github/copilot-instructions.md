# Rummikube Multiplayer Game - Development Guidelines

## Project Overview
Multiplayer Rummikube web application with real-time synchronization using WebSocket.

## Architecture
- **Frontend**: React with drag-and-drop tile management
- **Backend**: Node.js/Express with Socket.IO WebSocket
- **Game Logic**: Shared TypeScript validation module
- **Database**: PostgreSQL for users and game states
- **Auth**: JWT-based authentication

## Key Principles
1. **Server-Authoritative**: All moves validated on server before broadcasting
2. **Real-time Sync**: Event-driven game state updates via WebSocket
3. **Type Safety**: TypeScript across all packages
4. **Monorepo**: Shared game logic between client and server

## Development Workflow
1. Make changes to appropriate package
2. Test within that package
3. For shared logic changes, rebuild game-logic module
4. Test full integration across frontend/backend

## Package-Specific Notes

### packages/game-logic
- Core rules: tile validation, meld checking, win conditions
- No external dependencies (pure game logic)
- Export main classes and validation functions

### packages/backend
- WebSocket room-based game management
- Move validation using game-logic
- Database persistence (PostgreSQL)
- User authentication (JWT tokens)

### packages/frontend
- React components for UI
- Real-time updates from WebSocket
- Optimistic UI for tile moves
- Drag-and-drop tile manipulation
