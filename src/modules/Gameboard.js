const Gameboard = () => {
  const board = Array(10)
    .fill()
    .map((_, y) =>
      Array(10)
        .fill()
        .map((_, x) => ({ x, y, isHit: false, ship: null, isTaken: false }))
    );
  const missedAttacks = [];

  const isWithinBounds = (x, y) => x >= 0 && x < 10 && y >= 0 && y < 10;

  const getTile = (x, y) => {
    if (isWithinBounds(x, y)) {
      return board[y][x];
    }
    return null;
  };

  const receiveAttack = ({ x, y }) => {
    const tile = getTile(x, y);

    if (!tile) {
      return false;
    }

    if (tile.isHit) {
      return false;
    }

    tile.isHit = true;
    if (tile.ship) {
      tile.ship.hit(tile.index);
    } else {
      missedAttacks.push({ x, y });
    }
    return true;
  };

  const placeShip = (ship, options) => {
    const { x, y, horizontally, vertically } = options;

    if (!horizontally && !vertically) {
      throw new Error('Ship must be placed either horizontally or vertically');
    }

    const direction = horizontally ? 'horizontal' : 'vertical';

    if (!canPlaceShip(ship, { x, y, direction })) {
      throw new Error('Cannot place ship at specified coordinates');
    }

    for (let i = 0; i < ship.length; i++) {
      const tileX = horizontally ? x + i : x;
      const tileY = vertically ? y + i : y;
      const tile = getTile(tileX, tileY);
      tile.ship = ship;
      tile.index = i;
      tile.isTaken = true;
    }

    // Mark adjacent tiles as taken
    for (let i = -1; i <= ship.length; i++) {
      const checkX = horizontally ? x + i : x;
      const checkY = vertically ? y + i : y;
      [-1, 0, 1].forEach(dx =>
        [-1, 0, 1].forEach(dy => {
          const tile = getTile(checkX + dx, checkY + dy);
          if (tile) tile.isTaken = true;
        })
      );
    }
  };

  const placeShipsRandomly = ships => {
    const maxAttempts = 1000;
    let attempts = 0;

    const tryPlacement = () => {
      clearBoard();
      return ships.every(ship => {
        let placed = false;
        for (let i = 0; i < 100 && !placed; i++) {
          const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
          const directionKey =
            direction === 'horizontal' ? 'horizontally' : 'vertically';
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          try {
            placeShip(ship, { x, y, [directionKey]: true });
            placed = true;
          } catch (error) {
            // Placement failed, try again
          }
        }
        return placed;
      });
    };

    while (!tryPlacement()) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error('Unable to place ships after maximum attempts');
      }
    }
  };

  const canPlaceShip = (ship, { x, y, direction }) => {
    for (let i = 0; i < ship.length; i++) {
      const tileX = direction === 'horizontal' ? x + i : x;
      const tileY = direction === 'vertical' ? y + i : y;
      if (!isWithinBounds(tileX, tileY) || isTileTaken(tileX, tileY)) {
        return false;
      }
    }
    return true;
  };

  const isTileTaken = (x, y) => {
    const tile = getTile(x, y);
    return tile ? tile.isTaken : false;
  };

  const isAllShipsSunk = () =>
    board.flat().every(tile => !tile.ship || tile.ship.isSunk());

  const clearBoard = () => {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        board[y][x] = { isHit: false, ship: null, isTaken: false };
      }
    }
  };

  const getMissedAttacks = () => [...missedAttacks];

  const isHit = ({ x, y }) => {
    const tile = getTile(x, y);
    return tile && tile.isHit && tile.ship !== null;
  };

  const getAvailableMoves = () => {
    return board.flat().filter(tile => !tile.isHit);
  };

  return {
    get board() {
      return board;
    },
    placeShip,
    receiveAttack,
    placeShipsRandomly,
    isAllShipsSunk,
    getMissedAttacks,
    isHit,
    getAvailableMoves,
  };
};

export default Gameboard;
