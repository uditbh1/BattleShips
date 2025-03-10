import Gameboard from '../src/gameboard.js'; 
import Ship from '../src/ship.js';  

describe('gameboard',()=>{
    //////////////////placeship////////////////////////////////////
    test('places a ship at the given coordinates', () => {
        const board = new Gameboard;
        const ship = new Ship(3, 'horizontal');
    
        board.placeShips(ship, 0, 0);
    
        expect(board.ships.length).toBe(1);
        expect(board.ships[0]).toEqual({
            ship,
            start: { x: 0, y: 0 },
            end: { x: 0, y: 2 }
        });

        // Check if the board is correctly updated with the ship's positions
        expect(board.board[0][0]).toBe(1);  // Ship should be placed at (0, 0)
        expect(board.board[0][1]).toBe(1);  // Ship should be placed at (0, 1)
        expect(board.board[0][2]).toBe(1);  // Ship should be placed at (0, 2)
        expect(board.board[1][0]).toBe(0);  // Position (1, 0) should be empty
    })
    test('does not allow ship to be placed out of bounds horizontally', () => {
        const board = new Gameboard;
        const ship = new Ship(5, 'horizontal');
    
        expect(()=>board.placeShips(ship, 0, 8)).toThrow('Ship goes out of bounds horizontally');
    })
    test('does not allow ship to be placed out of bounds vertically', () => {
        const board = new Gameboard;
        const ship = new Ship(5, 'vertical');
    
        expect(()=>board.placeShips(ship, 8, 0)).toThrow('Ship goes out of bounds vertically');
    })
    test('does not allow ships to overlap', () => {
        const board = new Gameboard;
        const ship1 = new Ship(3, 'horizontal');
        const ship2 = new Ship(4, 'vertical');
    
        board.placeShips(ship1, 0, 0);
        
        expect(()=>board.placeShips(ship2, 0, 0)).toThrow('Ships cannot overlap');
    });
    ////////////////////recieveattack///////////////////////////
    test('registers a hit on a ship horizontal', () => {
        const board = new Gameboard();
        const ship = new Ship(3, 'horizontal');
        board.placeShips(ship, 0, 0);
        board.recieveAttack(0, 1);
        expect(ship.hits).toBe(1);
        expect(board.hitShots).toContainEqual({ x: 0, y: 1 });
    });
    test('registers a hit on a ship vertical', () => {
        const board = new Gameboard();
        const ship = new Ship(3, 'vertical');
        board.placeShips(ship, 0, 0);
        board.recieveAttack(1, 0);
        expect(ship.hits).toBe(1);
        expect(board.hitShots).toContainEqual({ x: 1, y: 0 });
    });
    test('registers a miss when no ship is hit', () => {
        const board = new Gameboard();
        const ship = new Ship(3, 'horizontal');
        board.placeShips(ship, 0, 0);
        board.recieveAttack(5, 5);
        expect(ship.hits).toBe(0);
        expect(board.missedShots).toContainEqual({ x: 5, y: 5 });
    });
    test('does not allow attacking the same position twice', () => {
        const board = new Gameboard();
        const ship = new Ship(3, 'horizontal');
    
        board.placeShips(ship, 0, 0);
    
        // Attack the same position twice
        board.recieveAttack(0, 1);
    
        expect(() => board.recieveAttack(0, 1)).toThrow('This position has already been attacked');
    });
    test('calls the ship’s hit method the right number of times', () => {
        const board = new Gameboard();
        const ship = new Ship(3, 'horizontal');
    
        board.placeShips(ship, 0, 0);
    
        // Hit multiple times
        board.recieveAttack(0, 0);
        board.recieveAttack(0, 1);
    
        // Ship should have 2 hits
        expect(ship.hits).toBe(2);
    });
    test('registers hits and misses correctly with multiple ships', () => {
        const board = new Gameboard();
        const ship1 = new Ship(3, 'horizontal');
        const ship2 = new Ship(4, 'vertical');
    
        board.placeShips(ship1, 0, 0);
        board.placeShips(ship2, 2, 2);
    
        // Hit Ship 1
        board.recieveAttack(0, 1);
        expect(ship1.hits).toBe(1);
        expect(ship2.hits).toBe(0);
        expect(board.hitShots).toContainEqual({ x: 0, y: 1 });
    
        // Hit Ship 2
        board.recieveAttack(4, 2);
        expect(ship2.hits).toBe(1);
        expect(board.hitShots).toContainEqual({ x: 4, y: 2 });
    
        // Miss
        board.recieveAttack(9, 9);
        expect(board.missedShots).toContainEqual({ x: 9, y: 9 });
    });
    ///////////////////////allsunk/////////////////////////
    test('returns true when all ships are sunk', () => {
        const board = new Gameboard();
        const ship1 = new Ship(2, 'horizontal');
        const ship2 = new Ship(3, 'horizontal');
    
        board.placeShips(ship1, 0, 0);
        board.placeShips(ship2, 5, 5);
    
        // Hit all positions of ship1
        board.recieveAttack(0, 0);
        board.recieveAttack(0, 1);
    
        // Hit all positions of ship2
        board.recieveAttack(5, 5);
        board.recieveAttack(5, 6);
        board.recieveAttack(5, 7);
    
        expect(board.allShipsSunk()).toBe(true);
    });
    test('returns false when at least one ship is not sunk', () => {
        const board = new Gameboard();
        const ship1 = new Ship(2, 'horizontal');
        const ship2 = new Ship(3, 'horizontal');
    
        board.placeShips(ship1, 0, 0);
        board.placeShips(ship2, 5, 5);
    
        // Hit all positions of ship1
        board.recieveAttack(0, 0);
        board.recieveAttack(0, 1);
    
        // Hit only part of ship2
        board.recieveAttack(5, 5);
    
        expect(board.allShipsSunk()).toBe(false);
    });
    test('returns false when no ships are sunk', () => {
        const board = new Gameboard();
        const ship1 = new Ship(2, 'horizontal');
        const ship2 = new Ship(3, 'horizontal');
    
        board.placeShips(ship1, 0, 0);
        board.placeShips(ship2, 5, 5);
    
        // No attacks yet
        expect(board.allShipsSunk()).toBe(false);
    });
    test('returns true when there are no ships', () => {
        const board = new Gameboard();
    
        expect(board.allShipsSunk()).toBe(true);
    });
        
    
})

