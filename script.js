const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart-btn");
const messageText = document.getElementById("message");
const board = document.getElementById("board");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.getAttribute("data-cell"));

  if (gameState[cellIndex] !== "" || !gameActive) {
    return;
  }

  placeMark(cell, cellIndex);
  updateGameState(cellIndex);
  checkWin();
  checkDraw();
  swapTurns();
}

function placeMark(cell, cellIndex) {
  cell.textContent = currentPlayer;
  cell.style.color = currentPlayer === "X" ? "#007bff" : "#e31b23";
  gameState[cellIndex] = currentPlayer;
}

function updateGameState(cellIndex) {
  gameState[cellIndex] = currentPlayer;
}

function swapTurns() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      highlightWinningCells(a, b, c);
      messageText.textContent = `${
        currentPlayer === "X" ? "اللاعب X" : "اللاعب O"
      } فاز!`;
      return;
    }
  }
}

function checkDraw() {
  if (!gameState.includes("") && gameActive) {
    gameActive = false;
    messageText.textContent = "تعادل!";
  }
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  messageText.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "#fff";
  });
}

function highlightWinningCells(a, b, c) {
  cells[a].style.backgroundColor = "#7bed9f";
  cells[b].style.backgroundColor = "#7bed9f";
  cells[c].style.backgroundColor = "#7bed9f";
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
