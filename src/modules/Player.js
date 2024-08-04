const Player = (options = {}) => {
  let isMyTurn = false;
  const isAI = options.isAI || false;
  const hitTilesAI = [];

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  const changeTurn = () => {
    isMyTurn = !isMyTurn;
  };

  const getAdjacentTiles = (tile, gameboard) => {
    const { x, y } = tile;
    const directions = [
      { dx: 0, dy: -1, name: 'up' },
      { dx: 1, dy: 0, name: 'right' },
      { dx: 0, dy: 1, name: 'down' },
      { dx: -1, dy: 0, name: 'left' },
    ];

    return directions
      .map(({ dx, dy, name }) => {
        const newX = clamp(x + dx, 0, 9);
        const newY = clamp(y + dy, 0, 9);
        return newX !== x || newY !== y
          ? { tile: gameboard.board[newY][newX], direction: name }
          : null;
      })
      .filter(Boolean);
  };

  const hitRandomAdjacentTile = (tile, gameboard) => {
    const availableTiles = getAdjacentTiles(tile, gameboard).filter(
      ({ tile }) => !tile.isHit
    );

    if (availableTiles.length > 0) {
      const randomTile =
        availableTiles[Math.floor(Math.random() * availableTiles.length)].tile;
      gameboard.receiveAttack({ x: randomTile.x, y: randomTile.y });
      return randomTile;
    }
    return null;
  };

  const findAndHitInLine = (tile, gameboard, isVertical) => {
    const coord = isVertical ? 'y' : 'x';
    const otherCoord = isVertical ? 'x' : 'y';
    const directions = [-1, 1];

    for (const direction of directions) {
      const newCoord = clamp(tile[coord] + direction, 0, 9);
      if (newCoord !== tile[coord]) {
        const target = isVertical
          ? gameboard.board[newCoord][tile.x]
          : gameboard.board[tile.y][newCoord];

        if (!target.isHit) {
          gameboard.receiveAttack({
            [coord]: newCoord,
            [otherCoord]: tile[otherCoord],
          });
          return target;
        }
      }
    }
    return null;
  };

  const playMoveAI = gameboard => {
    if (
      !isMyTurn ||
      !gameboard ||
      typeof gameboard !== 'object' ||
      Array.isArray(gameboard)
    ) {
      throw new Error('Invalid turn state or gameboard');
    }

    const hitShipTiles = hitTilesAI.filter(tile => tile.ship);

    // Try to hit adjacent to previously hit ships
    for (const tile of hitShipTiles) {
      const adjacentHits = getAdjacentTiles(tile, gameboard).filter(
        ({ tile }) => tile.isHit && tile.ship
      );

      if (adjacentHits.length > 0) {
        const isVertical =
          adjacentHits[0].direction === 'up' ||
          adjacentHits[0].direction === 'down';
        const hitTile = findAndHitInLine(tile, gameboard, isVertical);
        if (hitTile) return recordHit(hitTile);
      } else {
        const hitTile = hitRandomAdjacentTile(tile, gameboard);
        if (hitTile) return recordHit(hitTile);
      }
    }

    // Random shot if no hits or all adjacent tiles are already hit
    const notHitTiles = gameboard.board.flat().filter(tile => !tile.isHit);
    const randomTile =
      notHitTiles[Math.floor(Math.random() * notHitTiles.length)];
    gameboard.receiveAttack({ x: randomTile.x, y: randomTile.y });
    return recordHit(randomTile);
  };

  const recordHit = tile => {
    hitTilesAI.push(tile);
    return { x: tile.x, y: tile.y };
  };

  return {
    get isMyTurn() {
      return isMyTurn;
    },
    get isAI() {
      return isAI;
    },
    changeTurn,
    playMoveAI,
  };
};

export default Player;
