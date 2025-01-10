let currentPlayer = localStorage.getItem('currentPlayer') || 'X';
let board = JSON.parse(localStorage.getItem('board')) || ['', '', '', '', '', '', '', '', ''];
let gameActive = JSON.parse(localStorage.getItem('gameActive')) || true;

// Função para atualizar a mensagem de vez do jogador
function updateTurnMessage() {
    document.getElementById('current-player').textContent = currentPlayer;
}

function makeMove(cell) {
    const index = Array.from(cell.parentNode.children).indexOf(cell);
    if (board[index] !== '' || !gameActive) {
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    // Atualiza a mensagem de vez do jogador
    updateTurnMessage();
    
    // Salva o estado do jogo no localStorage
    saveGameState();
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
            saveGameState();
            return;
        }
    }

    if (!board.includes('')) {
        document.getElementById('message').textContent = 'Empate!';
        gameActive = false;
        saveGameState();
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('message').textContent = '';
    
    // Atualiza a mensagem de vez do jogador
    updateTurnMessage();
    
    // Limpa o estado do jogo no localStorage
    localStorage.removeItem('board');
    localStorage.removeItem('currentPlayer');
    localStorage.removeItem('gameActive');
}

function saveGameState() {
    localStorage.setItem('board', JSON.stringify(board));
    localStorage.setItem('currentPlayer', currentPlayer);
    localStorage.setItem('gameActive', JSON.stringify(gameActive));
}

// Carrega o estado do jogo ao carregar a página
window.onload = function() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
    document.getElementById('message').textContent = gameActive ? '' : (board.includes('') ? '' : 'Empate!');
    
    // Atualiza a mensagem de vez do jogador ao carregar a página
    updateTurnMessage();
};
