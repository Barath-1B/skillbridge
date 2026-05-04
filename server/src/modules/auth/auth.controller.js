const ApiResponse = require('../../utils/ApiResponse');
const authService = require('./auth.service');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await authService.registerUser({ name, email, password });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie('token', token, cookieOptions);
    ApiResponse.created(res, 'User registered successfully', { token, user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser({ email, password });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie('token', token, cookieOptions);
    ApiResponse.ok(res, 'Login successful', { token, user });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  ApiResponse.ok(res, 'Logout successful');
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.userId);
    ApiResponse.ok(res, 'User retrieved', user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
};
