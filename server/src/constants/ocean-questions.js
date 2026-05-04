const oceanQuestions = [
  {
    id: 1,
    text: "When facing a new technology, I prefer to...",
    options: [
      { value: 'A', label: "Dive in and experiment immediately", trait: 'O', score: 85 },
      { value: 'B', label: "Read documentation and learn systematically", trait: 'C', score: 80 },
      { value: 'C', label: "Ask experienced colleagues for guidance", trait: 'A', score: 75 },
      { value: 'D', label: "Stick with familiar tools I'm confident with", trait: 'N', score: 65 }
    ]
  },
  {
    id: 2,
    text: "When managing projects, I typically...",
    options: [
      { value: 'A', label: "Create detailed plans and strict timelines", trait: 'C', score: 85 },
      { value: 'B', label: "Stay flexible and adapt as new info emerges", trait: 'O', score: 75 },
      { value: 'C', label: "Focus on keeping the team motivated", trait: 'E', score: 80 },
      { value: 'D', label: "Let others take the lead when possible", trait: 'A', score: 70 }
    ]
  },
  {
    id: 3,
    text: "At professional networking events, I...",
    options: [
      { value: 'A', label: "Actively approach people and start conversations", trait: 'E', score: 85 },
      { value: 'B', label: "Wait for others to approach me", trait: 'N', score: 75 },
      { value: 'C', label: "Focus on having deep conversations with few people", trait: 'A', score: 75 },
      { value: 'D', label: "Observe and learn from the environment", trait: 'O', score: 65 }
    ]
  },
  {
    id: 4,
    text: "When a colleague makes a mistake, I...",
    options: [
      { value: 'A', label: "Offer support and help them learn from it", trait: 'A', score: 85 },
      { value: 'B', label: "Discuss what went wrong objectively", trait: 'C', score: 75 },
      { value: 'C', label: "Feel frustrated and critical", trait: 'E', score: 15 },
      { value: 'D', label: "Worry about the impact on the project", trait: 'N', score: 80 }
    ]
  },
  {
    id: 5,
    text: "During challenging project deadlines, I tend to...",
    options: [
      { value: 'A', label: "Feel stressed but push through methodically", trait: 'C', score: 80 },
      { value: 'B', label: "Feel overwhelmed and anxious about outcomes", trait: 'N', score: 85 },
      { value: 'C', label: "Stay calm and adapt my approach as needed", trait: 'O', score: 75 },
      { value: 'D', label: "Take charge and rally the team forward", trait: 'E', score: 75 }
    ]
  },
  {
    id: 6,
    text: "I am most interested in learning about...",
    options: [
      { value: 'A', label: "Cutting-edge trends and emerging fields", trait: 'O', score: 85 },
      { value: 'B', label: "Established best practices and standards", trait: 'C', score: 80 },
      { value: 'C', label: "How to better understand people's perspectives", trait: 'A', score: 75 },
      { value: 'D', label: "Things that might go wrong and risk mitigation", trait: 'N', score: 70 }
    ]
  },
  {
    id: 7,
    text: "My workspace and work habits are typically...",
    options: [
      { value: 'A', label: "Highly organized with clear systems", trait: 'C', score: 85 },
      { value: 'B', label: "Organized chaos—messy but productive", trait: 'O', score: 70 },
      { value: 'C', label: "Collaborative with frequent interaction", trait: 'E', score: 80 },
      { value: 'D', label: "Quiet and focused on individual work", trait: 'N', score: 65 }
    ]
  },
  {
    id: 8,
    text: "In group meetings or discussions, I usually...",
    options: [
      { value: 'A', label: "Share ideas enthusiastically and often", trait: 'E', score: 85 },
      { value: 'B', label: "Listen carefully and contribute thoughtfully", trait: 'C', score: 75 },
      { value: 'C', label: "Challenge conventional thinking with new ideas", trait: 'O', score: 80 },
      { value: 'D', label: "Feel anxious about speaking up", trait: 'N', score: 80 }
    ]
  },
  {
    id: 9,
    text: "When helping others solve problems, I...",
    options: [
      { value: 'A', label: "Prioritize understanding their emotions and needs", trait: 'A', score: 85 },
      { value: 'B', label: "Focus on the logical solution objectively", trait: 'C', score: 75 },
      { value: 'C', label: "Encourage them to explore creative options", trait: 'O', score: 80 },
      { value: 'D', label: "Get emotionally invested in their outcomes", trait: 'E', score: 75 }
    ]
  },
  {
    id: 10,
    text: "After receiving critical feedback, I tend to...",
    options: [
      { value: 'A', label: "Analyze it objectively and make improvements", trait: 'C', score: 85 },
      { value: 'B', label: "Feel hurt and second-guess my abilities", trait: 'N', score: 85 },
      { value: 'C', label: "See it as a chance to grow and learn", trait: 'O', score: 75 },
      { value: 'D', label: "Discuss it with trusted colleagues", trait: 'A', score: 70 }
    ]
  },
  {
    id: 11,
    text: "Unconventional ideas and approaches...",
    options: [
      { value: 'A', label: "Excite me and I want to explore them", trait: 'O', score: 85 },
      { value: 'B', label: "Make me cautious—I prefer proven methods", trait: 'C', score: 20 },
      { value: 'C', label: "Are something I'd confidently champion to others", trait: 'E', score: 75 },
      { value: 'D', label: "Worry me—what if they backfire?", trait: 'N', score: 75 }
    ]
  },
  {
    id: 12,
    text: "When planning my career, I prefer to...",
    options: [
      { value: 'A', label: "Have a clear 5-year plan with milestones", trait: 'C', score: 85 },
      { value: 'B', label: "Keep options open and follow opportunities", trait: 'O', score: 80 },
      { value: 'C', label: "Choose roles where I can help and support others", trait: 'A', score: 80 },
      { value: 'D', label: "Seek positions with high visibility and leadership", trait: 'E', score: 80 }
    ]
  }
];

module.exports = oceanQuestions;
