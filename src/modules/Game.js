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
            } catch (error) {
              // Ignore error and try next position
            }
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
          DOM.displayMessage('All ships placed. Click Start Game to begin!');
        }
      } catch (error) {
        DOM.displayMessage(error.message);
      }
    };

    const resetPlacement = () => {
      currentShipIndex = 0;
      player1.gameboard = Gameboard();
      DOM.renderGameboards(player1.gameboard, player2.gameboard);
      DOM.displayMessage('Ship placement reset. Place your ships!');
    };

    const randomPlacement = () => {
      player1.gameboard = Gameboard();
      player1.gameboard.placeShipsRandomly(ships);
      DOM.renderGameboards(player1.gameboard, player2.gameboard);
      currentShipIndex = ships.length; // Set to ships.length to indicate all ships are placed
      DOM.displayMessage('Ships placed randomly. Click Start Game to begin!');
    };

    const startGame = () => {
      if (currentShipIndex >= ships.length) {
        DOM.hideShipPlacement();
        setupEventListeners();
        DOM.displayMessage('Game started. Attack the enemy board!');
      } else {
        DOM.displayMessage('Place all your ships before starting the game!');
      }
    };

    DOM.displayShipPlacement(
      placeShip,
      resetPlacement,
      randomPlacement,
      startGame
    );
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
    console.log('AI turn started');
    console.log('Player 1 gameboard:', player1.gameboard);
    let isHit = false;
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loop

    do {
      attempts++;
      if (attempts > maxAttempts) {
        console.error('AI exceeded maximum attempts to make a valid move');
        switchTurn();
        return;
      }

      let move = player2.playMoveAI(player1.gameboard);
      console.log('AI move:', move);

      if (!move) {
        console.error('No valid moves available for AI');
        switchTurn();
        return;
      }

      console.log(`AI attempting move at (${move.x}, ${move.y})`);

      let success = player1.gameboard.receiveAttack(move);

      if (success) {
        DOM.updateGameboard(player1.gameboard, 'player', move);
        isHit = player1.gameboard.isHit(move);

        if (player1.gameboard.isAllShipsSunk()) {
          endGame('AI wins!');
          return;
        }

        if (isHit) {
          DOM.displayMessage('AI hit a ship! It gets another turn.');
          player2.recordHit(
            move.x,
            move.y,
            player1.gameboard.board[move.y][move.x]
          );
        } else {
          DOM.displayMessage('AI missed!');
          isHit = false;
        }
      } else {
        console.error('AI made an invalid move');
        isHit = false;
      }
    } while (isHit);

    switchTurn();
  };

  const endGame = message => {
    DOM.displayEndGame(message);
    // Add any additional end game logic here
  };

  return { init, playTurn, playAITurn }; // Export playTurn and playAITurn for testing
})();

export default Game;
