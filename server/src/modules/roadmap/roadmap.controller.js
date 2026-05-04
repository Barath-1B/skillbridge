const roadmapService = require('./roadmap.service');
const ApiResponse = require('../../utils/ApiResponse');

const getCareerBrief = async (req, res, next) => {
  try {
    const data = await roadmapService.getCareerBrief(req.user.userId, req.params.careerPathId);
    ApiResponse.ok(res, 'Career brief retrieved', data);
  } catch (err) {
    next(err);
  }
};

const getMyRoadmaps = async (req, res, next) => {
  try {
    const data = await roadmapService.getMyRoadmaps(req.user.userId);
    ApiResponse.ok(res, 'Roadmaps retrieved', data);
  } catch (err) {
    next(err);
  }
};

const toggleSkill = async (req, res, next) => {
  try {
    const { careerPathId, skillId } = req.params;
    const data = await roadmapService.toggleSkill(req.user.userId, careerPathId, skillId);
    ApiResponse.ok(res, 'Skill progress updated', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getCareerBrief, getMyRoadmaps, toggleSkill };
