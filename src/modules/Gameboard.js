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
    console.log(`Attempting attack at (${x}, ${y}):`, tile); // Debug log

    if (!tile) {
      console.log('Invalid coordinates');
      return false;
    }

    if (tile.isHit) {
      console.log('Already hit');
      return false;
    }

    tile.isHit = true;
    if (tile.ship) {
      console.log('Hit ship');
      tile.ship.hit(tile.index);
    } else {
      console.log('Missed');
      missedAttacks.push({ x, y });
    }
    return true;
  };

  const isTileTaken = (x, y) => getTile(x, y)?.isTaken || false;

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

  const placeShip = (ship, options = {}) => {
    const { x, y, direction } = validateAndNormalizeOptions(ship, options);

    const placementStrategies = {
      horizontal: () => placeShipInDirection(ship, x, y, i => [x + i, y]),
      vertical: () => placeShipInDirection(ship, x, y, i => [x, y + i]),
    };

    placementStrategies[direction]();
  };

  const validateAndNormalizeOptions = (ship, options) => {
    const { x, y, horizontally, vertically } = options;

    if (x === undefined || y === undefined) {
      throw new Error('Specify both x and y coordinates');
    }

    if (
      (horizontally === undefined && vertically === undefined) ||
      (horizontally && vertically)
    ) {
      throw new Error('Specify one ship placement direction');
    }

    const direction = horizontally ? 'horizontal' : 'vertical';
    const endX = direction === 'horizontal' ? x + ship.length - 1 : x;
    const endY = direction === 'vertical' ? y + ship.length - 1 : y;

    if (!isWithinBounds(x, y) || !isWithinBounds(endX, endY)) {
      throw new Error('Ship placement out of bounds');
    }

    if (!canPlaceShip(ship, { x, y, direction })) {
      throw new Error('Cannot place ship on this square');
    }

    return { x, y, direction };
  };

  const placeShipInDirection = (ship, startX, startY, getCoordinates) => {
    for (let i = 0; i < ship.length; i++) {
      const [x, y] = getCoordinates(i);
      const tile = getTile(x, y);
      if (tile) {
        tile.ship = ship;
        tile.index = i;
        tile.isTaken = true;
      }
    }
    markAdjacentTiles(ship, startX, startY, getCoordinates);
  };

  const markAdjacentTiles = (ship, startX, startY, getCoordinates) => {
    for (let i = -1; i <= ship.length; i++) {
      const [x, y] = getCoordinates(i);
      [-1, 0, 1].forEach(dx =>
        [-1, 0, 1].forEach(dy => {
          const tile = getTile(x + dx, y + dy);
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

  const findLegalMoves = (ship, direction) =>
    board.flat().filter(tile => {
      const { x, y } = tile;
      return canPlaceShip(ship, { x, y, direction });
    });

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

  return {
    get board() {
      return board;
    },
    placeShip,
    receiveAttack,
    placeShipsRandomly,
    isAllShipsSunk,
    getMissedAttacks,
  };
};

export default Gameboard;
