const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate.middleware');
const requireRole = require('../../middleware/role.middleware');
const {
  listCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  listSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  listUsers,
  getAnalytics,
} = require('./controller');

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireRole('admin'));

// Career Path Routes
router.get('/careers', listCareers);
router.post('/careers', createCareer);
router.put('/careers/:id', updateCareer);
router.delete('/careers/:id', deleteCareer);

// Skill Routes
router.get('/skills', listSkills);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// User Routes
router.get('/users', listUsers);

// Analytics Routes
router.get('/analytics', getAnalytics);

module.exports = router;
