import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import WeatherCard from '../src/components/WeatherCard';
import { getThemeColors } from '../src/theme/theme';

// Mock theme context
jest.mock('../src/theme/theme', () => ({
  getThemeColors: jest.fn(),
}));

// Create a mock store with theme state
const createMockStore = (isDarkMode = false) => {
  return configureStore({
    reducer: {
      theme: (state = { darkMode: isDarkMode }, action) => state,
    },
  });
};

describe('WeatherCard', () => {
  const mockData = {
    name: 'London',
    main: {
      temp: 280.15, // 7°C
    },
    weather: [
      {
        description: 'scattered clouds',
        icon: '03d',
      },
    ],
  };

  beforeEach(() => {
    // Reset theme mock before each test
    getThemeColors.mockReset();
  });

  it('renders correctly with valid data in light theme', () => {
    // Mock light theme colors
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
    });

    const store = createMockStore(false);
    const { getByText } = render(
      <Provider store={store}>
        <WeatherCard data={mockData} />
      </Provider>
    );
    
    // Check if city name is displayed
    expect(getByText('London')).toBeTruthy();
    
    // Check if temperature is displayed (converted from Kelvin to Celsius)
    expect(getByText('7°C')).toBeTruthy();
    
    // Check if weather condition is displayed
    expect(getByText('scattered clouds')).toBeTruthy();
  });

  it('renders correctly with valid data in dark theme', () => {
    // Mock dark theme colors
    getThemeColors.mockReturnValue({
      background: '#000000',
      text: '#ffffff',
      card: '#333333',
    });

    const store = createMockStore(true);
    const { getByText } = render(
      <Provider store={store}>
        <WeatherCard data={mockData} />
      </Provider>
    );
    
    // Check if city name is displayed
    expect(getByText('London')).toBeTruthy();
    
    // Check if temperature is displayed (converted from Kelvin to Celsius)
    expect(getByText('7°C')).toBeTruthy();
    
    // Check if weather condition is displayed
    expect(getByText('scattered clouds')).toBeTruthy();
  });

  it('returns null when no data is provided', () => {
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
    });

    const store = createMockStore(false);
    const { toJSON } = render(
      <Provider store={store}>
        <WeatherCard data={null} />
      </Provider>
    );
    expect(toJSON()).toBeNull();
  });

  it('renders with missing weather data', () => {
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
    });

    const incompleteData = {
      name: 'London',
      main: {
        temp: 280.15,
      },
      weather: [],
    };
    
    const store = createMockStore(false);
    const { getByText } = render(
      <Provider store={store}>
        <WeatherCard data={incompleteData} />
      </Provider>
    );
    
    // City name should still display
    expect(getByText('London')).toBeTruthy();
    
    // Temperature should still display
    expect(getByText('7°C')).toBeTruthy();
  });
}); 