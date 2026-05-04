import api from '../../api/axios';

const explorerService = {
  getAllCareers: async () => {
    const response = await api.get('/careers');
    return response.data.data;
  },

  getCareerById: async (careerPathId) => {
    const response = await api.get(`/careers/${careerPathId}`);
    return response.data.data;
  },

  searchCareers: async (query) => {
    const response = await api.get('/careers/search', { params: { q: query } });
    return response.data.data;
  },

  getCareersByDomain: async (domain) => {
    const response = await api.get('/careers/domain', { params: { domain } });
    return response.data.data;
  },
};

export default explorerService;
