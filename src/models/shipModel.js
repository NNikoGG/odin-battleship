// models/shipModel.js
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = new Array(length).fill(false);
  }

  hit(position) {
    if (position >= 0 && position < this.length) {
      this.hits[position] = true;
    }
  }

  isSunk() {
    return this.hits.every(hit => hit === true);
  }
}

module.exports = Ship;
