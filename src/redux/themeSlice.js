import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: {
      reducer: (state) => {
        state.darkMode = !state.darkMode;
      },
      prepare: (darkMode) => {
        try {
          AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
        } catch (error) {
          console.error('Failed to save theme to AsyncStorage:', error);
        }
        return { payload: darkMode };
      },
    },
    loadTheme: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;
