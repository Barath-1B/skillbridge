const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');
const ApiError = require('../../utils/ApiError');

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const userObj = user.toObject({ versionKey: false });
  delete userObj.password;

  return { token, user: userObj };
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

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const userObj = user.toObject({ versionKey: false });
  delete userObj.password;

  return { token, user: userObj };
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user.toObject({ versionKey: false });
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
