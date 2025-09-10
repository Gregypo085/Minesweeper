// minesweeper_terminal.js
const readline = require('readline');

const SIZE = 10;
const MINES = 3;

// Create empty grids
const grid = [];
const revealed = [];
const flagged = [];

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

// Helper to check bounds
const withinBounds = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE;

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

// Calculate neighbor counts
const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
];

for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
        if (grid[r][c] === 'X') continue;
        let count = 0;
        for (const [dr, dc] of directions) {
            const nr = r + dr, nc = c + dc;
            if (withinBounds(nr, nc) && grid[nr][nc] === 'X') count++;
        }
        grid[r][c] = count;
    }
}

// Render grid as ASCII
function renderGrid() {
    let output = '    ' + [...Array(SIZE).keys()].join(' ') + '\n';
    output += '   ' + '-'.repeat(SIZE * 2) + '\n';

    for (let r = 0; r < SIZE; r++) {
        let row = `${r} |`;
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

    console.clear();
    console.log(output);
}

// Input loop setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptMove() {
    rl.question('Enter move (e.g. "3 5" or "flag 2 7". To unflag, simply reflag the same row and column. Ctrl + c to exit): ', handleInput);
}

// Uses direction to reveal connected 0s 
function floodFill(row, col) {
    if (!withinBounds(row, col)) return;
    if (revealed[row][col] || flagged[row][col]) return;

    revealed[row][col] = true;

    if (grid[row][col] !== 0) return;

    for (const [dr, dc] of directions) {
        floodFill(row + dr, col + dc);
    }
}

function handleInput(input) {
    const parts = input.trim().split(/\s+/);

    if (parts[0] === 'flag') {
        const row = parseInt(parts[1]);
        const col = parseInt(parts[2]);
        if (withinBounds(row, col)) {
            flagged[row][col] = !flagged[row][col];
        } else {
            console.log('Invalid coordinates');
        }
    } else {
        const row = parseInt(parts[0]);
        const col = parseInt(parts[1]);
        if (withinBounds(row, col)) {
            if (grid[row][col] === 0) {
                floodFill(row, col);
            } else {
                revealed[row][col] = true;
            }
            console.log('Invalid coordinates');
        }
    }

    renderGrid();
    promptMove();
}

// Initial render and start loop
renderGrid();
promptMove();
