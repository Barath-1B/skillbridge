/**
 * SkillBridge — Comprehensive A–Z Computer Science Skills Seed
 * ─────────────────────────────────────────────────────────────
 * File: server/src/seed/skills-az.seed.js
 *
 * A–Z technical/knowledge skills + a soft-skills set · 4 categories
 * (technical-skill, knowledge, certification, soft-skill)
 * Run via: npm run seed
 */

const skillsAZ = [

  // ══════════ A ══════════
  {
    name: 'Algorithms',
    category: 'knowledge',
    description: 'Design and analysis of computational procedures: sorting, searching, graph traversal, and dynamic programming.',
    tags: ['cs-fundamentals', 'problem-solving', 'interviews'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Introduction to Algorithms (CLRS)', url: 'https://mitpress.mit.edu/9780262046305/', type: 'book', platform: 'MIT Press' },
      { title: 'Algorithms Specialization', url: 'https://www.coursera.org/specializations/algorithms', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Agile Methodology',
    category: 'knowledge',
    description: 'Iterative development framework: Scrum, Kanban, SAFe, sprint planning, retrospectives, and adaptive delivery.',
    tags: ['process', 'project-management', 'teamwork'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Agile Manifesto', url: 'https://agilemanifesto.org', type: 'documentation', platform: 'agilemanifesto.org' },
      { title: 'Agile Fundamentals', url: 'https://www.coursera.org/learn/agile-development', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'API Design',
    category: 'technical-skill',
    description: 'Designing RESTful, GraphQL, and gRPC interfaces with versioning, rate limiting, pagination, and OpenAPI/Swagger documentation.',
    tags: ['backend', 'rest', 'graphql', 'architecture'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'API Design Patterns', url: 'https://www.manning.com/books/api-design-patterns', type: 'book', platform: 'Manning' },
      { title: 'REST API Design Best Practices', url: 'https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/', type: 'tutorial', platform: 'freeCodeCamp' },
    ],
  },
  {
    name: 'AWS (Amazon Web Services)',
    category: 'technical-skill',
    description: 'Cloud platform services: EC2, S3, Lambda, RDS, VPC, IAM, CloudFormation, and managed AI/ML services.',
    tags: ['cloud', 'devops', 'infrastructure', 'serverless'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'AWS Cloud Practitioner Essentials', url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/', type: 'course', platform: 'AWS' },
      { title: 'AWS Documentation', url: 'https://docs.aws.amazon.com', type: 'documentation', platform: 'AWS' },
    ],
  },
  {
    name: 'Angular',
    category: 'technical-skill',
    description: 'TypeScript-based SPA framework with two-way data binding, dependency injection, and RxJS reactive programming.',
    tags: ['frontend', 'typescript', 'spa', 'rxjs'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Angular Official Docs', url: 'https://angular.dev', type: 'documentation', platform: 'Angular' },
      { title: 'Angular - The Complete Guide', url: 'https://www.udemy.com/course/the-complete-guide-to-angular-2/', type: 'course', platform: 'Udemy' },
    ],
  },
  {
    name: 'Assembly Language',
    category: 'knowledge',
    description: 'Low-level x86/x64 and ARM programming; essential for embedded systems, OS kernels, and reverse engineering.',
    tags: ['low-level', 'embedded', 'systems', 'hardware'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'x86 Assembly Guide', url: 'https://www.cs.virginia.edu/~evans/cs216/guides/x86.html', type: 'tutorial', platform: 'UVA CS' },
    ],
  },
  {
    name: 'Artificial Intelligence',
    category: 'knowledge',
    description: 'Search, knowledge representation, planning, NLP, computer vision, and intelligent agent architectures.',
    tags: ['ai', 'ml', 'research'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Artificial Intelligence: A Modern Approach', url: 'https://aima.cs.berkeley.edu/', type: 'book', platform: 'AIMA' },
      { title: 'AI For Everyone', url: 'https://www.coursera.org/learn/ai-for-everyone', type: 'course', platform: 'Coursera' },
    ],
  },

  // ══════════ B ══════════
  {
    name: 'Big Data',
    category: 'knowledge',
    description: 'Processing and analysing datasets too large for traditional tools; Hadoop, Spark, distributed file systems, and streaming.',
    tags: ['data-engineering', 'hadoop', 'spark', 'distributed-systems'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Big Data Specialization', url: 'https://www.coursera.org/specializations/big-data', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Blockchain',
    category: 'knowledge',
    description: 'Distributed ledger technology; consensus mechanisms (PoW, PoS), smart contracts, and DeFi architecture.',
    tags: ['web3', 'cryptography', 'distributed-systems', 'fintech'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Blockchain Basics', url: 'https://www.coursera.org/learn/blockchain-basics', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Bash Scripting',
    category: 'technical-skill',
    description: 'Unix shell scripting for automation, file manipulation, CI/CD pipelines, and system administration.',
    tags: ['linux', 'devops', 'automation', 'scripting'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'The Linux Command Line', url: 'https://linuxcommand.org/tlcl.php', type: 'book', platform: 'LinuxCommand.org' },
      { title: 'Bash Scripting Tutorial', url: 'https://ryanstutorials.net/bash-scripting-tutorial/', type: 'tutorial', platform: "Ryan's Tutorials" },
    ],
  },
  {
    name: 'Binary Trees & Graphs',
    category: 'knowledge',
    description: 'BSTs, AVL trees, heaps, directed/undirected graphs, BFS, DFS, and shortest-path algorithms.',
    tags: ['data-structures', 'cs-fundamentals', 'interviews'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Data Structures and Algorithms', url: 'https://www.coursera.org/specializations/data-structures-algorithms', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Business Analysis',
    category: 'soft-skill',
    description: 'Eliciting requirements, modelling processes, and translating business needs into technical specifications.',
    tags: ['requirements', 'stakeholders', 'process-mapping'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Business Analysis Fundamentals', url: 'https://www.udemy.com/course/business-analysis-ba/', type: 'course', platform: 'Udemy' },
    ],
  },

  // ══════════ C ══════════
  {
    name: 'C Programming',
    category: 'technical-skill',
    description: 'Systems programming: memory management, pointers, structures, and POSIX APIs for OS, embedded, and performance-critical code.',
    tags: ['systems', 'low-level', 'embedded', 'performance'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'The C Programming Language (K&R)', url: 'https://en.wikipedia.org/wiki/The_C_Programming_Language', type: 'book', platform: 'Prentice Hall' },
      { title: 'CS50x', url: 'https://cs50.harvard.edu/x/', type: 'course', platform: 'Harvard / edX' },
    ],
  },
  {
    name: 'C++',
    category: 'technical-skill',
    description: 'Multi-paradigm language: zero-cost abstractions, RAII, templates, STL, and move semantics; dominant in games, HFT, and systems.',
    tags: ['systems', 'games', 'performance', 'oop'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'C++ Core Guidelines', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines', type: 'documentation', platform: 'isocpp.github.io' },
      { title: 'LearnCpp.com', url: 'https://www.learncpp.com', type: 'tutorial', platform: 'LearnCpp' },
    ],
  },
  {
    name: 'C#',
    category: 'technical-skill',
    description: 'Managed .NET language used for enterprise backends, Unity game development, and ASP.NET APIs.',
    tags: ['dotnet', 'backend', 'enterprise', 'unity'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'C# Documentation', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/', type: 'documentation', platform: 'Microsoft Learn' },
    ],
  },
  {
    name: 'Cloud Computing',
    category: 'knowledge',
    description: 'IaaS, PaaS, SaaS models; on-demand compute, storage, and networking across AWS, Azure, and GCP.',
    tags: ['cloud', 'infrastructure', 'devops', 'scalability'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Cloud Computing Concepts', url: 'https://www.coursera.org/learn/cloud-computing', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Computer Networks',
    category: 'knowledge',
    description: 'TCP/IP stack, OSI model, routing protocols, DNS, HTTP/2, TLS, and network security fundamentals.',
    tags: ['networking', 'tcp-ip', 'security', 'infrastructure'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Computer Networking: A Top-Down Approach', url: 'https://gaia.cs.umass.edu/kurose_ross/', type: 'book', platform: 'Pearson' },
      { title: 'Bits and Bytes of Computer Networking', url: 'https://www.coursera.org/learn/computer-networking', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'CSS & Responsive Design',
    category: 'technical-skill',
    description: 'Flexbox, Grid, animations, media queries, CSS custom properties, and CSS-in-JS approaches.',
    tags: ['frontend', 'web', 'ui', 'design'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'CSS Reference — MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', type: 'documentation', platform: 'MDN' },
      { title: 'CSS Grid Garden', url: 'https://cssgridgarden.com', type: 'tutorial', platform: 'Grid Garden' },
    ],
  },
  {
    name: 'Cryptography',
    category: 'knowledge',
    description: 'Symmetric/asymmetric encryption, hashing, digital signatures, PKI, TLS, and post-quantum cryptography.',
    tags: ['security', 'mathematics', 'networking', 'cybersecurity'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Cryptography I (Stanford)', url: 'https://www.coursera.org/learn/crypto', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'CI/CD Pipelines',
    category: 'technical-skill',
    description: 'Continuous integration and delivery via GitHub Actions, Jenkins, GitLab CI, or CircleCI; automated builds, tests, and releases.',
    tags: ['devops', 'automation', 'git', 'deployment'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions', type: 'documentation', platform: 'GitHub' },
    ],
  },

  // ══════════ D ══════════
  {
    name: 'Data Structures',
    category: 'knowledge',
    description: 'Arrays, linked lists, stacks, queues, hash maps, trees, heaps, and graphs — selection and complexity analysis.',
    tags: ['cs-fundamentals', 'problem-solving', 'interviews'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'JS Algorithms & Data Structures Masterclass', url: 'https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/', type: 'course', platform: 'Udemy' },
    ],
  },
  {
    name: 'Database Design',
    category: 'knowledge',
    description: 'Relational modelling, normalisation (1NF–BCNF), ER diagrams, indexing strategies, and schema migrations.',
    tags: ['databases', 'sql', 'backend', 'architecture'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Database Design Course', url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc', type: 'tutorial', platform: 'YouTube / freeCodeCamp' },
    ],
  },
  {
    name: 'Docker',
    category: 'technical-skill',
    description: 'Containerisation: Dockerfile authoring, image layering, multi-stage builds, Docker Compose, and container networking.',
    tags: ['devops', 'containers', 'deployment', 'infrastructure'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Docker Official Docs', url: 'https://docs.docker.com', type: 'documentation', platform: 'Docker' },
      { title: 'Docker & Kubernetes: The Practical Guide', url: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/', type: 'course', platform: 'Udemy' },
    ],
  },
  {
    name: 'DevOps',
    category: 'knowledge',
    description: 'Culture and practices bridging dev and ops: IaC, monitoring, SLOs, incident management, and deployment automation.',
    tags: ['devops', 'automation', 'cloud', 'operations'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'DevOps Roadmap', url: 'https://roadmap.sh/devops', type: 'documentation', platform: 'roadmap.sh' },
    ],
  },
  {
    name: 'Deep Learning',
    category: 'technical-skill',
    description: 'CNNs, RNNs, LSTMs, Transformers, diffusion models, and their training techniques (optimisers, regularisation, transfer learning).',
    tags: ['ai', 'machine-learning', 'pytorch', 'tensorflow', 'research'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', type: 'course', platform: 'Coursera' },
      { title: 'fast.ai Practical Deep Learning', url: 'https://course.fast.ai', type: 'course', platform: 'fast.ai' },
    ],
  },
  {
    name: 'Django',
    category: 'technical-skill',
    description: 'Python web framework with ORM, admin panel, authentication, and middleware for rapid backend development.',
    tags: ['python', 'backend', 'web', 'orm'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Django Documentation', url: 'https://docs.djangoproject.com', type: 'documentation', platform: 'Django' },
      { title: 'Django for Everybody', url: 'https://www.dj4e.com', type: 'course', platform: 'dj4e' },
    ],
  },

  // ══════════ E ══════════
  {
    name: 'Embedded Systems',
    category: 'knowledge',
    description: 'Hardware-software co-design on ARM Cortex-M, AVR, ESP32 microcontrollers; RTOS, HAL drivers, and power management.',
    tags: ['hardware', 'iot', 'c', 'rtos', 'low-level'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Embedded Systems - Shape The World', url: 'https://www.edx.org/course/embedded-systems-shape-the-world-microcontroller-i', type: 'course', platform: 'edX' },
    ],
  },
  {
    name: 'Elasticsearch',
    category: 'technical-skill',
    description: 'Distributed full-text search engine: inverted indices, query DSL, aggregations, and the ELK observability stack.',
    tags: ['search', 'backend', 'data-engineering', 'analytics'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Elasticsearch Reference', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html', type: 'documentation', platform: 'Elastic' },
    ],
  },
  {
    name: 'Event-Driven Architecture',
    category: 'knowledge',
    description: 'Designing systems around event producers, brokers, and consumers; Kafka, RabbitMQ, CQRS, and Event Sourcing.',
    tags: ['architecture', 'microservices', 'kafka', 'backend'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Event-Driven Microservices', url: 'https://www.oreilly.com/library/view/building-event-driven-microservices/9781492057888/', type: 'book', platform: "O'Reilly" },
    ],
  },
  {
    name: 'Express.js',
    category: 'technical-skill',
    description: 'Minimalist Node.js web framework for REST APIs and middleware-based request pipelines.',
    tags: ['backend', 'nodejs', 'rest', 'javascript'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html', type: 'documentation', platform: 'Express' },
    ],
  },

  // ══════════ F ══════════
  {
    name: 'Flutter & Dart',
    category: 'technical-skill',
    description: "Google's cross-platform UI toolkit for natively compiled mobile, web, and desktop apps from a single Dart codebase.",
    tags: ['mobile', 'cross-platform', 'ui', 'dart'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Flutter Documentation', url: 'https://flutter.dev/docs', type: 'documentation', platform: 'Flutter' },
    ],
  },
  {
    name: 'Firebase',
    category: 'technical-skill',
    description: "Google's BaaS: Firestore, Authentication, Cloud Functions, Realtime Database, and Firebase Hosting.",
    tags: ['backend', 'mobile', 'cloud', 'nosql'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Firebase Documentation', url: 'https://firebase.google.com/docs', type: 'documentation', platform: 'Google' },
    ],
  },
  {
    name: 'Functional Programming',
    category: 'knowledge',
    description: 'Pure functions, immutability, higher-order functions, monads, and function composition in Haskell, Clojure, or JS/Python.',
    tags: ['paradigm', 'haskell', 'javascript', 'python'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: "Professor Frisby's Mostly Adequate Guide", url: 'https://mostly-adequate.gitbook.io/mostly-adequate-guide/', type: 'book', platform: 'GitBook' },
    ],
  },
  {
    name: 'FastAPI',
    category: 'technical-skill',
    description: 'High-performance Python web framework with automatic OpenAPI docs, async/await support, and Pydantic validation.',
    tags: ['python', 'backend', 'rest', 'async'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'FastAPI Documentation', url: 'https://fastapi.tiangolo.com', type: 'documentation', platform: 'FastAPI' },
    ],
  },

  // ══════════ G ══════════
  {
    name: 'Git & Version Control',
    category: 'technical-skill',
    description: 'Branching strategies (GitFlow, trunk-based), rebasing, cherry-picking, hooks, and pull-request review workflows.',
    tags: ['devops', 'collaboration', 'tooling'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', type: 'book', platform: 'git-scm.com' },
    ],
  },
  {
    name: 'Go (Golang)',
    category: 'technical-skill',
    description: 'Compiled language with CSP concurrency (goroutines, channels); ideal for cloud services, CLIs, and networking tools.',
    tags: ['backend', 'systems', 'concurrency', 'cloud'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'A Tour of Go', url: 'https://go.dev/tour/', type: 'tutorial', platform: 'go.dev' },
      { title: 'Go by Example', url: 'https://gobyexample.com', type: 'tutorial', platform: 'gobyexample.com' },
    ],
  },
  {
    name: 'GraphQL',
    category: 'technical-skill',
    description: 'Query language and runtime for APIs: schema-first design, resolvers, mutations, subscriptions, and DataLoader.',
    tags: ['api', 'backend', 'frontend', 'architecture'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'GraphQL Official Docs', url: 'https://graphql.org/learn/', type: 'documentation', platform: 'graphql.org' },
    ],
  },
  {
    name: 'Google Cloud Platform',
    category: 'technical-skill',
    description: 'GCP services: Compute Engine, GKE, BigQuery, Cloud Run, and Vertex AI for production ML deployments.',
    tags: ['cloud', 'devops', 'infrastructure', 'ml'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'GCP Documentation', url: 'https://cloud.google.com/docs', type: 'documentation', platform: 'Google' },
    ],
  },

  // ══════════ H ══════════
  {
    name: 'HTML5',
    category: 'technical-skill',
    description: 'Semantic markup, WCAG/ARIA accessibility, forms, canvas/SVG, Web Components, and SEO document structure.',
    tags: ['frontend', 'web', 'accessibility', 'seo'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'HTML Reference — MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'documentation', platform: 'MDN' },
    ],
  },
  {
    name: 'Hadoop',
    category: 'technical-skill',
    description: 'Apache distributed storage and processing: HDFS, MapReduce, YARN, and ecosystem tools (Hive, Pig, HBase).',
    tags: ['big-data', 'distributed-systems', 'data-engineering'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Hadoop Platform and Application Framework', url: 'https://www.coursera.org/learn/hadoop', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'HIPAA Compliance',
    category: 'knowledge',
    description: 'U.S. healthcare data privacy: PHI handling, audit trails, encryption requirements, and BAA agreements.',
    tags: ['healthcare', 'compliance', 'security', 'data-privacy'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'HHS HIPAA for Professionals', url: 'https://www.hhs.gov/hipaa/for-professionals/index.html', type: 'documentation', platform: 'HHS.gov' },
    ],
  },

  // ══════════ I ══════════
  {
    name: 'IoT (Internet of Things)',
    category: 'knowledge',
    description: 'Connecting physical devices: MQTT, CoAP, edge computing, sensor fusion, and industrial IoT (IIoT) patterns.',
    tags: ['hardware', 'embedded', 'networking', 'sensors'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Programming the IoT Specialization', url: 'https://www.coursera.org/specializations/iot', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Infrastructure as Code',
    category: 'technical-skill',
    description: 'Declarative provisioning with Terraform, Pulumi, or CloudFormation; state management, modules, and drift detection.',
    tags: ['devops', 'terraform', 'cloud', 'automation'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Terraform Documentation', url: 'https://developer.hashicorp.com/terraform/docs', type: 'documentation', platform: 'HashiCorp' },
    ],
  },
  {
    name: 'Information Security',
    category: 'knowledge',
    description: 'CIA triad, threat modelling, vulnerability management, SIEM, incident response, and security architecture.',
    tags: ['security', 'cybersecurity', 'risk', 'compliance'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Google Cybersecurity Certificate', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', type: 'course', platform: 'Coursera' },
    ],
  },

  // ══════════ J ══════════
  {
    name: 'Java',
    category: 'technical-skill',
    description: 'Strongly-typed JVM language for enterprise backends (Spring Boot), Android, and big-data tooling.',
    tags: ['backend', 'oop', 'enterprise', 'android'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Java Programming Masterclass', url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/', type: 'course', platform: 'Udemy' },
      { title: 'Java Documentation', url: 'https://docs.oracle.com/en/java/', type: 'documentation', platform: 'Oracle' },
    ],
  },
  {
    name: 'JavaScript',
    category: 'technical-skill',
    description: 'Dynamic web language: event loop, promises/async-await, closures, prototypal inheritance, and ES2024+ features.',
    tags: ['frontend', 'backend', 'web', 'fullstack'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'JavaScript.info', url: 'https://javascript.info', type: 'tutorial', platform: 'javascript.info' },
      { title: 'The Odin Project', url: 'https://www.theodinproject.com', type: 'course', platform: 'The Odin Project' },
    ],
  },
  {
    name: 'Jenkins',
    category: 'technical-skill',
    description: 'Open-source CI/CD automation server: Declarative Pipeline, plugins, distributed agents, and Blue Ocean UI.',
    tags: ['devops', 'ci-cd', 'automation'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Jenkins User Documentation', url: 'https://www.jenkins.io/doc/', type: 'documentation', platform: 'Jenkins' },
    ],
  },
  {
    name: 'JSON & Data Serialisation',
    category: 'knowledge',
    description: 'JSON, XML, YAML, Protocol Buffers, and MessagePack for data interchange; JSON Schema and Avro validation.',
    tags: ['backend', 'apis', 'data-formats'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'JSON Schema', url: 'https://json-schema.org/learn/', type: 'documentation', platform: 'json-schema.org' },
    ],
  },

  // ══════════ K ══════════
  {
    name: 'Kubernetes',
    category: 'technical-skill',
    description: 'Container orchestration: Pods, Deployments, Services, Ingress, HPA, Helm charts, and GitOps with Argo CD.',
    tags: ['devops', 'containers', 'infrastructure', 'cloud'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/home/', type: 'documentation', platform: 'Kubernetes' },
      { title: 'CKA Exam Prep (Udemy)', url: 'https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/', type: 'course', platform: 'Udemy' },
    ],
  },
  {
    name: 'Kotlin',
    category: 'technical-skill',
    description: 'Modern JVM language for Android; null safety, coroutines, sealed classes, and Java interoperability.',
    tags: ['android', 'mobile', 'jvm', 'backend'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Kotlin Documentation', url: 'https://kotlinlang.org/docs/', type: 'documentation', platform: 'JetBrains' },
    ],
  },
  {
    name: 'Apache Kafka',
    category: 'technical-skill',
    description: 'Distributed event-streaming for high-throughput, fault-tolerant real-time data pipelines and stream processing.',
    tags: ['streaming', 'data-engineering', 'microservices', 'distributed-systems'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Kafka Documentation', url: 'https://kafka.apache.org/documentation/', type: 'documentation', platform: 'Apache' },
    ],
  },

  // ══════════ L ══════════
  {
    name: 'Linux & Unix Systems',
    category: 'technical-skill',
    description: 'Filesystem hierarchy, process management, systemd, cron, kernel modules, performance tuning, and hardening.',
    tags: ['os', 'systems', 'devops', 'security'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Linux Command Line & Shell Scripting Bible', url: 'https://www.amazon.com/Linux-Command-Shell-Scripting-Bible/dp/1119700914', type: 'book', platform: 'Wiley' },
    ],
  },
  {
    name: 'Large Language Models (LLMs)',
    category: 'knowledge',
    description: 'Transformers (GPT, LLaMA, Gemini); fine-tuning, RLHF, prompt engineering, RAG, and AI application integration.',
    tags: ['ai', 'nlp', 'generative-ai', 'research'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'LLM University by Cohere', url: 'https://llm.university', type: 'course', platform: 'Cohere' },
      { title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', type: 'documentation', platform: 'arXiv' },
    ],
  },
  {
    name: 'Linear Algebra',
    category: 'knowledge',
    description: 'Vectors, matrices, eigendecomposition, SVD, and numerical methods; foundational for ML, graphics, and signal processing.',
    tags: ['mathematics', 'machine-learning', 'data-science'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Essence of Linear Algebra (3B1B)', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', type: 'tutorial', platform: 'YouTube' },
      { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', platform: 'MIT OCW' },
    ],
  },

  // ══════════ M ══════════
  {
    name: 'Machine Learning',
    category: 'technical-skill',
    description: 'Supervised, unsupervised, and RL; regression, classification, clustering, feature engineering, and model evaluation.',
    tags: ['ai', 'data-science', 'python', 'statistics'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Machine Learning Specialization', url: 'https://www.coursera.org/specializations/machine-learning-introduction', type: 'course', platform: 'Coursera' },
      { title: 'Hands-On Machine Learning (Geron)', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/', type: 'book', platform: "O'Reilly" },
    ],
  },
  {
    name: 'MongoDB',
    category: 'technical-skill',
    description: 'Document-oriented NoSQL: schema design, aggregation pipeline, change streams, Atlas Search, and Mongoose ODM.',
    tags: ['database', 'nosql', 'backend', 'javascript'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'MongoDB University', url: 'https://university.mongodb.com', type: 'course', platform: 'MongoDB' },
      { title: 'Mongoose Docs', url: 'https://mongoosejs.com/docs/', type: 'documentation', platform: 'Mongoose' },
    ],
  },
  {
    name: 'Microservices Architecture',
    category: 'knowledge',
    description: 'Decomposing monoliths: service mesh, API gateway, circuit breaker, saga pattern, and distributed tracing.',
    tags: ['architecture', 'backend', 'distributed-systems', 'devops'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Microservices.io Patterns', url: 'https://microservices.io/patterns/', type: 'documentation', platform: 'microservices.io' },
    ],
  },
  {
    name: 'MATLAB',
    category: 'technical-skill',
    description: 'Matrix-oriented numerical computing for signal processing, control systems, and simulation modelling.',
    tags: ['mathematics', 'signal-processing', 'engineering', 'simulation'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'MATLAB Onramp', url: 'https://www.mathworks.com/learn/tutorials/matlab-onramp.html', type: 'course', platform: 'MathWorks' },
    ],
  },
  {
    name: 'MySQL & PostgreSQL',
    category: 'technical-skill',
    description: 'Relational RDBMS: advanced SQL, query plans, EXPLAIN, partitioning, replication, and JSONB/window-function features.',
    tags: ['database', 'sql', 'backend'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/', type: 'documentation', platform: 'PostgreSQL' },
      { title: 'SQL for Data Science', url: 'https://www.coursera.org/learn/sql-for-data-science', type: 'course', platform: 'Coursera' },
    ],
  },

  // ══════════ N ══════════
  {
    name: 'Node.js',
    category: 'technical-skill',
    description: 'Server-side JS runtime on V8: event loop, streams, cluster module, performance profiling, and npm ecosystem.',
    tags: ['backend', 'javascript', 'runtime', 'rest'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/', type: 'documentation', platform: 'Node.js' },
    ],
  },
  {
    name: 'Networking Protocols',
    category: 'knowledge',
    description: 'TCP, UDP, HTTP/1.1-3, WebSockets, DNS, DHCP, BGP, OSPF; protocol analysis with Wireshark.',
    tags: ['networking', 'infrastructure', 'security'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Wireshark Docs', url: 'https://www.wireshark.org/docs/', type: 'documentation', platform: 'Wireshark' },
    ],
  },
  {
    name: 'Natural Language Processing',
    category: 'technical-skill',
    description: 'Tokenisation, POS tagging, NER, sentiment analysis, text classification, embeddings, and spaCy/HuggingFace pipelines.',
    tags: ['ai', 'ml', 'python', 'linguistics'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'NLP Specialization', url: 'https://www.coursera.org/specializations/natural-language-processing', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'NumPy & Pandas',
    category: 'technical-skill',
    description: 'Scientific computing in Python: vectorised operations, broadcasting, DataFrames, time series, and data wrangling.',
    tags: ['python', 'data-science', 'machine-learning'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'NumPy Documentation', url: 'https://numpy.org/doc/stable/', type: 'documentation', platform: 'NumPy' },
      { title: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs/', type: 'documentation', platform: 'Pandas' },
    ],
  },

  // ══════════ O ══════════
  {
    name: 'Object-Oriented Programming',
    category: 'knowledge',
    description: 'Encapsulation, inheritance, polymorphism, abstraction, SOLID principles, and design patterns (GoF).',
    tags: ['paradigm', 'java', 'c++', 'python', 'architecture'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Head First Design Patterns', url: 'https://www.oreilly.com/library/view/head-first-design/0596007124/', type: 'book', platform: "O'Reilly" },
    ],
  },
  {
    name: 'OpenCV',
    category: 'technical-skill',
    description: 'Computer vision library for image processing, feature detection, object tracking, and real-time video analysis.',
    tags: ['computer-vision', 'python', 'ml', 'image-processing'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'OpenCV Python Tutorials', url: 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html', type: 'documentation', platform: 'OpenCV' },
    ],
  },
  {
    name: 'Operating Systems',
    category: 'knowledge',
    description: 'Process scheduling, memory management, virtual memory, filesystems, IPC, and OS security mechanisms.',
    tags: ['systems', 'cs-fundamentals', 'linux', 'low-level'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Operating Systems: Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', type: 'book', platform: 'OSTEP' },
    ],
  },

  // ══════════ P ══════════
  {
    name: 'Python',
    category: 'technical-skill',
    description: 'High-level dynamically typed language dominant in data science, ML, scripting, web (Django/FastAPI), and automation.',
    tags: ['scripting', 'data-science', 'backend', 'ml'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Python.org Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'documentation', platform: 'Python.org' },
      { title: 'Python for Everybody', url: 'https://www.py4e.com', type: 'course', platform: 'py4e.com' },
    ],
  },
  {
    name: 'PostgreSQL',
    category: 'technical-skill',
    description: 'Advanced RDBMS: full-text search, JSONB, CTEs, window functions, PostGIS, and logical replication.',
    tags: ['database', 'sql', 'backend'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'PostgreSQL Tutorial', url: 'https://www.postgresqltutorial.com', type: 'tutorial', platform: 'postgresqltutorial.com' },
    ],
  },
  {
    name: 'Penetration Testing',
    category: 'technical-skill',
    description: 'Ethical hacking: reconnaissance, exploitation, post-exploitation, and reporting with Metasploit, Burp Suite, and Kali.',
    tags: ['cybersecurity', 'security', 'networking', 'linux'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'TryHackMe', url: 'https://tryhackme.com', type: 'course', platform: 'TryHackMe' },
      { title: 'Hack The Box Academy', url: 'https://academy.hackthebox.com', type: 'course', platform: 'Hack The Box' },
    ],
  },
  {
    name: 'PyTorch',
    category: 'technical-skill',
    description: 'Dynamic ML framework: tensors, autograd, custom datasets, training loops, and TorchServe production deployment.',
    tags: ['deep-learning', 'ai', 'python', 'ml'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'PyTorch Documentation', url: 'https://pytorch.org/docs/stable/', type: 'documentation', platform: 'PyTorch' },
      { title: 'Deep Learning with PyTorch: Zero to GANs', url: 'https://jovian.com/learn/deep-learning-with-pytorch-zero-to-gans', type: 'course', platform: 'Jovian' },
    ],
  },
  {
    name: 'Prompt Engineering',
    category: 'technical-skill',
    description: 'Designing LLM prompts: zero-shot, few-shot, chain-of-thought, RAG, and system instruction techniques.',
    tags: ['ai', 'llm', 'generative-ai', 'nlp'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai', type: 'documentation', platform: 'DAIR.AI' },
    ],
  },

  // ══════════ Q ══════════
  {
    name: 'Quality Assurance & Testing',
    category: 'technical-skill',
    description: 'Manual and automated testing: unit, integration, E2E, performance, and accessibility with Jest, Playwright, and k6.',
    tags: ['testing', 'qa', 'automation', 'reliability'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Testing JavaScript (Kent C. Dodds)', url: 'https://testingjavascript.com', type: 'course', platform: 'testingjavascript.com' },
    ],
  },
  {
    name: 'Queue Theory & Distributed Messaging',
    category: 'knowledge',
    description: 'Message queues (RabbitMQ, SQS, ActiveMQ), pub-sub patterns, dead-letter queues, and back-pressure.',
    tags: ['distributed-systems', 'backend', 'architecture'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'RabbitMQ Tutorials', url: 'https://www.rabbitmq.com/tutorials', type: 'tutorial', platform: 'RabbitMQ' },
    ],
  },

  // ══════════ R ══════════
  {
    name: 'React',
    category: 'technical-skill',
    description: 'Component-based UI library: hooks, React Query, code-splitting, concurrent rendering, and React Server Components.',
    tags: ['frontend', 'javascript', 'spa', 'ui'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'React Official Docs', url: 'https://react.dev', type: 'documentation', platform: 'React' },
      { title: 'Epic React by Kent C. Dodds', url: 'https://epicreact.dev', type: 'course', platform: 'epicreact.dev' },
    ],
  },
  {
    name: 'REST API Development',
    category: 'technical-skill',
    description: 'HTTP semantics, status codes, HATEOAS, OAuth2/JWT authentication, versioning, and caching strategies.',
    tags: ['backend', 'api', 'http', 'architecture'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'RESTful Web Services Cookbook', url: 'https://www.oreilly.com/library/view/restful-web-services/9780596809140/', type: 'book', platform: "O'Reilly" },
    ],
  },
  {
    name: 'Redis',
    category: 'technical-skill',
    description: 'In-memory key-value store: caching patterns, pub/sub, Lua scripting, Redis Streams, and cluster topology.',
    tags: ['caching', 'backend', 'database', 'performance'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Redis Documentation', url: 'https://redis.io/docs/', type: 'documentation', platform: 'Redis' },
    ],
  },
  {
    name: 'R (Statistical Computing)',
    category: 'technical-skill',
    description: 'Statistical analysis with ggplot2, tidyverse, R Markdown, and statistical modelling for data science and research.',
    tags: ['statistics', 'data-science', 'visualisation'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'R for Data Science', url: 'https://r4ds.hadley.nz', type: 'book', platform: 'r4ds.hadley.nz' },
    ],
  },
  {
    name: 'Real-time Systems',
    category: 'knowledge',
    description: 'Hard vs soft real-time constraints; FreeRTOS/Zephyr scheduling, interrupt latency, and safety-critical execution.',
    tags: ['embedded', 'rtos', 'aerospace', 'hardware'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'FreeRTOS Documentation', url: 'https://www.freertos.org/Documentation/01-FreeRTOS-quick-start/01-Beginners-guide/01-RTOS-fundamentals', type: 'documentation', platform: 'FreeRTOS' },
    ],
  },

  // ══════════ S ══════════
  {
    name: 'SQL',
    category: 'technical-skill',
    description: 'Structured Query Language: CTEs, window functions, query planning, joins, and performance optimisation.',
    tags: ['database', 'analytics', 'backend', 'data-science'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'SQLZoo', url: 'https://sqlzoo.net', type: 'tutorial', platform: 'SQLZoo' },
      { title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'tutorial', platform: 'Mode Analytics' },
    ],
  },
  {
    name: 'System Design',
    category: 'knowledge',
    description: 'Large-scale distributed systems: load balancing, sharding, CAP theorem, consistency models, and failure modes.',
    tags: ['architecture', 'distributed-systems', 'backend', 'interviews'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'tutorial', platform: 'GitHub' },
      { title: 'Designing Data-Intensive Applications', url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/', type: 'book', platform: "O'Reilly" },
    ],
  },
  {
    name: 'Signal Processing',
    category: 'knowledge',
    description: 'Fourier transforms, FIR/IIR filtering, sampling theorem, and DSP applications in audio, radar, and biomedical.',
    tags: ['mathematics', 'engineering', 'matlab', 'aerospace'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'DSP First (McClellan)', url: 'https://www.pearson.com/en-us/subject-catalog/p/dsp-first/P200000003480', type: 'book', platform: 'Pearson' },
    ],
  },
  {
    name: 'Apache Spark',
    category: 'technical-skill',
    description: 'Unified analytics engine: RDDs, DataFrames, Spark SQL, Structured Streaming, and MLlib for big-data pipelines.',
    tags: ['big-data', 'data-engineering', 'python', 'scala'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Spark Documentation', url: 'https://spark.apache.org/docs/latest/', type: 'documentation', platform: 'Apache Spark' },
    ],
  },
  {
    name: 'Spring Boot',
    category: 'technical-skill',
    description: 'Java enterprise microservices framework: auto-configuration, Spring Security, JPA, and Actuator health endpoints.',
    tags: ['java', 'backend', 'enterprise', 'microservices'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Spring Boot Documentation', url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/', type: 'documentation', platform: 'Spring' },
    ],
  },
  {
    name: 'Statistics & Probability',
    category: 'knowledge',
    description: 'Descriptive/inferential statistics, probability distributions, hypothesis testing, Bayesian inference, and A/B testing.',
    tags: ['mathematics', 'data-science', 'ml', 'research'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Statistics with Python Specialization', url: 'https://www.coursera.org/specializations/statistics-with-python', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Software Architecture',
    category: 'knowledge',
    description: 'Architectural patterns: MVC, hexagonal, clean architecture, CQRS, saga; trade-off analysis and ADR documentation.',
    tags: ['architecture', 'design-patterns', 'backend', 'scalability'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Clean Architecture (Martin)', url: 'https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/', type: 'book', platform: "O'Reilly" },
    ],
  },

  // ══════════ T ══════════
  {
    name: 'TypeScript',
    category: 'technical-skill',
    description: 'Statically typed JS superset: generics, utility types, decorators, strict mode, and TypeScript-first API design.',
    tags: ['frontend', 'backend', 'javascript', 'type-safety'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/', type: 'documentation', platform: 'TypeScript' },
      { title: 'Total TypeScript', url: 'https://www.totaltypescript.com', type: 'course', platform: 'Total TypeScript' },
    ],
  },
  {
    name: 'TensorFlow & Keras',
    category: 'technical-skill',
    description: "Google's end-to-end ML platform: model building, SavedModel, TFLite, and TF Serving for production.",
    tags: ['deep-learning', 'ai', 'python', 'ml'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/api_docs', type: 'documentation', platform: 'TensorFlow' },
    ],
  },
  {
    name: 'Terraform',
    category: 'technical-skill',
    description: 'HashiCorp IaC: declarative multi-cloud resource provisioning, state management, modules, and workspaces.',
    tags: ['devops', 'cloud', 'infrastructure', 'automation'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Terraform Get Started', url: 'https://developer.hashicorp.com/terraform/tutorials', type: 'tutorial', platform: 'HashiCorp' },
    ],
  },
  {
    name: 'Testing (Unit, Integration, E2E)',
    category: 'technical-skill',
    description: 'Testing pyramid: Jest/Vitest, React Testing Library, Playwright, Cypress, TDD, and BDD with Cucumber.',
    tags: ['testing', 'qa', 'frontend', 'backend'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Jest Documentation', url: 'https://jestjs.io/docs/getting-started', type: 'documentation', platform: 'Jest' },
      { title: 'Playwright Docs', url: 'https://playwright.dev/docs/intro', type: 'documentation', platform: 'Playwright' },
    ],
  },
  {
    name: 'Trading Systems & Financial Technology',
    category: 'knowledge',
    description: 'Order management, FIX protocol, market microstructure, algorithmic trading, risk systems, and low-latency architecture.',
    tags: ['fintech', 'java', 'c++', 'finance'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Algorithmic Trading — QuantConnect', url: 'https://www.quantconnect.com/learning', type: 'course', platform: 'QuantConnect' },
    ],
  },

  // ══════════ U ══════════
  {
    name: 'UI/UX Design',
    category: 'technical-skill',
    description: 'User research, wireframing, Figma prototyping, design systems, usability testing, and WCAG 2.2 accessibility.',
    tags: ['design', 'frontend', 'accessibility', 'product'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Google UX Design Certificate', url: 'https://www.coursera.org/professional-certificates/google-ux-design', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Unit Testing',
    category: 'technical-skill',
    description: 'Isolated, deterministic tests for individual functions/components: mocking, spies, snapshot testing, and coverage gates.',
    tags: ['testing', 'qa', 'javascript', 'python'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Unit Testing with Jest', url: 'https://jestjs.io/docs/getting-started', type: 'documentation', platform: 'Jest' },
    ],
  },
  {
    name: 'Unix Philosophy & CLI Tools',
    category: 'knowledge',
    description: 'Command composition, piping, sed/awk/grep, tmux, Vim/Neovim, and productive terminal workflows.',
    tags: ['linux', 'devops', 'tooling', 'productivity'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'The Art of the Command Line', url: 'https://github.com/jlevy/the-art-of-command-line', type: 'tutorial', platform: 'GitHub' },
    ],
  },

  // ══════════ V ══════════
  {
    name: 'Vue.js',
    category: 'technical-skill',
    description: 'Progressive JS framework: Composition API (Vue 3), Pinia state management, Nuxt.js SSR, and Vite build tooling.',
    tags: ['frontend', 'javascript', 'spa', 'ui'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Vue.js Official Docs', url: 'https://vuejs.org/guide/introduction.html', type: 'documentation', platform: 'Vue.js' },
    ],
  },
  {
    name: 'Virtualisation & Hypervisors',
    category: 'knowledge',
    description: 'Type-1/Type-2 hypervisors, VMware/VirtualBox/KVM, containers vs VMs, and network virtualisation (VXLAN).',
    tags: ['infrastructure', 'cloud', 'devops', 'systems'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Virtualisation Concepts', url: 'https://www.vmware.com/topics/glossary/content/virtualization.html', type: 'documentation', platform: 'VMware' },
    ],
  },
  {
    name: 'Vite & Build Tools',
    category: 'technical-skill',
    description: 'Modern front-end tooling: Vite, Webpack, esbuild, Rollup — bundle optimisation, code splitting, and tree shaking.',
    tags: ['frontend', 'tooling', 'javascript', 'performance'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Vite Documentation', url: 'https://vitejs.dev/guide/', type: 'documentation', platform: 'Vite' },
    ],
  },

  // ══════════ W ══════════
  {
    name: 'WebSockets & Real-time Comms',
    category: 'technical-skill',
    description: 'Persistent bidirectional connections: Socket.io, WebRTC, SSE, and real-time collaborative application patterns.',
    tags: ['backend', 'frontend', 'networking', 'real-time'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Socket.io Documentation', url: 'https://socket.io/docs/v4/', type: 'documentation', platform: 'Socket.io' },
    ],
  },
  {
    name: 'Web Security & OWASP',
    category: 'knowledge',
    description: 'OWASP Top 10, XSS, CSRF, SQLi, auth vulnerabilities, CSP headers, and dependency auditing.',
    tags: ['security', 'backend', 'frontend', 'cybersecurity'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'OWASP Top Ten', url: 'https://owasp.org/www-project-top-ten/', type: 'documentation', platform: 'OWASP' },
      { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', type: 'course', platform: 'PortSwigger' },
    ],
  },
  {
    name: 'WebAssembly',
    category: 'technical-skill',
    description: 'Binary instruction format for near-native browser performance; compiling C/C++/Rust to Wasm and WASI for server-side use.',
    tags: ['frontend', 'performance', 'systems', 'browser'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'WebAssembly Documentation', url: 'https://webassembly.org/docs/high-level-goals/', type: 'documentation', platform: 'webassembly.org' },
      { title: 'Rust & WebAssembly', url: 'https://rustwasm.github.io/docs/book/', type: 'book', platform: 'rustwasm.github.io' },
    ],
  },

  // ══════════ X ══════════
  {
    name: 'XML & Data Formats',
    category: 'knowledge',
    description: 'XML, XPath, XSLT, DTD/XSD schema validation, and comparison with JSON/Protocol Buffers for structured data exchange.',
    tags: ['backend', 'apis', 'data-formats', 'enterprise'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'XML Tutorial — W3Schools', url: 'https://www.w3schools.com/xml/', type: 'tutorial', platform: 'W3Schools' },
      { title: 'Protocol Buffers Documentation', url: 'https://protobuf.dev/overview/', type: 'documentation', platform: 'Google' },
    ],
  },
  {
    name: 'XGBoost & Gradient Boosting',
    category: 'technical-skill',
    description: 'Ensemble learning with gradient boosted trees; XGBoost, LightGBM, CatBoost for tabular ML competitions and production.',
    tags: ['machine-learning', 'data-science', 'python', 'kaggle'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'XGBoost Documentation', url: 'https://xgboost.readthedocs.io/en/stable/', type: 'documentation', platform: 'XGBoost' },
      { title: 'Kaggle ML Courses', url: 'https://www.kaggle.com/learn', type: 'course', platform: 'Kaggle' },
    ],
  },

  // ══════════ Y ══════════
  {
    name: 'YAML & Configuration Management',
    category: 'technical-skill',
    description: 'YAML syntax, Ansible playbooks, Helm chart values, Kubernetes manifests, and GitOps config-as-code practices.',
    tags: ['devops', 'automation', 'infrastructure', 'kubernetes'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'YAML Tutorial', url: 'https://yaml.org/spec/1.2.2/', type: 'documentation', platform: 'yaml.org' },
      { title: 'Ansible Documentation', url: 'https://docs.ansible.com', type: 'documentation', platform: 'Red Hat' },
    ],
  },
  {
    name: 'Yocto & Embedded Linux',
    category: 'technical-skill',
    description: 'Building custom Linux distributions for embedded targets: BitBake, layers, recipes, SDK generation, and BSP porting.',
    tags: ['embedded', 'linux', 'hardware', 'iot'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'Yocto Project Documentation', url: 'https://docs.yoctoproject.org', type: 'documentation', platform: 'Yocto Project' },
    ],
  },

  // ══════════ Z ══════════
  {
    name: 'Zero Trust Security',
    category: 'knowledge',
    description: 'Identity-perimeter security model: ZTNA, BeyondCorp, mTLS, continuous verification, least-privilege access, and microsegmentation.',
    tags: ['security', 'networking', 'cybersecurity', 'compliance'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'NIST Zero Trust Architecture (SP 800-207)', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf', type: 'documentation', platform: 'NIST' },
      { title: 'BeyondCorp: A New Approach to Enterprise Security', url: 'https://cloud.google.com/beyondcorp', type: 'documentation', platform: 'Google' },
    ],
  },
  {
    name: 'Apache Zookeeper & Distributed Coordination',
    category: 'technical-skill',
    description: 'Distributed configuration, naming, synchronisation, and leader election for large-scale cluster coordination.',
    tags: ['distributed-systems', 'backend', 'data-engineering', 'kafka'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'ZooKeeper Documentation', url: 'https://zookeeper.apache.org/doc/current/', type: 'documentation', platform: 'Apache' },
    ],
  },

  // ══════════ SOFT SKILLS ══════════
  // Non-technical competencies surfaced in gap analysis alongside technical skills.
  {
    name: 'Communication',
    category: 'soft-skill',
    description: 'Clearly conveying ideas in writing and speech: documentation, code reviews, stakeholder updates, and presentations.',
    tags: ['collaboration', 'writing', 'presentation', 'interpersonal'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Technical Writing — Google Developers', url: 'https://developers.google.com/tech-writing', type: 'course', platform: 'Google' },
    ],
  },
  {
    name: 'Teamwork & Collaboration',
    category: 'soft-skill',
    description: 'Working effectively within cross-functional teams: pairing, code reviews, shared ownership, and constructive feedback.',
    tags: ['collaboration', 'agile', 'interpersonal'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Working in Teams', url: 'https://www.coursera.org/learn/teamwork-skills-effective-communication', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Leadership',
    category: 'soft-skill',
    description: 'Guiding teams and initiatives: setting direction, mentoring, delegating, and driving technical decisions to consensus.',
    tags: ['management', 'mentorship', 'ownership'],
    difficultyLevel: 'advanced',
    resources: [
      { title: 'The Manager\'s Path', url: 'https://www.oreilly.com/library/view/the-managers-path/9781491973882/', type: 'book', platform: "O'Reilly" },
    ],
  },
  {
    name: 'Problem Solving',
    category: 'soft-skill',
    description: 'Breaking down ambiguous problems, reasoning about trade-offs, and arriving at pragmatic, testable solutions.',
    tags: ['analysis', 'debugging', 'critical-thinking'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'How to Solve It (Polya)', url: 'https://press.princeton.edu/books/paperback/9780691164076/how-to-solve-it', type: 'book', platform: 'Princeton' },
    ],
  },
  {
    name: 'Adaptability',
    category: 'soft-skill',
    description: 'Staying effective amid changing requirements, new tools, and shifting priorities; learning quickly on the job.',
    tags: ['growth-mindset', 'learning', 'resilience'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Learning How to Learn', url: 'https://www.coursera.org/learn/learning-how-to-learn', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Time Management',
    category: 'soft-skill',
    description: 'Prioritising work, estimating effort, meeting deadlines, and balancing depth against delivery.',
    tags: ['productivity', 'planning', 'prioritisation'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Getting Things Done', url: 'https://gettingthingsdone.com/', type: 'book', platform: 'GTD' },
    ],
  },
  {
    name: 'Critical Thinking',
    category: 'soft-skill',
    description: 'Evaluating evidence, questioning assumptions, and making reasoned decisions under uncertainty.',
    tags: ['analysis', 'reasoning', 'decision-making'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Critical Thinking', url: 'https://www.edx.org/learn/critical-thinking-skills', type: 'course', platform: 'edX' },
    ],
  },
  {
    name: 'Emotional Intelligence',
    category: 'soft-skill',
    description: 'Self-awareness and empathy: reading team dynamics, giving and receiving feedback, and managing interpersonal friction.',
    tags: ['interpersonal', 'empathy', 'self-awareness'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Emotional Intelligence at Work', url: 'https://www.coursera.org/learn/emotional-intelligence-in-leadership', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Conflict Resolution',
    category: 'soft-skill',
    description: 'Navigating disagreements constructively: facilitating discussions, finding common ground, and de-escalating tension.',
    tags: ['interpersonal', 'negotiation', 'teamwork'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Crucial Conversations', url: 'https://cruciallearning.com/crucial-conversations-book/', type: 'book', platform: 'Crucial Learning' },
    ],
  },
  {
    name: 'Creativity',
    category: 'soft-skill',
    description: 'Generating novel ideas and approaches: design thinking, prototyping, and connecting concepts across domains.',
    tags: ['design-thinking', 'innovation', 'ideation'],
    difficultyLevel: 'intermediate',
    resources: [
      { title: 'Creative Thinking', url: 'https://www.coursera.org/learn/creative-thinking-techniques-and-tools-for-success', type: 'course', platform: 'Coursera' },
    ],
  },
  {
    name: 'Work Ethic',
    category: 'soft-skill',
    description: 'Reliability, accountability, and follow-through: owning outcomes, meeting commitments, and maintaining quality under pressure.',
    tags: ['reliability', 'ownership', 'professionalism'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'Deep Work', url: 'https://www.calnewport.com/books/deep-work/', type: 'book', platform: 'Cal Newport' },
    ],
  },
  {
    name: 'Attention to Detail',
    category: 'soft-skill',
    description: 'Precision in execution: catching edge cases, writing thorough tests, and reviewing work for correctness and consistency.',
    tags: ['quality', 'testing', 'review'],
    difficultyLevel: 'beginner',
    resources: [
      { title: 'The Pragmatic Programmer', url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/', type: 'book', platform: 'Pragmatic Bookshelf' },
    ],
  },
];

module.exports = skillsAZ;
