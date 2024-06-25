const fs = require('fs');
const path = require('path');

const directories = [
  'src/components',
  'src/models',
  'src/utils',
  'src/styles',
  'src/tests/components',
  'src/tests/models',
  'src/tests/utils',
];

const files = {
  'src/components': ['Board.js', 'Ship.js', 'Player.js'],
  'src/models': ['shipModel.js', 'gameBoardModel.js', 'playerModel.js'],
  'src/utils': ['coordinateHelper.js', 'randomGenerator.js'],
  'src/styles': ['Board.css', 'Ship.css', 'Player.css'],
  'src/tests/components': ['Board.test.js', 'Ship.test.js', 'Player.test.js'],
  'src/tests/models': [
    'shipModel.test.js',
    'gameBoardModel.test.js',
    'playerModel.test.js',
  ],
  'src/tests/utils': ['coordinateHelper.test.js', 'randomGenerator.test.js'],
};

directories.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
  files[dir]?.forEach(file => {
    fs.writeFileSync(path.join(__dirname, dir, file), '');
  });
});

console.log('Project structure created.');
