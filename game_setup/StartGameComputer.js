export default function StartGameComputer(Player1, Computer) {
    return new Promise((resolve) => {
        const body = document.querySelector('body');
        body.innerHTML = ''; // Clear the home screen
        body.innerHTML = `
            <div class="main-game-container">
                <h2 id="turn-header">Player 1's Turn</h2>
                <div class="arena">
                    <div class="board-container player1"></div>
                    <div class="updatetext"><h2 id="updates">Start Game</h2></div>
                    <div class="board-container computer"></div>
                </div>
            </div>
        `;

        const player1Board = document.querySelector('.board-container.player1');
        const computerBoard = document.querySelector('.board-container.computer');

        function renderBoard(boardContainer) {
            for (let i = 0; i < 100; i++) {
                const cell = document.createElement('div');
                cell.classList.add('board-cell');
                const x = Math.floor(i / 10);
                const y = i % 10;
                cell.dataset.x = x;
                cell.dataset.y = y;
                boardContainer.appendChild(cell);
            }
        }

        renderBoard(player1Board);
        renderBoard(computerBoard);

        const turnHeader = document.getElementById('turn-header');
        const update = document.getElementById('updates');
        let currentPlayer = Player1;
        let opponent = Computer;

        // Function to render boards
        function renderBoards() {
            renderPlayerBoard(Player1, player1Board); // Always show Player1's ships
            renderComputerBoard(Computer, computerBoard); // Always show hits/misses on Computer board
        }

        // Render Player1's board (ships + hits/misses always visible)
        function renderPlayerBoard(player, boardElement) {
            const cells = boardElement.querySelectorAll('.board-cell');

            cells.forEach((cell, index) => {
                const x = Math.floor(index / 10);
                const y = index % 10;

                cell.classList.remove('placed');

                if (player.board.board[x][y] === 1) {
                    cell.classList.add('placed'); // Player1's ships always visible
                }
                if (player.board.board[x][y] === 2) {
                    cell.classList.add('success'); // Hit (success) always visible
                }
                if (player.board.board[x][y] === -1) {
                    cell.classList.add('fail'); // Miss (fail) always visible
                }
            });
        }

        // Render Computer's board (only hits/misses visible, ships hidden)
        function renderComputerBoard(computer, boardElement) {
            const cells = boardElement.querySelectorAll('.board-cell');

            cells.forEach((cell, index) => {
                const x = Math.floor(index / 10);
                const y = index % 10;

                if (computer.board.board[x][y] === 2) {
                    cell.classList.add('success'); // Hit (success) always visible
                }
                if (computer.board.board[x][y] === -1) {
                    cell.classList.add('fail'); // Miss (fail) always visible
                }
            });
        }

        // Handle attack
        function attack(x, y) {
            try {
                currentPlayer.takeTurn(x, y, opponent.board);
                renderBoards();

                if (opponent.hasLost()) {
                    alert(currentPlayer === Player1 ? 'Player 1 wins!' : 'Computer wins!');
                    resolve();
                    return;
                }

                switchTurn();
                if (currentPlayer === Computer) {
                    setTimeout(computerTurn, 1000); // Add delay for computer move
                }
            } catch (error) {
                alert(error.message);
            }
        }

        // Computer's turn
        function computerTurn() {
            let x, y;
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while (Player1.board.board[x][y] === -1 || Player1.board.board[x][y] === 2);

            Computer.takeTurn(x, y, Player1.board);
            renderBoards();

            if (Player1.hasLost()) {
                alert('Computer wins!');
                resolve();
                return;
            }

            switchTurn();
        }

        // Switch turn between Player1 and Computer
        function switchTurn() {
            [currentPlayer, opponent] = [opponent, currentPlayer];
            turnHeader.textContent = currentPlayer === Player1 ? "Player 1's Turn" : "Computer's Turn";
        }

        // Add hover effect on Computer board only
        function addHoverEffect(boardElement) {
            boardElement.addEventListener('mouseover', (e) => {
                const cell = e.target;
                if (!cell.classList.contains('board-cell')) return;

                if (currentPlayer === Player1 && boardElement === computerBoard) {
                    cell.classList.add('hover');
                }
            });

            boardElement.addEventListener('mouseout', (e) => {
                const cell = e.target;
                cell.classList.remove('hover');
            });
        }

        // Add click event for Player1's attack on Computer board
        function addClickEvent(boardElement) {
            boardElement.addEventListener('click', (e) => {
                const cell = e.target;
                if (!cell.classList.contains('board-cell')) return;

                const x = Number(cell.dataset.x);
                const y = Number(cell.dataset.y);

                if (currentPlayer !== Player1) return; // Only Player1 can click

                if (opponent.board.board[x][y] === -1 || opponent.board.board[x][y] === 2) {
                    alert('You already attacked this cell!');
                    return;
                }

                attack(x, y);
            });
        }

        addHoverEffect(computerBoard);
        addClickEvent(computerBoard);

        renderBoards();
    });
}
