const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    careerPathId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CareerPath',
      required: [true, 'Career path ID is required'],
    },
    completedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    completedRoadmapItems: {
      type: [
        new mongoose.Schema(
          {
            phase: { type: Number, required: true, min: 1, max: 3 },
            skillName: { type: String, required: true, trim: true },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    percentComplete: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

userProgressSchema.index({ userId: 1, careerPathId: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
