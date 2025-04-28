import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  lastCity: '',
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setLastCity: {
      reducer: (state, action) => {
        state.lastCity = action.payload;
      },
      prepare: (city) => {
        try {
          AsyncStorage.setItem('lastCity', city);
        } catch (error) {
          console.error('Failed to save city to AsyncStorage:', error);
        }
        return { payload: city };
      },
    },
    loadLastCity: (state, action) => {
      state.lastCity = action.payload;
    }
  },
});

export const { setLastCity, loadLastCity } = citySlice.actions;
export default citySlice.reducer;
