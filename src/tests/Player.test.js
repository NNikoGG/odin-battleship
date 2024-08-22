import Player from '../modules/Player';
import Gameboard from '../modules/Gameboard';

describe('Player', () => {
  let player;
  let aiPlayer;

  beforeEach(() => {
    player = Player();
    aiPlayer = Player({ isAI: true });
  });

  test('Player factory function returns an object', () => {
    expect(typeof player).toBe('object');
  });

  test('Player has isAI property', () => {
    expect(player.isAI).toBe(false);
    expect(aiPlayer.isAI).toBe(true);
  });

  test('Player has gameboard property', () => {
    expect(player.gameboard).toBeUndefined();
    player.gameboard = Gameboard();
    expect(player.gameboard).toBeDefined();
  });

  describe('playMoveAI method', () => {
    let enemyGameboard;

    beforeEach(() => {
      enemyGameboard = Gameboard();
    });

    test('throws error with invalid arguments', () => {
      expect(() => aiPlayer.playMoveAI()).toThrow();
      expect(() => aiPlayer.playMoveAI(null)).toThrow();
      expect(() => aiPlayer.playMoveAI(3)).toThrow();
      expect(() => aiPlayer.playMoveAI([])).toThrow();
    });

    test('returns valid move coordinates', () => {
      const move = aiPlayer.playMoveAI(enemyGameboard);
      expect(move).toHaveProperty('x');
      expect(move).toHaveProperty('y');
      expect(move.x).toBeGreaterThanOrEqual(0);
      expect(move.x).toBeLessThan(10);
      expect(move.y).toBeGreaterThanOrEqual(0);
      expect(move.y).toBeLessThan(10);
    });

    test('does not return already hit tiles', () => {
      for (let i = 0; i < 99; i++) {
        const move = aiPlayer.playMoveAI(enemyGameboard);
        enemyGameboard.receiveAttack(move);
      }
      const lastMove = aiPlayer.playMoveAI(enemyGameboard);
      expect(enemyGameboard.board[lastMove.y][lastMove.x].isHit).toBe(false);
    });
  });

  test('recordHit method adds hit to hitTilesAI', () => {
    const tile = { ship: { length: 3 }, x: 0, y: 0 };
    aiPlayer.recordHit(0, 0, tile);
    expect(aiPlayer.hitTilesAI).toHaveLength(1);
    expect(aiPlayer.hitTilesAI[0]).toEqual({ x: 0, y: 0, ship: tile.ship });
  });

  test('getAdjacentTiles returns correct adjacent tiles', () => {
    const gameboard = Gameboard();
    const tile = { x: 1, y: 1 };
    const adjacentTiles = aiPlayer.getAdjacentTiles(tile, gameboard);
    expect(adjacentTiles).toHaveLength(4);
    expect(adjacentTiles).toContainEqual({
      tile: gameboard.board[0][1],
      direction: 'up',
    });
    expect(adjacentTiles).toContainEqual({
      tile: gameboard.board[1][2],
      direction: 'right',
    });
    expect(adjacentTiles).toContainEqual({
      tile: gameboard.board[2][1],
      direction: 'down',
    });
    expect(adjacentTiles).toContainEqual({
      tile: gameboard.board[1][0],
      direction: 'left',
    });
  });
});
