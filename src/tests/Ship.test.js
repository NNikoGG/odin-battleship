import Ship from '../modules/Ship';

const ship = Ship(3);
const shipTwo = Ship(2);
test('hitBox array has same length as length property', () => {
  expect(ship.hitBox.length === ship.length).toBe(true);
  expect(shipTwo.hitBox.length === shipTwo.length).toBe(true);
});

test('hit method changes specified index of hitBox to 1', () => {
  ship.hit(0);
  ship.hit(1);
  expect(ship.hitBox[0]).toBe(1);
  expect(ship.hitBox[1]).toBe(1);
  expect(ship.hitBox[2]).toBe(0);
  shipTwo.hit(0);
  shipTwo.hit(1);
  expect(shipTwo.hitBox[0]).toBe(1);
  expect(shipTwo.hitBox[1]).toBe(1);
});

test('isSunk method returns true if hitBox is full of 1s', () => {
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBe(true);

  shipTwo.hit(0);
  shipTwo.hit(1);
  expect(shipTwo.isSunk()).toBe(true);
});

test('isSunk method returns false if hitBox is not full of 1s', () => {
  const shipThree = Ship(3);
  expect(shipThree.isSunk()).toBe(false);
  shipThree.hit(0);
  expect(shipThree.isSunk()).toBe(false);

  const shipFour = Ship(2);
  expect(shipFour.isSunk()).toBe(false);
  shipFour.hit(1);
  expect(shipFour.isSunk()).toBe(false);
});
