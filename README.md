# Prashant Raghorte — Portfolio

React + Vite portfolio site for [GitHub Pages](https://prashant-raghorte.github.io/).

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** — fast dev server & build
- **React Router** — client-side routing
- **ESLint** — code quality

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Shared UI components
│   ├── common/      # Generic reusable components
│   ├── layout/      # Header, Footer, Layout shell
│   └── ui/          # Design system primitives (Button, Card, etc.)
├── config/          # Site config & env-driven settings
├── constants/       # App-wide constants (routes, etc.)
├── features/        # Feature modules (home, about, projects, contact)
├── hooks/           # Custom React hooks
├── pages/           # Page exports (barrel for features)
├── routes/          # Router configuration
├── services/        # API / external integrations
├── store/           # Global state (Zustand/Redux when needed)
├── styles/          # Global CSS & design tokens
├── types/           # Shared TypeScript types
└── utils/           # Pure utility functions
```

## Environment Setup

This project uses **Node.js** with a **local `node_modules`** folder — the Node.js equivalent of a Python virtual environment. Dependencies are isolated to this project and never installed globally.

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20 (see `.nvmrc` for pinned version)

### Install & Run

```bash
# Install dependencies (creates local node_modules)
npm install

# Start dev server
npm run dev

# Type-check
npm run typecheck

# Lint
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

## Future Enhancements

The structure supports adding:

- **Animations** — Framer Motion in `components/ui`
- **Theming** — dark/light mode via CSS variables in `styles/variables.css`
- **CMS** — content fetching in `services/`
- **State management** — Zustand/Redux in `store/`
- **Testing** — Vitest + React Testing Library
- **CI/CD** — GitHub Actions to deploy `dist/` to GitHub Pages

## Deploy to GitHub Pages

1. Run `npm run build`
2. Deploy the `dist/` folder to the `gh-pages` branch, or use GitHub Actions

```yaml
# Example: .github/workflows/deploy.yml (add when ready)
# Builds on push to main and publishes dist/ to GitHub Pages
```

## License

Private — all rights reserved.
