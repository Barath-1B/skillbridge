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

  addSkill: async (skillId) => {
    const response = await api.post('/profile/skills', { skillId });
    return response.data.data;
  },

  removeSkill: async (skillId) => {
    const response = await api.delete(`/profile/skills/${skillId}`);
    return response.data.data;
  },

  updateOceanScore: async (oceanScore) => {
    const response = await api.put('/profile/ocean', { oceanScore });
    return response.data.data;
  },
};

export default profileService;
