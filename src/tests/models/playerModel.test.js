const Player = require('../../models/playerModel');

jest.mock('../../models/gameBoardModel', () => {
  return jest.fn().mockImplementation(() => ({
    receiveAttack: jest.fn(),
    ships: [],
    misses: [],
  }));
});

describe('Player', () => {
  let Gameboard;

  beforeEach(() => {
    jest.clearAllMocks();
    Gameboard = require('../../models/gameBoardModel');
  });

  test('creates a new player with a gameboard', () => {
    const player = new Player('Human');
    expect(player.name).toBe('Human');
    expect(player.gameboard).toBeDefined();
    expect(Gameboard).toHaveBeenCalledTimes(1);
  });

  test('creates a computer player', () => {
    const computer = new Player('Computer', true);
    expect(computer.isComputer).toBe(true);
    expect(Gameboard).toHaveBeenCalledTimes(1);
  });

  test('allows a player to make a move', () => {
    const player = new Player('Human');
    const mockX = 5;
    const mockY = 5;
    player.makeMove(mockX, mockY);
    expect(player.gameboard.receiveAttack).toHaveBeenCalledWith(mockX, mockY);
  });

  test('computer player makes a random move', () => {
    const computer = new Player('Computer', true);
    computer.makeMove();
    expect(computer.gameboard.receiveAttack).toHaveBeenCalled();
    const calls = computer.gameboard.receiveAttack.mock.calls;
    expect(calls[0][0]).toBeGreaterThanOrEqual(0);
    expect(calls[0][0]).toBeLessThanOrEqual(9);
    expect(calls[0][1]).toBeGreaterThanOrEqual(0);
    expect(calls[0][1]).toBeLessThanOrEqual(9);
  });
});
