import api from '../../api/axios';

const adminService = {
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data.data;
  },

  getUserById: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data.data;
  },

  updateUserRole: async (userId, role) => {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  getSystemStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data.data;
  },

  getCareers: async () => {
    const response = await api.get('/admin/careers');
    return response.data.data;
  },

  updateCareer: async (careerPathId, careerData) => {
    const response = await api.put(`/admin/careers/${careerPathId}`, careerData);
    return response.data.data;
  },

  createCareer: async (careerData) => {
    const response = await api.post('/admin/careers', careerData);
    return response.data.data;
  },

  deleteCareer: async (careerPathId) => {
    const response = await api.delete(`/admin/careers/${careerPathId}`);
    return response.data;
  },

  getSkills: async () => {
    const response = await api.get('/admin/skills');
    return response.data.data;
  },

  updateSkill: async (skillId, skillData) => {
    const response = await api.put(`/admin/skills/${skillId}`, skillData);
    return response.data.data;
  },

  createSkill: async (skillData) => {
    const response = await api.post('/admin/skills', skillData);
    return response.data.data;
  },

  deleteSkill: async (skillId) => {
    const response = await api.delete(`/admin/skills/${skillId}`);
    return response.data;
  },
};

export default adminService;
