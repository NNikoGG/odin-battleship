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
});
