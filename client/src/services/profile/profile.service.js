import api from '../../api/axios';

const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data.data;
  },
};

export default profileService;
