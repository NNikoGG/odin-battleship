import Ship from '../modules/Ship';

const ship = Ship(3);
const shipTwo = Ship(2);

test('Ship factory throws error if no arguments specified', () => {
  expect(() => Ship()).toThrow();
});

test('Ship factory throws error if specified length greater than 5', () => {
  expect(() => Ship(6)).toThrow();
  expect(() => Ship(12)).toThrow();
});

test('Ship factory throws error if specified length less than 1', () => {
  expect(() => Ship(0)).toThrow();
});

test('Ship factory returns an object', () => {
  expect(typeof Ship(4)).toBe('object');
});

test('Returned object has expected properties', () => {
  const properties = ['length', 'hitBox', 'hit', 'isSunk'];
  const object = Ship(4);
  const length = Object.keys(object).length;
  expect(length).toBe(properties.length);
  properties.forEach(property => expect(object[property]).toBeDefined());
});

test('length property is a number', () => {
  expect(typeof ship.length).toBe('number');
  expect(typeof shipTwo.length).toBe('number');
});

test('hitBox property is an array', () => {
  expect(Array.isArray(ship.hitBox)).toBe(true);
  expect(Array.isArray(shipTwo.hitBox)).toBe(true);
});

test('hitBox initial state is an array full of 0s', () => {
  ship.hitBox.forEach(item => expect(item).toBe(0));
  shipTwo.hitBox.forEach(item => expect(item).toBe(0));
});

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
