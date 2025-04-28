// Mock AsyncStorage
const mockAsyncStorage = {
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
  mergeItem: jest.fn(() => Promise.resolve()),
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock react-native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  // Mock the DevMenu module
  RN.NativeModules.DevMenu = {
    show: jest.fn(),
    reload: jest.fn(),
    setShakeToShowDevMenuEnabled: jest.fn(),
  };
  
  return RN;
});

// Suppress console errors during tests
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Mock the @env module
jest.mock('@env', () => ({
  OPENWEATHER_API_KEY: '856006d2f1b9bc87b294b2b84ec60a2a',
  OPENWEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5/weather'
})); 