import Gameboard from '../src/gameboard';
import Ship from '../src/ship';

export default class Player {
    constructor() {
        this.board = new Gameboard();
        this.carrier = new Ship(5); 
        this.battleship = new Ship(4); 
        this.cruiser = new Ship(3); 
        this.submarine = new Ship(3); 
        this.destroyer = new Ship(2);
    }
    reset(){
        this.board = new Gameboard();
        this.carrier = new Ship(5); 
        this.battleship = new Ship(4); 
        this.cruiser = new Ship(3); 
        this.submarine = new Ship(3); 
        this.destroyer = new Ship(2);
    }


    // Place Carrier (this can be called interactively based on user input)
    placeCarrier(x,y,direction) {
        this.carrier.direction=direction
        this.board.placeShips(this.carrier, x, y, direction);
    }
    
    // Place Battleship
    placeBattleship(x,y,direction) {
        this.battleship.direction=direction
        this.board.placeShips(this.battleship, x, y, direction);
    }
    
    // Place Cruiser
    placeCruiser(x,y,direction) {
        this.cruiser.direction=direction
        this.board.placeShips(this.cruiser, x, y, direction);
    }
    
    // Place Submarine
    placeSubmarine(x,y,direction) {
        this.submarine.direction=direction
        this.board.placeShips(this.submarine, x, y, direction);
    }
    
    // Place Destroyer
    placeDestroyer(x,y,direction) {
        this.destroyer.direction=direction
        this.board.placeShips(this.destroyer, x, y, direction);
    }

    // Take a turn and attack an opponent's board
    takeTurn(x, y, opponentBoard) {
        opponentBoard.recieveAttack(x, y);
    }

    // Check if all ships are sunk (indicating the player lost)
    hasLost() {
        return this.board.allShipsSunk();
    }
}
