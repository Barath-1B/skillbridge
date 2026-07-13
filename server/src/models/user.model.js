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

// MBTI dimension percentages — each pair (E/I, S/N, T/F, J/P) sums to 100.
// Display-only: never feeds the gap engine or match scores.
const mbtiScoresSchema = new mongoose.Schema(
  {
    E: { type: Number, default: 0, min: 0, max: 100 },
    I: { type: Number, default: 0, min: 0, max: 100 },
    S: { type: Number, default: 0, min: 0, max: 100 },
    N: { type: Number, default: 0, min: 0, max: 100 },
    T: { type: Number, default: 0, min: 0, max: 100 },
    F: { type: Number, default: 0, min: 0, max: 100 },
    J: { type: Number, default: 0, min: 0, max: 100 },
    P: { type: Number, default: 0, min: 0, max: 100 },
  },
  { _id: false }
);

// Rotating refresh-token records: only the sha256 hash of the token is stored.
// Capped at 5 entries per user (multi-device) — oldest evicted on overflow.
const refreshTokenSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
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
    mbtiType: {
      type: String,
      default: null,
      maxlength: 4,
    },
    mbtiScores: {
      type: mbtiScoresSchema,
      default: () => ({}),
    },
    lastMbtiTestDate: {
      type: Date,
    },
    refreshTokens: {
      type: [refreshTokenSchema],
      default: [],
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
