const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate.middleware');
const {
  listCareers,
  getCareerById,
  analyzeCareer,
  saveCareer,
  unsaveCareer,
  getSavedCareers,
} = require('./careers.controller');

// Public
router.get('/', listCareers);

// Authenticated — /saved must come before /:id to avoid "saved" matching as an ObjectId
router.get('/saved', authenticate, getSavedCareers);

// Public — single career detail
router.get('/:id', getCareerById);

// Authenticated — per-career operations
router.get('/:id/analyze', authenticate, analyzeCareer);
router.post('/:id/save', authenticate, saveCareer);
router.delete('/:id/save', authenticate, unsaveCareer);

module.exports = router;
