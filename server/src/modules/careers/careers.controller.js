const careersService = require('./careers.service');
const ApiResponse = require('../../utils/ApiResponse');

const listCareers = async (req, res, next) => {
  try {
    const { domain, difficulty, demand } = req.query;
    const careers = await careersService.listCareers({ domain, difficulty, demand });
    ApiResponse.ok(res, 'Career paths retrieved', careers);
  } catch (err) {
    next(err);
  }
};

const getCareerById = async (req, res, next) => {
  try {
    const career = await careersService.getCareerById(req.params.id);
    ApiResponse.ok(res, 'Career path retrieved', career);
  } catch (err) {
    next(err);
  }
};

const analyzeCareer = async (req, res, next) => {
  try {
    const result = await careersService.analyzeCareer(req.user.userId, req.params.id);
    ApiResponse.ok(res, 'Career analysis complete', result);
  } catch (err) {
    next(err);
  }
};

const saveCareer = async (req, res, next) => {
  try {
    const progress = await careersService.saveCareer(req.user.userId, req.params.id);
    ApiResponse.ok(res, 'Career path saved', progress);
  } catch (err) {
    next(err);
  }
};

const unsaveCareer = async (req, res, next) => {
  try {
    await careersService.unsaveCareer(req.user.userId, req.params.id);
    ApiResponse.ok(res, 'Career path removed from saved');
  } catch (err) {
    next(err);
  }
};

const getSavedCareers = async (req, res, next) => {
  try {
    const saved = await careersService.getSavedCareers(req.user.userId);
    ApiResponse.ok(res, 'Saved career paths retrieved', saved);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listCareers,
  getCareerById,
  analyzeCareer,
  saveCareer,
  unsaveCareer,
  getSavedCareers,
};
