import { Project } from '../types';

export const KEN_BIO = `Hello People, my name is Ken Cherian! I am a Computer Engineering student at St. Vincent Pallotti College of Engineering & Technology (SVPCET) in Nagpur, Maharashtra. Driven by a passion for creating impactful, high-performance software, I specialize in full-stack web development, cybersecurity operations, and practical machine learning integrations.

My core technical toolkit includes React, Next.js, TypeScript, Node.js, Python, and cloud services. Through hands-on projects, I have built systems ranging from zero-trust network monitoring tools and automated SIEM threat-detection platforms to dynamic web applications.

Alongside my technical work, I actively contribute to our student community. I serve as a technical team member for the ACM student chapter and as a Coordinator for Aster, the soft-skills club under our department's Zenith Forum. Under Aster club, I have hosted sessions on public speaking, debates, and professional development, helping fellow students bridge the gap between technical expertise and effective communication.

When I am not writing code or analyzing security telemetry, I am an avid reader and history enthusiast. I spend much of my free time reading non-fiction books focused on historical paradigms, societal evolution, and human systems. Studying the past gives me a broader perspective that directly enriches my analytical approach to modern software architecture and problem-solving.`;

export const KEN_CONTACT = {
  name: 'Ken Cherian',
  title: 'Computer Engineering Student & Full-Stack Developer',
  institution: 'St. Vincent Pallotti College of Engineering & Technology (SVPCET)',
  location: 'Nagpur, Maharashtra, India',
  email: 'kencherian16@gmail.com',
  github: 'https://github.com/kencherian',
  linkedin: 'https://www.linkedin.com/in/ken-cherian/',
};

export const RESUME_DATA = {
  education: [
    {
      degree: 'B.Tech in Computer Engineering',
      institution: 'St. Vincent Pallotti College of Engineering & Technology (SVPCET), Nagpur',
      period: '2023 – 2028',
      score: 'Pursuing with honors focus in Distributed Systems & Cyber Defense',
      location: 'Nagpur, Maharashtra',
    },
  ],
  certifications: [
    {
      title: 'VMDR - Qualys Certified Specialist',
      issuer: 'Qualys',
      year: '2026',
      badge: 'Vulnerability Management, Detection & Response',
    },
    {
      title: 'Google Cybersecurity Professional',
      issuer: 'Google',
      year: '2025',
      badge: 'Network Defense, SIEM, Incident Response & Python Automation',
    },
  ],
  leadership: [
    {
      role: 'Technical Team Member',
      organization: 'ACM Student Chapter, SVPCET',
      description: 'Orchestrating technical workshops, competitive programming events, and contributing to internal tools for the engineering student community.',
    },
    {
      role: 'Coordinator',
      organization: 'Aster Club (Zenith Forum)',
      description: 'Led speech sessions, structured debates, and professional development cohorts, helping students bridge the gap between technical expertise and clear communication.',
    },
  ],
  skills: {
    languages: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'C/C++', 'SQL', 'HTML5/CSS3'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'FastAPI'],
    securityAndCloud: ['SIEM & SOAR Pipelines', 'Qualys VMDR', 'SOC Telemetry', 'Zero-Trust Architecture', 'AWS / Cloud Deployments', 'Docker'],
    databasesAndTools: ['PostgreSQL', 'MongoDB', 'Redis', 'Git / GitHub', 'Linux / Bash', 'Wireshark', 'Splunk'],
  },
};

