require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const connectDB = require('../config/db');
const Skill = require('../models/skill.model');
const CareerPath = require('../models/career-path.model');
const skillsData = require('./skills-az.seed');
const careersData = require('./careers.seed');

const seed = async () => {
  await connectDB();

  // ── 1. Clear existing data ─────────────────────────────────────────────
  await Skill.deleteMany({});
  await CareerPath.deleteMany({});
  console.log('Cleared existing skills and career paths.');

  // ── 2. Insert skills ───────────────────────────────────────────────────
  const insertedSkills = await Skill.insertMany(skillsData);
  console.log(`Seeded ${insertedSkills.length} skills.`);

  // ── 3. Build name → ObjectId map ───────────────────────────────────────
  const skillNameToId = {};
  for (const skill of insertedSkills) {
    skillNameToId[skill.name] = skill._id;
  }

  // ── 4. Resolve skill names → ObjectIds in each career ─────────────────
  const resolvedCareers = careersData.map((career) => {
    const requiredSkills = career.requiredSkillNames
      .map(({ name, weight, priority }) => {
        const skillId = skillNameToId[name];
        if (!skillId) {
          console.warn(`  Warning: skill "${name}" not found in seed data — skipping.`);
          return null;
        }
        return { skillId, weight, priority };
      })
      .filter(Boolean);

    const { requiredSkillNames, ...rest } = career;
    return { ...rest, requiredSkills };
  });

  // ── 5. Insert career paths ─────────────────────────────────────────────
  const insertedCareers = await CareerPath.insertMany(resolvedCareers);
  console.log(`Seeded ${insertedCareers.length} career paths.`);

  // ── 6. Summary ─────────────────────────────────────────────────────────
  console.log('\nSeed complete:');
  insertedCareers.forEach((c) => console.log(`  - ${c.title} (${c.domain})`));

  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
