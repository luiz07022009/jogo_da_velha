let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function makeMove(cell) {
    const index = Array.from(cell.parentNode.children).indexOf(cell);
    if (board[index] !== '' || !gameActive) {
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById('message').textContent = `Jogador ${board[a]} venceu!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes('')) {
        document.getElementById('message').textContent = 'Empate!';
        gameActive = false;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('message').textContent = '';
}