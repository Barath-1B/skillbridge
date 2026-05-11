const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title:    { type: String, trim: true },
    url:      { type: String, trim: true },
    type:     { type: String, enum: ['course', 'book', 'tutorial', 'documentation'] },
    platform: { type: String, trim: true },
  },
  { _id: false }
);

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['technical-skill', 'knowledge', 'certification', 'soft-skill'],
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
    },
    difficultyLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    resources: {
      type: [resourceSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
