import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const httpServer = createServer(app);
// Determine allowed origins based on environment
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001'
];
if (process.env.CLIENT_URL)
    allowedOrigins.push(process.env.CLIENT_URL);
if (process.env.FRONTEND_URL)
    allowedOrigins.push(process.env.FRONTEND_URL);
console.log('Allowed origins:', allowedOrigins);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST']
    }
});
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Game rooms storage
const gameRooms = new Map();
// WebSocket connection handling
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
    socket.on('join_game', (gameId, playerId) => {
        console.log(`Player ${playerId} joining game ${gameId}`);
        socket.join(`game:${gameId}`);
        // Get or create game room
        if (!gameRooms.has(gameId)) {
            gameRooms.set(gameId, {
                id: gameId,
                players: [],
                status: 'waiting',
                currentPlayer: null
            });
        }
        const game = gameRooms.get(gameId);
        if (!game.players.includes(playerId)) {
            game.players.push(playerId);
        }
        // If 2 players, start game
        if (game.players.length >= 2) {
            game.status = 'in-progress';
            game.currentPlayer = game.players[0];
        }
        // Emit game state to all players in the room
        io.to(`game:${gameId}`).emit('game_started', {
            players: game.players,
            currentPlayer: game.currentPlayer,
            gameStatus: game.status
        });
        io.to(`game:${gameId}`).emit('player_joined', { playerId, players: game.players });
    });
    socket.on('play_move', (gameId, move) => {
        // TODO: Validate move using game-logic
        io.to(`game:${gameId}`).emit('move_made', move);
    });
});
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map