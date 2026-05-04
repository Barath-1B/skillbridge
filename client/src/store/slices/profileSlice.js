import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSkills: [],
  certifications: [],
  oceanScore: null,
  interests: [],
  experience: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateSkills: (state, action) => {
      state.currentSkills = action.payload;
    },
    updateCerts: (state, action) => {
      state.certifications = action.payload;
    },
    setOceanScore: (state, action) => {
      state.oceanScore = action.payload;
    },
    setInterests: (state, action) => {
      state.interests = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    clearProfile: (state) => {
      state.currentSkills = [];
      state.certifications = [];
      state.oceanScore = null;
      state.interests = [];
      state.experience = null;
    },
  },
});

export const {
  updateSkills,
  updateCerts,
  setOceanScore,
  setInterests,
  setExperience,
  clearProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
