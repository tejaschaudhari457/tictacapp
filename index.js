document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    // Function to handle cell click
    function handleCellClick(index) {
      if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        checkWinner();
        togglePlayer();
      }
    }
  
    // Function to render the game board
    function renderBoard() {
      board.innerHTML = '';
      gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
      });
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    // Function to toggle between players (X and O)
    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    // Function to check for a winner or a tie
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          showResultScreen(`Player ${currentPlayer} wins!`);
          gameActive = false;
          return;
        }
      }
  
      if (!gameBoard.includes('')) {
        showResultScreen('It\'s a tie!');
        gameActive = false;
      }
    }
  
    // Function to show the result screen
    function showResultScreen(message) {
      resultMessage.textContent = message;
      resultScreen.style.display = 'flex';
    }
  
    // Function to hide the result screen
    function hideResultScreen() {
      resultScreen.style.display = 'none';
    }
  
    // Function to start a new game
    function newGame() {
      currentPlayer = 'X';
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      hideResultScreen();
      renderBoard();
    }
  
    // Initial rendering of the game board
    renderBoard();
  });
  