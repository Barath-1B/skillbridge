const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const ApiError = require('../../utils/ApiError');

const MAX_REFRESH_TOKENS = 5;

const signAuthToken = (user) =>
  jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );

// jti makes every refresh token unique — without it, two tokens signed in
// the same second are byte-identical (iat has second resolution), which
// would break rotation's used-token revocation.
const signRefreshToken = (user) =>
  jwt.sign(
    { userId: user._id, type: 'refresh', jti: crypto.randomUUID() },
    process.env.JWT_SECRET,
    { expiresIn: process.env.REFRESH_EXPIRES_IN || '30d' }
  );

// Refresh tokens are high-entropy JWTs, so a fast unsalted hash is the right
// storage form (bcrypt would add cost without security benefit).
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const tokenExpiry = (token) => new Date(jwt.decode(token).exp * 1000);

// Mint an access+refresh pair and persist the refresh hash on the user,
// keeping only the newest MAX_REFRESH_TOKENS records (multi-device cap).
const issueTokenPair = async (user) => {
  const refreshToken = signRefreshToken(user);
  await User.updateOne(
    { _id: user._id },
    {
      $push: {
        refreshTokens: {
          $each: [{ tokenHash: hashToken(refreshToken), expiresAt: tokenExpiry(refreshToken) }],
          $slice: -MAX_REFRESH_TOKENS,
        },
      },
    }
  );
  return { token: signAuthToken(user), refreshToken };
};

const sanitizeUser = (user) => {
  const obj = user.toObject({ versionKey: false });
  delete obj.password;
  delete obj.refreshTokens;
  return obj;
};

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  const pair = await issueTokenPair(user);
  return { ...pair, user: sanitizeUser(user) };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const pair = await issueTokenPair(user);
  return { ...pair, user: sanitizeUser(user) };
};

// Verify a refresh token, confirm its hash is still on record, then rotate:
// the used token is revoked and a fresh access+refresh pair is issued.
// A replayed (already-rotated) token fails the hash check and gets a 401.
const refreshSession = async (refreshToken) => {
  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
  if (payload.type !== 'refresh') {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const user = await User.findById(payload.userId).select('+refreshTokens');
  if (!user) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const now = new Date();
  const usedHash = hashToken(refreshToken);
  const record = user.refreshTokens.find(
    (rt) => rt.tokenHash === usedHash && rt.expiresAt > now
  );
  if (!record) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const newRefreshToken = signRefreshToken(user);
  user.refreshTokens = user.refreshTokens
    .filter((rt) => rt.tokenHash !== usedHash && rt.expiresAt > now)
    .concat({ tokenHash: hashToken(newRefreshToken), expiresAt: tokenExpiry(newRefreshToken) })
    .slice(-MAX_REFRESH_TOKENS);
  await user.save();

  return { token: signAuthToken(user), refreshToken: newRefreshToken, user: sanitizeUser(user) };
};

// Best-effort revocation for logout — must never throw (logout always succeeds).
const revokeRefreshToken = async (refreshToken) => {
  if (!refreshToken) return;
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (payload.type !== 'refresh') return;
    await User.updateOne(
      { _id: payload.userId },
      { $pull: { refreshTokens: { tokenHash: hashToken(refreshToken) } } }
    );
  } catch {
    /* invalid/expired token — nothing to revoke */
  }
};

const getUserById = async (userId) => {
  const user = await User.findById(userId)
    .populate('currentSkills', 'name category tags')
    .select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user.toObject({ versionKey: false });
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');

  const valid = await bcryptjs.compare(currentPassword, user.password);
  if (!valid) throw new ApiError(401, 'Current password is incorrect');

  if (currentPassword === newPassword) {
    throw new ApiError(400, 'New password must differ from current password');
  }

  user.password = await bcryptjs.hash(newPassword, 10);
  await user.save();
  return true;
};

const deleteAccount = async (userId, { password }) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');

  const valid = await bcryptjs.compare(password, user.password);
  if (!valid) throw new ApiError(401, 'Password is incorrect');

  await User.findByIdAndDelete(userId);
  return true;
};

module.exports = {
  registerUser,
  loginUser,
  refreshSession,
  revokeRefreshToken,
  getUserById,
  changePassword,
  deleteAccount,
};
