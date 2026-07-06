import { Link } from 'react-router-dom'
import { siteCopy } from '@/config/copy'
import type { Project } from '@/types'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectLogo } from '@/components/projects/ProjectLogo'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { ArrowRightIcon } from '@/components/ui/icons'
import { useRef } from 'react'
import { FEATURED_PROJECTS_LIMIT, ROUTES } from '@/constants'
import { useSpotlightTagsLine } from '@/hooks/useHomeProjectsSpotlightLayout'

type HomeProjectsShowcaseProps = {
  projects: Project[]
}

function getUniqueTechCount(items: Project[]): number {
  return new Set(items.flatMap((project) => project.tags)).size
}

function getLiveDemoCount(items: Project[]): number {
  return items.filter((project) => project.url).length
}

function getOpenSourceCount(items: Project[]): number {
  return items.filter((project) => project.repoUrl).length
}

function getAiBuildCount(items: Project[]): number {
  return items.filter((project) =>
    project.tags.some((tag) =>
      ['LLM', 'OpenAI API', 'Claude API', 'Gemini API'].includes(tag),
    ),
  ).length
}

function getPythonBuildCount(items: Project[]): number {
  return items.filter((project) => project.tags.includes('Python')).length
}

function StackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 4.5 7.25v7.5L12 18.5l7.5-3.75v-7.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M4.5 7.25 12 11l7.5-3.75M12 11v7.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5v4M12 16.5v4M4.5 12h4M15.5 12h4M7.05 7.05l2.83 2.83M14.12 14.12l2.83 2.83M7.05 16.95l2.83-2.83M14.12 9.88l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

type ProjectStatProps = {
  value: number | string
  label: string
}

function ProjectStat({ value, label }: ProjectStatProps) {
  return (
    <li>
      <span className="home-projects__stat-value">{value}</span>
      <span className="home-projects__stat-label">{label}</span>
    </li>
  )
}

type ProjectSignatureProps = {
  projects: Project[]
}

