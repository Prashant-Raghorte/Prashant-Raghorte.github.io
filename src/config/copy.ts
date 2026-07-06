export const siteCopy = {
  role: 'SDE I — Backend',
  tagline: 'SDE I — Backend · Python, Django & DRF',
  description:
    'Backend engineer with 3.5+ years building scalable web applications using Python, Django, and DRF — REST APIs, Celery, LLM integration, and multi-database architecture.',
  metaDescription:
    'Prashant Raghorte — SDE I (Backend) specializing in Python, Django, DRF, REST APIs, Celery, Elasticsearch, LLM integration, and AWS.',

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
        'Whether it is a full-time role, freelance project, or technical collaboration — share the details and I will respond within one to two business days.',
    },
  },

  sections: {
    featuredExperience:
      'Backend roles across SEO SaaS, lead generation, and enterprise platforms — building APIs, integrations, and scalable systems.',
    experiencePage: {
      lede:
        'From Django internships to backend engineering at scale — APIs, async pipelines, LLM integrations, and multi-database systems across SaaS and enterprise products.',
      timelineTitle: 'Professional journey',
      craftLabel: 'Core craft',
      craftTitle: 'Scalable backend systems',
      craftStack: 'Python & Django across production SaaS',
      craftAi: 'LLM-powered features in live products',
      stageLabel: 'Now viewing',
      currentRoleLabel: 'Current',
      timelineCardsLabel: 'Experience roles',
      constellationLabel: 'Career constellation',
      impactsLabel: 'Impact points',
      bentoHighlights: 'Highlights',
      highlightsEyebrow: 'Expertise',
      highlightsTitle: 'Career impact map',
      highlightsSubtitle:
        'Theme distribution across every role — a snapshot of where impact concentrated, without repeating timeline bullets.',
      roleImpactTitle: 'Impact focus',
      roleImpactHint: 'Stack areas for this role — badge shows skills; bar width scales with skill count.',
      careerImpactTitle: 'Cross-role themes',
      careerImpactHint: 'Aggregated focus areas across your full career journey.',
      impactMapLegendLabel: 'Theme breakdown',
      ctaTitle: 'Let’s build something together',
      collabLede: 'Open to full-time, freelance, and remote backend work.',
      collabStrengthsLabel: 'What I bring to collaborations',
      collabStrengths: [
        'Production REST APIs with Django & DRF',
        'Async pipelines, Redis, and multi-database systems',
        'LLM integrations shipped in live products',
        'End-to-end ownership from design to deployment',
      ],
      collabModeHints: {
        'Full-time roles': 'Long-term product engineering',
        'Freelance projects': 'Scoped APIs and delivery',
        'Remote opportunities': 'Async across time zones',
      },
      viewProjects: 'View projects',
      getInTouch: 'Get in touch',
      introEyebrow: 'Career snapshot',
      introTitle: 'Backend engineer across SaaS & enterprise',
      winsLabel: 'Standout deliverables',
      spotlightLabel: 'Focused role',
      focusAreasTitle: 'Technologies I work with',
      snapshotTitle: 'Career snapshot',
      snapshotLive: 'Active',
      snapshotCraft: 'Core stack',
      stackLabel: 'Tech stack',
      introStackLabel: 'Primary stack',
      navTitle: 'Role navigator',
      navHint: 'Jump to any role in the timeline',
      pathLabel: 'Career path',
      pathHint: 'Tap a role to jump into the timeline',
    },
    featuredProjects:
      'Production SaaS products spanning SEO intelligence, email marketing, interior design management, compliance, and recruitment.',
    contactPreview:
      'Open to backend engineering roles, contract work, and product collaborations. Choose a channel below or submit a formal inquiry — I typically reply within one to two business days.',
    contactPreviewCta: {
      hint: 'For roles, proposals, and technical collaborations',
      label: 'Submit a detailed inquiry',
      ariaLabel: 'Open the contact page to submit a detailed inquiry',
    },
    contactForm: {
      title: 'Submit a detailed inquiry',
      subtitle:
        'Share the role, project scope, timeline, and technical requirements. The more context you provide, the more tailored my response will be.',
      success:
        'Your message has been sent. Thank you for reaching out — I will review it and get back to you within one to two business days.',
      errorFallback: 'You can also reach me through the direct channels listed alongside this form.',
      placeholders: {
        name: 'Your full name',
        email: 'Your work or personal email',
        subject: 'Role, project type, or collaboration topic',
        message:
          'Briefly describe the opportunity, team, stack, timeline, and what you would like help with…',
      },
      labels: {
        name: 'Full name',
        email: 'Email address',
        subject: 'Subject',
        message: 'Message',
      },
      submit: 'Send message',
      submitting: 'Sending message…',
    },
    contactConnect: {
      title: 'Direct channels',
      subtitle:
        'Prefer email, a quick call, or a social profile? Pick the option that works best for you.',
      locationTitle: 'Location',
      locationHint: 'Open to remote and hybrid opportunities across India.',
      responseTitle: 'Typical response',
      responseHint: '1–2 business days for email and form messages.',
    },
    contactChannels: {
      email: 'Best for detailed inquiries, proposals, and role discussions',
      phone: 'Reach out for quick questions or scheduling a call',
      github: 'Browse repositories, contributions, and side projects',
      linkedin: 'Connect for roles, referrals, and professional updates',
      instagram: 'Follow for personal updates and behind-the-scenes content',
    },
  },

  footer: {
    downloadCv: 'Download CV',
  },

  hero: {
    greeting: "Hey, I'm",
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

  skills: {
    all: {
      title: 'All Skills',
      hint: 'Technologies across my full stack',
      showMore: (count: number) => `Show ${count} more skills`,
      showLess: 'Show fewer skills',
    },
    categoryHint: 'Technologies in this area',
    skillCount: (count: number) => (count === 1 ? '1 skill' : `${count} skills`),
    navLabel: 'Categories',
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
