const mongoose = require('mongoose');

const requiredSkillSchema = new mongoose.Schema(
  {
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      required: true,
    },
  },
  { _id: false }
);

const phaseSchema = new mongoose.Schema(
  {
    phase: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
    title: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    milestoneMonths: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['video', 'article', 'course', 'cert'],
      required: true,
    },
  },
  { _id: false }
);

const careerPathSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Career path title is required'],
      unique: true,
      trim: true,
    },
    domain: {
      type: String,
      required: [true, 'Domain is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    requiredSkills: {
      type: [requiredSkillSchema],
      default: [],
    },
    phases: {
      type: [phaseSchema],
      validate: {
        validator: (v) => v.length === 3,
        message: 'Each career path must have exactly 3 phases',
      },
    },
    resources: {
      type: [resourceSchema],
      default: [],
    },
    certifications: {
      type: [String],
      default: [],
    },
    advantages: {
      type: [String],
      default: [],
    },
    estimatedTimeToBridge: {
      type: String,
      required: [true, 'Estimated time to bridge is required'],
    },
    demand: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CareerPath', careerPathSchema);