function ProjectSignatureCard({ projects }: ProjectSignatureProps) {
  const aiBuildCount = getAiBuildCount(projects)
  const pythonBuildCount = getPythonBuildCount(projects)

  return (
    <div className="home-projects__signature">
      <span className="home-projects__signature-label">Core craft</span>
      <p className="home-projects__signature-title">Production SaaS backends</p>
      <ul className="home-projects__signature-meta">
        <li className="home-projects__signature-item">
          <span className="home-projects__signature-icon" aria-hidden="true">
            <StackIcon />
          </span>
          <span className="home-projects__signature-copy">
            <span className="home-projects__signature-item-label">Stack</span>
            <span className="home-projects__signature-item-value">
              Python & Django across {pythonBuildCount} builds
            </span>
          </span>
        </li>
        {aiBuildCount > 0 ? (
          <li className="home-projects__signature-item">
            <span className="home-projects__signature-icon" aria-hidden="true">
              <SparkIcon />
            </span>
            <span className="home-projects__signature-copy">
              <span className="home-projects__signature-item-label">AI edge</span>
              <span className="home-projects__signature-item-value">
                LLM features in {aiBuildCount} products
              </span>
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  )
}

type ProjectSpotlightProps = {
  project: Project
}

function ProjectSpotlight({ project }: ProjectSpotlightProps) {
  const tagsRef = useRef<HTMLUListElement>(null)
  const tagLimit = useSpotlightTagsLine(tagsRef, project.tags)
  const visibleTags = project.tags.slice(0, tagLimit)
  const hiddenTagCount = Math.max(project.tags.length - tagLimit, 0)

  return (
    <div className="home-projects__spotlight">
      <div className="home-projects__spotlight-head">
        <span className="home-projects__spotlight-label">Spotlight</span>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="home-projects__spotlight-link"
          >
            Live product
          </a>
        ) : null}
      </div>

      <div className="home-projects__spotlight-product">
        <ProjectLogo project={project} size="sm" featured />
        <p className="home-projects__spotlight-title">{project.title}</p>
      </div>

      <ul
        ref={tagsRef}
        className="home-projects__spotlight-tags"
        aria-label={`${project.title} tech stack`}
      >
        {visibleTags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
        {hiddenTagCount > 0 ? (
          <li className="home-projects__spotlight-tags-more">+{hiddenTagCount}</li>
        ) : null}
      </ul>
    </div>
  )
}

type ProjectIndexProps = {
  index: number
  showConnector?: boolean
}

function ProjectIndex({ index, showConnector = false }: ProjectIndexProps) {
  return (
    <div className="home-projects__marker" aria-hidden="true">
      <span className="home-projects__index">{String(index + 1).padStart(2, '0')}</span>
      {showConnector ? <span className="home-projects__connector" /> : null}
    </div>
  )
}

export function HomeProjectsShowcase({ projects }: HomeProjectsShowcaseProps) {
  const featuredProjects = projects.slice(0, FEATURED_PROJECTS_LIMIT)
  const hasMoreProjects = projects.length > FEATURED_PROJECTS_LIMIT
  const [leadProject, ...supportProjects] = featuredProjects
  const uniqueTechCount = getUniqueTechCount(projects)
  const liveDemoCount = getLiveDemoCount(projects)
  const openSourceCount = getOpenSourceCount(projects)

  const portfolioStats = [
    { id: 'live', value: liveDemoCount, label: 'Live demos' },
    { id: 'repos', value: openSourceCount, label: 'Repos' },
    { id: 'stack', value: uniqueTechCount, label: 'Stack' },
  ] as const

  return (
    <div className="home-projects">
      <aside className="home-projects__snapshot" aria-label="Project portfolio snapshot">
        <ShineBorderCard hoverOnly className="home-projects__snapshot-card">
          <div className="home-projects__snapshot-inner">
            <div className="home-projects__orbit" aria-hidden="true">
              <span className="home-projects__orbit-ring home-projects__orbit-ring--outer" />
              <span className="home-projects__orbit-ring home-projects__orbit-ring--inner" />
              <span className="home-projects__orbit-glow" />
              <span className="home-projects__orbit-value">{projects.length}</span>
            </div>
            <p className="home-projects__snapshot-label">Products shipped</p>

            <ul className="home-projects__stats" aria-label="Portfolio highlights">
              {portfolioStats.map((stat) => (
                <ProjectStat key={stat.id} value={stat.value} label={stat.label} />
              ))}
            </ul>

            <ProjectSignatureCard projects={projects} />

            {leadProject ? <ProjectSpotlight project={leadProject} /> : null}

            {hasMoreProjects ? (
              <ShineBorderCard hoverOnly className="home-projects__cta-shine view-all-rail__shine">
                <Link
                  to={ROUTES.PROJECTS}
                  className="view-all-rail__pill home-projects__cta"
                  aria-label={siteCopy.viewAll.projects.title}
                >
                  <span className="view-all-rail__label">{siteCopy.viewAll.projects.title}</span>
                  <span className="view-all-rail__arrow" aria-hidden="true">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </ShineBorderCard>
            ) : null}
          </div>
        </ShineBorderCard>
      </aside>

      <div className="home-projects__stage" aria-label="Featured projects">
        {leadProject ? (
          <article className="home-projects__item home-projects__item--lead">
            <ProjectIndex index={0} showConnector={supportProjects.length > 0} />
            <div className="home-projects__card-wrap">
              <span
                className="home-projects__badge home-projects__badge--lead"
                title="Primary project highlighted in this section"
              >
                Featured
              </span>
              <ProjectCard project={leadProject} />
            </div>
          </article>
        ) : null}

        {supportProjects.length > 0 ? (
          <div className="home-projects__support">
            {supportProjects.map((project, index) => (
              <article key={project.id} className="home-projects__item">
                <ProjectIndex
                  index={index + 1}
                  showConnector={index < supportProjects.length - 1}
                />
                <div className="home-projects__card-wrap">
                  <ProjectCard project={project} />
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
