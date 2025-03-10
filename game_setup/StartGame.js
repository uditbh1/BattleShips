
export default function StartGame(Player1, Player2) {
    return new Promise((resolve)=>{

        const body = document.querySelector('body');
        body.innerHTML = ''; // Clear the home screen
        body.innerHTML=`<div class="main-game-container">
        <h2 id="turn-header">Player 1 turn</h2>
        <div class="arena">
            <div class="board-container player1"></div>
            <div class="updatetext"><h2 id="updates"> Start Game </h2></div>
            
            <div class="board-container player2"></div>
        </div>
    </div>
    <script src="./index.js"></script>
    `
    const player1Board = document.querySelector('.board-container.player1');
    const player2Board = document.querySelector('.board-container.player2');
    
    function renderBoard(boardContainer) {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div');
            cell.classList.add('board-cell'); // Add 'board-cell' class
            const x = Math.floor(i / 10);  // Calculate row
            const y = i % 10;              // Calculate column
            cell.dataset.x = x;  // Add data-x attribute
            cell.dataset.y = y;  // Add data-y attribute
            boardContainer.appendChild(cell); // Append cell to the board
           }
        }
        renderBoard(player1Board);
        renderBoard(player2Board);
    
        const turnHeader = document.getElementById('turn-header');
        const update=document.getElementById("updates")
        let currentPlayer = Player1;
        let opponent = Player2;
    
        
    
        // Function to render the board for the current player and opponent
        function renderBoards() {
            renderPlayerBoard(Player1, player1Board, currentPlayer === Player1);
            renderPlayerBoard(Player2, player2Board, currentPlayer === Player2);
        }
    
        // Render player's board and show ships only if it's their turn
        function renderPlayerBoard(player, boardElement, isCurrentTurn) {
            const cells = boardElement.querySelectorAll('.board-cell');
    
            cells.forEach((cell, index) => {
                const x = Math.floor(index / 10);
                const y = index % 10;
    
                cell.classList.remove('placed','hover');
    
                if (player.board.board[x][y] === 1 && isCurrentTurn) {
                    cell.classList.add('placed'); // Show ships only on the current player’s turn
                }
                if (player.board.board[x][y] === 2) {
                    cell.classList.add('success'); // Hit ship
                }
                if (player.board.board[x][y] === -1) {
                    cell.classList.add('fail'); // Missed shot
                }
            });
        }
    
        // Handle attack on opponent's board
        function attack(x, y) {
            try {
                currentPlayer.takeTurn(x, y, opponent.board);
                renderBoards();
    
                if (opponent.hasLost()) {
                    alert(`${currentPlayer === Player1 ? 'Player 1' : 'Player 2'} wins!`);
                    resolve();
                    
                }
    
                switchTurn();
            } catch (error) {
                alert(error.message);
            }
        }
    
        // Switch turns between players
        function switchTurn() {
            [currentPlayer, opponent] = [opponent, currentPlayer];
            turnHeader.textContent = `${currentPlayer === Player1 ? 'Player 1' : 'Player 2'} turn`;
            renderBoards();
        }
    
        // Add hover effect and click events for opponent's board
        function addHoverEffect(boardElement) {
            boardElement.addEventListener('mouseover', (e) => {
                const cell = e.target;
                if (!cell.classList.contains('board-cell')) return;
    
                const index = Array.from(boardElement.children).indexOf(cell);
                const x = Math.floor(index / 10);
                const y = index % 10;
    
                // Only allow hover effect on opponent's board
                if (currentPlayer === Player1 && boardElement === player2Board) {
                    
                        cell.classList.add('hover');
                    
                } else if (currentPlayer === Player2 && boardElement === player1Board) {
                    
                        cell.classList.add('hover');
                    
                }
            });
    
            boardElement.addEventListener('mouseout', (e) => {
                const cell = e.target;
                cell.classList.remove('hover');
            });
        }
    
        // Handle click events to attack
        function addClickEvent(boardElement) {
            boardElement.addEventListener('click', (e) => {
                const cell = e.target;
                if (!cell.classList.contains('board-cell')) return;
    
                const index = Array.from(boardElement.children).indexOf(cell);
                const x = Math.floor(index / 10);
                const y = index % 10;
    
                // Prevent clicks on own board
                if ((currentPlayer === Player1 && boardElement === player1Board) ||
                    (currentPlayer === Player2 && boardElement === player2Board)) {
                    alert("You cannot attack your own board.");
                    return;
                }
    
                // Prevent clicking on already attacked cells
                if (opponent.board.board[x][y] === -1 || opponent.board.board[x][y] === 2) {
                    alert("You cannot attack an already attacked cell.");
                    return;
                }
                if(opponent.board.board[x][y] === 1){
                    if(currentPlayer===Player1){
                        update.textContent="Player 1 Hit Success"
                    }
                    else{
                        update.textContent="Player 2 Hit Success"
                    }
                }
                if(opponent.board.board[x][y] === 0){
                    if(currentPlayer===Player1){
                        update.textContent="Player 1 Miss"
                    }
                    else{
                        update.textContent="Player 2 Miss"
                    }
                }
    
                attack(x, y);
            });
        }
    
        // Add event listeners for hover and click events for both player and opponent boards
        addHoverEffect(player1Board);
        addHoverEffect(player2Board);
        addClickEvent(player1Board);
        addClickEvent(player2Board);
    
        // Initial render
        renderBoards();
    })
}
