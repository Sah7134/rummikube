/**
 * Tile - represents a single Rummikube tile
 */
export interface Tile {
    number: number;
    color: 'red' | 'blue' | 'yellow' | 'black';
    isJoker: boolean;
}
/**
 * Meld - a valid combination of tiles
 * Can be a run (consecutive same color) or a group (same number different colors)
 */
export interface Meld {
    id: string;
    tiles: Tile[];
    type: 'run' | 'group';
}
/**
 * GameState - represents the current state of the game
 */
export interface GameState {
    id: string;
    players: Player[];
    currentPlayerIndex: number;
    tilePool: Tile[];
    discardPile: Tile[];
    melds: Meld[];
    status: 'waiting' | 'in-progress' | 'finished';
    winner?: string;
}
export interface Player {
    id: string;
    name: string;
    hand: Tile[];
    hasOpened: boolean;
}
/**
 * Move - represents a player action
 */
export interface Move {
    type: 'draw' | 'add' | 'create' | 'end-turn';
    playerId: string;
    tiles?: Tile[];
    meldId?: string;
}
/**
 * Validate if a tile combination forms a valid meld
 */
export declare function validateMeld(tiles: Tile[]): {
    valid: boolean;
    error?: string;
};
/**
 * Calculate score of a tile or meld
 */
export declare function calculateScore(tiles: Tile[]): number;
/**
 * Check if player has won
 */
export declare function checkWinCondition(hand: Tile[]): boolean;
/**
 * Initialize game state
 */
export declare function initializeGameState(gameId: string, players: Player[]): GameState;
//# sourceMappingURL=index.d.ts.map