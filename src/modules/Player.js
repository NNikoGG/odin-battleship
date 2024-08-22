const Player = (options = {}) => {
  const isAI = options.isAI || false;
  const hitTilesAI = [];
  let gameboard;

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
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10) {
          return { tile: gameboard.board[newY][newX], direction: name };
        }
        return null;
      })
      .filter(Boolean);
  };

  const playMoveAI = enemyGameboard => {
    if (
      !enemyGameboard ||
      typeof enemyGameboard !== 'object' ||
      Array.isArray(enemyGameboard)
    ) {
      throw new Error('Invalid gameboard');
    }

    // Get all unhit tiles
    const unhitTiles = enemyGameboard.board.flat().filter(tile => !tile.isHit);

    if (unhitTiles.length === 0) {
      throw new Error('No available moves');
    }

    console.log('Unhit tiles:', unhitTiles);

    // First, try to hit adjacent to previously hit ships
    const hitShipTiles = hitTilesAI.filter(
      tile => tile.ship && !tile.ship.isSunk()
    );
    console.log('Hit ship tiles:', hitShipTiles);

    for (const tile of hitShipTiles) {
      const adjacentUnhitTiles = getAdjacentTiles(tile, enemyGameboard).filter(
        ({ tile }) => !tile.isHit
      );

      console.log('Adjacent unhit tiles:', adjacentUnhitTiles);

      if (adjacentUnhitTiles.length > 0) {
        const targetTile =
          adjacentUnhitTiles[
            Math.floor(Math.random() * adjacentUnhitTiles.length)
          ].tile;
        console.log('Targeting adjacent tile:', targetTile);
        return { x: targetTile.x, y: targetTile.y };
      }
    }

    // If no adjacent hits, make a random move
    const randomTile =
      unhitTiles[Math.floor(Math.random() * unhitTiles.length)];
    console.log('Making random move:', randomTile);

    // Find the coordinates of the random tile
    for (let y = 0; y < enemyGameboard.board.length; y++) {
      for (let x = 0; x < enemyGameboard.board[y].length; x++) {
        if (enemyGameboard.board[y][x] === randomTile) {
          console.log(`Found coordinates for random move: x=${x}, y=${y}`);
          return { x, y };
        }
      }
    }

    throw new Error('Unable to find coordinates for the selected tile');
  };

  const recordHit = (x, y, tile) => {
    hitTilesAI.push({ x, y, ship: tile.ship });
    console.log('Hit recorded:', { x, y, ship: tile.ship });
    console.log('Current hitTilesAI:', hitTilesAI);
  };

  return {
    get isAI() {
      return isAI;
    },
    get gameboard() {
      return gameboard;
    },
    set gameboard(value) {
      gameboard = value;
    },
    get hitTilesAI() {
      return hitTilesAI;
    },
    recordHit,
    playMoveAI,
    getAdjacentTiles,
  };
};

export default Player;
