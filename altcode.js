console.log("altcode.js loaded");

const SIZE = 20;   // Board dimensions (rows and columns)
const MINES = 10;  // How many mines to place

// 0) Guardrail: ensure config is possible (can't have more mines than cells)
if (MINES > SIZE * SIZE) {
    throw new Error(`MINES (${MINES}) exceeds grid capacity (${SIZE * SIZE}).`);
}

// 1) Build an empty SIZE×SIZE grid; "[o]" marks an empty cell
const grid = [];
for (let i = 0; i < SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < SIZE; j++) {
        grid[i][j] = "[o]";
    }
}

// 2) Place exactly MINES mines ("[X]") at unique random positions
let placed = 0;
while (placed < MINES) {
    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);

    // Only place if the target cell is still empty
    if (grid[row][col] === "[o]") {
        grid[row][col] = "[X]";
        placed++;
    }
    // If not empty, loop continues and tries another random cell
}

// 3) For every non-mine cell, compute how many adjacent mines it touches
// Look at the 8 surrounding cells (N, NE, E, SE, S, SW, W, NW).
const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
];

// Helper: stays readable when checking edges/corners
const inBounds = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE;

// Walk every cell; skip mines; count neighboring mines; write the count back
for (let i = 0; i < SIZE; i++) {       // i = row
    for (let j = 0; j < SIZE; j++) {     // j = column
        if (grid[i][j] === "[X]") continue;  // Leave mines as-is

        let neighbors = 0;
        for (const [di, dj] of directions) {
            const r = i + di;
            const c = j + dj;
            // Only count if the neighbor is on the board and is a mine
            if (inBounds(r, c) && grid[r][c] === "[X]") {
                neighbors++;
            }
        }

        // Replace empty marker "[o]" with bracketed count: "[0]".."[8]"
        grid[i][j] = `[${neighbors}]`;
    }
}


// 4) Print the board (one row per line, cells comma-separated)
for (let g = 0; g < SIZE; g++) {
    console.log(grid[g].join(","));
}