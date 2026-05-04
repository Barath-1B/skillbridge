const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate.middleware');
const { analyze } = require('./analyzer.controller');

// GET /api/analyze — run gap analysis for the authenticated user
router.get('/', authenticate, analyze);

module.exports = router;
