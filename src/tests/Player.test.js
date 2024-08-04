import Player from '../modules/Player';
import Gameboard from '../modules/Gameboard';

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = Player();
  });

  describe('Factory function', () => {
    test('returns an object', () => {
      expect(typeof player).toBe('object');
    });

    test('has expected properties and methods', () => {
      expect(player).toEqual(
        expect.objectContaining({
          isMyTurn: expect.any(Boolean),
          isAI: expect.any(Boolean),
          changeTurn: expect.any(Function),
          playMoveAI: expect.any(Function),
        })
      );
    });
  });

  describe('Initial state', () => {
    test('isMyTurn is initially false', () => {
      expect(player.isMyTurn).toBe(false);
    });

    test('isAI is false by default', () => {
      expect(player.isAI).toBe(false);
    });

    test('isAI is true when specified in options', () => {
      const aiPlayer = Player({ isAI: true });
      expect(aiPlayer.isAI).toBe(true);
    });
  });

  describe('changeTurn method', () => {
    test('toggles isMyTurn correctly', () => {
      expect(player.isMyTurn).toBe(false);
      player.changeTurn();
      expect(player.isMyTurn).toBe(true);
      player.changeTurn();
      expect(player.isMyTurn).toBe(false);
    });
  });

  describe('playMoveAI method', () => {
    let aiPlayer;
    let gameboard;

    beforeEach(() => {
      aiPlayer = Player({ isAI: true });
      aiPlayer.changeTurn(); // Set turn to true
      gameboard = Gameboard();
    });

    test('throws error with invalid arguments', () => {
      expect(() => aiPlayer.playMoveAI()).toThrow();
      expect(() => aiPlayer.playMoveAI(null)).toThrow();
      expect(() => aiPlayer.playMoveAI(3)).toThrow();
      expect(() => aiPlayer.playMoveAI([])).toThrow();
    });

    test('plays a random move', () => {
      aiPlayer.playMoveAI(gameboard);
      const hitCount = gameboard.board.flat().filter(tile => tile.isHit).length;
      expect(hitCount).toBe(1);
    });

    test('returns coordinates of the hit', () => {
      const coordinates = aiPlayer.playMoveAI(gameboard);
      const hitTile = gameboard.board.flat().find(tile => tile.isHit);
      expect(coordinates).toEqual({ x: hitTile.x, y: hitTile.y });
    });

    test('does not target already hit tiles', () => {
      const gameboards = Array(3)
        .fill()
        .map(() => {
          const gb = Gameboard();
          gb.board.forEach((row, y) =>
            row.forEach((tile, x) => {
              if (y !== 9 || x !== 9) gb.receiveAttack({ x, y });
            })
          );
          return gb;
        });

      gameboards.forEach(gb => {
        aiPlayer.playMoveAI(gb);
        expect(gb.board[9][9].isHit).toBe(true);
      });
    });
  });
});
