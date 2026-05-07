import api from '../api/axios';

const retakeTestsService = {
  retakeOceanTest: async (answers) => {
    const response = await api.post('/retake-tests/ocean', { answers });
    return response.data.data;
  },

  retakeSkillsTest: async (skillIds) => {
    const response = await api.post('/retake-tests/skills', { skillIds });
    return response.data.data;
  },

  getTestHistory: async () => {
    const response = await api.get('/retake-tests/history');
    return response.data.data;
  },

  resetAllOnboarding: async () => {
    const response = await api.post('/retake-tests/reset');
    return response.data.data;
  },

  getOceanQuestions: async () => {
    const response = await api.get('/profile/ocean/questions');
    return response.data.data;
  },

  getSkills: async (category) => {
    const params = category ? { category } : {};
    const response = await api.get('/profile/skills', { params });
    return response.data.data;
  },
};

export default retakeTestsService;
