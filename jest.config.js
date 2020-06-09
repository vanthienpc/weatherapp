const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  roots: ['<rootDir>'],
  setupFilesAfterEnv: '<rootDir>/setupTest.js',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '^environment(.*)$': `<rootDir>/src/environment/${process.env.NODE_ENV}$1`,
  },
};
