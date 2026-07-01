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
    // Adjacency graph for transfer credit: a user who holds `name` gets
    // `similarity` (0-1) partial credit toward this skill. Stored by skill
    // name to match the seed convention (careers reference skills by name).
    relatedSkills: {
      type: [
        {
          _id: false,
          name: { type: String, trim: true, required: true },
          similarity: { type: Number, min: 0, max: 1, required: true },
        },
      ],
      default: [],
    },
    // Rough effort to reach working proficiency. Optional; the roadmap falls
    // back to a difficultyLevel → hours map when absent.
    learningHours: {
      type: Number,
      min: 0,
    },
    resources: {
      type: [resourceSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
