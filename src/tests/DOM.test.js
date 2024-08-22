import DOM from '../modules/DOM';

describe('DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="player-board"></div>
      <div id="enemy-board"></div>
      <div id="message"></div>
    `;
  });

  test('renderGameboards creates correct number of cells', () => {
    const mockGameboard = {
      board: Array(10)
        .fill()
        .map(() => Array(10).fill({ isHit: false, ship: null })),
    };
    DOM.renderGameboards(mockGameboard, mockGameboard);

    const playerCells = document.querySelectorAll('#player-board .cell');
    const enemyCells = document.querySelectorAll('#enemy-board .cell');

    expect(playerCells).toHaveLength(100);
    expect(enemyCells).toHaveLength(100);
  });

  test('updateGameboard updates cell classes correctly', () => {
    const mockGameboard = {
      board: Array(10)
        .fill()
        .map(() => Array(10).fill({ isHit: false, ship: null })),
    };
    DOM.renderGameboards(mockGameboard, mockGameboard);

    mockGameboard.board[0][0] = { isHit: true, ship: { isSunk: () => false } };
    DOM.updateGameboard(mockGameboard, 'player', { x: 0, y: 0 });

    const updatedCell = document.querySelector(
      '#player-board .cell[data-x="0"][data-y="0"]'
    );
    expect(updatedCell.classList.contains('hit')).toBe(true);
  });

  test('displayMessage shows and hides message', () => {
    jest.useFakeTimers();

    DOM.displayMessage('Test message');

    const messageElement = document.getElementById('message');
    expect(messageElement.textContent).toBe('Test message');
    expect(messageElement.style.display).toBe('block');

    jest.runAllTimers();

    expect(messageElement.textContent).toBe('');
    expect(messageElement.style.display).toBe('none');

    jest.useRealTimers();
  });

  test('displayShipPlacement adds event listeners', () => {
    const mockCallback = jest.fn();
    DOM.displayShipPlacement(mockCallback);

    const rotateButton = document.querySelector('button');
    expect(rotateButton).toBeTruthy();
    expect(rotateButton.textContent).toBe('Rotate Ship');

    const playerBoard = document.getElementById('player-board');
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.x = '0';
    cell.dataset.y = '0';
    playerBoard.appendChild(cell);

    cell.click();

    expect(mockCallback).toHaveBeenCalledWith(0, 0, true);
  });

  test('addAttackListener adds click event to enemy board', () => {
    const mockCallback = jest.fn();
    DOM.addAttackListener(mockCallback);

    const enemyBoard = document.getElementById('enemy-board');
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.x = '1';
    cell.dataset.y = '1';
    enemyBoard.appendChild(cell);

    cell.click();

    expect(mockCallback).toHaveBeenCalledWith(1, 1);
  });
});
