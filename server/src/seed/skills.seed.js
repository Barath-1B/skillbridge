const skills = [
  // ── skill ─────────────────────────────────────────────────────────────────
  {
    name: 'Machine Learning',
    category: 'skill',
    tags: ['AI', 'data science', 'modeling'],
  },
  {
    name: 'Deep Learning',
    category: 'skill',
    tags: ['AI', 'neural networks', 'computer vision'],
  },
  {
    name: 'Data Analysis',
    category: 'skill',
    tags: ['analytics', 'statistics', 'visualization'],
  },
  {
    name: 'DevOps',
    category: 'skill',
    tags: ['CI/CD', 'infrastructure', 'deployment'],
  },
  {
    name: 'Cloud Computing',
    category: 'skill',
    tags: ['AWS', 'Azure', 'GCP', 'infrastructure'],
  },
  {
    name: 'Cybersecurity',
    category: 'skill',
    tags: ['security', 'networking', 'ethical hacking'],
  },
  {
    name: 'Web Development',
    category: 'skill',
    tags: ['frontend', 'backend', 'full stack'],
  },
  {
    name: 'Mobile Development',
    category: 'skill',
    tags: ['iOS', 'Android', 'React Native'],
  },
  {
    name: 'System Design',
    category: 'skill',
    tags: ['architecture', 'scalability', 'distributed systems'],
  },
  {
    name: 'Embedded Programming',
    category: 'skill',
    tags: ['microcontrollers', 'IoT', 'hardware', 'RTOS'],
  },
  {
    name: 'Network Security',
    category: 'skill',
    tags: ['firewall', 'IDS', 'penetration testing'],
  },
  {
    name: 'Data Engineering',
    category: 'skill',
    tags: ['ETL', 'pipelines', 'big data'],
  },
  {
    name: 'Bioinformatics',
    category: 'skill',
    tags: ['healthcare', 'genomics', 'data'],
  },
  {
    name: 'Financial Modeling',
    category: 'skill',
    tags: ['fintech', 'quantitative', 'risk analysis'],
  },
  {
    name: 'Real-Time Systems',
    category: 'skill',
    tags: ['aerospace', 'embedded', 'safety-critical'],
  },

  // ── knowledge ─────────────────────────────────────────────────────────────
  {
    name: 'Python',
    category: 'knowledge',
    tags: ['programming', 'scripting', 'data science'],
  },
  {
    name: 'JavaScript',
    category: 'knowledge',
    tags: ['programming', 'web', 'frontend'],
  },
  {
    name: 'TypeScript',
    category: 'knowledge',
    tags: ['programming', 'web', 'typed'],
  },
  {
    name: 'SQL',
    category: 'knowledge',
    tags: ['database', 'querying', 'relational'],
  },
  {
    name: 'NoSQL',
    category: 'knowledge',
    tags: ['database', 'MongoDB', 'document store'],
  },
  {
    name: 'TensorFlow',
    category: 'knowledge',
    tags: ['AI', 'deep learning', 'framework'],
  },
  {
    name: 'PyTorch',
    category: 'knowledge',
    tags: ['AI', 'deep learning', 'research'],
  },
  {
    name: 'React',
    category: 'knowledge',
    tags: ['frontend', 'UI', 'JavaScript'],
  },
  {
    name: 'Node.js',
    category: 'knowledge',
    tags: ['backend', 'JavaScript', 'runtime'],
  },
  {
    name: 'C++',
    category: 'knowledge',
    tags: ['systems', 'embedded', 'performance'],
  },
  {
    name: 'Java',
    category: 'knowledge',
    tags: ['enterprise', 'backend', 'OOP'],
  },
  {
    name: 'R',
    category: 'knowledge',
    tags: ['statistics', 'data science', 'visualization'],
  },
  {
    name: 'Golang',
    category: 'knowledge',
    tags: ['backend', 'systems', 'concurrent'],
  },
  {
    name: 'Rust',
    category: 'knowledge',
    tags: ['systems', 'memory safety', 'embedded'],
  },
  {
    name: 'MATLAB',
    category: 'knowledge',
    tags: ['engineering', 'simulation', 'mathematics'],
  },
  {
    name: 'VHDL',
    category: 'knowledge',
    tags: ['hardware', 'FPGA', 'embedded'],
  },
  {
    name: 'Assembly',
    category: 'knowledge',
    tags: ['low-level', 'embedded', 'systems'],
  },
  {
    name: 'Docker',
    category: 'knowledge',
    tags: ['DevOps', 'containers', 'deployment'],
  },
  {
    name: 'Kubernetes',
    category: 'knowledge',
    tags: ['DevOps', 'orchestration', 'cloud'],
  },
  {
    name: 'Linux',
    category: 'knowledge',
    tags: ['OS', 'systems', 'DevOps'],
  },
  {
    name: 'HL7/FHIR',
    category: 'knowledge',
    tags: ['healthcare', 'interoperability', 'standards'],
  },

  // ── certification ─────────────────────────────────────────────────────────
  {
    name: 'AWS Certified Developer',
    category: 'certification',
    tags: ['cloud', 'AWS', 'developer'],
  },
  {
    name: 'AWS Solutions Architect',
    category: 'certification',
    tags: ['cloud', 'AWS', 'architecture'],
  },
  {
    name: 'Google ML Engineer',
    category: 'certification',
    tags: ['AI', 'Google Cloud', 'machine learning'],
  },
  {
    name: 'CompTIA Security+',
    category: 'certification',
    tags: ['security', 'networking', 'entry-level'],
  },
  {
    name: 'CompTIA Network+',
    category: 'certification',
    tags: ['networking', 'infrastructure', 'entry-level'],
  },
  {
    name: 'CFA Level 1',
    category: 'certification',
    tags: ['finance', 'investment', 'fintech'],
  },
  {
    name: 'Azure Fundamentals',
    category: 'certification',
    tags: ['cloud', 'Microsoft', 'Azure'],
  },
  {
    name: 'Certified Ethical Hacker',
    category: 'certification',
    tags: ['security', 'penetration testing', 'ethical hacking'],
  },
  {
    name: 'CISSP',
    category: 'certification',
    tags: ['security', 'advanced', 'management'],
  },
  {
    name: 'DO-178C Avionics',
    category: 'certification',
    tags: ['aerospace', 'safety', 'avionics'],
  },

  // ── softSkill ─────────────────────────────────────────────────────────────
  {
    name: 'Problem Solving',
    category: 'softSkill',
    tags: ['analytical', 'critical thinking'],
  },
  {
    name: 'Communication',
    category: 'softSkill',
    tags: ['verbal', 'written', 'presentation'],
  },
  {
    name: 'Team Collaboration',
    category: 'softSkill',
    tags: ['teamwork', 'agile', 'cross-functional'],
  },
  {
    name: 'Critical Thinking',
    category: 'softSkill',
    tags: ['analysis', 'reasoning', 'decision making'],
  },
  {
    name: 'Time Management',
    category: 'softSkill',
    tags: ['productivity', 'planning', 'prioritization'],
  },
];

module.exports = skills;
