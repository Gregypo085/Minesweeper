console.log("index.js loaded");

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
    if (grid[row][col] === "[o]") {
        grid[row][col] = "[X]";
        placed++;
    }
}

// 3) Compute neighbor counts for non-mine cells
const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
];
const inBounds = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE;

for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
        if (grid[i][j] === "[X]") continue;
        let neighbors = 0;
        for (const [di, dj] of directions) {
            const r = i + di, c = j + dj;
            if (inBounds(r, c) && grid[r][c] === "[X]") neighbors++;
        }
        grid[i][j] = `[${neighbors}]`;
    }
}

// Render buttons into #board based on SIZE
const board = document.getElementById('board');

function buildBoardFromGrid(grid) {
    board.innerHTML = '';
    // Make CSS columns match SIZE even if CSS file still says 4 or 20
    board.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;

    const frag = document.createDocumentFragment();
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'cell';
            btn.id = `r${r}c${c}`;
            btn.dataset.row = r;
            btn.dataset.col = c;
            btn.setAttribute('role', 'gridcell');
            btn.setAttribute('aria-label', `r${r}c${c}`);

            // DEBUG: show the grid value to verify wiring, then remove later
            // btn.textContent = grid[r][c];

            frag.appendChild(btn);
        }
    }
    board.appendChild(frag);
}

buildBoardFromGrid(grid);
// === NEW ^

// (Optional) keep console print while testing
for (let g = 0; g < SIZE; g++) {
    console.log(grid[g].join(","));
}