export const PROJECTS: Project[] = [
  // 1. Cybersecurity
  {
    id: 'aegis-siem-soar',
    title: 'Aegis-SIEM-SOAR',
    category: 'Cybersecurity',
    description: 'Centralized security monitoring platform with automated alert orchestration, ingestion pipelines, and triage runbooks.',
    repoUrl: 'https://github.com/kencherian/Aegis-SIEM-SOAR-Automation/tree/master',
    tags: ['Python', 'SIEM', 'SOAR', 'Threat Detection', 'Automation'],
    fileSize: '4,820 KB',
    dateModified: '08/14/1998 04:22 PM',
    highlights: [
      'Automated triage ingestion engine with contextual enrichments',
      'Custom threat correlation rules mapped against MITRE ATT&CK',
      'Orchestration webhook trigger pipeline for rapid incident containment',
    ],
    iconType: 'exe',
  },
  {
    id: 'distributed-soc-telemetry',
    title: 'Distributed-SOC-Telemetry',
    category: 'Cybersecurity',
    description: 'High-throughput network threat telemetry engine designed for decentralized log aggregation and anomaly tracking.',
    repoUrl: 'https://github.com/kencherian/distributed-soc-telemetry-pipeline',
    tags: ['Telemetry', 'Distributed Systems', 'Python', 'Kafka', 'Network Defense'],
    fileSize: '3,115 KB',
    dateModified: '07/28/1998 11:05 AM',
    highlights: [
      'Distributed event streamer ingesting endpoint and perimeter logs',
      'Real-time anomaly scoring algorithms on network packet metadata',
      'Resilient backpressure handling for high-velocity traffic spikes',
    ],
    iconType: 'exe',
  },
  {
    id: 'aetherguard-enterprise',
    title: 'Aetherguard-Enterprise',
    category: 'Cybersecurity',
    description: 'Enterprise-level security infrastructure providing identity perimeter gating and zero-trust policy enforcement.',
    repoUrl: 'https://github.com/kencherian/aetherguard-enterprise',
    tags: ['Zero-Trust', 'Enterprise Security', 'Auth', 'Policy Enforcement'],
    fileSize: '5,402 KB',
    dateModified: '09/01/1998 09:15 AM',
    highlights: [
      'Zero-trust verification barrier across distributed micro-endpoints',
      'Granular role-based token delegation with adaptive threat scoring',
      'Audit log immutability and compliance reporting modules',
    ],
    iconType: 'exe',
  },

  // 2. Full-Stack
  {
    id: 'omnivault',
    title: 'OmniVault',
    category: 'Full-Stack',
    description: 'Secure cloud storage management suite with end-to-end access permissions, file indexing, and preview engines.',
    repoUrl: 'https://github.com/kencherian/OmniVault',
    liveUrl: 'https://omni-vault-gules.vercel.app',
    tags: ['React', 'Next.js', 'TypeScript', 'Cloud Storage', 'Tailwind CSS'],
    fileSize: '2,940 KB',
    dateModified: '08/20/1998 02:40 PM',
    highlights: [
      'Encrypted client-side chunked upload stream with pause/resume',
      'Dynamic folder trees, permission sharing, and multi-format previewers',
      'Responsive cloud workspace design with fast search indexing',
    ],
    iconType: 'code',
  },
  {
    id: 'cineflow',
    title: 'CineFlow',
    category: 'Full-Stack',
    description: 'Interactive movie discovery web application featuring fluid media browsing, genre filtration, and curated collections.',
    repoUrl: 'https://github.com/kencherian/CineFlow',
    liveUrl: 'https://cine-flow-rho.vercel.app',
    tags: ['React', 'TypeScript', 'TMDB API', 'Tailwind CSS', 'Framer Motion'],
    fileSize: '1,850 KB',
    dateModified: '06/18/1998 05:10 PM',
    highlights: [
      'High-performance movie discovery catalog with responsive infinite scroll',
      'Interactive filtering by release window, ratings, and genre tags',
      'Curated personalized watchlist storage with instant visual sync',
    ],
    iconType: 'code',
  },
  {
    id: 'employee-management',
    title: 'Employee-Management',
    category: 'Full-Stack',
    description: 'Comprehensive organizational dashboard for employee records, performance reviews, and department scheduling.',
    repoUrl: 'https://github.com/kencherian/Employee-Management-System',
    liveUrl: 'https://employee-management-system-drab-kappa.vercel.app/',
    tags: ['React', 'Node.js', 'Full-Stack', 'CRUD Dashboard', 'State Management'],
    fileSize: '2,430 KB',
    dateModified: '07/11/1998 10:30 AM',
    highlights: [
      'Role-governed administrative controls for workforce directories',
      'Dynamic salary, department transfer, and attendance ledgering',
      'Instant search and multi-column sorting with optimistic updates',
    ],
    iconType: 'code',
  },
  {
    id: 'tomato',
    title: 'Tomato',
    category: 'Full-Stack',
    description: 'Modern food delivery e-commerce application featuring live menu discovery, cart mechanics, and checkout flows.',
    repoUrl: 'https://github.com/kencherian/Food-Delivery-Website',
    liveUrl: 'https://food-delivery-website-puce-ten.vercel.app/',
    tags: ['React', 'Cart Engine', 'Stripe Integration', 'Tailwind CSS'],
    fileSize: '2,670 KB',
    dateModified: '05/29/1998 01:15 PM',
    highlights: [
      'Real-time reactive cart state with tax, promo, and delivery estimates',
      'Categorized culinary menus with dietary filters and instant search',
      'Simulated multi-stage order tracking pipeline from kitchen to doorstep',
    ],
    iconType: 'code',
  },

  // 3. Machine-Learning
  {
    id: 'gnn-gene-disease-prediction',
    title: 'GNN Gene Disease Prediction',
    category: 'Machine-Learning',
    description: 'Graph Neural Network architecture predicting complex gene-disease associations through biomedical topological graphs.',
    repoUrl: 'https://github.com/kencherian/GNN-Gene-Prediction_K',
    tags: ['PyTorch Geometric', 'Graph Neural Networks', 'Bioinformatics', 'Python'],
    fileSize: '6,120 KB',
    dateModified: '08/30/1998 06:45 PM',
    highlights: [
      'Heterogeneous biomedical knowledge graph modeling gene-phenotype links',
      'Graph Convolutional and Attention layers outperforming standard baselines',
      'Feature embedding visualizations for candidate biomarker discovery',
    ],
    iconType: 'exe',
  },
  {
    id: 'driver-specific-plot-styling',
    title: 'Driver-Specific-Plot-Styling',
    category: 'Machine-Learning',
    description: 'F1 motorsport telemetry data visualization toolkit with driver livery color palettes and lap comparison plots.',
    repoUrl: 'https://github.com/kencherian/Driver-specific-plot-styling',
    tags: ['Python', 'FastF1', 'Matplotlib', 'Data Science', 'Motorsport Analytics'],
    fileSize: '1,540 KB',
    dateModified: '07/04/1998 03:50 PM',
    highlights: [
      'Custom Matplotlib driver liveries matching official team colorways',
      'Telemetry delta overlays for braking points, throttle traces, and apex speeds',
      'Export utilities for high-resolution vector and publication charts',
    ],
    iconType: 'doc',
  },

  // 4. Data-Visualization
  {
    id: 'global-market-terminal',
    title: 'Global-Market-Terminal',
    category: 'Data-Visualization',
    description: 'Bloomberg-inspired financial data visualizer rendering cross-asset market tickers, orderbooks, and macro indicators.',
    repoUrl: 'https://github.com/kencherian/Global-Market-Terminal',
    liveUrl: 'https://global-market-terminal.ai.studio',
    tags: ['TypeScript', 'Financial Charts', 'Data Viz', 'Live Tickers'],
    fileSize: '3,890 KB',
    dateModified: '09/10/1998 12:00 PM',
    highlights: [
      'Multi-pane real-time financial charts with candlestick and volume studies',
      'Macro indicator dashboard tracking FX, indices, and commodities',
      'Retro-futuristic terminal command bar and fast hotkey navigation',
    ],
    iconType: 'exe',
  },
];
