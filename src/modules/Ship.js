const Ship = length => {
  if (length === undefined || length < 1 || length > 5) {
    throw new Error('Length must be between 1 and 5');
  }

  const hitBox = Array(length).fill(0);

  const hit = index => {
    if (
      index === undefined ||
      typeof index !== 'number' ||
      index < 0 ||
      index >= length
    ) {
      throw new Error('Invalid index');
    }
    hitBox[index] = 1;
  };

  const isSunk = () => hitBox.every(cell => cell === 1);

  return {
    length,
    hitBox,
    hit,
    isSunk,
  };
};

export default Ship;
