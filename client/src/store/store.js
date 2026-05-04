import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import profileSlice from './slices/profileSlice';
import careerSlice from './slices/careerSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    career: careerSlice,
  },
});

export default store;
