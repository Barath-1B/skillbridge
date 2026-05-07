const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate.middleware');
const { getCareerBrief, getMyRoadmaps, toggleSkill, toggleRoadmapItem } = require('./roadmap.controller');

// All roadmap routes require authentication
router.use(authenticate);

router.get('/', getMyRoadmaps);
router.get('/:careerPathId', getCareerBrief);
router.patch('/:careerPathId/skills/:skillId', toggleSkill);
router.patch('/:careerPathId/roadmap-items', toggleRoadmapItem);

module.exports = router;
