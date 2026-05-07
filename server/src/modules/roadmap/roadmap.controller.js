const roadmapService = require('./roadmap.service');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

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

const toggleRoadmapItem = async (req, res, next) => {
  try {
    const { careerPathId } = req.params;
    const { phase, skillName } = req.body || {};
    const phaseNum = Number(phase);
    if (!Number.isInteger(phaseNum) || phaseNum < 1 || phaseNum > 3) {
      return next(new ApiError(400, '`phase` must be an integer 1, 2, or 3'));
    }
    if (typeof skillName !== 'string' || !skillName.trim()) {
      return next(new ApiError(400, '`skillName` is required'));
    }
    const data = await roadmapService.toggleRoadmapItem(
      req.user.userId,
      careerPathId,
      phaseNum,
      skillName.trim()
    );
    ApiResponse.ok(res, 'Roadmap item toggled', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getCareerBrief, getMyRoadmaps, toggleSkill, toggleRoadmapItem };
