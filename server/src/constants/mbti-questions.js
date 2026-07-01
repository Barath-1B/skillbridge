// MBTI question bank — 32 questions, 8 per dichotomy (E/I, S/N, T/F, J/P),
// interleaved EI → SN → TF → JP so the quiz feels varied. Each question has
// two options; which letter appears as option A is mixed across questions to
// reduce response bias. Scoring is count-based (see utils/personality-scoring.js);
// a 16/16 tie within a pair resolves to the first letter (E, S, T, J).
// MBTI is display-only: it never feeds the gap engine or match scores.

const mbtiQuestions = [
  // ——— Round 1 ———
  {
    id: 1,
    dichotomy: 'EI',
    text: 'At a team kickoff meeting, you are more likely to...',
    options: [
      { value: 'A', label: 'Work the room and introduce yourself to everyone', dimension: 'E' },
      { value: 'B', label: 'Get to know one or two people well', dimension: 'I' },
    ],
  },
  {
    id: 2,
    dichotomy: 'SN',
    text: 'When learning a new tool or framework, you prefer...',
    options: [
      { value: 'A', label: 'Step-by-step tutorials with concrete examples', dimension: 'S' },
      { value: 'B', label: 'Grasping the big idea, then exploring what is possible', dimension: 'N' },
    ],
  },
  {
    id: 3,
    dichotomy: 'TF',
    text: "When a teammate's work falls short, your first instinct is to...",
    options: [
      { value: 'A', label: 'Point out exactly what is wrong and how to fix it', dimension: 'T' },
      { value: 'B', label: 'Think about how to deliver the feedback kindly', dimension: 'F' },
    ],
  },
  {
    id: 4,
    dichotomy: 'JP',
    text: 'Your task list is usually...',
    options: [
      { value: 'A', label: 'Planned and prioritized in advance', dimension: 'J' },
      { value: 'B', label: 'A loose guide you adapt on the fly', dimension: 'P' },
    ],
  },
  // ——— Round 2 ———
  {
    id: 5,
    dichotomy: 'EI',
    text: 'After a full day of meetings and collaboration, you feel...',
    options: [
      { value: 'A', label: 'Energized by all the interaction', dimension: 'E' },
      { value: 'B', label: 'Drained and in need of quiet time', dimension: 'I' },
    ],
  },
  {
    id: 6,
    dichotomy: 'SN',
    text: 'You place the most trust in...',
    options: [
      { value: 'A', label: 'Hands-on experience and proven methods', dimension: 'S' },
      { value: 'B', label: 'Hunches and novel theories worth testing', dimension: 'N' },
    ],
  },
  {
    id: 7,
    dichotomy: 'TF',
    text: 'A decision feels right to you when it is...',
    options: [
      { value: 'A', label: 'Logically sound, whatever the mood around it', dimension: 'T' },
      { value: 'B', label: 'Good for the people it affects', dimension: 'F' },
    ],
  },
  {
    id: 8,
    dichotomy: 'JP',
    text: 'Deadlines are...',
    options: [
      { value: 'A', label: 'Commitments you plan around and finish early', dimension: 'J' },
      { value: 'B', label: 'Useful pressure that sparks last-minute brilliance', dimension: 'P' },
    ],
  },
  // ——— Round 3 ———
  {
    id: 9,
    dichotomy: 'EI',
    text: 'When facing a hard problem, you prefer to...',
    options: [
      { value: 'A', label: 'Think it through alone before involving others', dimension: 'I' },
      { value: 'B', label: 'Talk it out with colleagues right away', dimension: 'E' },
    ],
  },
  {
    id: 10,
    dichotomy: 'SN',
    text: 'When reading documentation, your eye goes to...',
    options: [
      { value: 'A', label: 'What the system could become', dimension: 'N' },
      { value: 'B', label: 'The practical details that matter right now', dimension: 'S' },
    ],
  },
  {
    id: 11,
    dichotomy: 'TF',
    text: 'In a heated code review, you care most about...',
    options: [
      { value: 'A', label: 'Keeping the team relationship healthy', dimension: 'F' },
      { value: 'B', label: 'Landing on the objectively best solution', dimension: 'T' },
    ],
  },
  {
    id: 12,
    dichotomy: 'JP',
    text: 'You prefer projects that...',
    options: [
      { value: 'A', label: 'Stay open to new directions as they unfold', dimension: 'P' },
      { value: 'B', label: 'Follow a clear, settled plan', dimension: 'J' },
    ],
  },
  // ——— Round 4 ———
  {
    id: 13,
    dichotomy: 'EI',
    text: 'In group brainstorms, you usually...',
    options: [
      { value: 'A', label: 'Share ideas out loud as they come to you', dimension: 'E' },
      { value: 'B', label: 'Refine an idea privately before voicing it', dimension: 'I' },
    ],
  },
  {
    id: 14,
    dichotomy: 'SN',
    text: 'In project planning, you are drawn to...',
    options: [
      { value: 'A', label: 'Realistic specifics and current constraints', dimension: 'S' },
      { value: 'B', label: 'Future possibilities and innovative angles', dimension: 'N' },
    ],
  },
  {
    id: 15,
    dichotomy: 'TF',
    text: 'You are more persuaded by...',
    options: [
      { value: 'A', label: 'A rigorous, well-structured argument', dimension: 'T' },
      { value: 'B', label: 'A heartfelt story about real people', dimension: 'F' },
    ],
  },
  {
    id: 16,
    dichotomy: 'JP',
    text: 'Your workspace tends to be...',
    options: [
      { value: 'A', label: 'Organized, with everything in its place', dimension: 'J' },
      { value: 'B', label: 'A creative mess you navigate just fine', dimension: 'P' },
    ],
  },
  // ——— Round 5 ———
  {
    id: 17,
    dichotomy: 'EI',
    text: 'Your ideal workspace is...',
    options: [
      { value: 'A', label: 'A quiet room with few interruptions', dimension: 'I' },
      { value: 'B', label: 'An open space buzzing with people', dimension: 'E' },
    ],
  },
  {
    id: 18,
    dichotomy: 'SN',
    text: 'You would describe yourself as more...',
    options: [
      { value: 'A', label: 'Imaginative — drawn to what could be', dimension: 'N' },
      { value: 'B', label: 'Practical — focused on what works', dimension: 'S' },
    ],
  },
  {
    id: 19,
    dichotomy: 'TF',
    text: 'When two colleagues disagree, you first...',
    options: [
      { value: 'A', label: 'Weigh the merits of each position', dimension: 'T' },
      { value: 'B', label: 'Try to understand how each person feels', dimension: 'F' },
    ],
  },
  {
    id: 20,
    dichotomy: 'JP',
    text: 'Unexpected schedule changes feel...',
    options: [
      { value: 'A', label: 'Like an annoyance you have to re-plan around', dimension: 'J' },
      { value: 'B', label: 'Like welcome variety in the week', dimension: 'P' },
    ],
  },
  // ——— Round 6 ———
  {
    id: 21,
    dichotomy: 'EI',
    text: 'When starting at a new company, you...',
    options: [
      { value: 'A', label: 'Build a wide network quickly', dimension: 'E' },
      { value: 'B', label: 'Form a few deep connections over time', dimension: 'I' },
    ],
  },
  {
    id: 22,
    dichotomy: 'SN',
    text: 'When debugging, you tend to...',
    options: [
      { value: 'A', label: 'Methodically trace through each step', dimension: 'S' },
      { value: 'B', label: 'Leap to a theory about the root cause and test it', dimension: 'N' },
    ],
  },
  {
    id: 23,
    dichotomy: 'TF',
    text: 'Praise means the most to you when it recognizes...',
    options: [
      { value: 'A', label: 'Your competence and sharp thinking', dimension: 'T' },
      { value: 'B', label: 'Your support and contribution to the team', dimension: 'F' },
    ],
  },
  {
    id: 24,
    dichotomy: 'JP',
    text: 'You make decisions...',
    options: [
      { value: 'A', label: 'Quickly, so things are settled', dimension: 'J' },
      { value: 'B', label: 'Slowly, keeping options open as long as possible', dimension: 'P' },
    ],
  },
  // ——— Round 7 ———
  {
    id: 25,
    dichotomy: 'EI',
    text: 'Presenting to a large audience feels...',
    options: [
      { value: 'A', label: 'Exciting — you enjoy the spotlight', dimension: 'E' },
      { value: 'B', label: 'Like something to prepare for carefully and recover from', dimension: 'I' },
    ],
  },
  {
    id: 26,
    dichotomy: 'SN',
    text: 'A job appeals to you most when it offers...',
    options: [
      { value: 'A', label: 'A chance to invent things that do not exist yet', dimension: 'N' },
      { value: 'B', label: 'Tangible results you can see and measure', dimension: 'S' },
    ],
  },
  {
    id: 27,
    dichotomy: 'TF',
    text: 'Rules and policies should be...',
    options: [
      { value: 'A', label: 'Applied consistently to everyone', dimension: 'T' },
      { value: 'B', label: 'Bent when circumstances call for compassion', dimension: 'F' },
    ],
  },
  {
    id: 28,
    dichotomy: 'JP',
    text: 'Starting a new feature, you first...',
    options: [
      { value: 'A', label: 'Explore and prototype freely', dimension: 'P' },
      { value: 'B', label: 'Write out a plan and break down the tasks', dimension: 'J' },
    ],
  },
  // ——— Round 8 ———
  {
    id: 29,
    dichotomy: 'EI',
    text: 'During lunch breaks you would rather...',
    options: [
      { value: 'A', label: 'Recharge alone or with one close friend', dimension: 'I' },
      { value: 'B', label: 'Join the big table conversation', dimension: 'E' },
    ],
  },
  {
    id: 30,
    dichotomy: 'SN',
    text: 'Instructions are most useful when they...',
    options: [
      { value: 'A', label: 'Spell everything out precisely', dimension: 'S' },
      { value: 'B', label: 'Leave room for your own interpretation', dimension: 'N' },
    ],
  },
  {
    id: 31,
    dichotomy: 'TF',
    text: 'You would rather be seen as...',
    options: [
      { value: 'A', label: 'Warm and supportive', dimension: 'F' },
      { value: 'B', label: 'Sharp and analytical', dimension: 'T' },
    ],
  },
  {
    id: 32,
    dichotomy: 'JP',
    text: 'The best trips are the ones where...',
    options: [
      { value: 'A', label: 'The itinerary is booked well ahead', dimension: 'J' },
      { value: 'B', label: 'You figure it out as you go', dimension: 'P' },
    ],
  },
];

module.exports = mbtiQuestions;
