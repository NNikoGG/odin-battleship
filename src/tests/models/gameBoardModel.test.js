const Gameboard = require('../../models/gameBoardModel');

describe('Gameboard', () => {
  let board;
  beforeEach(() => {
    board = new Gameboard();
  });

  test('can place ships at specific coordinates', () => {
    board.placeShip(
      4,
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
      ],
      'horizontal'
    );
    expect(board.ships.length).toBe(1);
    expect(board.ships[0].coordinates).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ]);
  });

  test('records a miss if attack hits an empty spot', () => {
    board.receiveAttack(1, 1);
    expect(board.misses).toContainEqual({ x: 1, y: 1 });
  });

  test('records a hit if attack hits a ship', () => {
    board.placeShip(
      3,
      [
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 2, y: 4 },
      ],
      'horizontal'
    );
    expect(board.receiveAttack(2, 3)).toBeTruthy();
    expect(board.ships[0].hits).toContainEqual(true);
  });

  test('checks if all ships are sunk', () => {
    board.placeShip(1, [{ x: 0, y: 0 }], 'horizontal');
    board.receiveAttack(0, 0);
    expect(board.allShipsSunk()).toBe(true);
  });
});
