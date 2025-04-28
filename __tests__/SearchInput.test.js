import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchInput from '../src/components/SearchInput';
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

describe('SearchInput', () => {
  beforeEach(() => {
    // Reset theme mock before each test
    getThemeColors.mockReset();
  });

  it('renders correctly', () => {
    const mockSetCity = jest.fn();
    const mockOnSearch = jest.fn();
    
    // Mock light theme colors
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
      primary: '#81b0ff',
    });

    const store = createMockStore(false);
    
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchInput city="" setCity={mockSetCity} onSearch={mockOnSearch} />
      </Provider>
    );
    
    // Check if input field is rendered
    expect(getByPlaceholderText('Enter city')).toBeTruthy();
    
    // Check if search button is rendered
    expect(getByText('Search')).toBeTruthy();
  });
  
  it('calls setCity when text is entered', () => {
    const mockSetCity = jest.fn();
    const mockOnSearch = jest.fn();
    
    // Mock light theme colors
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
      primary: '#81b0ff',
    });

    const store = createMockStore(false);
    
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchInput city="" setCity={mockSetCity} onSearch={mockOnSearch} />
      </Provider>
    );
    
    const input = getByPlaceholderText('Enter city');
    fireEvent.changeText(input, 'London');
    
    expect(mockSetCity).toHaveBeenCalledWith('London');
  });
  
  it('calls onSearch when search button is pressed', () => {
    const mockSetCity = jest.fn();
    const mockOnSearch = jest.fn();
    
    // Mock light theme colors
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
      primary: '#81b0ff',
    });

    const store = createMockStore(false);
    
    const { getByText } = render(
      <Provider store={store}>
        <SearchInput city="London" setCity={mockSetCity} onSearch={mockOnSearch} />
      </Provider>
    );
    
    const searchButton = getByText('Search');
    fireEvent.press(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalled();
  });
  
  it('displays the current city value', () => {
    const mockSetCity = jest.fn();
    const mockOnSearch = jest.fn();
    
    // Mock light theme colors
    getThemeColors.mockReturnValue({
      background: '#ffffff',
      text: '#000000',
      card: '#bcbcbc',
      primary: '#81b0ff',
    });

    const store = createMockStore(false);
    
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <SearchInput city="London" setCity={mockSetCity} onSearch={mockOnSearch} />
      </Provider>
    );
    
    expect(getByDisplayValue('London')).toBeTruthy();
  });
}); 