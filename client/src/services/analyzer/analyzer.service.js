import api from '../../api/axios';

const analyzerService = {
  analyze: async () => {
    const response = await api.get('/analyze');
    return response.data.data;
  },

  getAnalysisResults: async () => {
    const response = await api.get('/analyze/results');
    return response.data.data;
  },
};

export default analyzerService;
