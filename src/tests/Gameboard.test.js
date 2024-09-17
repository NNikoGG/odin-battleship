import Gameboard from '../modules/Gameboard';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = Gameboard();
  });

  test('Gameboard factory function returns an object', () => {
    expect(typeof gameboard).toBe('object');
  });

  test('Returned object has required properties and methods', () => {
    expect(gameboard.board).toBeDefined();
    expect(typeof gameboard.placeShip).toBe('function');
    expect(typeof gameboard.receiveAttack).toBe('function');
    expect(typeof gameboard.isAllShipsSunk).toBe('function');
    expect(typeof gameboard.placeShipsRandomly).toBe('function');
  });

  test('Board is a 10x10 grid of tile objects', () => {
    expect(gameboard.board.length).toBe(10);
    gameboard.board.forEach(row => {
      expect(row.length).toBe(10);
      row.forEach(tile => {
        expect(typeof tile).toBe('object');
      });
    });
  });
});
