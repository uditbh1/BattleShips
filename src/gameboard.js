// import Ship from "./ship"
export default class Gameboard{
    constructor(){
        this.board = Array(10).fill().map(() => Array(10).fill(0))
        this.missedShots=[]
        this.hitShots=[]
        this.ships=[];
    }
    placeShips(ship, x, y) {
        // Check if the ship fits on the board (out of bounds check)
        if (ship.direction === 'horizontal' && y + ship.length > 10) {
            throw new Error('Ship goes out of bounds horizontally');
        }
        if (ship.direction === 'vertical' && x + ship.length > 10) {
            throw new Error('Ship goes out of bounds vertically');
        }

        // Check for overlap
        for (let i = 0; i < ship.length; i++) {
            const checkX = ship.direction === 'horizontal' ? x : x + i;  // x stays constant for horizontal
            const checkY = ship.direction === 'horizontal' ? y + i : y;  // y changes for horizontal
            // y stays constant for vertical, and x changes
            if (this.board[checkX][checkY] !== 0) {
                throw new Error('Ships cannot overlap');
            }
        }

        // Place the ship on the board (mark positions with 1)
        for (let i = 0; i < ship.length; i++) {
            const placeX = ship.direction === 'horizontal' ? x : x + i;  // x stays constant for horizontal
            const placeY = ship.direction === 'horizontal' ? y + i : y;  // y changes for horizontal
            // y stays constant for vertical, and x changes
            this.board[placeX][placeY] = 1; // Mark with '1' (ship present)
        }

        // Store ship's position and coordinates (start and end)
        const start = { x, y };
        const end = ship.direction === 'horizontal'
            ? { x, y: y + ship.length - 1 }
            : { x: x + ship.length - 1, y };

        this.ships.push({ ship, start, end });
    }
    recieveAttack(x,y){
        if (this.board[x][y] === -1 || this.board[x][y] === 2) {
            throw new Error('This position has already been attacked');
        }
        if(this.board[x][y]===1){
            let hit = false;
            for (let i = 0; i < this.ships.length; i++) {
                const { ship, start, end } = this.ships[i];
                
                // Check if the attack is within the ship's coordinates
                if (x >= start.x && x <= end.x && y >= start.y && y <= end.y) {
                    // It's a hit, so mark the ship as hit
                    ship.hit();
                    this.board[x][y] = 2;  // Mark as ship hit on the board (2 for hit)
                    this.hitShots.push({ x, y });  // Record the hit shot
                    hit = true;
                    break;
                }
            }
        }
        if(this.board[x][y]===0){
            this.board[x][y] = -1;  // Mark as miss on the board
            this.missedShots.push({ x, y });  // Record the missed shot
        }
    }
    allShipsSunk(){
        return this.ships.every(({ ship }) => ship.isSunk());
    }
}