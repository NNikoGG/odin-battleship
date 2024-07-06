const Gameboard = () => {
  const BOARD_SIZE = 10;
  const createBoard = () =>
    Array.from({ length: BOARD_SIZE }, (_, y) =>
      Array.from({ length: BOARD_SIZE }, (_, x) => ({
        ship: null,
        index: null,
        isHit: false,
        isTaken: false,
        x,
        y,
      }))
    );

  let board = createBoard();

  const isWithinBounds = (x, y) =>
    x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
  const getTile = (x, y) => (isWithinBounds(x, y) ? board[y][x] : null);
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
      Object.assign(tile, { ship, index: i, isTaken: true });
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

  const receiveAttack = ({ x, y }) => {
    const tile = getTile(x, y);
    if (!tile || tile.isHit) return false;

    tile.isHit = true;
    if (tile.ship) tile.ship.hit(tile.index);
    return true;
  };

  const clearBoard = () => {
    board = createBoard();
  };

  const placeShipsRandomly = ships => {
    const tryPlacement = () => {
      clearBoard();
      return ships.every(ship => {
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const directionKey =
          direction === 'horizontal' ? 'horizontally' : 'vertically';
        const legalMoves = findLegalMoves(ship, direction);
        if (legalMoves.length === 0) return false;

        const { x, y } =
          legalMoves[Math.floor(Math.random() * legalMoves.length)];
        placeShip(ship, { x, y, [directionKey]: true });
        return true;
      });
    };

    while (!tryPlacement()) {
      /* Keep trying until successful */
    }
  };

  const findLegalMoves = (ship, direction) =>
    board.flat().filter(({ x, y }) => canPlaceShip(ship, { x, y, direction }));

  const isAllShipsSunk = () =>
    board.flat().every(tile => !tile.ship || tile.ship.isSunk());

  return {
    get board() {
      return board;
    },
    placeShip,
    receiveAttack,
    placeShipsRandomly,
    isAllShipsSunk,
  };
};

export default Gameboard;
