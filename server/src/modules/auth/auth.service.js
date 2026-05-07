const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const ApiError = require('../../utils/ApiError');

const signAuthToken = (user) =>
  jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

const sanitizeUser = (user) => {
  const obj = user.toObject({ versionKey: false });
  delete obj.password;
  return obj;
};

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  return { token: signAuthToken(user), user: sanitizeUser(user) };
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

  return { token: signAuthToken(user), user: sanitizeUser(user) };
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
  getUserById,
  changePassword,
  deleteAccount,
};
