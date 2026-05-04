import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: [],
  savedCareers: [],
  selectedCareer: null,
};

const careerSlice = createSlice({
  name: 'career',
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
    addSavedCareer: (state, action) => {
      const careerExists = state.savedCareers.find(
        (career) => career.id === action.payload.id
      );
      if (!careerExists) {
        state.savedCareers.push(action.payload);
      }
    },
    removeSavedCareer: (state, action) => {
      state.savedCareers = state.savedCareers.filter(
        (career) => career.id !== action.payload
      );
    },
    setSelectedCareer: (state, action) => {
      state.selectedCareer = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.selectedCareer = null;
    },
  },
});

export const {
  setResults,
  addSavedCareer,
  removeSavedCareer,
  setSelectedCareer,
  clearResults,
} = careerSlice.actions;
export default careerSlice.reducer;
