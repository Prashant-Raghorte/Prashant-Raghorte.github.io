export const siteCopy = {
  role: 'Software Developer',
  tagline: 'Software Developer · React & TypeScript',
  description:
    'Software developer building responsive web applications with Python and Django, and modern tooling — focused on clean interfaces, performance, and maintainable code.',
  metaDescription:
    'Prashant Raghorte — Software developer specializing in responsive web applications with React, TypeScript, and modern tooling.',

  pages: {
    about: {
      title: 'About Me',
      subtitle: 'My background, education, and the technologies I use day-to-day',
    },
    experience: {
      title: 'Work Experience',
      subtitle: 'Roles, responsibilities, and milestones from my professional journey',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Applications and interfaces I have designed, built, and shipped',
    },
    contact: {
      title: 'Contact',
      subtitle:
        'Have a question, opportunity, or idea? Send a message — I would love to hear from you.',
    },
  },

  sections: {
    featuredExperience:
      'Recent roles and the impact I delivered in each position.',
    featuredProjects:
      'Selected work spanning full-stack applications, UI clones, and developer tooling.',
    contactPreview:
      'Open to full-time roles and freelance collaborations. Reach out by email or phone — I usually reply within one to two business days.',
    contactForm: {
      title: 'Send a message',
      subtitle:
        'Tell me about your project or opportunity. I typically reply within one to two business days.',
      success: 'Message sent successfully. Thank you — I will get back to you soon.',
      placeholders: {
        subject: 'Project inquiry, collaboration, or opportunity',
        message: 'Tell me about your idea or opportunity…',
      },
    },
    contactConnect: {
      title: 'Connect with me',
      subtitle: 'Prefer a direct channel? Reach me through any of the options below.',
      locationTitle: 'Current location',
    },
  },

  footer: {
    downloadCv: 'Download CV',
  },

  hero: {
    exploreWork: 'Explore featured work',
    exploreWorkHint: 'Scroll to featured projects on this page',
  },

  viewAll: {
    experience: {
      title: 'View all roles',
    },
    projects: {
      title: 'View all projects',
    },
  },

  projects: {
    emptySingle: (skill: string) => `No projects match “${skill}”.`,
    emptyMultiple: (skills: string[]) =>
      `No projects match the selected filters (${skills.join(', ')}).`,
    clearFilters: 'Clear filters',
  },
} as const

export function getCopyrightNotice(name: string): string {
  const year = new Date().getFullYear()
  return `© ${year} ${name}. All rights reserved.`
}

export function getResumeDownloadFilename(name: string): string {
  return `${name.replace(/\s+/g, '-')}-Resume.pdf`
}
