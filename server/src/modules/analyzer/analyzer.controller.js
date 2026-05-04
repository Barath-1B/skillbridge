const analyzerService = require('./analyzer.service');
const ApiResponse = require('../../utils/ApiResponse');

const analyze = async (req, res, next) => {
  try {
    const data = await analyzerService.runAnalysis(req.user.userId);
    ApiResponse.ok(res, 'Analysis complete', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { analyze };
