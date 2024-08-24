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
            ].tile;
          console.log('AI chose adjacent tile:', targetTile);
          return { x: targetTile.x, y: targetTile.y };
        }
      }
    }

    // Ensure we always return a valid move with x and y coordinates
    const randomTile =
      unhitTiles[Math.floor(Math.random() * unhitTiles.length)];
    console.log('Random tile chosen:', randomTile);

    // Find the x and y coordinates of the random tile
    const x = enemyGameboard.board.findIndex(row => row.includes(randomTile));
    const y = enemyGameboard.board[x].indexOf(randomTile);

    if (x === -1 || y === -1) {
      console.error('Invalid random tile selected:', randomTile);
      // Fallback to selecting first unhit tile with valid coordinates
      for (let i = 0; i < enemyGameboard.board.length; i++) {
        for (let j = 0; j < enemyGameboard.board[i].length; j++) {
          if (!enemyGameboard.board[i][j].isHit) {
            console.log('Fallback tile:', enemyGameboard.board[i][j]);
            return { x: j, y: i };
          }
        }
      }
      // If still no valid tile found, return null
      console.error('No valid moves available');
      return null;
    }

    // Return an object with x and y properties
    return { x, y };
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
