let grid = [];
for (let i = 0; i < 20; i++) {
    grid[i] = [];
    for (let j = 0; j < 20; j++) {
        grid[i][j] = "[o]";
    }
}

for (let count = 0; count < 10;) {
    let row = Math.floor(Math.random() * 20);
    let col = Math.floor(Math.random() * 20);

    if (grid[row][col] === "[o]") {
        grid[row][col] = "[X]";
        count++;
    }
}

for (let g = 0; g < 20; g++) {
    console.log(grid[g].join(","));
}
