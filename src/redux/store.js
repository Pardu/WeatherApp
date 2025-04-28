import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './citySlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    city: cityReducer,
        theme: themeReducer,
  },
});
