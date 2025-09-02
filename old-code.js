let grid = [];
for (let i = 0; i < 20; i++) {
    grid[i] = [];
    for (let j = 0; j < 20; j++) {
        grid[i][j] = "[]";
    }
}
grid[0][0] = "C";
grid[0][1] = "H";
grid[0][2] = "R";
grid[0][3] = "I";
grid[0][4] = "S";
for (let i = 0; i < 20; i++) {
    console.log(grid[i].join(","));
}
console.log("")
for (let g = 0; g < 20; g++) {
    grid[g] = [];
    for (let h = 0; h < 20; h++) {
        grid[g][h] = "[]";
    }
}
grid[0][0] = "G";
grid[0][1] = "R";
grid[0][2] = "E";
grid[0][3] = "G";
for (let g = 0; g < 20; g++) {
    console.log(grid[g].join(","));
}