const Ship = require('../../models/shipModel');

describe('Ship', () => {
  let testShip;
  beforeEach(() => {
    testShip = new Ship(4);
  });

  test('should be created with specified length', () => {
    expect(testShip.length).toBe(4);
    expect(testShip.hits).toEqual([false, false, false, false]);
  });

  test('should record a hit at a specified position', () => {
    testShip.hit(2);
    expect(testShip.hits[2]).toBeTruthy();
  });

  test('should ignore hits outside its length', () => {
    testShip.hit(4);
    expect(testShip.hits[4]).toBeUndefined();
  });

  test('should report sunk only if all positions are hit', () => {
    testShip.hit(0);
    testShip.hit(1);
    testShip.hit(2);
    testShip.hit(3);
    expect(testShip.isSunk()).toBe(true);
  });

  test('should not report sunk if not all positions are hit', () => {
    testShip.hit(1);
    testShip.hit(3);
    expect(testShip.isSunk()).toBe(false);
  });
});
