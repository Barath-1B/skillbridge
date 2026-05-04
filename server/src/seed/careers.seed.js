/**
 * Career path seed data.
 * requiredSkillNames: array of { name, weight (1-10), priority (high/medium/low) }
 * The run-seed script resolves names → ObjectIds before inserting.
 */

const careers = [
  // ── 1. Full Stack Developer ───────────────────────────────────────────────
  {
    title: 'Full Stack Developer',
    domain: 'Web Development',
    description:
      'Build end-to-end web applications — from responsive UIs to RESTful APIs and database design. High demand across startups and enterprises.',
    requiredSkillNames: [
      { name: 'Web Development', weight: 10, priority: 'high' },
      { name: 'JavaScript', weight: 9, priority: 'high' },
      { name: 'React', weight: 8, priority: 'high' },
      { name: 'Node.js', weight: 8, priority: 'high' },
      { name: 'SQL', weight: 6, priority: 'medium' },
      { name: 'NoSQL', weight: 6, priority: 'medium' },
      { name: 'TypeScript', weight: 5, priority: 'medium' },
      { name: 'Docker', weight: 4, priority: 'low' },
      { name: 'System Design', weight: 5, priority: 'medium' },
      { name: 'Problem Solving', weight: 7, priority: 'high' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['HTML/CSS', 'JavaScript', 'Git', 'HTTP basics', 'SQL basics'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['React', 'Node.js', 'Express', 'MongoDB/PostgreSQL', 'REST APIs', 'TypeScript'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['System Design', 'Docker', 'CI/CD', 'Authentication (JWT/OAuth)', 'Testing'],
        milestoneMonths: 'Months 6-8',
      },
    ],
    resources: [
      {
        title: 'The Odin Project — Full Stack Path',
        url: 'https://www.theodinproject.com',
        type: 'course',
      },
      {
        title: 'Full Stack Open — University of Helsinki',
        url: 'https://fullstackopen.com',
        type: 'course',
      },
      {
        title: 'JavaScript.info',
        url: 'https://javascript.info',
        type: 'article',
      },
      {
        title: 'System Design Primer',
        url: 'https://github.com/donnemartin/system-design-primer',
        type: 'article',
      },
    ],
    certifications: ['AWS Certified Developer', 'Azure Fundamentals'],
    advantages: [
      'Highest job market demand of any tech role',
      'Versatility — can work on any part of the product',
      'Strong freelance and remote work opportunities',
      'Clear career ladder to senior, staff, and architect roles',
    ],
    estimatedTimeToBridge: '6-8 months',
    demand: 'high',
    difficulty: 'intermediate',
  },

  // ── 2. Data Analyst ───────────────────────────────────────────────────────
  {
    title: 'Data Analyst',
    domain: 'Data & Analytics',
    description:
      'Transform raw data into actionable insights using SQL, Python, and visualization tools. Entry point for data careers with broad industry applicability.',
    requiredSkillNames: [
      { name: 'Data Analysis', weight: 10, priority: 'high' },
      { name: 'SQL', weight: 9, priority: 'high' },
      { name: 'Python', weight: 8, priority: 'high' },
      { name: 'R', weight: 5, priority: 'medium' },
      { name: 'Data Engineering', weight: 5, priority: 'medium' },
      { name: 'Critical Thinking', weight: 7, priority: 'high' },
      { name: 'Communication', weight: 7, priority: 'high' },
      { name: 'Problem Solving', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['SQL fundamentals', 'Excel/Google Sheets', 'Basic statistics', 'Python basics'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Pandas', 'NumPy', 'Tableau/Power BI', 'Advanced SQL', 'Data cleaning'],
        milestoneMonths: 'Months 3-4',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['A/B testing', 'Statistical modeling', 'Dashboarding', 'Storytelling with data'],
        milestoneMonths: 'Months 5-6',
      },
    ],
    resources: [
      {
        title: 'Mode SQL Tutorial',
        url: 'https://mode.com/sql-tutorial',
        type: 'course',
      },
      {
        title: 'Kaggle — Data Analysis Micro-courses',
        url: 'https://www.kaggle.com/learn',
        type: 'course',
      },
      {
        title: 'Storytelling with Data (book)',
        url: 'https://www.storytellingwithdata.com',
        type: 'article',
      },
    ],
    certifications: ['Google Data Analytics Certificate', 'Microsoft Power BI Data Analyst'],
    advantages: [
      'Low barrier to entry — accessible from most STEM backgrounds',
      'Applicable across every industry vertical',
      'Direct business impact through data-driven decisions',
      'Gateway into ML Engineering and Data Science roles',
    ],
    estimatedTimeToBridge: '4-6 months',
    demand: 'high',
    difficulty: 'beginner',
  },

  // ── 3. ML Engineer ────────────────────────────────────────────────────────
  {
    title: 'ML Engineer',
    domain: 'Artificial Intelligence',
    description:
      'Design, train, and deploy machine learning models at scale. Bridges the gap between research and production systems.',
    requiredSkillNames: [
      { name: 'Machine Learning', weight: 10, priority: 'high' },
      { name: 'Deep Learning', weight: 9, priority: 'high' },
      { name: 'Python', weight: 10, priority: 'high' },
      { name: 'TensorFlow', weight: 7, priority: 'high' },
      { name: 'PyTorch', weight: 7, priority: 'high' },
      { name: 'Data Engineering', weight: 6, priority: 'medium' },
      { name: 'Cloud Computing', weight: 6, priority: 'medium' },
      { name: 'SQL', weight: 5, priority: 'medium' },
      { name: 'Docker', weight: 5, priority: 'medium' },
      { name: 'Problem Solving', weight: 8, priority: 'high' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Python', 'Linear algebra', 'Calculus', 'Probability/statistics', 'Pandas/NumPy'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Supervised/Unsupervised learning', 'TensorFlow/PyTorch', 'Feature engineering', 'Model evaluation'],
        milestoneMonths: 'Months 4-7',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['MLOps', 'Model serving', 'Distributed training', 'LLM fine-tuning', 'Cloud ML pipelines'],
        milestoneMonths: 'Months 8-12',
      },
    ],
    resources: [
      {
        title: 'fast.ai — Practical Deep Learning',
        url: 'https://course.fast.ai',
        type: 'course',
      },
      {
        title: 'deeplearning.ai Specialization',
        url: 'https://www.deeplearning.ai',
        type: 'course',
      },
      {
        title: 'Andrej Karpathy — Neural Networks: Zero to Hero',
        url: 'https://karpathy.ai/zero-to-hero.html',
        type: 'video',
      },
      {
        title: 'Made With ML',
        url: 'https://madewithml.com',
        type: 'article',
      },
    ],
    certifications: ['Google ML Engineer', 'AWS Machine Learning Specialty'],
    advantages: [
      'Top compensation bracket in tech globally',
      'Cutting-edge work on frontier AI models',
      'Demand outpaces supply in most markets',
      'Cross-industry applicability: health, finance, robotics',
    ],
    estimatedTimeToBridge: '9-12 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 4. Healthcare Informatics Specialist ──────────────────────────────────
  {
    title: 'Healthcare Informatics Specialist',
    domain: 'Healthcare Tech',
    description:
      'Apply data and software systems to improve clinical workflows, patient outcomes, and healthcare operations. Combines tech with domain knowledge of medical systems.',
    requiredSkillNames: [
      { name: 'Data Analysis', weight: 9, priority: 'high' },
      { name: 'SQL', weight: 8, priority: 'high' },
      { name: 'Python', weight: 7, priority: 'high' },
      { name: 'Bioinformatics', weight: 6, priority: 'medium' },
      { name: 'HL7/FHIR', weight: 8, priority: 'high' },
      { name: 'Machine Learning', weight: 5, priority: 'medium' },
      { name: 'Communication', weight: 8, priority: 'high' },
      { name: 'Critical Thinking', weight: 7, priority: 'high' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Healthcare systems overview', 'SQL', 'Python basics', 'HIPAA compliance', 'EHR basics'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['HL7/FHIR standards', 'Clinical data analysis', 'Pandas', 'Healthcare dashboards'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Predictive analytics in healthcare', 'NLP for clinical notes', 'Interoperability systems', 'Clinical trial data'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      {
        title: 'AMIA 10x10 — Health Informatics',
        url: 'https://amia.org/education-events/amia-10x10',
        type: 'course',
      },
      {
        title: 'HL7 FHIR Documentation',
        url: 'https://www.hl7.org/fhir',
        type: 'article',
      },
      {
        title: 'Coursera — Healthcare IT',
        url: 'https://www.coursera.org/courses?query=healthcare%20informatics',
        type: 'course',
      },
    ],
    certifications: ['RHIA (Registered Health Information Administrator)', 'CPHIMS'],
    advantages: [
      'Mission-driven work with tangible patient impact',
      'Recession-proof sector with growing tech adoption',
      'Scarce specialist profile commands premium salary',
      'Bridge role between clinical and tech teams',
    ],
    estimatedTimeToBridge: '7-10 months',
    demand: 'medium',
    difficulty: 'intermediate',
  },

  // ── 5. Financial Systems Developer ────────────────────────────────────────
  {
    title: 'Financial Systems Developer',
    domain: 'FinTech',
    description:
      'Build trading platforms, risk engines, and payment systems for banks, fintechs, and hedge funds. Requires strong programming and financial domain knowledge.',
    requiredSkillNames: [
      { name: 'Financial Modeling', weight: 9, priority: 'high' },
      { name: 'Python', weight: 9, priority: 'high' },
      { name: 'SQL', weight: 8, priority: 'high' },
      { name: 'Java', weight: 7, priority: 'high' },
      { name: 'System Design', weight: 8, priority: 'high' },
      { name: 'Data Analysis', weight: 6, priority: 'medium' },
      { name: 'Problem Solving', weight: 8, priority: 'high' },
      { name: 'Critical Thinking', weight: 7, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Python', 'Java', 'SQL', 'Financial markets basics', 'Data structures & algorithms'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['REST APIs for finance', 'Database optimization', 'Risk calculations', 'FIX protocol basics', 'Time-series analysis'],
        milestoneMonths: 'Months 4-6',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Low-latency systems', 'Blockchain fundamentals', 'Regulatory compliance (MiFID II)', 'High-frequency trading systems'],
        milestoneMonths: 'Months 7-10',
      },
    ],
    resources: [
      {
        title: 'Quantlib — Open Source Finance',
        url: 'https://www.quantlib.org',
        type: 'article',
      },
      {
        title: 'Coursera — Financial Engineering',
        url: 'https://www.coursera.org/specializations/financialengineering',
        type: 'course',
      },
      {
        title: 'QuantLib Python Tutorial',
        url: 'https://quantlib-python-docs.readthedocs.io',
        type: 'article',
      },
    ],
    certifications: ['CFA Level 1', 'FRM (Financial Risk Manager)'],
    advantages: [
      'Among the highest-compensated developer profiles',
      'Work at the intersection of math, finance, and systems',
      'Concentrated demand in major financial hubs and remote',
      'Domain expertise creates high switching costs (job security)',
    ],
    estimatedTimeToBridge: '8-12 months',
    demand: 'medium',
    difficulty: 'advanced',
  },

  // ── 6. Cybersecurity Analyst ──────────────────────────────────────────────
  {
    title: 'Cybersecurity Analyst',
    domain: 'Security',
    description:
      'Protect systems, networks, and data from cyber threats. Involves threat detection, incident response, vulnerability assessment, and compliance.',
    requiredSkillNames: [
      { name: 'Cybersecurity', weight: 10, priority: 'high' },
      { name: 'Network Security', weight: 9, priority: 'high' },
      { name: 'Linux', weight: 8, priority: 'high' },
      { name: 'Python', weight: 7, priority: 'high' },
      { name: 'Problem Solving', weight: 8, priority: 'high' },
      { name: 'Critical Thinking', weight: 8, priority: 'high' },
      { name: 'Communication', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Networking fundamentals (TCP/IP, DNS)', 'Linux CLI', 'Python scripting', 'CIA triad', 'OSI model'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['SIEM tools (Splunk/ELK)', 'Vulnerability scanning (Nessus)', 'Incident response', 'Wireshark', 'OWASP Top 10'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Penetration testing', 'Threat hunting', 'SOC operations', 'Forensics', 'Zero Trust architecture'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      {
        title: 'TryHackMe — Learning Paths',
        url: 'https://tryhackme.com',
        type: 'course',
      },
      {
        title: 'Hack The Box Academy',
        url: 'https://academy.hackthebox.com',
        type: 'course',
      },
      {
        title: 'OWASP Top 10',
        url: 'https://owasp.org/www-project-top-ten',
        type: 'article',
      },
      {
        title: 'Professor Messer — Security+',
        url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course',
        type: 'video',
      },
    ],
    certifications: ['CompTIA Security+', 'CompTIA Network+', 'Certified Ethical Hacker', 'CISSP'],
    advantages: [
      'Critical shortage of skilled professionals globally',
      'Strong salary growth trajectory',
      'Every organization needs security — unlimited industry choice',
      'Intellectually stimulating adversarial problem solving',
    ],
    estimatedTimeToBridge: '6-9 months',
    demand: 'high',
    difficulty: 'intermediate',
  },

  // ── 7. Embedded Systems Developer ─────────────────────────────────────────
  {
    title: 'Embedded Systems Developer',
    domain: 'Hardware/IoT',
    description:
      'Write firmware and low-level software for microcontrollers, IoT devices, and hardware platforms. Critical for automotive, robotics, consumer electronics, and industrial systems.',
    requiredSkillNames: [
      { name: 'Embedded Programming', weight: 10, priority: 'high' },
      { name: 'C++', weight: 9, priority: 'high' },
      { name: 'Real-Time Systems', weight: 8, priority: 'high' },
      { name: 'Assembly', weight: 6, priority: 'medium' },
      { name: 'VHDL', weight: 5, priority: 'medium' },
      { name: 'Linux', weight: 6, priority: 'medium' },
      { name: 'Problem Solving', weight: 8, priority: 'high' },
      { name: 'Critical Thinking', weight: 7, priority: 'high' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['C programming', 'Digital electronics', 'Microcontroller basics (Arduino/STM32)', 'Serial protocols (UART, SPI, I2C)', 'Git'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['C++ for embedded', 'RTOS (FreeRTOS)', 'Bootloader concepts', 'Debugging with JTAG/SWD', 'Power management'],
        milestoneMonths: 'Months 4-7',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Linux kernel modules', 'FPGA programming (VHDL)', 'CAN bus', 'Secure boot', 'Functional safety (IEC 61508)'],
        milestoneMonths: 'Months 8-12',
      },
    ],
    resources: [
      {
        title: 'Fastbit Embedded Brain Academy',
        url: 'https://fastbitlab.com',
        type: 'course',
      },
      {
        title: 'Embedded Artistry',
        url: 'https://embeddedartistry.com',
        type: 'article',
      },
      {
        title: 'edX — Embedded Systems (UT Austin)',
        url: 'https://www.edx.org/professional-certificate/utaustinx-embedded-systems',
        type: 'course',
      },
    ],
    certifications: ['ARM Accredited Engineer', 'Certified LabVIEW Embedded Systems Developer'],
    advantages: [
      'Niche skill set commands premium salary',
      'Critical in automotive, aerospace, and medical devices',
      'Low competition compared to web development',
      'Hands-on hardware work — tangible products',
    ],
    estimatedTimeToBridge: '10-14 months',
    demand: 'medium',
    difficulty: 'advanced',
  },

  // ── 8. Aerospace Software Engineer ────────────────────────────────────────
  {
    title: 'Aerospace Software Engineer',
    domain: 'Aerospace & Defense',
    description:
      'Develop safety-critical software for avionics, spacecraft, satellites, and defense systems. Requires mastery of real-time systems, formal methods, and rigorous certification standards.',
    requiredSkillNames: [
      { name: 'Real-Time Systems', weight: 10, priority: 'high' },
      { name: 'C++', weight: 10, priority: 'high' },
      { name: 'Embedded Programming', weight: 9, priority: 'high' },
      { name: 'MATLAB', weight: 7, priority: 'high' },
      { name: 'Assembly', weight: 5, priority: 'medium' },
      { name: 'System Design', weight: 8, priority: 'high' },
      { name: 'Problem Solving', weight: 9, priority: 'high' },
      { name: 'Critical Thinking', weight: 9, priority: 'high' },
      { name: 'Team Collaboration', weight: 7, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['C/C++', 'Real-time OS concepts', 'MATLAB/Simulink basics', 'Avionics system overview', 'DO-178C introduction'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['ARINC 653 (partitioned RTOS)', 'Formal verification basics', 'Model-based design (Simulink)', 'Hardware-in-the-loop testing', 'Fault tolerant systems'],
        milestoneMonths: 'Months 4-8',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['DO-178C level A certification', 'AUTOSAR (automotive crossover)', 'Cybersecurity in avionics (DO-326A)', 'Space mission software (CCSDS standards)'],
        milestoneMonths: 'Months 9-14',
      },
    ],
    resources: [
      {
        title: 'FAA DO-178C Overview',
        url: 'https://www.faa.gov/aircraft/air_cert/design_approvals/air_software/cast/cast_papers/media/cast-10.pdf',
        type: 'article',
      },
      {
        title: 'MATLAB Aerospace Toolbox',
        url: 'https://www.mathworks.com/products/aerospace-toolbox.html',
        type: 'article',
      },
      {
        title: 'NASA Software Safety Guidebook',
        url: 'https://swehb.nasa.gov',
        type: 'article',
      },
      {
        title: 'edX — Aerospace Engineering MicroMasters',
        url: 'https://www.edx.org/micromasters/mitx-aerospace-engineering',
        type: 'course',
      },
    ],
    certifications: ['DO-178C Avionics', 'INCOSE Systems Engineering Professional'],
    advantages: [
      'Prestigious and impactful work on systems that must not fail',
      'Among the highest-paid engineering specializations',
      'Rare profile — very limited supply of qualified engineers',
      'Career spans commercial aviation, defense, and space industries',
    ],
    estimatedTimeToBridge: '12-18 months',
    demand: 'medium',
    difficulty: 'advanced',
  },
];

module.exports = careers;
