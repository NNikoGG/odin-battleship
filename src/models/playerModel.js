const Gameboard = require('./gameBoardModel');

class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  makeMove(x, y) {
    if (this.isComputer) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    return this.gameboard.receiveAttack(x, y);
  }
}

module.exports = Player;
