const mongoose = require('mongoose');

const oceanScoreSchema = new mongoose.Schema(
  {
    O: { type: Number, default: 50, min: 0, max: 100 },
    C: { type: Number, default: 50, min: 0, max: 100 },
    E: { type: Number, default: 50, min: 0, max: 100 },
    A: { type: Number, default: 50, min: 0, max: 100 },
    N: { type: Number, default: 50, min: 0, max: 100 },
  },
  { _id: false }
);

const notificationPreferencesSchema = new mongoose.Schema(
  {
    emailUpdates: { type: Boolean, default: true },
    productNews: { type: Boolean, default: false },
    weeklyDigest: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatarUrl: {
      type: String,
      default: '',
      trim: true,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    notificationPreferences: {
      type: notificationPreferencesSchema,
      default: () => ({}),
    },
    currentSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    certifications: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      enum: ['student', '0-1yr', '1-3yr', '3+yr'],
    },
    interests: {
      type: [String],
      default: [],
    },
    oceanScore: {
      type: oceanScoreSchema,
      default: () => ({}),
    },
    lastOceanTestDate: {
      type: Date,
    },
    lastSkillsTestDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
