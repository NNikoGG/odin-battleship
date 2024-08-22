import Player from './Player';
import Gameboard from './Gameboard';
import Ship from './Ship';
import DOM from './DOM';

const Game = (() => {
  let player1, player2, currentPlayer;

  const init = () => {
    player1 = Player();
    player2 = Player({ isAI: true });
    currentPlayer = player1;

    player1.gameboard = Gameboard();
    player2.gameboard = Gameboard();

    const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];

    try {
      player2.gameboard.placeShipsRandomly(ships);
    } catch (error) {
      console.error('Failed to place ships randomly:', error);
      manualPlaceShips(player2.gameboard, ships);
    }

    DOM.renderGameboards(player1.gameboard, player2.gameboard);
    placePlayerShips();
  };

  const manualPlaceShips = (gameboard, ships) => {
    ships.forEach((ship, index) => {
      let placed = false;
      for (let y = 0; y < 10 && !placed; y++) {
        for (let x = 0; x < 10 && !placed; x++) {
          try {
            gameboard.placeShip(ship, { x, y, horizontally: true });
            placed = true;
          } catch (error) {
            try {
              gameboard.placeShip(ship, { x, y, vertically: true });
              placed = true;
            } catch (error) {}
          }
        }
      }
      if (!placed) {
        console.error(`Failed to place ship ${index}`);
      }
    });
  };

  const placePlayerShips = () => {
    const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
    let currentShipIndex = 0;

    const placeShip = (x, y, isHorizontal) => {
      try {
        player1.gameboard.placeShip(ships[currentShipIndex], {
          x,
          y,
          horizontally: isHorizontal,
          vertically: !isHorizontal,
        });
        DOM.renderGameboards(player1.gameboard, player2.gameboard);
        currentShipIndex++;
        if (currentShipIndex >= ships.length) {
          startGame();
        }
      } catch (error) {
        DOM.displayMessage(error.message);
      }
    };

    DOM.displayShipPlacement(placeShip);
  };

  const startGame = () => {
    DOM.hideShipPlacement();
    setupEventListeners();
  };

  const setupEventListeners = () => {
    DOM.addAttackListener((x, y) => {
      if (currentPlayer === player1) {
        playTurn(x, y);
      }
    });
  };

  const playTurn = (x, y) => {
    if (currentPlayer !== player1) {
      console.log("Not player's turn");
      return;
    }

    const enemyGameboard = player2.gameboard;
    console.log(`Player attempting move at (${x}, ${y})`);
    const success = enemyGameboard.receiveAttack({ x, y });

    if (success) {
      DOM.updateGameboard(enemyGameboard, 'enemy', { x, y });

      if (enemyGameboard.isAllShipsSunk()) {
        endGame('Player wins!');
      } else {
        if (!enemyGameboard.isHit({ x, y })) {
          switchTurn();
        } else {
          DOM.displayMessage('Hit! You get another turn.');
        }
      }
    } else {
      DOM.displayMessage('Invalid move. Try again.');
    }
  };

  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    console.log(
      'Switched turn to:',
      currentPlayer === player1 ? 'Player' : 'AI'
    );

    if (currentPlayer === player2) {
      setTimeout(playAITurn, 1000);
    }
  };

  const playAITurn = () => {
    try {
      console.log('AI turn started');
      let move;
      let isHit;

      do {
        move = player2.playMoveAI(player1.gameboard);
        console.log('AI move:', move);

        if (move && typeof move.x === 'number' && typeof move.y === 'number') {
          console.log(`AI attempting move at (${move.x}, ${move.y})`);
          const success = player1.gameboard.receiveAttack(move);

          if (success) {
            const hitTile = player1.gameboard.board[move.y][move.x];
            player2.recordHit(move.x, move.y, hitTile);
            DOM.updateGameboard(player1.gameboard, 'player', move);

            if (player1.gameboard.isAllShipsSunk()) {
              endGame('Computer wins!');
              return;
            }

            isHit = player1.gameboard.isHit(move);
            if (isHit) {
              DOM.displayMessage('AI hit a ship! It gets another turn.');
            }
          } else {
            console.error('AI made an invalid move');
            console.log('Player1 gameboard:', player1.gameboard);
            endGame('Game ended due to AI error');
            return;
          }
        } else {
          console.error('Invalid move returned by AI:', move);
          console.log('Player1 gameboard:', player1.gameboard);
          throw new Error('Invalid move returned by AI');
        }
      } while (isHit);

      switchTurn();
    } catch (error) {
      console.error('AI move error:', error);
      console.log('Player1 gameboard:', player1.gameboard);
      endGame('Game ended due to AI error');
    }
  };

  const endGame = message => {
    DOM.displayEndGame(message);
  };

  return { init };
})();

export default Game;
