const ApiResponse = require('../../utils/ApiResponse');
const authService = require('./auth.service');

const TOKEN_COOKIE = 'token';
const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const setAuthCookie = (res, token) => res.cookie(TOKEN_COOKIE, token, TOKEN_COOKIE_OPTIONS);
const clearAuthCookie = (res) => res.clearCookie(TOKEN_COOKIE);

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await authService.registerUser({ name, email, password });
    setAuthCookie(res, token);
    ApiResponse.created(res, 'User registered successfully', { token, user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser({ email, password });
    setAuthCookie(res, token);
    ApiResponse.ok(res, 'Login successful', { token, user });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  clearAuthCookie(res);
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

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user.userId, { currentPassword, newPassword });
    ApiResponse.ok(res, 'Password updated successfully');
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const { password } = req.body;
    await authService.deleteAccount(req.user.userId, { password });
    clearAuthCookie(res);
    ApiResponse.ok(res, 'Account deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  changePassword,
  deleteAccount,
};
