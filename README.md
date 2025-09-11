# Terminal Minesweeper

A text-based Minesweeper game playable directly in the terminal using Node.js. Navigate the grid, flag suspected mines, and try to clear the board without detonating any!

## Features

- 10x10 grid with 3 randomly placed mines
- Flagging and unflagging functionality
- Recursive reveal of empty regions (flood fill)
- ASCII-based UI with dynamic updates
- Input via terminal (row/col commands)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/minesweeper-terminal.git
   cd minesweeper-terminal
## Development Notes

- The core game logic is in `minesweeper_terminal.js`.
- **Ignore `learn.js` and `test.js`** — they are experimental/dev files not part of the main game.
