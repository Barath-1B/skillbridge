const adminService = require('./service');
const ApiResponse = require('../../utils/ApiResponse');

// Career Path Controllers
const listCareers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filters = {
      domain: req.query.domain,
      difficulty: req.query.difficulty,
      demand: req.query.demand,
      search: req.query.search,
    };

    const result = await adminService.listCareers(page, limit, filters);
    ApiResponse.ok(res, 'Career paths retrieved', result);
  } catch (err) {
    next(err);
  }
};

const createCareer = async (req, res, next) => {
  try {
    const career = await adminService.createCareer(req.body);
    ApiResponse.created(res, 'Career path created', career);
  } catch (err) {
    next(err);
  }
};

const updateCareer = async (req, res, next) => {
  try {
    const career = await adminService.updateCareer(req.params.id, req.body);
    ApiResponse.ok(res, 'Career path updated', career);
  } catch (err) {
    next(err);
  }
};

const deleteCareer = async (req, res, next) => {
  try {
    const result = await adminService.deleteCareer(req.params.id);
    ApiResponse.ok(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

// Skill Controllers
const listSkills = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
      category: req.query.category,
      search: req.query.search,
    };

    const result = await adminService.listSkills(page, limit, filters);
    ApiResponse.ok(res, 'Skills retrieved', result);
  } catch (err) {
    next(err);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const skill = await adminService.createSkill(req.body);
    ApiResponse.created(res, 'Skill created', skill);
  } catch (err) {
    next(err);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const skill = await adminService.updateSkill(req.params.id, req.body);
    ApiResponse.ok(res, 'Skill updated', skill);
  } catch (err) {
    next(err);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const result = await adminService.deleteSkill(req.params.id);
    ApiResponse.ok(res, result.message, result);
  } catch (err) {
    next(err);
  }
};

// User Controllers
const listUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filters = {
      role: req.query.role,
      search: req.query.search,
    };

    const result = await adminService.listUsers(page, limit, filters);
    ApiResponse.ok(res, 'Users retrieved', result);
  } catch (err) {
    next(err);
  }
};

// Analytics Controller
const getAnalytics = async (req, res, next) => {
  try {
    const analytics = await adminService.getAnalytics();
    ApiResponse.ok(res, 'Analytics retrieved', analytics);
  } catch (err) {
    next(err);
  }
};

module.exports = {
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
};
