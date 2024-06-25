const Ship = require('./shipModel');

class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    this.misses = [];
  }

  placeShip(length, coordinates, orientation) {
    const newShip = new Ship(length);
    newShip.coordinates = coordinates;
    newShip.orientation = orientation;
    this.ships.push(newShip);
  }

  receiveAttack(x, y) {
    let hit = false;
    this.ships.forEach(ship => {
      ship.coordinates.forEach((coord, index) => {
        if (coord.x === x && coord.y === y) {
          ship.hit(index);
          hit = true;
        }
      });
    });

    if (!hit) {
      this.misses.push({ x, y });
    }

    return hit;
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}

module.exports = Gameboard;
