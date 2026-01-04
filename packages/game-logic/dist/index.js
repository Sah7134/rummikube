/**
 * Validate if a tile combination forms a valid meld
 */
export function validateMeld(tiles) {
    if (tiles.length < 3) {
        return { valid: false, error: 'Meld must contain at least 3 tiles' };
    }
    // Check if it's a run (consecutive numbers, same color)
    const isRun = isValidRun(tiles);
    if (isRun) {
        return { valid: true };
    }
    // Check if it's a group (same number, different colors)
    const isGroup = isValidGroup(tiles);
    if (isGroup) {
        return { valid: true };
    }
    return { valid: false, error: 'Tiles do not form a valid meld' };
}
/**
 * Check if tiles form a valid run
 */
function isValidRun(tiles) {
    if (tiles.length < 3)
        return false;
    // All must be same color
    const color = tiles[0].color;
    if (!tiles.every(t => t.color === color)) {
        return false;
    }
    // Must be consecutive numbers
    const sortedNumbers = tiles
        .map(t => (t.isJoker ? 0 : t.number))
        .sort((a, b) => a - b);
    // Check for consecutive (jokers can fill gaps)
    for (let i = 0; i < sortedNumbers.length - 1; i++) {
        const diff = sortedNumbers[i + 1] - sortedNumbers[i];
        if (diff > 1)
            return false; // Non-consecutive
    }
    return true;
}
/**
 * Check if tiles form a valid group
 */
function isValidGroup(tiles) {
    if (tiles.length < 3)
        return false;
    // All must have same number
    const numbers = tiles.map(t => (t.isJoker ? tiles[0].number : t.number));
    if (!numbers.every(n => n === numbers[0])) {
        return false;
    }
    // All must have different colors
    const colors = tiles.map(t => t.color);
    return colors.length === new Set(colors).size;
}
/**
 * Calculate score of a tile or meld
 */
export function calculateScore(tiles) {
    return tiles.reduce((sum, tile) => {
        if (tile.isJoker)
            return sum + 30;
        return sum + tile.number;
    }, 0);
}
/**
 * Check if player has won
 */
export function checkWinCondition(hand) {
    return hand.length === 0;
}
/**
 * Initialize game state
 */
export function initializeGameState(gameId, players) {
    const tilePool = createTilePool();
    // Deal 14 tiles to each player
    players.forEach(player => {
        player.hand = [];
        for (let i = 0; i < 14; i++) {
            const index = Math.floor(Math.random() * tilePool.length);
            player.hand.push(tilePool[index]);
            tilePool.splice(index, 1);
        }
    });
    return {
        id: gameId,
        players,
        currentPlayerIndex: 0,
        tilePool,
        discardPile: [],
        melds: [],
        status: 'in-progress'
    };
}
/**
 * Create initial tile pool (104 tiles total)
 */
function createTilePool() {
    const pool = [];
    const colors = [
        'red',
        'blue',
        'yellow',
        'black'
    ];
    // Create 2 sets of tiles (numbers 1-13, 4 colors each)
    for (let set = 0; set < 2; set++) {
        for (let number = 1; number <= 13; number++) {
            for (const color of colors) {
                pool.push({ number, color, isJoker: false });
            }
        }
    }
    // Add jokers (2 per color)
    for (const color of colors) {
        pool.push({ number: 0, color, isJoker: true });
        pool.push({ number: 0, color, isJoker: true });
    }
    return pool;
}
//# sourceMappingURL=index.js.map