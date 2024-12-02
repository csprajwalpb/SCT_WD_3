const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const resetButton = document.getElementById('reset');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsComputerButton = document.getElementById('player-vs-computer');

let currentPlayer = 'X';
let gameMode = 'PvP';
let gameActive = true;
let boardState = Array(9).fill('');

// Winning combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Game mode selection
playerVsPlayerButton.addEventListener('click', () => {
    gameMode = 'PvP';
    resetGame();
    statusMessage.textContent = "Player X's turn";
});

playerVsComputerButton.addEventListener('click', () => {
    gameMode = 'PvC';
    resetGame();
    statusMessage.textContent = "Player X's turn";
});

// Cell click event
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

// Handle cell clicks
function handleCellClick(cell, index) {
    if (!gameActive || boardState[index]) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        statusMessage.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell)) {
        statusMessage.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    if (gameMode === 'PvC' && currentPlayer === 'X') {
        currentPlayer = 'O';
        setTimeout(computerMove, 500); // Computer delay for better UX
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Computer's move (random logic for simplicity)
function computerMove() {
    const availableCells = boardState
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    handleCellClick(cells[randomIndex], randomIndex);
}

// Check for a win
function checkWin() {
    return winningCombos.some(combo =>
        combo.every(index => boardState[index] === currentPlayer)
    );
}

// Reset game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    boardState.fill('');
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    statusMessage.textContent = gameMode === 'PvP' ? "Player X's turn" : "Choose a game mode to start!";
}
