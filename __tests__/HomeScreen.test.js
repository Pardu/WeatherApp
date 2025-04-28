import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../src/screens/HomeScreen';
import cityReducer from '../src/redux/citySlice';
import { getThemeColors } from '../src/theme/theme';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock theme
jest.mock('../src/theme/theme', () => ({
  getThemeColors: jest.fn(),
}));

// Mock useWeather hook
const mockUseWeather = jest.fn();
jest.mock('../src/hooks/useWeather', () => ({
  __esModule: true,
  default: jest.fn(),
  useWeather: () => mockUseWeather(),
}));

// Create a mock store
const createMockStore = (initialState = {}, isDarkMode = false) => {
  return configureStore({
    reducer: {
      city: cityReducer,
      theme: (state = { darkMode: isDarkMode }, action) => {
        switch (action.type) {
          case 'theme/toggleTheme':
            return { ...state, darkMode: action.payload };
          default:
            return state;
        }
      },
    },
    preloadedState: {
      city: {
        lastCity: '',
        ...initialState,
      },
      theme: {
        darkMode: isDarkMode,
      },
    },
  });
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'lastCity') return Promise.resolve(null);
      if (key === 'darkMode') return Promise.resolve('false');
      return Promise.resolve(null);
    });
    // Reset theme mock
    getThemeColors.mockReset();
    // Reset useWeather mock
    mockUseWeather.mockReset();
  });

  it('renders correctly in light theme', () => {
    // Mock light theme colors
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
      primary: '#81b0ff',
      switch: {
        thumb: {
          light: '#000000',
          dark: '#ffffff',
        },
        track: {
          light: '#767577',
          dark: '#81b0ff',
        },
      },
    });

    // Mock useWeather hook for success case
    mockUseWeather.mockReturnValue({
      data: {
        name: 'London',
        main: { temp: 280.15 },
        weather: [{ description: 'scattered clouds', icon: '03d' }],
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const store = createMockStore({}, false);
    
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    
    // Check if search input is rendered
    expect(getByPlaceholderText('Enter city')).toBeTruthy();
    
    // Check if search button is rendered
    expect(getByText('Search')).toBeTruthy();
    
    // Check if theme text is rendered
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders correctly in dark theme', () => {
    // Mock dark theme colors
    getThemeColors.mockReturnValue({
      background: '#000000',
      text: '#ffffff',
      card: '#333333',
      primary: '#4a90e2',
      switch: {
        thumb: {
          light: '#000000',
          dark: '#ffffff',
        },
        track: {
          light: '#767577',
          dark: '#81b0ff',
        },
      },
    });

    // Mock useWeather hook for dark theme
    mockUseWeather.mockReturnValue({
      data: {
        name: 'London',
        main: { temp: 280.15 },
        weather: [{ description: 'scattered clouds', icon: '03d' }],
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const store = createMockStore({}, true);
    
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    
    // Check if search input is rendered
    expect(getByPlaceholderText('Enter city')).toBeTruthy();
    
    // Check if search button is rendered
    expect(getByText('Search')).toBeTruthy();
    
    // Check if theme text is rendered
    expect(getByText('Dark')).toBeTruthy();
  });

  it('loads last city from AsyncStorage on mount', async () => {
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
      switch: {
        thumb: {
          light: '#000000',
          dark: '#ffffff',
        },
        track: {
          light: '#767577',
          dark: '#81b0ff',
        },
      },
    });

    // Mock useWeather hook for last city test
    mockUseWeather.mockReturnValue({
      data: {
        name: 'London',
        main: { temp: 280.15 },
        weather: [{ description: 'scattered clouds', icon: '03d' }],
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'lastCity') return Promise.resolve('London');
      if (key === 'darkMode') return Promise.resolve('false');
      return Promise.resolve(null);
    });
    
    const store = createMockStore({}, false);
    
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('lastCity');
    }, { timeout: 3000 });
  });

  it('displays error message when city is not found', () => {
    // Mock theme colors
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      error: '#ff0000',
      card: '#bcbcbc',
      primary: '#81b0ff',
      switch: {
        thumb: {
          light: '#000000',
          dark: '#ffffff',
        },
        track: {
          light: '#767577',
          dark: '#81b0ff',
        },
      },
    });

    // Mock useWeather hook for error case
    mockUseWeather.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('City not found'),
      refetch: jest.fn(),
    });

    const store = createMockStore({ lastCity: 'InvalidCity' }, false);
    
    const { getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    
    // Check if error message is displayed
    expect(getByText('City not found!')).toBeTruthy();
  });

  it('displays loading indicator when fetching weather data', () => {
    // Mock theme colors
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      activityIndicator: '#81b0ff',
      card: '#bcbcbc',
      primary: '#81b0ff',
      switch: {
        thumb: {
          light: '#000000',
          dark: '#ffffff',
        },
        track: {
          light: '#767577',
          dark: '#81b0ff',
        },
      },
    });

    // Mock useWeather hook for loading case
    mockUseWeather.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const store = createMockStore({ lastCity: 'London' }, false);
    
    const { getByTestId } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    
    // Check if loading indicator is displayed
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('handles search functionality correctly', async () => {
    // Mock theme colors
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
      primary: '#81b0ff',
      switch: {
        thumb: {
          light: '#000000',
          dark: '#ffffff',
        },
        track: {
          light: '#767577',
          dark: '#81b0ff',
        },
      },
    });

    // Mock useWeather hook
    const mockRefetch = jest.fn();
    mockUseWeather.mockReturnValue({
      data: {
        name: 'London',
        main: { temp: 280.15 },
        weather: [{ description: 'scattered clouds', icon: '03d' }],
      },
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    });

    const store = createMockStore({}, false);
    
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    
    // Enter city name
    const searchInput = getByPlaceholderText('Enter city');
    fireEvent.changeText(searchInput, 'London');
    
    // Press search button
    const searchButton = getByText('Search');
    fireEvent.press(searchButton);
    
    // Check if refetch was called
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('handles theme toggle correctly', async () => {
    // Mock theme colors for both light and dark themes
    const lightTheme = {
      background: '#ffffff',
      text: '#000000',
      secondaryText: '#666666',
      card: '#bcbcbc',
      primary: '#81b0ff',
      activityIndicator: '#81b0ff',
      error: '#ff0000',
      switch: {
        thumb: {
          light: '#000000',
          dark: '#ffffff',
        },
        track: {
          light: '#767577',
          dark: '#81b0ff',
        },
      },
    };

    const darkTheme = {
      background: '#000000',
      text: '#ffffff',
      secondaryText: '#cccccc',
      card: '#333333',
      primary: '#81b0ff',
      activityIndicator: '#81b0ff',
      error: '#ff6666',
      switch: {
        thumb: {
          light: '#000000',
          dark: '#ffffff',
        },
        track: {
          light: '#767577',
          dark: '#81b0ff',
        },
      },
    };

    // Mock getThemeColors to return different themes based on darkMode
    getThemeColors.mockImplementation((isDark) => isDark ? darkTheme : lightTheme);

    // Mock useWeather hook
    mockUseWeather.mockReturnValue({
      data: {
        name: 'London',
        main: { temp: 280.15 },
        weather: [{ description: 'scattered clouds', icon: '03d' }],
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const store = createMockStore({}, false);
    
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
    
    // Check initial theme text
    expect(getByText('Light')).toBeTruthy();
    
    // Toggle theme using the Switch component
    const themeSwitch = getByTestId('theme-switch');
    fireEvent(themeSwitch, 'valueChange', true);
    
    // Wait for the theme text to change
    await waitFor(() => {
      expect(store.getState().theme.darkMode).toBe(true);
      expect(getByText('Dark')).toBeTruthy();
    });
  });
}); 