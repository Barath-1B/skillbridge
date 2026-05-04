const User = require('../../models/user.model');
const CareerPath = require('../../models/career-path.model');
const Skill = require('../../models/skill.model');
const UserProgress = require('../../models/user-progress.model');
const ApiError = require('../../utils/ApiError');

// Career Path Services
const listCareers = async (page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;

  // Build query filter
  const query = {};
  if (filters.domain) query.domain = filters.domain;
  if (filters.difficulty) query.difficulty = filters.difficulty;
  if (filters.demand) query.demand = filters.demand;
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } },
    ];
  }

  const total = await CareerPath.countDocuments(query);
  const careers = await CareerPath.find(query)
    .populate('requiredSkills.skillId', 'name category')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    careers,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const createCareer = async (careerData) => {
  // Validate required skills exist
  if (careerData.requiredSkills && careerData.requiredSkills.length > 0) {
    for (const rs of careerData.requiredSkills) {
      const skill = await Skill.findById(rs.skillId);
      if (!skill) {
        throw new ApiError(404, `Skill with ID ${rs.skillId} not found`);
      }
    }
  }

  // Validate phases
  if (!careerData.phases || careerData.phases.length !== 3) {
    throw new ApiError(400, 'Career path must have exactly 3 phases');
  }

  const career = new CareerPath(careerData);
  await career.save();
  await career.populate('requiredSkills.skillId', 'name category');
  return career;
};

const updateCareer = async (careerPathId, updateData) => {
  // Validate skill references if provided
  if (updateData.requiredSkills && updateData.requiredSkills.length > 0) {
    for (const rs of updateData.requiredSkills) {
      const skill = await Skill.findById(rs.skillId);
      if (!skill) {
        throw new ApiError(404, `Skill with ID ${rs.skillId} not found`);
      }
    }
  }

  // Validate phases if provided
  if (updateData.phases && updateData.phases.length !== 3) {
    throw new ApiError(400, 'Career path must have exactly 3 phases');
  }

  const career = await CareerPath.findByIdAndUpdate(
    careerPathId,
    updateData,
    { new: true, runValidators: true }
  ).populate('requiredSkills.skillId', 'name category');

  if (!career) {
    throw new ApiError(404, 'Career path not found');
  }

  return career;
};

const deleteCareer = async (careerPathId) => {
  // Delete associated user progress records
  await UserProgress.deleteMany({ careerPathId });

  const career = await CareerPath.findByIdAndDelete(careerPathId);
  if (!career) {
    throw new ApiError(404, 'Career path not found');
  }

  return { message: 'Career path deleted successfully', deletedCareer: career };
};

// Skill Services
const listSkills = async (page = 1, limit = 20, filters = {}) => {
  const skip = (page - 1) * limit;

  const query = {};
  if (filters.category) query.category = filters.category;
  if (filters.search) {
    query.name = { $regex: filters.search, $options: 'i' };
  }

  const total = await Skill.countDocuments(query);
  const skills = await Skill.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 });

  return {
    skills,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

const createSkill = async (skillData) => {
  const skill = new Skill(skillData);
  await skill.save();
  return skill;
};

const updateSkill = async (skillId, updateData) => {
  const skill = await Skill.findByIdAndUpdate(
    skillId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!skill) {
    throw new ApiError(404, 'Skill not found');
  }

  return skill;
};

const deleteSkill = async (skillId) => {
  // Check if skill is in use
  const careerCount = await CareerPath.countDocuments({
    'requiredSkills.skillId': skillId,
  });
  const userCount = await User.countDocuments({
    currentSkills: skillId,
  });

  if (careerCount > 0 || userCount > 0) {
    throw new ApiError(
      409,
      `Cannot delete skill: in use by ${careerCount} career paths and ${userCount} users`
    );
  }

  const skill = await Skill.findByIdAndDelete(skillId);
  if (!skill) {
    throw new ApiError(404, 'Skill not found');
  }

  return { message: 'Skill deleted successfully', deletedSkill: skill };
};

// User Services
const listUsers = async (page = 1, limit = 20, filters = {}) => {
  const skip = (page - 1) * limit;

  const query = {};
  if (filters.role) query.role = filters.role;
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } },
    ];
  }

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .select('-password') // Exclude passwords
    .populate('currentSkills', 'name category')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

// Analytics Services
const getAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalCareerPaths = await CareerPath.countDocuments();
  const totalSkills = await Skill.countDocuments();

  // Users per career path with match data
  const careerPaths = await CareerPath.find().select('_id title domain');
  const careerAnalytics = await Promise.all(
    careerPaths.map(async (cp) => {
      // Get user progress for this career
      const progressRecords = await UserProgress.find({
        careerPathId: cp._id,
      });

      // For each progress record, we'll calculate stats
      // In a real implementation, you'd store match scores in UserProgress
      return {
        careerPathId: cp._id,
        title: cp.title,
        domain: cp.domain,
        usersAnalyzed: progressRecords.length, // Count of users who analyzed this path
      };
    })
  );

  // Overall stats
  const stats = {
    totalUsers,
    totalCareerPaths,
    totalSkills,
    usersByRole: await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]),
    skillsByCategory: await Skill.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]),
    careerPathStats: careerAnalytics.sort(
      (a, b) => b.usersAnalyzed - a.usersAnalyzed
    ),
  };

  return stats;
};

module.exports = {
  listCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  listSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  listUsers,
  getAnalytics,
};
