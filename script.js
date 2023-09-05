const currentPlayer = document.querySelector(".currentPlayer");
const playerXWinsDisplay = document.querySelector(".playerXWins");
const playerOWinsDisplay = document.querySelector(".playerOWins");
const toggleModeButton = document.querySelector("#toggleMode");

let selected;
let player = "X";
let playerXWins = 0;
let playerOWins = 0;
let gameMode = "player-vs-player"; // Modo inicial: jogador contra jogador

let positions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function init() {
  selected = Array(9).fill("");

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });

  updateScoreDisplay();
}

function newMove(e) {
  const index = e.target.getAttribute("data-i");

  if (selected[index] || checkWin()) return;

  selected[index] = player;
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);

  if (checkWin()) {
    alert(`O JOGADOR '${player}' GANHOU!`);
    updateScore();
    init();
    return;
  }

  if (selected.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    init();
    return;
  }

  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  if (gameMode === "player-vs-computer" && player === "O") {
    // Se o modo for "jogador vs. computador" e for a vez do computador (O), faça a jogada do computador.
    makeComputerMove();
  }
}

function checkWin() {
  for (const [a, b, c] of positions) {
    if (selected[a] && selected[a] === selected[b] && selected[a] === selected[c]) {
      return true;
    }
  }
  return false;
}

function updateScore() {
  if (player === "X") {
    playerXWins++;
  } else {
    playerOWins++;
  }
}

function updateScoreDisplay() {
  playerXWinsDisplay.textContent = `Vitórias de X: ${playerXWins}`;
  playerOWinsDisplay.textContent = `Vitórias de O: ${playerOWins}`;
}

toggleModeButton.addEventListener("click", () => {
  // Função para alternar entre os modos de jogo
  gameMode = gameMode === "player-vs-player" ? "player-vs-computer" : "player-vs-player";
  init();

  if (gameMode === "player-vs-computer" && player === "O") {
    // Se o modo for "jogador vs. computador" e for a vez do computador (O), faça a jogada do computador.
    makeComputerMove();
  }
});

function makeComputerMove() {
  if (gameMode === "player-vs-computer" && player === "O" && !checkWin()) {
    const emptyCells = selected.map((value, index) => (value ? null : index));
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMoveIndex = emptyCells[randomIndex];

    if (computerMoveIndex !== null) {
      selected[computerMoveIndex] = player;
      const button = document.querySelector(`[data-i="${computerMoveIndex}"]`);
      button.innerHTML = player;
      button.removeEventListener("click", newMove);

      if (checkWin()) return;

      player = player === "X" ? "O" : "X";
      currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
    }
  }
}

init();
