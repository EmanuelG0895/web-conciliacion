const baseConfig = require('../../jest.config.base.cjs');

module.exports = {
  displayName: 'api',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['babel-jest', { 
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }], 
        '@babel/preset-typescript'
      ] 
    }]
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,js}',
    '<rootDir>/src/**/*.(test|spec).{ts,js}'
  ]
};
