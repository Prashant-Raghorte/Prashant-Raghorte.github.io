import type { Education, Experience, Project, SkillCategory } from '@/types'

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Tech Company',
    companyUrl: 'https://example.com',
    role: 'Software Developer',
    location: 'Remote, India',
    period: '2024 – Present',
    isCurrent: true,
    highlights: [
      'Developed and maintained React + TypeScript applications with reusable component libraries and shared design tokens.',
      'Collaborated with product and design teams to ship features on schedule while keeping accessibility and responsiveness in mind.',
      'Improved frontend performance through code splitting, lazy loading, and targeted bundle optimization.',
      'Participated in code reviews, sprint planning, and documentation to improve team delivery quality.',
    ],
  },
  {
    id: '2',
    company: 'Product Studio',
    companyUrl: 'https://example.com/product-studio',
    role: 'Junior Developer',
    location: 'Pune, IN',
    period: '2022 – 2024',
    highlights: [
      'Built responsive web interfaces from Figma mockups using React, HTML, CSS, and JavaScript.',
      'Integrated REST APIs, handled client-side state, and implemented form validation flows.',
      'Fixed UI bugs, improved cross-browser compatibility, and supported production releases.',
    ],
  },
  {
    id: '3',
    company: 'Startup Labs',
    role: 'Software Engineering Intern',
    location: 'Pune, IN',
    period: '2021 – 2022',
    highlights: [
      'Assisted in building internal dashboards and customer-facing pages with React and Node.js.',
      'Wrote unit tests, participated in code reviews, and learned agile delivery practices.',
    ],
  },
  {
    id: '4',
    company: 'Training Program',
    role: 'Trainee Developer',
    location: 'Pune, IN',
    period: '2020 – 2021',
    highlights: [
      'Learned web development fundamentals, Git workflows, and debugging techniques.',
      'Supported senior developers on small feature tasks and bug fixes.',
    ],
  },
]

export const educationList: Education[] = [
  {
    id: 'degree',
    institution: 'Savitribai Phule Pune University',
    degree: 'B.Tech in Computer Science',
    period: '2018 – 2022',
    details:
      'Coursework: Data Structures, Algorithms, Web Development, Databases, Software Engineering.',
  },
  {
    id: '12th',
    institution: 'Maharashtra State Board',
    degree: 'Higher Secondary (12th) — Science',
    period: '2016 – 2018',
    details: 'Mathematics, Physics, Chemistry, and Computer Science.',
  },
  {
    id: '10th',
    institution: 'Maharashtra State Board',
    degree: 'Secondary School (10th)',
    period: '2016',
    details: 'Strong foundation in Mathematics and Science.',
  },
]

export const SKILL_CATEGORY_ORDER = [
  'backend',
  'frontend',
  'databases',
  'devops',
  'dev-tools',
  'ai-tools',
] as const

export type SkillCategoryId = (typeof SKILL_CATEGORY_ORDER)[number]

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Java', 'REST APIs', 'Spring Boot'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Vite'],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    skills: ['Docker', 'GitHub Actions', 'CI/CD', 'Linux', 'AWS'],
  },
  {
    id: 'dev-tools',
    title: 'Dev Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma'],
  },
  {
    id: 'ai-tools',
    title: 'AI Tools',
    skills: ['GitHub Copilot', 'ChatGPT', 'Cursor', 'Claude'],
  },
]

export const projects: Project[] = [
  {
    id: '1',
    title: 'Developer Portfolio',
    description:
      'A multi-page portfolio built with React, TypeScript, and Vite — featuring dark and light themes, animated UI, a project showcase, experience timeline, contact form, and GitHub Pages deployment with SPA routing.',
    tags: ['React', 'TypeScript', 'Vite', 'GitHub Actions', 'Cursor'],
    repoUrl: 'https://github.com/Prashant-Raghorte/Prashant-Raghorte.github.io',
    url: 'https://prashant-raghorte.github.io',
  },
  {
    id: '2',
    title: 'Task Manager App',
    description:
      'A full-stack task management application with user authentication, CRUD operations, filtering, and a responsive dashboard. Built to practice API integration, state management, and form handling in a product-style workflow.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker'],
    repoUrl: 'https://github.com/Prashant-Raghorte',
    url: 'https://example.com/task-manager-demo',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description:
      'A weather dashboard that fetches live data from a public API and displays forecasts, location search, and responsive cards. Focused on clean UI, loading states, error handling, and mobile-first layout.',
    tags: ['JavaScript', 'React', 'REST APIs', 'CSS', 'Postman'],
    repoUrl: 'https://github.com/Prashant-Raghorte',
    url: 'https://example.com/weather-dashboard',
  },
  {
    id: '4',
    title: 'E-Commerce UI Clone',
    description:
      'A frontend e-commerce interface clone with product listing, cart interactions, category filters, and checkout-style screens. Used to strengthen component architecture, routing, and reusable UI patterns.',
    tags: ['React', 'TypeScript', 'CSS', 'MySQL', 'GitHub Copilot'],
    repoUrl: 'https://github.com/Prashant-Raghorte',
  },
]
