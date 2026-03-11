export interface AboutContent {
  badge: string;
  headlineMain: string;
  headlineHighlight: string;
  name: string;
  bioParagraphs: string[];
  profileImageId: string;
}

export interface StatItem {
  id: number;
  label: string;
  value: string;
}

export type ExpertiseIcon = "code" | "layout" | "cpu" | "box";

export interface ExpertiseItem {
  id: number;
  icon: ExpertiseIcon;
  title: string;
  description: string;
}

export interface AchievementItem {
  id: number;
  title: string;
  issuer: string;
  period: string;
  category: string;
  description: string;
  tags: string[];
  proofUrl?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  date: string;
  imageId: string;
  tags: string[];
  description: string;
  fullDescription: string;
  features: string[];
  links?: ProjectLinks;
}

export type ResumeAccent = "primary" | "secondary";
export type ResumeIcon = "code" | "graduation" | "pen";
export type ResumeSide = "left" | "right";

export interface ResumeItem {
  id: number;
  period: string;
  title: string;
  organization: string;
  description?: string;
  highlights: string[];
  chips: string[];
  accent: ResumeAccent;
  icon: ResumeIcon;
  side: ResumeSide;
}

export const fallbackAboutContent: AboutContent = {
  badge: "About Me",
  headlineMain: "Beyond the",
  headlineHighlight: "Pixels",
  name: "Rizky Pratama",
  bioParagraphs: [
    "Hello! I'm Rizky Pratama, a final-year Computer Science student based in Jakarta. I bridge the gap between functional code and visual storytelling.",
    "My journey started with tweaking CSS on my personal blog and evolved into building scalable web applications. I believe that good design is not just about how it looks, but how it works for the user.",
    "When I am not coding, you can find me exploring Jakarta's coffee scene, capturing street photography, or contributing to open-source UI libraries.",
  ],
  profileImageId: "profile-photo",
};

export const fallbackStats: StatItem[] = [
  { id: 1, label: "Years Coding", value: "3+" },
  { id: 2, label: "Projects Done", value: "15+" },
  { id: 3, label: "Current GPA", value: "4.0" },
];

export const fallbackExpertise: ExpertiseItem[] = [
  {
    id: 1,
    icon: "code",
    title: "Clean Architecture",
    description: "Focusing on maintainable, scalable and modular codebase using industry standards.",
  },
  {
    id: 2,
    icon: "layout",
    title: "UX/UI Engineering",
    description: "Designing high-end interfaces that prioritize accessibility and interactive joy.",
  },
  {
    id: 3,
    icon: "cpu",
    title: "Fullstack Systems",
    description: "Building robust backend infrastructures paired with lightning-fast frontend solutions.",
  },
];

export const fallbackAchievements: AchievementItem[] = [
  {
    id: 1,
    title: "Pendanaan Program Kreativitas Mahasiswa (PKM)",
    issuer: "Kemendikbudristek",
    period: "2023",
    category: "Funding",
    description: "Berhasil lolos pendanaan PKM dengan proyek inovasi digital di bidang kesehatan.",
    tags: ["PKM", "Innovation", "Research"],
  },
  {
    id: 2,
    title: "Silver Medal Best Presentation KTI Kesehatan",
    issuer: "Neira Competition",
    period: "2023",
    category: "Competition",
    description: "Meraih Silver Medal untuk presentasi karya tulis ilmiah kategori kesehatan.",
    tags: ["Scientific Writing", "Presentation", "Health"],
  },
  {
    id: 3,
    title: "Semifinalis Injection 2024",
    issuer: "Injection 2024",
    period: "2024",
    category: "Competition",
    description: "Masuk babak semifinal pada kompetisi inovasi dan pengembangan solusi teknologi.",
    tags: ["Innovation", "Startup", "Technology"],
  },
  {
    id: 4,
    title: "Program Pembinaan Mahasiswa Wirausaha (P2MW)",
    issuer: "Kemdiktisaintek",
    period: "2025",
    category: "Entrepreneurship",
    description: "Lolos program pembinaan wirausaha mahasiswa melalui pengembangan produk MentorMe.",
    tags: ["P2MW", "EdTech", "Entrepreneurship"],
  },
];

