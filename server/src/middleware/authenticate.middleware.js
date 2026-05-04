const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const authenticate = (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }
  }

  if (!token) {
    return next(new ApiError(401, 'Not authenticated'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = authenticate;
