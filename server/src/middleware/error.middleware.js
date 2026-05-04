const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return ApiResponse.error(res, err.statusCode, err.message, err.errors);
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
    }));
    return ApiResponse.error(res, 400, 'Validation failed', errors);
  }

  if (err.name === 'CastError') {
    return ApiResponse.error(res, 400, 'Invalid ID format');
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return ApiResponse.error(res, 409, `${field} already exists`);
  }

  console.error('Unhandled error:', err);
  return ApiResponse.error(res, 500, 'Internal server error');
};

module.exports = errorHandler;
