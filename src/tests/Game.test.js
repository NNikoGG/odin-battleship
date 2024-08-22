import Game from '../modules/Game';
import Player from '../modules/Player';
import Gameboard from '../modules/Gameboard';
import Ship from '../modules/Ship';
import DOM from '../modules/DOM';

jest.mock('../modules/Player');
jest.mock('../modules/Gameboard');
jest.mock('../modules/Ship');
jest.mock('../modules/DOM');

describe('Game', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('init function initializes the game correctly', () => {
    Game.init();

    expect(Player).toHaveBeenCalledTimes(2);
    expect(Player).toHaveBeenCalledWith();
    expect(Player).toHaveBeenCalledWith({ isAI: true });

    expect(Gameboard).toHaveBeenCalledTimes(2);
    expect(Ship).toHaveBeenCalledTimes(5);

    expect(DOM.renderGameboards).toHaveBeenCalled();
    expect(DOM.displayShipPlacement).toHaveBeenCalled();
  });

  test('placePlayerShips function places ships correctly', () => {
    const mockPlaceShip = jest.fn();
    DOM.displayShipPlacement.mockImplementation(callback => {
      callback(0, 0, true);
      callback(1, 1, false);
      callback(2, 2, true);
      callback(3, 3, false);
      callback(4, 4, true);
    });

    Game.init();

    expect(mockPlaceShip).toHaveBeenCalledTimes(5);
    expect(DOM.renderGameboards).toHaveBeenCalledTimes(6); // Initial + 5 ship placements
    expect(DOM.hideShipPlacement).toHaveBeenCalled();
  });

  test('playTurn function handles player turn correctly', () => {
    Game.init();
    const mockReceiveAttack = jest.fn().mockReturnValue(true);
    Player.mock.instances[1].gameboard.receiveAttack = mockReceiveAttack;

    Game.playTurn(0, 0);

    expect(mockReceiveAttack).toHaveBeenCalledWith({ x: 0, y: 0 });
    expect(DOM.updateGameboard).toHaveBeenCalled();
  });

  test('playTurn function gives player another turn on hit', () => {
    Game.init();
    const mockReceiveAttack = jest.fn().mockReturnValue(true);
    const mockIsHit = jest.fn().mockReturnValue(true);
    Player.mock.instances[1].gameboard.receiveAttack = mockReceiveAttack;
    Player.mock.instances[1].gameboard.isHit = mockIsHit;

    Game.playTurn(0, 0);

    expect(mockReceiveAttack).toHaveBeenCalledWith({ x: 0, y: 0 });
    expect(mockIsHit).toHaveBeenCalledWith({ x: 0, y: 0 });
    expect(DOM.updateGameboard).toHaveBeenCalled();
    expect(DOM.displayMessage).toHaveBeenCalledWith(
      'Hit! You get another turn.'
    );
  });

  test('playAITurn function gives AI another turn on hit', () => {
    Game.init();
    const mockPlayMoveAI = jest
      .fn()
      .mockReturnValueOnce({ x: 0, y: 0 })
      .mockReturnValueOnce({ x: 1, y: 1 });
    const mockReceiveAttack = jest.fn().mockReturnValue(true);
    const mockIsHit = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    Player.mock.instances[1].playMoveAI = mockPlayMoveAI;
    Player.mock.instances[0].gameboard.receiveAttack = mockReceiveAttack;
    Player.mock.instances[0].gameboard.isHit = mockIsHit;

    Game.playAITurn();

    expect(mockPlayMoveAI).toHaveBeenCalledTimes(2);
    expect(mockReceiveAttack).toHaveBeenCalledTimes(2);
    expect(mockIsHit).toHaveBeenCalledTimes(2);
    expect(DOM.updateGameboard).toHaveBeenCalledTimes(2);
    expect(DOM.displayMessage).toHaveBeenCalledWith(
      'AI hit a ship! It gets another turn.'
    );
  });

  test('playAITurn function handles AI turn correctly', () => {
    Game.init();
    const mockPlayMoveAI = jest.fn().mockReturnValue({ x: 1, y: 1 });
    Player.mock.instances[1].playMoveAI = mockPlayMoveAI;
    const mockReceiveAttack = jest.fn().mockReturnValue(true);
    Player.mock.instances[0].gameboard.receiveAttack = mockReceiveAttack;

    Game.playAITurn();

    expect(mockPlayMoveAI).toHaveBeenCalled();
    expect(mockReceiveAttack).toHaveBeenCalledWith({ x: 1, y: 1 });
    expect(DOM.updateGameboard).toHaveBeenCalled();
  });

  test('endGame function displays the correct message', () => {
    Game.endGame('Player wins!');

    expect(DOM.displayEndGame).toHaveBeenCalledWith('Player wins!');
  });
});