export const fallbackProjects: ProjectItem[] = [
  {
    id: 1,
    title: "AI Assistant Interface",
    category: "Web Development",
    date: "2024-03-01",
    imageId: "project1",
    tags: ["React", "Next.js", "LLM"],
    description: "A cutting-edge interface for interacting with large language models.",
    fullDescription:
      "Developed a responsive and intuitive dashboard that allows users to prompt various LLMs. It features real-time streaming of responses, markdown rendering, and local chat history persistence using IndexedDB.",
    features: [
      "Real-time streaming",
      "Markdown & Code syntax highlighting",
      "Customizable system prompts",
      "Local storage persistence",
    ],
    links: { github: "#", demo: "#" },
  },
  {
    id: 2,
    title: "Health Tracker Pro",
    category: "Mobile Apps",
    date: "2023-11-15",
    imageId: "project2",
    tags: ["Flutter", "Firebase"],
    description: "Comprehensive health monitoring mobile application.",
    fullDescription:
      "A cross-platform mobile app built to help users track their daily health metrics including water intake, calories, and sleep cycles. Integrated with Firebase for real-time sync and push notifications for reminders.",
    features: ["Biometric authentication", "Real-time data sync", "Interactive charts", "Offline support"],
    links: { github: "#" },
  },
  {
    id: 3,
    title: "Neural Stock Predictor",
    category: "Data Science",
    date: "2024-01-20",
    imageId: "project3",
    tags: ["Python", "TensorFlow"],
    description: "Predictive modeling for stock market trends.",
    fullDescription:
      "Leveraged LSTM neural networks to analyze historical stock data and predict future price movements. The system achieves a 78% accuracy rate on mid-cap stocks within a 5-day prediction window.",
    features: ["LSTM architecture", "Automated data pipeline", "Backtesting engine", "Portfolio risk analysis"],
    links: { github: "#" },
  },
  {
    id: 4,
    title: "Cloud Matrix OS",
    category: "UI Design",
    date: "2023-09-10",
    imageId: "project4",
    tags: ["Figma", "SVG"],
    description: "A conceptual operating system for cloud computing.",
    fullDescription:
      "Designed a comprehensive design system for a browser-based OS. Focused on micro-interactions, accessibility, and a futuristic aesthetic inspired by brutalist architecture.",
    features: ["Unified design system", "Custom icon pack", "Dark/Light mode optimized", "Atomic components"],
    links: { demo: "#" },
  },
  {
    id: 5,
    title: "Quantum E-Commerce",
    category: "Web Development",
    date: "2024-02-05",
    imageId: "project5",
    tags: ["Three.js", "Tailwind"],
    description: "Immersive 3D shopping experience.",
    fullDescription:
      "Created a unique e-commerce platform where users can interact with products in 3D before purchasing. Built using Three.js for rendering and React Three Fiber for component management.",
    features: ["3D Product Viewer", "Smooth scroll animations", "Optimized assets", "Dynamic lighting"],
    links: { demo: "#" },
  },
  {
    id: 6,
    title: "Cortex Security Term",
    category: "Data Science",
    date: "2023-12-01",
    imageId: "project6",
    tags: ["C++", "Rust"],
    description: "High-performance security monitoring terminal.",
    fullDescription:
      "A low-level terminal interface for monitoring network traffic and detecting anomalies. Built for speed and reliability in critical infrastructure environments.",
    features: ["Packet sniffing", "Anomaly detection engine", "Minimal memory footprint", "Native CLI interface"],
    links: { github: "#" },
  },
];

export const fallbackResumeItems: ResumeItem[] = [
  {
    id: 1,
    period: "2023 - Present",
    title: "Frontend Engineer Intern",
    organization: "Tokopedia",
    highlights: [
      "Developed key components for the merchant dashboard using React & TypeScript.",
      "Collaborated with UX team to improve accessibility scores by 25%.",
      "Optimized load times for the main product listing page.",
    ],
    chips: [],
    accent: "primary",
    icon: "code",
    side: "left",
  },
  {
    id: 2,
    period: "2020 - 2024",
    title: "Computer Science",
    organization: "University of Indonesia",
    description: "Specializing in Software Engineering and Human-Computer Interaction.",
    highlights: ["GPA: 3.89/4.00"],
    chips: ["Head of UI/UX Club", "Hackathon Winner '22"],
    accent: "secondary",
    icon: "graduation",
    side: "right",
  },
  {
    id: 3,
    period: "2022 - 2023",
    title: "UI/UX Designer Freelance",
    organization: "Upwork & Self-Employed",
    highlights: [
      "Designed mobile app interfaces for 5+ international startup clients.",
      "Created comprehensive design systems in Figma.",
      "Delivered high-fidelity prototypes for stakeholder presentations.",
    ],
    chips: [],
    accent: "primary",
    icon: "pen",
    side: "left",
  },
];
