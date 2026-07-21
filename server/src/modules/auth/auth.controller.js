const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');
const authService = require('./auth.service');

const TOKEN_COOKIE = 'token';
const REFRESH_COOKIE = 'refreshToken';
const isProd = process.env.NODE_ENV === 'production';
// sameSite must be 'none' in production: the client (Vercel) and API (Render)
// are cross-origin, so 'strict'/'lax' cookies would never be sent on API calls.
const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  maxAge: 60 * 60 * 1000,
};
// path-scoped so the long-lived refresh token is only ever sent to auth endpoints.
const REFRESH_COOKIE_OPTIONS = {
  ...TOKEN_COOKIE_OPTIONS,
  path: '/api/auth',
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const setAuthCookies = (res, token, refreshToken) => {
  res.cookie(TOKEN_COOKIE, token, TOKEN_COOKIE_OPTIONS);
  res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
};
// clearCookie must match the set options (minus maxAge) or browsers keep the cookie.
const clearAuthCookies = (res) => {
  const { maxAge: _a, ...tokenOpts } = TOKEN_COOKIE_OPTIONS;
  const { maxAge: _b, ...refreshOpts } = REFRESH_COOKIE_OPTIONS;
  res.clearCookie(TOKEN_COOKIE, tokenOpts);
  res.clearCookie(REFRESH_COOKIE, refreshOpts);
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { token, refreshToken, user } = await authService.registerUser({ name, email, password });
    setAuthCookies(res, token, refreshToken);
    ApiResponse.created(res, 'User registered successfully', { token, user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, refreshToken, user } = await authService.loginUser({ email, password });
    setAuthCookies(res, token, refreshToken);
    ApiResponse.ok(res, 'Login successful', { token, user });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  await authService.revokeRefreshToken(req.cookies?.[REFRESH_COOKIE]);
  clearAuthCookies(res);
  ApiResponse.ok(res, 'Logout successful');
};

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.[REFRESH_COOKIE];
    if (!refreshToken) {
      clearAuthCookies(res);
      return next(new ApiError(401, 'Refresh token missing'));
    }
    const { token, refreshToken: newRefreshToken, user } = await authService.refreshSession(refreshToken);
    setAuthCookies(res, token, newRefreshToken);
    ApiResponse.ok(res, 'Session refreshed', { token, user });
  } catch (err) {
    clearAuthCookies(res);
    next(err);
  }
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
    clearAuthCookies(res);
    ApiResponse.ok(res, 'Account deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  refresh,
  getMe,
  changePassword,
  deleteAccount,
};
