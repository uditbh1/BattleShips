import Player from '../src/player';
import Gameboard from '../src/gameboard';
import Ship from '../src/ship';

describe('Player Class', () => {
  let player;
  let opponent;

  beforeEach(() => {
    // Create new player and opponent for each test
    player = new Player();
    opponent = new Player();
  });

  // Test player initialization (ships and board)
  test('should initialize with a gameboard and ships', () => {
    expect(player.board).toBeInstanceOf(Gameboard);
    expect(player.carrier).toBeInstanceOf(Ship);
    expect(player.battleship).toBeInstanceOf(Ship);
    expect(player.cruiser).toBeInstanceOf(Ship);
    expect(player.submarine).toBeInstanceOf(Ship);
    expect(player.destroyer).toBeInstanceOf(Ship);
  });

  // Test placing ships
  test('should place ships correctly on the board', () => {
    player.placeCarrier(0, 0, 'horizontal');
    player.placeBattleship(1, 0, 'horizontal');
    
    expect(player.board.board[0][0]).toBe(1); // Carrier placed at (0, 0)
    expect(player.board.board[0][1]).toBe(1); // Carrier placed at (0, 1)
    expect(player.board.board[1][0]).toBe(1); // Battleship placed at (1, 0)
    expect(player.board.board[1][1]).toBe(1); // Battleship placed at (1, 1)
  });

  // Test taking a turn and attacking an opponent's board
  test('should correctly attack opponent’s board and mark hit/miss', () => {
    opponent.placeCarrier(0, 0, 'horizontal');
    opponent.placeBattleship(1, 0, 'horizontal');

    // Player attacks opponent's Carrier at (0, 0) - hit
    player.takeTurn(0, 0, opponent.board);
    expect(opponent.board.board[0][0]).toBe(2); // Hit (2 represents a hit)

    // Player attacks opponent's Battleship at (1, 0) - hit
    player.takeTurn(1, 0, opponent.board);
    expect(opponent.board.board[1][0]).toBe(2); // Hit (2 represents a hit)

    // Player attacks an empty spot on the board - miss
    player.takeTurn(9, 9, opponent.board);
    expect(opponent.board.board[9][9]).toBe(-1); // Miss (misses are marked with -1)
  });

  // Test if player has lost when all ships are sunk
  test('should return true when all ships are sunk', () => {
    opponent.placeCarrier(0, 0, 'horizontal');
    // opponent.placeBattleship(1, 0, 'horizontal');
    
    // Attack and sink opponent’s ships
    player.takeTurn(0, 0, opponent.board);
    player.takeTurn(0, 1, opponent.board);
    player.takeTurn(0, 2, opponent.board);
    player.takeTurn(0, 3, opponent.board);
    player.takeTurn(0, 4, opponent.board);
    // player.takeTurn(1, 0, opponent.board);
    // player.takeTurn(1, 1, opponent.board);

    // Check if the opponent has lost (all ships sunk)
    expect(opponent.hasLost()).toBe(true);
  });
  
  test('should return false if player has not lost', () => {
    opponent.placeCarrier(0, 0, 'horizontal');
    opponent.placeBattleship(1, 0, 'horizontal');
    
    // Attack but don't sink all ships
    player.takeTurn(0, 0, opponent.board);
    player.takeTurn(1, 0, opponent.board);
    
    expect(opponent.hasLost()).toBe(false); // Not all ships are sunk yet
  });
});
