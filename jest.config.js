module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|react-redux|@reduxjs)/)',
  ],
  moduleNameMapper: {
    '@env': '<rootDir>/.env'
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  }
};
