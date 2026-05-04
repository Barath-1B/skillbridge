import api from '../../api/axios';

const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
  },
};

export default authService;
