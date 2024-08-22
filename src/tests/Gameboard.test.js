import Gameboard from '../modules/Gameboard';
import Ship from '../modules/Ship';

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
        expect(tile).toHaveProperty('ship', null);
        expect(tile).toHaveProperty('index', null);
        expect(tile).toHaveProperty('isHit', false);
        expect(tile).toHaveProperty('isTaken', false);
        expect(tile).toHaveProperty('x');
        expect(tile).toHaveProperty('y');
      });
    });
  });

  test('Tile coordinates are correct', () => {
    gameboard.board.forEach((row, y) => {
      row.forEach((tile, x) => {
        expect(tile.x).toBe(x);
        expect(tile.y).toBe(y);
      });
    });
  });
  describe('placeShip', () => {
    const mockShip = length => ({ length, hit: jest.fn() });

    test('Places ship horizontally', () => {
      const ship = mockShip(4);
      gameboard.placeShip(ship, { x: 0, y: 0, horizontally: true });

      for (let i = 0; i < 4; i++) {
        expect(gameboard.board[0][i].ship).toBe(ship);
        expect(gameboard.board[0][i].index).toBe(i);
        expect(gameboard.board[0][i].isTaken).toBe(true);
      }
    });

    test('Places ship vertically', () => {
      const ship = mockShip(3);
      gameboard.placeShip(ship, { x: 0, y: 0, vertically: true });

      for (let i = 0; i < 3; i++) {
        expect(gameboard.board[i][0].ship).toBe(ship);
        expect(gameboard.board[i][0].index).toBe(i);
        expect(gameboard.board[i][0].isTaken).toBe(true);
      }
    });

    test('Allows placing ships adjacent to each other', () => {
      const ship1 = mockShip(3);
      const ship2 = mockShip(3);
      gameboard.placeShip(ship1, { x: 0, y: 0, horizontally: true });
      expect(() =>
        gameboard.placeShip(ship2, { x: 0, y: 1, horizontally: true })
      ).not.toThrow();
    });

    test('Throws error when trying to place overlapping ships', () => {
      const ship1 = mockShip(3);
      const ship2 = mockShip(3);
      gameboard.placeShip(ship1, { x: 0, y: 0, horizontally: true });
      expect(() =>
        gameboard.placeShip(ship2, { x: 1, y: 0, vertically: true })
      ).toThrow();
    });

    test('Throws error when placement is invalid', () => {
      expect(() =>
        gameboard.placeShip(mockShip(4), {
          x: 9,
          y: 0,
          horizontally: true,
        })
      ).toThrow();
      expect(() =>
        gameboard.placeShip(mockShip(4), { x: 0, y: 9, vertically: true })
      ).toThrow();
      expect(() => gameboard.placeShip(mockShip(4), { x: 0, y: 0 })).toThrow();
    });
  });
  describe('receiveAttack', () => {
    test('Records hit on empty tile', () => {
      expect(gameboard.receiveAttack({ x: 0, y: 0 })).toBe(true);
      expect(gameboard.board[0][0].isHit).toBe(true);
    });

    test('Records hit on ship and calls ship.hit()', () => {
      const ship = { length: 3, hit: jest.fn() };
      gameboard.placeShip(ship, { x: 0, y: 0, horizontally: true });
      expect(gameboard.receiveAttack({ x: 1, y: 0 })).toBe(true);
      expect(ship.hit).toHaveBeenCalledWith(1);
    });

    test('Returns false for repeated attack', () => {
      gameboard.receiveAttack({ x: 0, y: 0 });
      expect(gameboard.receiveAttack({ x: 0, y: 0 })).toBe(false);
    });
  });
  describe('isAllShipsSunk', () => {
    test('Returns true when all ships are sunk', () => {
      const ship1 = Ship(2);
      const ship2 = Ship(3);
      // Ensure no overlapping coordinates
      gameboard.placeShip(ship1, { x: 0, y: 0, horizontally: true });
      gameboard.placeShip(ship2, { x: 0, y: 2, horizontally: true });

      // Attacks to sink all parts of the ships
      [0, 1].forEach(x => gameboard.receiveAttack({ x, y: 0 }));
      [0, 1, 2].forEach(x => gameboard.receiveAttack({ x, y: 2 }));

      expect(gameboard.isAllShipsSunk()).toBe(true);
    });

    test('Returns false when not all ships are sunk', () => {
      const ship1 = Ship(2);
      const ship2 = Ship(3);
      // Ensure no overlapping coordinates
      gameboard.placeShip(ship1, { x: 0, y: 0, horizontally: true });
      gameboard.placeShip(ship2, { x: 0, y: 2, horizontally: true });

      // Attacks to sink parts of the ships
      [0, 1].forEach(x => gameboard.receiveAttack({ x, y: 0 }));
      [0].forEach(x => gameboard.receiveAttack({ x, y: 2 }));

      expect(gameboard.isAllShipsSunk()).toBe(false);
    });
  });
  describe('placeShipsRandomly', () => {
    test('Places all ships on the board', () => {
      const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
      gameboard.placeShipsRandomly(ships);

      const placedShips = gameboard.board
        .flat()
        .filter(tile => tile.ship !== null);
      expect(placedShips.length).toBe(17); // Sum of ship lengths

      const shipLengths = new Set(placedShips.map(tile => tile.ship.length));
      expect(shipLengths).toEqual(new Set([5, 4, 3, 2]));
    });
  });
});
