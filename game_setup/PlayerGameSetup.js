export default function PlayerGameSetup(player,num) {
    return new Promise((resolve)=>{
        const body = document.querySelector('body');
        body.innerHTML = ''; // Clear the home screen
    
        // Render the game setup screen
        body.innerHTML = `
            <div class="game-setup-container">
                <h2>Player ${num}: Place Your Ships</h2>
                <div class="game-container">
                    <div id="board" class="board-container"></div>
                    <div class="ship-selection">
                        <h3>Select Ships:</h3>
                        <button class="ship-btn" data-ship="carrier" data-length="5">Carrier (5)</button>
                        <button class="ship-btn" data-ship="battleship" data-length="4">Battleship (4)</button>
                        <button class="ship-btn" data-ship="cruiser" data-length="3">Cruiser (3)</button>
                        <button class="ship-btn" data-ship="submarine" data-length="3">Submarine (3)</button>
                        <button class="ship-btn" data-ship="destroyer" data-length="2">Destroyer (2)</button>
                    </div>
                    <div class="direction-toggle"> 
                        <span>Direction: </span>
                        <button id="toggle-direction">Horizontal</button>
                    </div>
                    <button id="ready-btn" disabled>Ready</button>
                </div>
            </div>
        `;
    
        const board = document.getElementById('board');
        const shipButtons = document.querySelectorAll('.ship-btn');
        const toggleDirectionBtn = document.getElementById('toggle-direction');
        const readyBtn = document.getElementById('ready-btn');
    
        let selectedShip = null;
        let shipLength = 0;
        let direction = 'horizontal';
        const placedShips = [];
    
        // Create 10x10 board
        function createBoard() {
            board.innerHTML = ''; 
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    const cell = document.createElement('div');
                    cell.classList.add('board-cell');
                    cell.dataset.x = i;
                    cell.dataset.y = j;
    
                    // Hover effect for placing ships
                    cell.addEventListener('mouseover', () => previewPlacement(i, j));
                    cell.addEventListener('mouseout', clearPreview);
    
                    // Place ship on click
                    cell.addEventListener('click', () => placeShip(i, j));
    
                    board.appendChild(cell);
                }
            }
        }
    
        createBoard();
    
        // Ship selection
        shipButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                selectedShip = e.target.dataset.ship;
                shipLength = Number(e.target.dataset.length);
    
                // Highlight selected ship button
                shipButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });
    
        // Toggle direction (horizontal/vertical)
        toggleDirectionBtn.addEventListener('click', () => {
            direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
            toggleDirectionBtn.textContent = direction.charAt(0).toUpperCase() + direction.slice(1);
        });
    
        // Preview ship placement
        function previewPlacement(x, y) {
            if (!selectedShip) return;
    
            const cells = getShipCells(x, y);
    
            cells.forEach(cell => {
                if (cell) cell.classList.add('preview');
            });
        }
    
        // Clear preview
        function clearPreview() {
            document.querySelectorAll('.board-cell').forEach(cell => cell.classList.remove('preview'));
        }
    
        // Get ship's cells based on position and direction
        function getShipCells(x, y) {
            const cells = [];
    
            for (let i = 0; i < shipLength; i++) {
                const targetX = direction === 'horizontal' ? x : x + i;
                const targetY = direction === 'horizontal' ? y + i : y;
                if (targetX >= 10 || targetY >= 10) {
                    // Make sure the ship doesn't go out of bounds
                    return [];
                }
    
                const cell = document.querySelector(`.board-cell[data-x="${targetX}"][data-y="${targetY}"]`);
                cells.push(cell);
            }
    
            return cells;
        }
    
        // Place ship on the board
        function placeShip(x, y) {
            if (!selectedShip) return;
    
            const cells = getShipCells(x, y);
    
            // Check if ship fits on the board and no overlap
            if (cells.some(cell => !cell || cell.classList.contains('occupied'))) {
                alert('Invalid placement!');
                return;
            }
    
            // Place ship visually and in gameboard logic
            cells.forEach(cell => cell.classList.add('occupied'));

            if(selectedShip==="carrier"){
                try{
                    player.placeCarrier(x,y,direction)
                }
                catch(error){
                    alert(error.message)
                    return;
                }
            }
            else if(selectedShip==="battleship"){
                try{
                    player.placeBattleship(x,y,direction)
                }
                catch(error){
                    alert(error.message)
                    return;
                }
            }
            else if(selectedShip==="cruiser"){
                try{
                    player.placeCruiser(x,y,direction)
                }
                catch(error){
                    alert(error.message)
                    return;
                }
            }
            else if(selectedShip==="submarine"){
                try{
                    player.placeSubmarine(x,y,direction)
                }
                catch(error){
                    alert(error.message)
                    return;
                }
            }
            else if(selectedShip==="destroyer"){
                try{
                    player.placeDestroyer(x,y,direction)
                }
                catch(error){
                    alert(error.message)
                    return;
                }
            }
    
            // player.board.placeShips({ name: selectedShip, length: shipLength, direction }, x, y);
    
            placedShips.push(selectedShip);
    
            // Disable ship button after placement
            document.querySelector(`[data-ship="${selectedShip}"]`).disabled = true;
            document.querySelector(`[data-ship="${selectedShip}"]`).classList.remove("selected")
    
            selectedShip = null;
            shipLength = 0;
    
            // Enable ready button if all ships are placed
            if (placedShips.length === 5) readyBtn.disabled = false;
        }
        readyBtn.addEventListener("click",()=>{
            resolve();
        })

    })
}
