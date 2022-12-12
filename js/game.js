import { Cell } from "./cell.js";
import { UI } from "./ui.js";
class Game extends UI {
  #config = {
    easy: {
      rows: 8,
      cols: 8,
      mines: 10,
    },
    medium: {
      rows: 16,
      cols: 16,
      mines: 40,
    },
    expert: {
      rows: 16,
      cols: 30,
      mines: 99,
    },
  };

  #numberOfRows = null;
  #numberofCols = null;
  #numberOfMines = null;

  #cells = [];

  #board = null;

  initializeGame() {
    this.#handleElements();
    this.#newGame();
  }

  #newGame(
    rows = this.#config.easy.rows,
    cols = this.#config.easy.cols,
    mines = this.#config.easy.mines
  ) {
    this.#numberOfRows = rows;
    this.#numberofCols = cols;
    this.#numberOfMines = mines;

    this.#generateCells();
    this.#renderBoard();
  }

  #handleElements() {
    this.#board = this.getElement(this.UiSelectors.board);
  }

  #generateCells() {
    for (let row = 0; row < this.#numberOfRows; row++) {
      this.#cells[row] = [];
      for (let col = 0; col < this.#numberofCols; col++) {
        this.#cells[row].push(new Cell(col, row));
      }
    }
  }

  #renderBoard() {
    this.#cells.flat().forEach((cell) => {
      this.#board.insertAdjacentHTML("beforeend", cell.createElement());
      cell.element = cell.getElement(cell.selector);
    });
  }
}

window.onload = function () {
  const game = new Game();

  game.initializeGame();
};
