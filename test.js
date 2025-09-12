// minesweeper_terminal.js
const readline = require('readline');

const SIZE = 10;
const MINES = 3;

// Create empty grids
const grid = [];
const revealed = [];
const flagged = [];

// Helper to check bounds
const withinBounds = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE;

// Calculate neighbor counts
const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
];

// Initialize board: Reset, Place MINES, Count neighbors
function initialize() {
    // Reset all grids
    for (let i = 0; i < SIZE; i++) {
        grid[i] = [];
        revealed[i] = [];
        flagged[i] = [];
        for (let j = 0; j < SIZE; j++) {
            grid[i][j] = 0;
            revealed[i][j] = false;
            flagged[i][j] = false;
        }
    }

    // Place mines randomly
    let placed = 0;
    while (placed < MINES) {
        const row = Math.floor(Math.random() * SIZE);
        const col = Math.floor(Math.random() * SIZE);
        if (grid[row][col] !== 'X') {
            grid[row][col] = 'X';
            placed++;
        }
    }

    // Loop through every cell in grid
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {

            // Skip cells with mines; they keep X
            if (grid[r][c] === 'X') continue;
            let count = 0;

            // Check all 8 neighboring cells using directions
            for (const [dr, dc] of directions) {
                const nr = r + dr, nc = c + dc;

                // If neighbor is withinBounds and a mine, increment count
                if (withinBounds(nr, nc) && grid[nr][nc] === 'X') count++;
            }

            // Assign the count of neighboring mines to this cell
            grid[r][c] = count;
        }
    }

    // Reset game state
    gameOver = false;
}

// Uses directions to reveal connected 0s 
function floodFill(row, col) {
    if (!withinBounds(row, col)) return;
    if (revealed[row][col] || flagged[row][col]) return;

    revealed[row][col] = true;

    if (grid[row][col] !== 0) return;

    for (const [dr, dc] of directions) {
        floodFill(row + dr, col + dc);
    }
}

// Win condition: Check if all non-mine cells have been revealed
function checkWin() {
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (grid[r][c] !== 'X' && !revealed[r][c]) {
                return false;
            }
        }
    }
    return true;
}

// Render grid as ASCII
function renderGrid() {
    let output = '   ' + [...Array(SIZE).keys()].join(' ') + '\n';

    for (let r = 0; r < SIZE; r++) {
        let row = `${r} `;
        for (let c = 0; c < SIZE; c++) {
            if (flagged[r][c]) {
                row += ' F';
            } else if (!revealed[r][c]) {
                row += ' .';
            } else {
                const val = grid[r][c];
                row += val === 0 ? ' |' : ` ${val}`;
            }
        }
        output += row + '\n';
    }

    console.clear(); // Clear the console to redraw the updated grid cleanly
    console.log(output); // Display the grid
}

// Input loop setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Track game state
let gameOver = false;

function promptMove() {
    rl.question('Enter move (e.g. "3 5", "flag 2 7", or "r" to restart): ', handleInput);
}

function promptRestart() {
    rl.question('Type "r" to restart', handleInput);
}

// Handle user input
function handleInput(input) {
    input = input.trim().toLowerCase(); // Normalize input for comparison

    //Allow restart anytime
    if (input === 'r') {
        restartGame();
        return;
    }

    // Restart option after loss or win
    if (gameOver) {
        if (input === 'r') {
            restartGame();
        } else {
            console.log("Can't you read? Type 'r' to restart.");
            promptRestart();
        }
        return;
    }

    const parts = input.split(/\s+/); // Split input into parts

    if (parts[0] === 'flag') {
        const row = parseInt(parts[1]);
        const col = parseInt(parts[2]);
        if (withinBounds(row, col)) {
            flagged[row][col] = !flagged[row][col]; // Toggle flag
        } else {
            console.log('Invalid coordinates');
        }
    } else {
        const row = parseInt(parts[0]);
        const col = parseInt(parts[1]);
        if (withinBounds(row, col)) {

            // Loss condition: Check if user hit a mine
            if (grid[row][col] === 'X') {
                revealed[row][col] = true;
                gameOver = true;
                renderGrid();
                console.log("You get nothing. You lose. Good day sir!");
                promptRestart();
                return;
            }

            // Reveal the tile
            if (grid[row][col] === 0) {
                floodFill(row, col); // Reveal connected 0s
            } else {
                revealed[row][col] = true;
            }

            // Win condition check
            if (checkWin()) {
                gameOver = true;
                renderGrid();
                console.log("You win!");
                promptRestart();
                return;
            }

        } else {
            console.log('Invalid coordinates');
        }
    }

    renderGrid(); // Show updated grid after each valid move
    promptMove(); // Prompt for the next move
}

function restartGame() {
    initialize();
    renderGrid();
    promptMove();
}

// Initial render and start loop
initialize();
renderGrid();
promptMove();
