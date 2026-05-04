import api from '../../api/axios';

const roadmapService = {
  getRoadmap: async (careerPathId) => {
    const response = await api.get(`/roadmap/${careerPathId}`);
    return response.data.data;
  },

  getUserRoadmap: async (careerPathId) => {
    const response = await api.get(`/roadmap/user/${careerPathId}`);
    return response.data.data;
  },

  completePhase: async (roadmapId, phaseIndex) => {
    const response = await api.put(`/roadmap/${roadmapId}/phase/${phaseIndex}`, { completed: true });
    return response.data.data;
  },

  completeSkill: async (roadmapId, skillId) => {
    const response = await api.put(`/roadmap/${roadmapId}/skill/${skillId}`, { completed: true });
    return response.data.data;
  },
};

export default roadmapService;
