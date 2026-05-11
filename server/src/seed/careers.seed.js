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
      { name: 'REST API Development', weight: 10, priority: 'high' },
      { name: 'JavaScript', weight: 9, priority: 'high' },
      { name: 'React', weight: 8, priority: 'high' },
      { name: 'Node.js', weight: 8, priority: 'high' },
      { name: 'SQL', weight: 6, priority: 'medium' },
      { name: 'MongoDB', weight: 6, priority: 'medium' },
      { name: 'TypeScript', weight: 5, priority: 'medium' },
      { name: 'Docker', weight: 4, priority: 'low' },
      { name: 'System Design', weight: 5, priority: 'medium' },
      { name: 'Algorithms', weight: 7, priority: 'high' },
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
      { name: 'Statistics & Probability', weight: 10, priority: 'high' },
      { name: 'SQL', weight: 9, priority: 'high' },
      { name: 'Python', weight: 8, priority: 'high' },
      { name: 'R (Statistical Computing)', weight: 5, priority: 'medium' },
      { name: 'Data Structures', weight: 5, priority: 'medium' },
      { name: 'NumPy & Pandas', weight: 7, priority: 'high' },
      { name: 'Linear Algebra', weight: 6, priority: 'medium' },
      { name: 'Database Design', weight: 6, priority: 'medium' },
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
      { name: 'TensorFlow & Keras', weight: 7, priority: 'high' },
      { name: 'PyTorch', weight: 7, priority: 'high' },
      { name: 'Big Data', weight: 6, priority: 'medium' },
      { name: 'Cloud Computing', weight: 6, priority: 'medium' },
      { name: 'SQL', weight: 5, priority: 'medium' },
      { name: 'Docker', weight: 5, priority: 'medium' },
      { name: 'Algorithms', weight: 8, priority: 'high' },
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
      { name: 'Statistics & Probability', weight: 9, priority: 'high' },
      { name: 'SQL', weight: 8, priority: 'high' },
      { name: 'Python', weight: 7, priority: 'high' },
      { name: 'HIPAA Compliance', weight: 8, priority: 'high' },
      { name: 'Database Design', weight: 8, priority: 'high' },
      { name: 'Machine Learning', weight: 5, priority: 'medium' },
      { name: 'Natural Language Processing', weight: 6, priority: 'medium' },
      { name: 'NumPy & Pandas', weight: 6, priority: 'medium' },
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
      { name: 'Trading Systems & Financial Technology', weight: 9, priority: 'high' },
      { name: 'Python', weight: 9, priority: 'high' },
      { name: 'SQL', weight: 8, priority: 'high' },
      { name: 'Java', weight: 7, priority: 'high' },
      { name: 'System Design', weight: 8, priority: 'high' },
      { name: 'C++', weight: 6, priority: 'medium' },
      { name: 'Database Design', weight: 6, priority: 'medium' },
      { name: 'Blockchain', weight: 5, priority: 'medium' },
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
      { name: 'Information Security', weight: 10, priority: 'high' },
      { name: 'Web Security & OWASP', weight: 9, priority: 'high' },
      { name: 'Linux & Unix Systems', weight: 8, priority: 'high' },
      { name: 'Python', weight: 7, priority: 'high' },
      { name: 'Computer Networks', weight: 8, priority: 'high' },
      { name: 'Cryptography', weight: 7, priority: 'high' },
      { name: 'Bash Scripting', weight: 6, priority: 'medium' },
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
      { name: 'Embedded Systems', weight: 10, priority: 'high' },
      { name: 'C++', weight: 9, priority: 'high' },
      { name: 'Real-time Systems', weight: 8, priority: 'high' },
      { name: 'C Programming', weight: 9, priority: 'high' },
      { name: 'Assembly Language', weight: 6, priority: 'medium' },
      { name: 'Linux & Unix Systems', weight: 6, priority: 'medium' },
      { name: 'IoT (Internet of Things)', weight: 7, priority: 'high' },
      { name: 'Data Structures', weight: 6, priority: 'medium' },
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
      { name: 'Real-time Systems', weight: 10, priority: 'high' },
      { name: 'C++', weight: 10, priority: 'high' },
      { name: 'Embedded Systems', weight: 9, priority: 'high' },
      { name: 'MATLAB', weight: 7, priority: 'high' },
      { name: 'Assembly Language', weight: 5, priority: 'medium' },
      { name: 'System Design', weight: 8, priority: 'high' },
      { name: 'Signal Processing', weight: 8, priority: 'high' },
      { name: 'Operating Systems', weight: 7, priority: 'high' },
      { name: 'C Programming', weight: 8, priority: 'high' },
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

  // ── 9. Frontend Engineer ──────────────────────────────────────────────────
  {
    title: 'Frontend Engineer',
    domain: 'Web Development',
    description:
      'Craft user-facing web applications with modern frameworks. Focus on UI/UX, component design, performance, and accessibility. High visibility impact on user experience.',
    requiredSkillNames: [
      { name: 'React', weight: 10, priority: 'high' },
      { name: 'TypeScript', weight: 8, priority: 'high' },
      { name: 'JavaScript', weight: 10, priority: 'high' },
      { name: 'CSS & Responsive Design', weight: 9, priority: 'high' },
      { name: 'HTML5', weight: 8, priority: 'high' },
      { name: 'Vue.js', weight: 6, priority: 'medium' },
      { name: 'Vite & Build Tools', weight: 6, priority: 'medium' },
      { name: 'UI/UX Design', weight: 7, priority: 'high' },
      { name: 'Git & Version Control', weight: 5, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['HTML semantics', 'CSS Flexbox/Grid', 'JavaScript fundamentals', 'Git basics', 'Responsive design'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['React hooks', 'Component design', 'State management', 'API integration', 'Testing (Jest, RTL)'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Performance optimization', 'Accessibility (WCAG)', 'TypeScript mastery', 'Build tooling (Vite, Webpack)', 'Design systems'],
        milestoneMonths: 'Months 6-8',
      },
    ],
    resources: [
      { title: 'React Official Docs', url: 'https://react.dev', type: 'article' },
      { title: 'Frontend Masters Courses', url: 'https://frontendmasters.com', type: 'course' },
      { title: 'Web.dev — Google Chrome Developers', url: 'https://web.dev', type: 'article' },
    ],
    certifications: [],
    advantages: [
      'Fastest-growing web development specialization',
      'High demand across all industries',
      'Remote-friendly with strong freelance market',
      'Direct user impact on every feature shipped',
    ],
    estimatedTimeToBridge: '5-7 months',
    demand: 'high',
    difficulty: 'intermediate',
  },

  // ── 10. Mobile App Developer ──────────────────────────────────────────────
  {
    title: 'Mobile App Developer',
    domain: 'Mobile Development',
    description:
      'Build native and cross-platform mobile applications for iOS, Android, and beyond. Requires UI/UX sensibility and platform-specific constraints understanding.',
    requiredSkillNames: [
      { name: 'Kotlin', weight: 8, priority: 'high' },
      { name: 'Flutter & Dart', weight: 7, priority: 'high' },
      { name: 'Java', weight: 7, priority: 'high' },
      { name: 'UI/UX Design', weight: 8, priority: 'high' },
      { name: 'REST API Development', weight: 7, priority: 'high' },
      { name: 'TypeScript', weight: 5, priority: 'medium' },
      { name: 'Database Design', weight: 6, priority: 'medium' },
      { name: 'Git & Version Control', weight: 5, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Android/iOS platform basics', 'Kotlin or Swift', 'UI design patterns', 'Mobile debugging', 'Networking basics'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Native development (Android Studio, Xcode)', 'State management', 'Persistence (SQLite, Realm)', 'Camera/GPS/sensors'],
        milestoneMonths: 'Months 4-6',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Performance optimization', 'Cross-platform (Flutter/React Native)', 'App publishing', 'Analytics integration'],
        milestoneMonths: 'Months 7-10',
      },
    ],
    resources: [
      { title: 'Android Developers Official', url: 'https://developer.android.com', type: 'article' },
      { title: 'Flutter Documentation', url: 'https://flutter.dev/docs', type: 'article' },
      { title: 'Ray Wenderlich Mobile Tutorials', url: 'https://www.raywenderlich.com', type: 'article' },
    ],
    certifications: [],
    advantages: [
      'Massive addressable market (billions of mobile users)',
      'Both iOS and Android demand outpaces supply',
      'Can build and monetize own apps',
      'Career spans startups, agencies, and tech giants',
    ],
    estimatedTimeToBridge: '6-9 months',
    demand: 'high',
    difficulty: 'intermediate',
  },

  // ── 11. DevOps Engineer ───────────────────────────────────────────────────
  {
    title: 'DevOps Engineer',
    domain: 'Infrastructure & Operations',
    description:
      'Streamline development workflows and production infrastructure. Master CI/CD pipelines, container orchestration, and infrastructure automation for reliable deployments.',
    requiredSkillNames: [
      { name: 'Kubernetes', weight: 10, priority: 'high' },
      { name: 'Docker', weight: 10, priority: 'high' },
      { name: 'CI/CD Pipelines', weight: 9, priority: 'high' },
      { name: 'Linux & Unix Systems', weight: 9, priority: 'high' },
      { name: 'Infrastructure as Code', weight: 8, priority: 'high' },
      { name: 'Bash Scripting', weight: 7, priority: 'high' },
      { name: 'Cloud Computing', weight: 8, priority: 'high' },
      { name: 'System Design', weight: 7, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Linux CLI', 'Bash scripting', 'Git', 'Docker basics', 'Networking fundamentals'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Kubernetes (Pods, Deployments, Services)', 'CI/CD (GitHub Actions, Jenkins)', 'IaC (Terraform)', 'Cloud platforms (AWS/GCP)'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Helm, ArgoCD', 'Monitoring & logging (Prometheus, ELK)', 'Security (RBAC, network policies)', 'Multi-cloud strategies'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'Kubernetes Official Docs', url: 'https://kubernetes.io/docs/home/', type: 'article' },
      { title: 'Docker & Kubernetes: The Practical Guide', url: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/', type: 'course' },
      { title: 'Linux Academy (A Cloud Guru)', url: 'https://acloudguru.com', type: 'course' },
    ],
    certifications: ['CKA (Certified Kubernetes Administrator)', 'AWS Solutions Architect'],
    advantages: [
      'Critical for every modern tech organization',
      'Highest growth trajectory in infrastructure roles',
      'Salary progression faster than traditional SWE',
      'Bridge between development and operations teams',
    ],
    estimatedTimeToBridge: '7-10 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 12. Data Engineer ─────────────────────────────────────────────────────
  {
    title: 'Data Engineer',
    domain: 'Data & Analytics',
    description:
      'Design and build data infrastructure for analytics at scale. Create ETL pipelines, data warehouses, and streaming systems that power data-driven decisions.',
    requiredSkillNames: [
      { name: 'Apache Spark', weight: 10, priority: 'high' },
      { name: 'Apache Kafka', weight: 9, priority: 'high' },
      { name: 'Python', weight: 9, priority: 'high' },
      { name: 'SQL', weight: 10, priority: 'high' },
      { name: 'Big Data', weight: 9, priority: 'high' },
      { name: 'Database Design', weight: 8, priority: 'high' },
      { name: 'Docker', weight: 6, priority: 'medium' },
      { name: 'Cloud Computing', weight: 7, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['SQL mastery', 'Python fundamentals', 'Relational DB design', 'ETL concepts', 'Git basics'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Apache Spark (PySpark)', 'Data pipeline tools (dbt, Airflow)', 'Data warehousing (Snowflake, BigQuery)', 'Kafka basics'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Stream processing (Flink, Spark Streaming)', 'Data lake architecture', 'Performance tuning', 'Data quality & governance'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'Spark Official Documentation', url: 'https://spark.apache.org/docs/latest/', type: 'article' },
      { title: 'dbt (data build tool) Tutorials', url: 'https://docs.getdbt.com/docs/introduction', type: 'article' },
      { title: 'DataCamp — Data Engineering Tracks', url: 'https://www.datacamp.com', type: 'course' },
    ],
    certifications: [],
    advantages: [
      'Data is the new oil — every company needs it',
      'Salary growth faster than data scientists',
      'Skills transfer across industries',
      'Critical infrastructure role with high job security',
    ],
    estimatedTimeToBridge: '8-11 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 13. Cloud Solutions Architect ─────────────────────────────────────────
  {
    title: 'Cloud Solutions Architect',
    domain: 'Cloud & Infrastructure',
    description:
      'Design scalable, secure, and cost-effective cloud solutions for enterprises. Leverage AWS, GCP, or Azure to architect systems that solve real-world business problems.',
    requiredSkillNames: [
      { name: 'AWS (Amazon Web Services)', weight: 10, priority: 'high' },
      { name: 'Google Cloud Platform', weight: 8, priority: 'high' },
      { name: 'System Design', weight: 10, priority: 'high' },
      { name: 'Infrastructure as Code', weight: 8, priority: 'high' },
      { name: 'Cloud Computing', weight: 10, priority: 'high' },
      { name: 'Kubernetes', weight: 7, priority: 'medium' },
      { name: 'Information Security', weight: 8, priority: 'high' },
      { name: 'Computer Networks', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['AWS fundamentals (EC2, S3, RDS)', 'Networking basics (VPC, subnets)', 'IAM & security', 'Cost management'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Multi-tier architecture', 'Microservices design', 'High availability & disaster recovery', 'Terraform/CloudFormation'],
        milestoneMonths: 'Months 4-7',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Multi-cloud strategies', 'Serverless architectures', 'Governance & compliance', 'Cost optimization at scale'],
        milestoneMonths: 'Months 8-12',
      },
    ],
    resources: [
      { title: 'AWS Solutions Architect Associate', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', type: 'course' },
      { title: 'A Cloud Guru', url: 'https://acloudguru.com', type: 'course' },
      { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'article' },
    ],
    certifications: ['AWS Certified Solutions Architect', 'Google Cloud Architect', 'Azure Solutions Architect'],
    advantages: [
      'Highest-paid infrastructure role after ~5 years experience',
      'Consulting opportunities across industries',
      'Strategic impact on enterprise technical direction',
      'Skill portability across cloud providers',
    ],
    estimatedTimeToBridge: '9-14 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 14. QA & Test Automation Engineer ─────────────────────────────────────
  {
    title: 'QA & Test Automation Engineer',
    domain: 'Quality Assurance',
    description:
      'Ensure software quality through automated testing, test infrastructure, and quality metrics. Prevent bugs before they reach production through strategic testing.',
    requiredSkillNames: [
      { name: 'Quality Assurance & Testing', weight: 10, priority: 'high' },
      { name: 'JavaScript', weight: 8, priority: 'high' },
      { name: 'Python', weight: 7, priority: 'high' },
      { name: 'Testing (Unit, Integration, E2E)', weight: 10, priority: 'high' },
      { name: 'Docker', weight: 6, priority: 'medium' },
      { name: 'Bash Scripting', weight: 6, priority: 'medium' },
      { name: 'Git & Version Control', weight: 5, priority: 'medium' },
      { name: 'System Design', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Manual testing & test planning', 'JavaScript or Python basics', 'Git', 'Testing mindset', 'Bug tracking systems'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Jest/Vitest (unit testing)', 'Playwright/Cypress (E2E)', 'API testing (REST)', 'CI/CD pipeline integration'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Performance testing', 'Load testing (k6, JMeter)', 'Test framework architecture', 'Accessibility testing'],
        milestoneMonths: 'Months 6-8',
      },
    ],
    resources: [
      { title: 'Testing JavaScript by Kent C. Dodds', url: 'https://testingjavascript.com', type: 'course' },
      { title: 'Playwright Official Docs', url: 'https://playwright.dev', type: 'article' },
      { title: 'Test Automation University', url: 'https://testautomationu.applitools.com', type: 'course' },
    ],
    certifications: ['ISTQB Certified Tester'],
    advantages: [
      'Essential for software quality & company reputation',
      'Lower barrier to entry than pure development',
      'Can specialize into performance, security, or accessibility testing',
      'Every product team needs QA',
    ],
    estimatedTimeToBridge: '5-7 months',
    demand: 'high',
    difficulty: 'intermediate',
  },

  // ── 15. Game Developer ────────────────────────────────────────────────────
  {
    title: 'Game Developer',
    domain: 'Games & Interactive Media',
    description:
      'Create engaging interactive experiences using game engines. Combine programming, art, and design to build games for multiple platforms and audiences.',
    requiredSkillNames: [
      { name: 'C++', weight: 9, priority: 'high' },
      { name: 'C#', weight: 8, priority: 'high' },
      { name: 'Object-Oriented Programming', weight: 9, priority: 'high' },
      { name: 'Linear Algebra', weight: 7, priority: 'high' },
      { name: 'Data Structures', weight: 7, priority: 'high' },
      { name: 'Signal Processing', weight: 6, priority: 'medium' },
      { name: 'UI/UX Design', weight: 6, priority: 'medium' },
      { name: 'Git & Version Control', weight: 5, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['C# or C++', 'Unity or Unreal fundamentals', 'Game loop concepts', 'Basic 3D math', 'Asset pipelines'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Physics simulation', 'Networking (multiplayer)', 'Audio systems', 'Animation systems', 'AI behavior trees'],
        milestoneMonths: 'Months 4-7',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Graphics optimization', 'Procedural generation', 'Advanced AI', 'Cross-platform publishing', 'Game monetization'],
        milestoneMonths: 'Months 8-12',
      },
    ],
    resources: [
      { title: 'Unity Learn Platform', url: 'https://learn.unity.com', type: 'course' },
      { title: 'Unreal Engine Documentation', url: 'https://docs.unrealengine.com', type: 'article' },
      { title: 'Game Developer YouTube Channels', url: 'https://www.youtube.com', type: 'video' },
    ],
    certifications: [],
    advantages: [
      'Creative and technical work combining art and code',
      'Massive global gaming industry ($200B+ annually)',
      'Remote and indie opportunities',
      'Your creations directly impact millions of players',
    ],
    estimatedTimeToBridge: '8-12 months',
    demand: 'medium',
    difficulty: 'advanced',
  },

  // ── 16. Blockchain Developer ──────────────────────────────────────────────
  {
    title: 'Blockchain/Web3 Developer',
    domain: 'Web3 & Cryptocurrency',
    description:
      'Build decentralized applications and smart contracts on blockchain networks. Work with Ethereum, Solana, and other chains to create trustless systems.',
    requiredSkillNames: [
      { name: 'Blockchain', weight: 10, priority: 'high' },
      { name: 'JavaScript', weight: 8, priority: 'high' },
      { name: 'Cryptography', weight: 9, priority: 'high' },
      { name: 'Functional Programming', weight: 9, priority: 'high' },
      { name: 'REST API Development', weight: 7, priority: 'high' },
      { name: 'Web Security & OWASP', weight: 8, priority: 'high' },
      { name: 'TypeScript', weight: 6, priority: 'medium' },
      { name: 'System Design', weight: 7, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Blockchain fundamentals', 'Ethereum basics', 'Solidity introduction', 'Cryptography concepts', 'Web3.js basics'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Smart contract development', 'DeFi protocols', 'NFT standards (ERC721, ERC1155)', 'Security auditing basics'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Layer 2 solutions', 'Cross-chain bridges', 'Advanced DeFi (Uniswap, Aave)', 'Formal verification'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'Cryptozombies (Solidity Learning Game)', url: 'https://cryptozombies.io', type: 'article' },
      { title: 'Ethereum Developer Docs', url: 'https://ethereum.org/en/developers/docs/', type: 'article' },
      { title: 'Hardhat (Development Framework)', url: 'https://hardhat.org', type: 'article' },
    ],
    certifications: [],
    advantages: [
      'Emerging field with explosive growth potential',
      'High compensation in crypto-native companies',
      'Work on financial primitives and decentralization',
      'Global, borderless opportunities',
    ],
    estimatedTimeToBridge: '7-10 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 17. Database Administrator ────────────────────────────────────────────
  {
    title: 'Database Administrator',
    domain: 'Data Infrastructure',
    description:
      'Manage, optimize, and secure production databases. Ensure data availability, performance, and integrity for mission-critical applications.',
    requiredSkillNames: [
      { name: 'PostgreSQL', weight: 10, priority: 'high' },
      { name: 'MySQL & PostgreSQL', weight: 10, priority: 'high' },
      { name: 'SQL', weight: 10, priority: 'high' },
      { name: 'Linux & Unix Systems', weight: 9, priority: 'high' },
      { name: 'Database Design', weight: 9, priority: 'high' },
      { name: 'Bash Scripting', weight: 7, priority: 'medium' },
      { name: 'Cloud Computing', weight: 7, priority: 'medium' },
      { name: 'Information Security', weight: 8, priority: 'high' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['SQL mastery', 'Database design & normalization', 'Linux/Unix basics', 'Backup & recovery concepts'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Query optimization (EXPLAIN plans)', 'Replication & clustering', 'Monitoring & alerting', 'User management & permissions'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Disaster recovery planning', 'Performance tuning at scale', 'Partition strategies', 'High availability architectures'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/', type: 'article' },
      { title: 'MySQL 8.0 Reference Manual', url: 'https://dev.mysql.com/doc/', type: 'article' },
      { title: 'Linux Academy DBA Courses', url: 'https://acloudguru.com', type: 'course' },
    ],
    certifications: ['Oracle Certified Associate', 'Microsoft Certified Data Administrator'],
    advantages: [
      'Databases never go out of style — permanent demand',
      'High compensation & job security',
      'Critical role preventing data loss',
      'Career spans startups to Fortune 500',
    ],
    estimatedTimeToBridge: '8-12 months',
    demand: 'medium',
    difficulty: 'intermediate',
  },

  // ── 18. Site Reliability Engineer (SRE) ───────────────────────────────────
  {
    title: 'Site Reliability Engineer (SRE)',
    domain: 'Infrastructure & Reliability',
    description:
      'Ensure production systems are reliable, scalable, and observable. Automate operations and reduce toil through software engineering and monitoring best practices.',
    requiredSkillNames: [
      { name: 'Linux & Unix Systems', weight: 10, priority: 'high' },
      { name: 'Kubernetes', weight: 9, priority: 'high' },
      { name: 'DevOps', weight: 10, priority: 'high' },
      { name: 'System Design', weight: 10, priority: 'high' },
      { name: 'Infrastructure as Code', weight: 8, priority: 'high' },
      { name: 'Python', weight: 7, priority: 'high' },
      { name: 'Networking Protocols', weight: 7, priority: 'medium' },
      { name: 'Elasticsearch', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Linux CLI mastery', 'Networking fundamentals', 'Monitoring basics (Prometheus)', 'Incident response', 'On-call rotations'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['SLO/SLI/SLA definitions', 'Capacity planning', 'Distributed tracing (Jaeger)', 'Log aggregation (ELK)', 'Automation scripts'],
        milestoneMonths: 'Months 4-7',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Chaos engineering', 'Post-mortem culture & analysis', 'Infrastructure at scale', 'Cost optimization & efficiency'],
        milestoneMonths: 'Months 8-12',
      },
    ],
    resources: [
      { title: 'Site Reliability Engineering (Google Book)', url: 'https://sre.google/sre-book', type: 'article' },
      { title: 'Prometheus Monitoring Guide', url: 'https://prometheus.io/docs/', type: 'article' },
      { title: 'The Linux Academy DevOps Path', url: 'https://acloudguru.com', type: 'course' },
    ],
    certifications: [],
    advantages: [
      'Google-invented role with proven high ROI',
      'Highest-paid infrastructure specialization',
      'Work preventing outages that cost millions',
      'Strong career ladder to tech leadership',
    ],
    estimatedTimeToBridge: '10-14 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 19. NLP/Generative AI Engineer ────────────────────────────────────────
  {
    title: 'NLP/Generative AI Engineer',
    domain: 'Artificial Intelligence',
    description:
      'Build systems that understand and generate human language. Work with LLMs, transformers, and cutting-edge generative AI for applications spanning chatbots to content generation.',
    requiredSkillNames: [
      { name: 'Natural Language Processing', weight: 10, priority: 'high' },
      { name: 'Large Language Models (LLMs)', weight: 10, priority: 'high' },
      { name: 'Deep Learning', weight: 9, priority: 'high' },
      { name: 'Python', weight: 10, priority: 'high' },
      { name: 'PyTorch', weight: 8, priority: 'high' },
      { name: 'Linear Algebra', weight: 8, priority: 'high' },
      { name: 'Prompt Engineering', weight: 7, priority: 'medium' },
      { name: 'Statistics & Probability', weight: 7, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Python NLP fundamentals', 'Linguistics basics', 'Linear algebra', 'Statistics', 'spaCy/NLTK libraries'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Transformer architectures', 'HuggingFace ecosystem', 'Fine-tuning LLMs', 'Embeddings & retrieval', 'Prompt engineering'],
        milestoneMonths: 'Months 4-8',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Reinforcement Learning from Human Feedback (RLHF)', 'Retrieval-Augmented Generation (RAG)', 'Model evaluation & safety'],
        milestoneMonths: 'Months 9-14',
      },
    ],
    resources: [
      { title: 'HuggingFace Courses & Documentation', url: 'https://huggingface.co/course', type: 'course' },
      { title: 'Fast.ai NLP Course', url: 'https://course.fast.ai', type: 'course' },
      { title: 'Attention Is All You Need Paper', url: 'https://arxiv.org/abs/1706.03762', type: 'article' },
    ],
    certifications: [],
    advantages: [
      'Work on frontier AI that impacts billions of users',
      'Among highest-paid AI specializations',
      'Demand grows exponentially with GenAI boom',
      'Work spans academia, big tech, and startups',
    ],
    estimatedTimeToBridge: '11-15 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 20. Computer Vision Engineer ──────────────────────────────────────────
  {
    title: 'Computer Vision Engineer',
    domain: 'Artificial Intelligence',
    description:
      'Enable machines to see and understand visual information. Build systems for image classification, object detection, segmentation, and video analysis.',
    requiredSkillNames: [
      { name: 'Deep Learning', weight: 10, priority: 'high' },
      { name: 'OpenCV', weight: 9, priority: 'high' },
      { name: 'Python', weight: 10, priority: 'high' },
      { name: 'Machine Learning', weight: 9, priority: 'high' },
      { name: 'Linear Algebra', weight: 8, priority: 'high' },
      { name: 'PyTorch', weight: 8, priority: 'high' },
      { name: 'Signal Processing', weight: 6, priority: 'medium' },
      { name: 'NumPy & Pandas', weight: 7, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Image processing fundamentals', 'Linear algebra (matrices, transforms)', 'Python with numpy', 'OpenCV basics'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['CNNs (ResNet, VGG)', 'Object detection (YOLO, Faster R-CNN)', 'Semantic segmentation', 'Transfer learning'],
        milestoneMonths: 'Months 3-6',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['3D vision and reconstruction', 'Video analysis', 'Real-time optimization', 'Deployment (ONNX, TensorRT)'],
        milestoneMonths: 'Months 7-11',
      },
    ],
    resources: [
      { title: 'OpenCV Documentation', url: 'https://docs.opencv.org', type: 'article' },
      { title: 'Fast.ai Computer Vision', url: 'https://course.fast.ai', type: 'course' },
      { title: 'Stanford CS231n (Convolutional Networks)', url: 'https://cs231n.github.io', type: 'course' },
    ],
    certifications: [],
    advantages: [
      'Critical for autonomous vehicles, robotics, healthcare imaging',
      'High compensation in specialized domains',
      'Visible impact: seeing machines solve real problems',
      'Cross-industry demand (automotive, medical, agriculture)',
    ],
    estimatedTimeToBridge: '10-13 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 21. Robotics Engineer ─────────────────────────────────────────────────
  {
    title: 'Robotics Engineer',
    domain: 'Robotics & Automation',
    description:
      'Design and build robots that perceive, plan, and act in the physical world. Combine hardware, control systems, computer vision, and AI for autonomous systems.',
    requiredSkillNames: [
      { name: 'Embedded Systems', weight: 10, priority: 'high' },
      { name: 'C++', weight: 9, priority: 'high' },
      { name: 'Signal Processing', weight: 8, priority: 'high' },
      { name: 'Deep Learning', weight: 7, priority: 'high' },
      { name: 'Python', weight: 8, priority: 'high' },
      { name: 'Linear Algebra', weight: 8, priority: 'high' },
      { name: 'Real-time Systems', weight: 8, priority: 'high' },
      { name: 'Computer Networks', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['ROS (Robot Operating System)', 'Kinematics & dynamics', 'Control theory basics', 'C++ for robotics'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['SLAM (simultaneous localization and mapping)', 'Motion planning', 'Sensor fusion', 'Real-time control loops'],
        milestoneMonths: 'Months 4-8',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Deep learning for perception', 'Reinforcement learning for control', 'Humanoid robotics', 'Swarm robotics'],
        milestoneMonths: 'Months 9-14',
      },
    ],
    resources: [
      { title: 'ROS Official Tutorials', url: 'https://wiki.ros.org/ROS/Tutorials', type: 'article' },
      { title: 'Modern Robotics (Northwestern Course)', url: 'https://www.coursera.org/specializations/modern-robotics', type: 'course' },
      { title: 'Robot Operating System (ROS) Basics', url: 'https://roboticsbackend.com', type: 'article' },
    ],
    certifications: [],
    advantages: [
      'Work on physical systems that interact with the real world',
      'High growth in manufacturing, delivery, surgery automation',
      'Multidisciplinary field combining CS, mechanical, and electrical engineering',
      'Diverse industries: manufacturing, healthcare, agriculture, defense',
    ],
    estimatedTimeToBridge: '12-16 months',
    demand: 'medium',
    difficulty: 'advanced',
  },

  // ── 22. MLOps Engineer ────────────────────────────────────────────────────
  {
    title: 'MLOps Engineer',
    domain: 'Machine Learning Infrastructure',
    description:
      'Build production ML systems at scale. Manage model training pipelines, versioning, deployment, monitoring, and retraining for reliable ML in production.',
    requiredSkillNames: [
      { name: 'Machine Learning', weight: 9, priority: 'high' },
      { name: 'Docker', weight: 9, priority: 'high' },
      { name: 'Kubernetes', weight: 8, priority: 'high' },
      { name: 'Python', weight: 9, priority: 'high' },
      { name: 'SQL', weight: 7, priority: 'high' },
      { name: 'CI/CD Pipelines', weight: 9, priority: 'high' },
      { name: 'Cloud Computing', weight: 8, priority: 'high' },
      { name: 'Big Data', weight: 7, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['ML fundamentals', 'Python + scikit-learn', 'Docker basics', 'Git workflows', 'Data versioning (DVC)'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['ML pipeline orchestration (Airflow, Kubeflow)', 'Model versioning & registry', 'Feature stores', 'Model monitoring'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['A/B testing ML models', 'AutoML & hyperparameter tuning', 'Data quality & drift detection', 'Cost optimization'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'Made With ML (Full MLOps Course)', url: 'https://madewithml.com', type: 'course' },
      { title: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/', type: 'article' },
      { title: 'Designing Machine Learning Systems (Book)', url: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/', type: 'article' },
    ],
    certifications: [],
    advantages: [
      'Bridge between data science and DevOps with high impact',
      'Prevent ML models from failing in production',
      'Fastest-growing ML specialization',
      'Every ML-driven company needs MLOps engineers',
    ],
    estimatedTimeToBridge: '8-11 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 23. Systems Programmer ────────────────────────────────────────────────
  {
    title: 'Systems Programmer',
    domain: 'Systems & Performance',
    description:
      'Build foundational software systems that everything else runs on. Work on OS kernels, compilers, databases, and performance-critical infrastructure.',
    requiredSkillNames: [
      { name: 'C++', weight: 10, priority: 'high' },
      { name: 'C Programming', weight: 10, priority: 'high' },
      { name: 'Operating Systems', weight: 9, priority: 'high' },
      { name: 'Linux & Unix Systems', weight: 9, priority: 'high' },
      { name: 'Assembly Language', weight: 8, priority: 'high' },
      { name: 'Computer Networks', weight: 7, priority: 'medium' },
      { name: 'Data Structures', weight: 8, priority: 'high' },
      { name: 'Algorithms', weight: 8, priority: 'high' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['C fundamentals', 'Linux kernel concepts', 'Memory management (malloc, free)', 'Process & threading basics'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['POSIX APIs', 'Concurrency & synchronization', 'Performance profiling', 'Low-level debugging (gdb, valgrind)'],
        milestoneMonths: 'Months 4-7',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Kernel module development', 'Database internals', 'Compiler fundamentals', 'Distributed systems'],
        milestoneMonths: 'Months 8-12',
      },
    ],
    resources: [
      { title: 'Linux Kernel Development (Lovegrove)', url: 'https://www.oreilly.com/library/view/linux-kernel-development/9780133390292/', type: 'article' },
      { title: 'The C Programming Language (K&R)', url: 'https://en.wikipedia.org/wiki/The_C_Programming_Language', type: 'article' },
      { title: 'MIT 6.828 Operating Systems', url: 'https://pdos.csail.mit.edu/6.828/', type: 'course' },
    ],
    certifications: [],
    advantages: [
      'Work on code that powers billions of devices',
      'Deep technical challenges with measurable impact',
      'High compensation for rare skill set',
      'Career in OS, databases, compilers, or HFT',
    ],
    estimatedTimeToBridge: '12-18 months',
    demand: 'medium',
    difficulty: 'advanced',
  },

  // ── 24. Security Engineer ─────────────────────────────────────────────────
  {
    title: 'Security Engineer',
    domain: 'Security',
    description:
      'Build secure systems by design. Implement authentication, encryption, access controls, and audit logging. Prevent security breaches before they happen.',
    requiredSkillNames: [
      { name: 'Cryptography', weight: 10, priority: 'high' },
      { name: 'Web Security & OWASP', weight: 10, priority: 'high' },
      { name: 'Linux & Unix Systems', weight: 9, priority: 'high' },
      { name: 'Python', weight: 8, priority: 'high' },
      { name: 'Information Security', weight: 9, priority: 'high' },
      { name: 'Computer Networks', weight: 8, priority: 'high' },
      { name: 'Docker', weight: 6, priority: 'medium' },
      { name: 'Cloud Computing', weight: 7, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Cryptography basics', 'OWASP Top 10', 'Authentication & authorization', 'Secure coding practices'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['TLS/SSL deep dive', 'Key management systems', 'Secure API design', 'Compliance (GDPR, HIPAA)'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Zero Trust architecture', 'Security auditing', 'Threat modeling', 'Incident response playbooks'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'Web Security Academy (PortSwigger)', url: 'https://portswigger.net/web-security', type: 'course' },
      { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', type: 'article' },
      { title: 'Cryptography I (Stanford)', url: 'https://www.coursera.org/learn/crypto', type: 'course' },
    ],
    certifications: ['CISSP', 'CEH (Certified Ethical Hacker)'],
    advantages: [
      'Every company needs security engineers',
      'High compensation and strong job security',
      'Critical role preventing billion-dollar breaches',
      'Work spans all industries and company sizes',
    ],
    estimatedTimeToBridge: '8-11 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 25. Graphics Programmer ───────────────────────────────────────────────
  {
    title: 'Graphics Programmer',
    domain: 'Graphics & Visualization',
    description:
      'Master visual rendering and real-time graphics. Work with GPUs, shaders, and rendering pipelines to create stunning visuals for games, VFX, and simulation.',
    requiredSkillNames: [
      { name: 'C++', weight: 10, priority: 'high' },
      { name: 'Linear Algebra', weight: 10, priority: 'high' },
      { name: 'Data Structures', weight: 8, priority: 'high' },
      { name: 'Signal Processing', weight: 8, priority: 'high' },
      { name: 'Algorithms', weight: 7, priority: 'medium' },
      { name: 'Computer Networks', weight: 6, priority: 'medium' },
      { name: 'System Design', weight: 6, priority: 'medium' },
      { name: 'Assembly Language', weight: 5, priority: 'low' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['3D math (vectors, matrices, transforms)', 'Graphics pipeline overview', 'OpenGL or Vulkan basics', 'Shader programming'],
        milestoneMonths: 'Months 1-3',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Rendering techniques (rasterization, ray tracing)', 'Lighting & shading models', 'Texture mapping', 'Performance optimization'],
        milestoneMonths: 'Months 4-7',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Real-time path tracing', 'Physics-based rendering', 'GPU compute shaders', 'Visual effects (particles, post-processing)'],
        milestoneMonths: 'Months 8-12',
      },
    ],
    resources: [
      { title: 'Learn OpenGL', url: 'https://learnopengl.com', type: 'article' },
      { title: 'Real-Time Rendering (Graphics Bible)', url: 'https://www.realtimerendering.com', type: 'article' },
      { title: 'Vulkan Official Tutorials', url: 'https://vulkan-tutorial.com', type: 'article' },
    ],
    certifications: [],
    advantages: [
      'Create visually stunning real-time experiences',
      'High demand in games, film (VFX), and simulation',
      'GPU programming skills transfer to ML (CUDA)',
      'Visible, tangible output of your work',
    ],
    estimatedTimeToBridge: '10-14 months',
    demand: 'medium',
    difficulty: 'advanced',
  },

  // ── 26. AR/VR Developer ───────────────────────────────────────────────────
  {
    title: 'AR/VR Developer',
    domain: 'Extended Reality',
    description:
      'Build immersive augmented and virtual reality experiences. Master spatial computing, head tracking, gesture recognition, and 3D interaction design.',
    requiredSkillNames: [
      { name: 'C#', weight: 9, priority: 'high' },
      { name: 'C++', weight: 7, priority: 'high' },
      { name: 'Linear Algebra', weight: 8, priority: 'high' },
      { name: 'UI/UX Design', weight: 8, priority: 'high' },
      { name: 'Computer Networks', weight: 6, priority: 'medium' },
      { name: 'Object-Oriented Programming', weight: 8, priority: 'high' },
      { name: 'Signal Processing', weight: 7, priority: 'medium' },
      { name: 'Data Structures', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['3D fundamentals', 'Unity or Unreal basics', 'VR headset concepts', 'Spatial interaction design'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Hand tracking & gesture recognition', 'Spatial audio', 'Performance optimization for VR', 'WebXR for browser VR/AR'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Advanced physics in VR', 'Avatar systems & social VR', 'Cross-platform AR (ARKit, ARCore)', 'AI for NPCs in VR'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'Unity Learn XR', url: 'https://learn.unity.com/course/vr-beginner', type: 'course' },
      { title: 'Unreal Engine VR Development', url: 'https://docs.unrealengine.com/latest/en-US/Platforms/VR/', type: 'article' },
      { title: 'WebXR Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API', type: 'article' },
    ],
    certifications: [],
    advantages: [
      'Work on next-gen computing platform (VR/AR is the future)',
      'Fast-growing field with strong demand',
      'Create experiences that transport users to new worlds',
      'Opportunities in gaming, education, training, and healthcare',
    ],
    estimatedTimeToBridge: '7-10 months',
    demand: 'medium',
    difficulty: 'intermediate',
  },

  // ── 27. Network Engineer ──────────────────────────────────────────────────
  {
    title: 'Network Engineer',
    domain: 'Infrastructure & Networking',
    description:
      'Design and manage computer networks. Build infrastructure for data flow, implement routing and switching, ensure reliability and performance across enterprises.',
    requiredSkillNames: [
      { name: 'Computer Networks', weight: 10, priority: 'high' },
      { name: 'Networking Protocols', weight: 10, priority: 'high' },
      { name: 'Linux & Unix Systems', weight: 8, priority: 'high' },
      { name: 'Bash Scripting', weight: 7, priority: 'high' },
      { name: 'Information Security', weight: 8, priority: 'high' },
      { name: 'Cloud Computing', weight: 7, priority: 'medium' },
      { name: 'System Design', weight: 7, priority: 'medium' },
      { name: 'Python', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['OSI model & TCP/IP stack', 'Routing & switching basics', 'DNS & DHCP', 'Network topologies'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['VLANs & subnetting', 'BGP & OSPF routing', 'Firewalls & access control', 'VPN & tunneling'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Software-defined networking (SDN)', 'Network automation', 'High-availability & redundancy', 'Cloud networking (AWS/GCP)'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'Cisco Learning Network', url: 'https://learningnetwork.cisco.com', type: 'course' },
      { title: 'Computer Networking: A Top-Down Approach', url: 'https://gaia.cs.umass.edu/kurose_ross/', type: 'article' },
      { title: 'Juniper Networks Training', url: 'https://learningportal.juniper.net', type: 'course' },
    ],
    certifications: ['CCNA (Cisco)', 'Juniper JNCIA', 'CompTIA Network+'],
    advantages: [
      'Essential infrastructure role with high job security',
      'Strong compensation & stable demand',
      'Every organization relies on networks',
      'Certifications (CCNA) open many doors',
    ],
    estimatedTimeToBridge: '8-12 months',
    demand: 'high',
    difficulty: 'intermediate',
  },

  // ── 28. Platform Engineer ─────────────────────────────────────────────────
  {
    title: 'Platform Engineer',
    domain: 'Infrastructure & Developer Experience',
    description:
      'Build internal developer platforms that empower engineers. Create self-service infrastructure, reduce toil, and improve developer productivity across the organization.',
    requiredSkillNames: [
      { name: 'Kubernetes', weight: 9, priority: 'high' },
      { name: 'Infrastructure as Code', weight: 9, priority: 'high' },
      { name: 'Docker', weight: 8, priority: 'high' },
      { name: 'DevOps', weight: 9, priority: 'high' },
      { name: 'Python', weight: 7, priority: 'medium' },
      { name: 'Git & Version Control', weight: 7, priority: 'high' },
      { name: 'System Design', weight: 8, priority: 'high' },
      { name: 'CI/CD Pipelines', weight: 8, priority: 'high' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Container fundamentals', 'Kubernetes basics', 'IaC tools (Terraform)', 'Developer experience principles'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Platform as a Service (PaaS) design', 'API gateway patterns', 'Monitoring & observability', 'Self-service infrastructure'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Multi-cloud platform design', 'Advanced networking (service mesh)', 'Cost optimization', 'Security & compliance automation'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'Platform Engineering Guide', url: 'https://platformengineering.org', type: 'article' },
      { title: 'DevOps & Platform Engineering Roadmap', url: 'https://roadmap.sh/devops', type: 'article' },
      { title: 'Kubernetes Patterns Book', url: 'https://www.oreilly.com/library/view/kubernetes-patterns/9781492050896/', type: 'article' },
    ],
    certifications: ['CKA (Certified Kubernetes Administrator)'],
    advantages: [
      'Emerging role with explosive growth',
      'Enable hundreds of engineers to move faster',
      'Strategic impact on entire engineering organization',
      'High compensation & strong future demand',
    ],
    estimatedTimeToBridge: '9-12 months',
    demand: 'high',
    difficulty: 'advanced',
  },

  // ── 29. Competitive Programmer ────────────────────────────────────────────
  {
    title: 'Competitive Programmer',
    domain: 'Algorithms & Problem Solving',
    description:
      'Master algorithmic problem-solving at the highest levels. Compete in ACM ICPC, Google Code Jam, and similar competitions. Excel in technical interviews.',
    requiredSkillNames: [
      { name: 'Algorithms', weight: 10, priority: 'high' },
      { name: 'Data Structures', weight: 10, priority: 'high' },
      { name: 'Linear Algebra', weight: 9, priority: 'high' },
      { name: 'C++', weight: 9, priority: 'high' },
      { name: 'Python', weight: 7, priority: 'high' },
      { name: 'Statistics & Probability', weight: 7, priority: 'medium' },
      { name: 'Binary Trees & Graphs', weight: 10, priority: 'high' },
      { name: 'Object-Oriented Programming', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Basic algorithms & data structures', 'Sorting & searching', 'Simple problem solving', 'Online judge platforms (Codeforces)'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Graph algorithms (DFS, BFS, Dijkstra)', 'Dynamic programming', 'Mathematical algorithms', 'Medium-hard problems'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['Advanced DP & optimization', 'Competitive math (number theory, combinatorics)', 'Contest strategies', 'Teaching & mentoring'],
        milestoneMonths: 'Months 6-10',
      },
    ],
    resources: [
      { title: 'Codeforces (Competitive Programming Platform)', url: 'https://codeforces.com', type: 'course' },
      { title: 'Competitive Programmer\'s Handbook', url: 'https://cses.fi/book/book.pdf', type: 'article' },
      { title: 'LeetCode & HackerRank', url: 'https://leetcode.com', type: 'course' },
    ],
    certifications: [],
    advantages: [
      'Sharpen problem-solving skills to elite levels',
      'Stand out in technical interviews at top companies',
      'Potential earnings from competitions (prize money)',
      'Gateway to teaching, research, or founding startups',
    ],
    estimatedTimeToBridge: '8-12 months',
    demand: 'medium',
    difficulty: 'advanced',
  },

  // ── 30. IoT Developer ─────────────────────────────────────────────────────
  {
    title: 'IoT Developer',
    domain: 'Internet of Things',
    description:
      'Build connected IoT systems that sense and control the physical world. Develop firmware, cloud connectivity, and edge intelligence for smart devices.',
    requiredSkillNames: [
      { name: 'Embedded Systems', weight: 10, priority: 'high' },
      { name: 'Python', weight: 8, priority: 'high' },
      { name: 'C Programming', weight: 9, priority: 'high' },
      { name: 'Cloud Computing', weight: 8, priority: 'high' },
      { name: 'IoT (Internet of Things)', weight: 10, priority: 'high' },
      { name: 'Networking Protocols', weight: 8, priority: 'high' },
      { name: 'Real-time Systems', weight: 7, priority: 'medium' },
      { name: 'Docker', weight: 6, priority: 'medium' },
    ],
    phases: [
      {
        phase: 1,
        title: 'Foundation',
        skills: ['Microcontroller basics (Arduino, ESP32)', 'MQTT protocol', 'Sensor integration', 'Python IoT basics'],
        milestoneMonths: 'Months 1-2',
      },
      {
        phase: 2,
        title: 'Core',
        skills: ['Edge computing & local processing', 'Cloud connectivity (AWS IoT, Azure IoT)', 'Data streaming', 'Power management'],
        milestoneMonths: 'Months 3-5',
      },
      {
        phase: 3,
        title: 'Advanced',
        skills: ['5G for IoT', 'Machine learning on edge devices', 'IoT security & encryption', 'Large-scale deployment'],
        milestoneMonths: 'Months 6-9',
      },
    ],
    resources: [
      { title: 'Arduino Official Tutorials', url: 'https://www.arduino.cc/en/Guide', type: 'article' },
      { title: 'AWS IoT Core Documentation', url: 'https://docs.aws.amazon.com/iot-core/', type: 'article' },
      { title: 'IoT Programming with Python', url: 'https://www.oreilly.com/library/view/programming-the-internet/9781491934174/', type: 'article' },
    ],
    certifications: [],
    advantages: [
      'Work on devices in billions of homes & businesses',
      'Growing field with massive future potential',
      'Bridges hardware and software worlds',
      'Opportunities in smart home, industry 4.0, wearables',
    ],
    estimatedTimeToBridge: '7-10 months',
    demand: 'high',
    difficulty: 'intermediate',
  },
];

module.exports = careers;
