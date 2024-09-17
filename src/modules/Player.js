const Player = (options = {}) => {
  const isAI = options.isAI || false;
  const hitTilesAI = [];
  let gameboard;

  const getAdjacentTiles = (tile, enemyGameboard) => {
    const directions = [
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
    ];

    return directions
      .map(({ dx, dy }) => {
        const newX = tile.x + dx;
        const newY = tile.y + dy;
        if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10) {
          return { x: newX, y: newY, tile: enemyGameboard.board[newY][newX] };
        }
        return null;
      })
      .filter(Boolean);
  };

  const playMoveAI = enemyGameboard => {
    console.log('AI is attempting to make a move');
    console.log('Enemy gameboard:', enemyGameboard);

    const unhitTiles = enemyGameboard.board.flat().filter(tile => !tile.isHit);
    console.log('Unhit tiles:', unhitTiles);

    if (unhitTiles.length === 0) {
      console.log('No available moves');
      return null;
    }

    const hitShipTiles = hitTilesAI.filter(
      tile => tile.ship && !tile.ship.isSunk()
    );

    if (hitShipTiles.length > 0) {
      console.log('AI found hit ship tiles:', hitShipTiles);
      for (const tile of hitShipTiles) {
        const adjacentUnhitTiles = getAdjacentTiles(
          tile,
          enemyGameboard
        ).filter(({ tile }) => !tile.isHit);

        if (adjacentUnhitTiles.length > 0) {
          const targetTile =
            adjacentUnhitTiles[
              Math.floor(Math.random() * adjacentUnhitTiles.length)
            ];
          console.log('AI chose adjacent tile:', targetTile);
          return { x: targetTile.x, y: targetTile.y };
        }
      }
    }

    const randomTile =
      unhitTiles[Math.floor(Math.random() * unhitTiles.length)];
    console.log('Random tile chosen:', randomTile);

    // Find the x and y coordinates of the random tile
    for (let y = 0; y < enemyGameboard.board.length; y++) {
      const x = enemyGameboard.board[y].indexOf(randomTile);
      if (x !== -1) {
        return { x, y };
      }
    }

    console.error('No valid moves available');
    return null;
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