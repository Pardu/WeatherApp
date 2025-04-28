import cityReducer, { setLastCity, loadLastCity } from '../src/redux/citySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
}));

describe('citySlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(cityReducer(undefined, { type: undefined })).toEqual({
      lastCity: '',
    });
  });

  it('should handle setLastCity', () => {
    const initialState = { lastCity: '' };
    const newCity = 'London';
    
    const action = setLastCity(newCity);
    const nextState = cityReducer(initialState, action);
    
    expect(nextState.lastCity).toBe(newCity);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('lastCity', newCity);
  });

  it('should handle loadLastCity', () => {
    const initialState = { lastCity: '' };
    const savedCity = 'Paris';
    
    const nextState = cityReducer(initialState, loadLastCity(savedCity));
    
    expect(nextState.lastCity).toBe(savedCity);
  });

  it('should maintain state for unknown action', () => {
    const initialState = { lastCity: 'Tokyo' };
    
    const nextState = cityReducer(initialState, { type: 'UNKNOWN_ACTION' });
    
    expect(nextState).toEqual(initialState);
  });
}); 