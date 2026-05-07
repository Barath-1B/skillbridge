import api from '../../api/axios';

const roadmapService = {
  getRoadmap: async (careerPathId) => {
    const response = await api.get(`/roadmap/${careerPathId}`);
    return response.data.data;
  },

  toggleRoadmapItem: async (careerPathId, phase, skillName) => {
    const response = await api.patch(`/roadmap/${careerPathId}/roadmap-items`, {
      phase,
      skillName,
    });
    return response.data.data;
  },
};

export default roadmapService;
