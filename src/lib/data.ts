import type { Stat, Project, SkillGroup, Experience, NavItem } from '@/types'

export const PERSON = {
  name: "Mayank Mishra",
  initials: "MM",
  title: "Senior Software Engineer",
  subtitle: "Frontend Architect · AI Product Builder · Distributed Systems",
  tagline: "I build systems that scale — and ship products people use.",
  bio: "Promoted intern → Senior Engineer at WebKnot in 15 months. I've shipped 4 production products across web, mobile, and desktop — serving 50K+ users and paying B2B clients. Currently focused on AI-first product engineering and distributed systems architecture.",
  location: "Bengaluru, India",
  availability: "Open to Work · SDE-2 / Senior Frontend",
  email: "kmmay15@gmail.com",
  github: "https://github.com/Mayankmishra110",
  linkedin: "https://linkedin.com/in/mayankmishracse",
  twitter: "https://twitter.com/dev_manuss",
  medium: "https://medium.com/@kmmay15",
  leetcode: "https://leetcode.com/Mayankmishra110",
  portfolio: "https://mayankbuilt.com",
  resume: "/resume.pdf",
} as const

export const STATS: Stat[] = [
  { label: "LeetCode Problems", value: 500, suffix: "+", description: "Consistent CP practice" },
  { label: "Users Across Products", value: 50000, suffix: "+", description: "Real production impact" },
  { label: "Months to Senior", value: 15, suffix: "", description: "Intern → SWE in record time" },
  { label: "Production Apps Shipped", value: 4, suffix: "", description: "Web · Mobile · Desktop" },
]

export const PROJECTS: Project[] = [
  {
    id: "kavach-ai",
    title: "KAVACH AI",
    tagline: "Multi-tenant parental monitoring platform",
    description:
      "Full-stack distributed platform: Next.js frontend on Vercel, Spring Boot backend on Railway, Electron desktop agent, and Expo mobile app. Serves B2B clients with real-time cross-platform activity monitoring, AI threat detection, and isolated tenant namespacing.",
    tech: ["Next.js 15", "Spring Boot", "Electron", "Expo", "PostgreSQL", "Neon DB", "Railway", "Vercel"],
    highlights: ["B2B Paying Clients", "Multi-tenant Architecture", "Cross-platform Agents"],
    accentColor: "#6366f1",
    featured: true,
    github: "https://github.com/Mayankmishra110",
    live: "",
    category: "Platform",
    size: "large",
  },
  {
    id: "career-connect",
    title: "Career Connect",
    tagline: "B2B SaaS edtech — 50K+ users",
    description:
      "Role-based SaaS platform with four distinct user roles (Student, Employer, Admin, College). Complex state management with Redux Toolkit, real-time job matching, and a Spring Boot microservices backend with PostgreSQL.",
    tech: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "Redux Toolkit", "React Query"],
    highlights: ["50K+ Users", "4 Distinct Roles", "B2B SaaS Revenue"],
    accentColor: "#06b6d4",
    featured: true,
    github: "",
    live: "",
    category: "SaaS",
    size: "large",
  },
  {
    id: "prepmetowork",
    title: "PrepMeToWork",
    tagline: "AI interview prep · App Store live",
    description:
      "AI-powered interview preparation platform, built with Next.js + Capacitor and published on the Apple App Store and Google Play Store. Helps engineers land product company roles.",
    tech: ["Next.js", "Capacitor", "PWA", "AI/LLM", "Vercel"],
    highlights: ["App Store Published", "Play Store Published", "B2C Product"],
    accentColor: "#8b5cf6",
    featured: false,
    github: "https://github.com/Mayankmishra110",
    live: "",
    category: "AI Product",
    size: "small",
  },
  {
    id: "omron-iot",
    title: "Omron IoT Dashboard",
    tagline: "Enterprise industrial monitoring",
    description:
      "Real-time IoT dashboard for Omron industrial sensors. Led a 4-person frontend team delivering live data visualization, alerting, and analytics for enterprise manufacturing clients.",
    tech: ["React", "TypeScript", "WebSockets", "D3.js", "REST APIs"],
    highlights: ["4-Dev Team Lead", "Real-time IoT", "Enterprise Client"],
    accentColor: "#10b981",
    featured: false,
    github: "",
    live: "",
    category: "Enterprise",
    size: "small",
  },
]

export const SKILLS: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "React 18", "Next.js 15", "TypeScript", "Redux Toolkit", "React Query",
      "Framer Motion", "Tailwind CSS", "Three.js / WebGL", "Jest + RTL + MSW",
    ],
  },
  {
    label: "Backend",
    items: [
      "Spring Boot", "Node.js", "Go (Gin)", "PostgreSQL", "Redis",
      "Kafka", "REST APIs", "WebSockets", "Flyway",
    ],
  },
  {
    label: "Platforms",
    items: [
      "Docker", "Railway", "Vercel", "Neon DB", "AWS (S3, EC2)",
      "GitHub Actions", "Electron", "Expo / React Native", "Capacitor",
    ],
  },
]

export const EXPERIENCE: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "WebKnot Technologies",
    companyUrl: "",
    location: "Bengaluru, India",
    period: "2023 — Present",
    type: "Full-time",
    description:
      "Progressed from Intern → Junior → Senior Engineer in ~15 months. Led frontend architecture for 4 production products. Established Jest, RTL, and MSW testing standards org-wide. Led a 4-person frontend team on the Omron IoT dashboard.",
    highlights: [
      "Promoted Intern → Senior in 15 months",
      "Led 4-person frontend team",
      "Org-wide testing standards (Jest/RTL/MSW)",
      "Impactor of the Quarter award",
      "4 production products shipped",
    ],
    tech: ["React", "Next.js", "TypeScript", "Spring Boot", "PostgreSQL"],
  },
]

export const NAV_LINKS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]
