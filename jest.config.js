module.exports = {
    testEnvironment: 'node', // or 'jsdom' if you plan to test DOM
    transform: {
      '^.+\\.js$': 'babel-jest', // use babel-jest to transpile your files
    },
  };
  