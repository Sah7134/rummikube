import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

interface GameState {
  players: string[];
  currentPlayer: string;
  gameStatus: string;
}

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerId, setPlayerId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Determine server URL dynamically based on current domain
    let serverUrl = (import.meta as any).env.VITE_SERVER_URL;
    
    if (!serverUrl || serverUrl.includes('localhost')) {
      // In production, replace frontend domain with backend domain
      const currentHost = window.location.hostname;
      if (currentHost.includes('rummikube-frontend')) {
        serverUrl = 'https://rummikube-backend.onrender.com';
      } else if (!currentHost.includes('localhost')) {
        // Assume backend has same domain pattern
        serverUrl = `https://${currentHost.replace('frontend', 'backend')}`;
      } else {
        serverUrl = 'http://localhost:4000';
      }
    }
    
    console.log('🔌 Connecting to server:', serverUrl);
    console.log('📍 Current hostname:', window.location.hostname);
    
    const socketInstance = io(serverUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling']
    });

    socketInstance.on('connect', () => {
      console.log('✅ Connected to server');
      const id = `player-${Date.now()}`;
      setPlayerId(id);
      setIsConnected(true);
    });

    socketInstance.on('connect_error', (error: any) => {
      console.error('❌ Connection error:', error);
    });

    socketInstance.on('game_started', (state: GameState) => {
      console.log('🎮 Game started:', state);
      setGameState(state);
      setLoading(false);
    });

    socketInstance.on('player_joined', (data: any) => {
      console.log('👤 Player joined:', data);
    });

    socketInstance.on('disconnect', () => {
      console.log('⛔ Disconnected from server');
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleJoinGame = (gameId: string) => {
    if (socket && isConnected) {
      console.log('Joining game:', gameId, 'Player:', playerId);
      setLoading(true);
      socket.emit('join_game', gameId, playerId);
    } else {
      alert('Connecting to server... Please try again.');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Rummikube Multiplayer</h1>
        <p>Player ID: {playerId}</p>
      </header>
      <main>
        {!gameState ? (
          <div className="lobby">
            <h2>Game Lobby</h2>
            <p>Status: {isConnected ? '✅ Connected' : '⏳ Connecting...'}</p>
            <p>Your ID: {playerId || 'Generating...'}</p>
            <button 
              onClick={() => handleJoinGame('game-1')}
              disabled={!isConnected || loading}
            >
              {loading ? 'Joining...' : 'Join Game 1'}
            </button>
          </div>
        ) : (
          <div className="game">
            <h2>Game in Progress</h2>
            <div className="game-info">
              <p>Players: {gameState.players.join(', ')}</p>
              <p>Current Player: {gameState.currentPlayer}</p>
              <p>Status: {gameState.gameStatus}</p>
            </div>
            <div className="game-board">
              <div className="player-hand">
                <h3>Your Hand</h3>
                {/* Tiles will be displayed here */}
              </div>
              <div className="game-table">
                <h3>Table</h3>
                {/* Melds will be displayed here */}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
