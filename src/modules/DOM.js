const DOM = (() => {
  const playerBoardElement = document.getElementById('player-board');
  const enemyBoardElement = document.getElementById('enemy-board');
  const messageElement = document.getElementById('message');

  const createBoardHTML = (board, isEnemy) => {
    let html = '<div class="board">';
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = board[y][x];
        let cellClass = 'cell';
        if (cell.isHit) {
          cellClass += cell.ship ? ' hit' : ' miss';
        } else if (!isEnemy && cell.ship) {
          cellClass += ' ship';
        }
        html += `<div class="${cellClass}" data-x="${x}" data-y="${y}"></div>`;
      }
    }
    html += '</div>';
    return html;
  };

  const renderGameboards = (playerBoard, enemyBoard) => {
    playerBoardElement.innerHTML = createBoardHTML(playerBoard.board, false);
    enemyBoardElement.innerHTML = createBoardHTML(enemyBoard.board, true);
  };

  const updateGameboard = (gameboard, player, move) => {
    const boardElement =
      player === 'player' ? playerBoardElement : enemyBoardElement;
    const cell = boardElement.querySelector(
      `[data-x="${move.x}"][data-y="${move.y}"]`
    );

    if (cell) {
      const boardCell = gameboard.board[move.y][move.x];
      if (boardCell.isHit) {
        cell.classList.add(boardCell.ship ? 'hit' : 'miss');
      }
    }
  };

  const addAttackListener = callback => {
    enemyBoardElement.addEventListener('click', e => {
      const cell = e.target.closest('.cell');
      if (cell) {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        console.log(`Cell clicked: (${x}, ${y})`);
        callback(x, y);
      }
    });
  };

  const displayEndGame = message => {
    messageElement.textContent = message;
    messageElement.style.display = 'block';
  };

  const displayMessage = message => {
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.style.display = 'block';
      setTimeout(() => {
        messageElement.textContent = '';
        messageElement.style.display = 'none';
      }, 2000);
    }
  };

  const displayMissedAttacks = (gameboard, boardElement) => {
    const missedAttacks = gameboard.getMissedAttacks();
    missedAttacks.forEach(({ x, y }) => {
      const cell = boardElement.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (cell) {
        cell.classList.add('miss');
      }
    });
  };

  const displayShipPlacement = placeShipCallback => {
    const playerBoard = document.getElementById('player-board');
    const rotateButton = document.createElement('button');
    rotateButton.textContent = 'Rotate Ship';
    let isHorizontal = true;

    rotateButton.addEventListener('click', () => {
      isHorizontal = !isHorizontal;
    });

    playerBoard.addEventListener('click', e => {
      const cell = e.target.closest('.cell');
      if (cell) {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        placeShipCallback(x, y, isHorizontal);
      }
    });

    // Insert the rotate button before the player board
    playerBoard.parentNode.insertBefore(rotateButton, playerBoard);
  };

  const hideShipPlacement = () => {
    const rotateButton = document.querySelector('button');
    if (rotateButton) {
      rotateButton.remove();
    }
  };

  return {
    renderGameboards,
    updateGameboard,
    addAttackListener,
    displayEndGame,
    displayMessage,
    displayMissedAttacks,
    displayShipPlacement,
    hideShipPlacement,
  };
})();

export default DOM;
