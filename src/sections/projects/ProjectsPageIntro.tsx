import { useCallback, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import type { Project } from '@/types'
import { siteCopy } from '@/config/copy'
import { ProjectLogo } from '@/components/projects/ProjectLogo'
import { ProjectOverviewQuote } from '@/components/projects/ProjectOverviewQuote'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useSpotlight } from '@/hooks/useSpotlight'
import { getSkillIcon } from '@/utils/skillIcons'
import {
  getAiBuildCount,
  getAllPortfolioSkills,
  getLiveDemoCount,
  getOpenSourceCount,
  getPortfolioPulseMetrics,
  getPythonBuildCount,
  getStackNodePosition,
  getSortedProjectTags,
  getUniqueTechCount,
  type PortfolioSkill,
} from '@/utils/projectHelpers'
import './ProjectsPageIntro.css'
import './ProjectsPageIntro.orbit.css'
import './ProjectsPageIntro.stack.css'
import './ProjectsPageIntro.effects.css'
import '@/components/projects/ProjectLogo.css'

type OrbitSignalMetric = {
  key: string
  label: string
  value: number
  max: number
  display: string
}

type OrbitSignalPanelProps = {
  projects: Project[]
  activeProject: Project | null
}

const ORBIT_SIGNAL_ARC_RADIUS = 44

function isOrbitLogoTarget(target: EventTarget | null): target is Element {
  return target instanceof Element && Boolean(target.closest('.projects-hero__orbit-logo'))
}

function shouldKeepOrbitHover(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  if (target.closest('.projects-hero__orbit-logo')) return true
  if (target.closest('.projects-hero__brief-stage')) return true
  return false
}

function handleOrbitLogoMouseLeave(
  event: MouseEvent<HTMLButtonElement>,
  scheduleClearHover: () => void,
) {
  if (shouldKeepOrbitHover(event.relatedTarget)) return
  scheduleClearHover()
}

function getProjectPulseMetrics(project: Project): {
  hero: OrbitSignalMetric
  companions: OrbitSignalMetric[]
} {
  const { integrations, dataStores, aiIntegrations } = project.deliverySnapshot

  const companions: OrbitSignalMetric[] = [
    {
      key: 'integrations',
      label: 'API links',
      value: integrations,
      max: 8,
      display: String(integrations),
    },
    {
      key: 'data',
      label: 'Data stores',
      value: dataStores,
      max: 6,
      display: String(dataStores),
    },
  ]

  if (dataStores === 0 && aiIntegrations > 0) {
    companions[1] = {
      key: 'ai',
      label: 'AI hooks',
      value: aiIntegrations,
      max: 4,
      display: String(aiIntegrations),
    }
  }

  return {
    hero: {
      key: 'modules',
      label: 'Modules',
      value: project.modules.length,
      max: 10,
      display: String(project.modules.length),
    },
    companions,
  }
}

function OrbitSignalPanel({ projects, activeProject }: OrbitSignalPanelProps) {
  const copy = siteCopy.sections.projectsPage
  const pulse = activeProject ? getProjectPulseMetrics(activeProject) : getPortfolioPulseMetrics(projects)
  const heroFill = Math.min(pulse.hero.value / pulse.hero.max, 1)

  return (
    <section
      className={[
        'projects-hero__orbit-signal',
        activeProject ? 'projects-hero__orbit-signal--focus' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-live="polite"
    >
      <header className="projects-hero__orbit-signal-head">
        <span className="projects-hero__orbit-signal-head-glow" aria-hidden="true" />
        <div className="projects-hero__orbit-signal-head-copy">
          <span className="projects-hero__orbit-signal-label">{copy.orbitSignalIdleLabel}</span>
          <p className="projects-hero__orbit-signal-hint">
            {activeProject ? copy.orbitSignalFocusHint : copy.orbitSignalHint}
          </p>
        </div>
      </header>

      <div className="projects-hero__orbit-signal-hero">
        <svg
          className="projects-hero__orbit-signal-gauge"
          viewBox="0 0 100 56"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path
            className="projects-hero__orbit-signal-gauge-track"
            d={`M 6 50 A ${ORBIT_SIGNAL_ARC_RADIUS} ${ORBIT_SIGNAL_ARC_RADIUS} 0 0 1 94 50`}
            pathLength="1"
          />
          <path
            className="projects-hero__orbit-signal-gauge-fill"
            d={`M 6 50 A ${ORBIT_SIGNAL_ARC_RADIUS} ${ORBIT_SIGNAL_ARC_RADIUS} 0 0 1 94 50`}
            pathLength="1"
            style={{ '--signal-fill': heroFill } as CSSProperties}
          />
        </svg>

        <div className="projects-hero__orbit-signal-readout">
          <span className="projects-hero__orbit-signal-value">{pulse.hero.display}</span>
          <span className="projects-hero__orbit-signal-readout-label">{pulse.hero.label}</span>
        </div>
      </div>

      <ul className="projects-hero__orbit-signal-rows" aria-label="Portfolio telemetry">
        {pulse.companions.map((metric) => {
          const fill = Math.min(metric.value / metric.max, 1)

          return (
            <li key={metric.key} className="projects-hero__orbit-signal-row">
              <div className="projects-hero__orbit-signal-row-head">
                <span className="projects-hero__orbit-signal-row-label">{metric.label}</span>
                <span className="projects-hero__orbit-signal-row-value">{metric.display}</span>
              </div>
              <span className="projects-hero__orbit-signal-row-track" aria-hidden="true">
                <span
                  className="projects-hero__orbit-signal-row-fill"
                  style={{ '--signal-fill': fill } as CSSProperties}
                />
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

type ProjectsPageIntroProps = {
  projects: Project[]
  inView: boolean
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

type PortfolioBriefProps = {
  projects: Project[]
  pythonBuildCount: number
  aiBuildCount: number
  liveDemoCount: number
  stackCount: number
  repoCount: number
}

function PortfolioBrief({
  projects,
  pythonBuildCount,
  aiBuildCount,
  liveDemoCount,
  stackCount,
  repoCount,
}: PortfolioBriefProps) {
  const copy = siteCopy.sections.projectsPage

  return (
    <article className="projects-hero__brief" aria-label={copy.summaryLabel}>
      <span className="projects-hero__brief-glow" aria-hidden="true" />
      <span className="projects-hero__brief-rail" aria-hidden="true" />

      <header className="projects-hero__brief-head">
        <div className="projects-hero__brief-head-copy">
          <span className="projects-hero__brief-label">{copy.summaryLabel}</span>
          <p className="projects-hero__brief-title">{copy.craftTitle}</p>
        </div>
        <ul className="projects-hero__brief-stats" aria-label="Portfolio metrics">
          <li>
            <span className="projects-hero__brief-stat-value">{liveDemoCount}</span>
            <span className="projects-hero__brief-stat-label">Live</span>
          </li>
          <li>
            <span className="projects-hero__brief-stat-value">{repoCount}</span>
            <span className="projects-hero__brief-stat-label">Repos</span>
          </li>
          <li>
            <span className="projects-hero__brief-stat-value">{stackCount}</span>
            <span className="projects-hero__brief-stat-label">Stack</span>
          </li>
        </ul>
      </header>

      <ul className="projects-hero__brief-domains" aria-label="Product domains">
        {projects.map((project) => (
          <li key={project.id} className="projects-hero__brief-domain">
            {project.domain}
          </li>
        ))}
      </ul>

      <div className="projects-hero__brief-body">
        <div className="projects-hero__brief-stack">
          <div className="projects-hero__brief-quotes">
            {copy.portfolioQuotes.map((quote) => (
              <ProjectOverviewQuote key={quote} className="projects-quote--hero">
                {quote}
              </ProjectOverviewQuote>
            ))}
          </div>

          <div className="projects-hero__brief-metrics">
            <div className="projects-hero__brief-metric">
              <span className="projects-hero__brief-metric-icon" aria-hidden="true">
                <StackIcon />
              </span>
              <div className="projects-hero__brief-metric-copy">
                <span className="projects-hero__brief-metric-value">{pythonBuildCount}</span>
                <span className="projects-hero__brief-metric-label">{copy.craftMetricLabel}</span>
                <span className="projects-hero__brief-metric-detail">{copy.craftMetricDetail}</span>
              </div>
            </div>

            {aiBuildCount > 0 ? (
              <div className="projects-hero__brief-metric projects-hero__brief-metric--ai">
                <span className="projects-hero__brief-metric-icon" aria-hidden="true">
                  <SparkIcon />
                </span>
                <div className="projects-hero__brief-metric-copy">
                  <span className="projects-hero__brief-metric-value">{aiBuildCount}</span>
                  <span className="projects-hero__brief-metric-label">{copy.craftAiMetricLabel}</span>
                  <span className="projects-hero__brief-metric-detail">{copy.craftAiMetricDetail}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

type ProductSpotlightProps = {
  project: Project
}

function ProductSpotlight({ project }: ProductSpotlightProps) {
  const copy = siteCopy.sections.projectsPage
  const sortedTags = getSortedProjectTags(project.tags)

  return (
    <article className="projects-hero__spotlight">
      <span className="projects-hero__spotlight-glow" aria-hidden="true" />
      <header className="projects-hero__spotlight-head">
        <span className="projects-hero__spotlight-label">{copy.spotlightLabel}</span>
        <span className="projects-hero__spotlight-status">
          {project.url ? 'Live in production' : 'Repository project'}
        </span>
      </header>

      <div className="projects-hero__spotlight-product">
        <ProjectLogo project={project} size="md" featured />
        <h3 className="projects-hero__spotlight-title">{project.title}</h3>
      </div>

      <div className="projects-hero__spotlight-body">
        <div className="projects-hero__spotlight-stack">
          <ProjectOverviewQuote className="projects-quote--hero">{project.spotlightQuote}</ProjectOverviewQuote>

          <div className="projects-hero__spotlight-skills">
            <span className="projects-hero__spotlight-skills-label">{copy.spotlightStackLabel}</span>
            <ul className="projects-hero__spotlight-tags" aria-label={`${project.title} tech stack`}>
              {sortedTags.map((tag) => {
                const icon = getSkillIcon(tag)

                return (
                  <li key={tag} className="projects-hero__spotlight-tag">
                    {icon ? (
                      <img
                        src={icon}
                        alt=""
                        className="projects-hero__spotlight-tag-icon"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    {tag}
                  </li>
                )
              })}
            </ul>
          </div>

          {project.highlights && project.highlights.length > 0 ? (
            <div className="projects-hero__spotlight-highlights">
              <span className="projects-hero__spotlight-highlights-label">{copy.spotlightHighlightsLabel}</span>
              <ul className="projects-hero__spotlight-highlights-list">
                {(project.highlights ?? []).slice(0, 4).map((highlight, index) => (
                  <li key={highlight} className="projects-hero__spotlight-highlight">
                    <span className="projects-hero__spotlight-highlight-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="projects-hero__spotlight-highlight-text">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

type StackLatticePanelProps = {
  skills: PortfolioSkill[]
  activeProject: Project | null
}

function StackLatticePanel({ skills, activeProject }: StackLatticePanelProps) {
  const copy = siteCopy.sections.projectsPage
  const activeTags = new Set(activeProject?.tags ?? [])
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const isLinking = hoveredSkill !== null || activeProject !== null
  const readoutLabel = hoveredSkill ?? (activeProject ? copy.stackReadoutActive : copy.stackReadoutIdle)
  const peakWeight = Math.max(...skills.map((item) => item.count), 1)

  const isSkillLinked = (skill: string) => {
    if (hoveredSkill) return hoveredSkill === skill
    if (activeProject) return activeTags.has(skill)
    return false
  }

  return (
    <aside
      className={[
        'projects-hero__stack',
        activeProject ? 'projects-hero__stack--focus' : '',
        isLinking ? 'projects-hero__stack--linking' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={copy.stackSpectrumLabel}
    >
      <header className="projects-hero__stack-head">
        <span className="projects-hero__stack-head-glow" aria-hidden="true" />
        <div className="projects-hero__stack-head-copy">
          <span className="projects-hero__stack-label">{copy.stackSpectrumLabel}</span>
          <p className="projects-hero__stack-hint">
            {activeProject ? copy.stackProjectHint(activeProject.title) : copy.stackSpectrumHint}
          </p>
        </div>
      </header>

      <div className="projects-hero__stack-body">
        <div className="projects-hero__stack-canvas">
          <span className="projects-hero__stack-mesh" aria-hidden="true" />
          <span className="projects-hero__stack-prism" aria-hidden="true" />

          <svg className="projects-hero__stack-rails" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <ellipse cx="50" cy="50" rx="44" ry="35" className="projects-hero__stack-rail projects-hero__stack-rail--outer" />
            <ellipse cx="50" cy="50" rx="34" ry="27" className="projects-hero__stack-rail projects-hero__stack-rail--mid" />
            <ellipse cx="50" cy="50" rx="24" ry="19" className="projects-hero__stack-rail projects-hero__stack-rail--inner" />
          </svg>

          <svg className="projects-hero__stack-beams" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <linearGradient id="projects-hero-stack-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            {skills.map((item, index) => {
              const { x, y } = getStackNodePosition(index, skills.length)
              const linked = isSkillLinked(item.skill)
              const bendX = 50 + (x - 50) * 0.55
              const bendY = 50 + (y - 50) * 0.55 - 4

              return (
                <path
                  key={item.skill}
                  className={linked ? 'projects-hero__stack-beam--linked' : ''}
                  d={`M 50 50 Q ${bendX} ${bendY} ${x} ${y}`}
                  fill="none"
                  stroke="url(#projects-hero-stack-beam)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  style={
                    {
                      '--stack-beam-opacity': 0.35 + (item.count / peakWeight) * 0.5,
                    } as CSSProperties
                  }
                />
              )
            })}
          </svg>

          <div className="projects-hero__stack-core" aria-label={`${skills.length} technologies in portfolio stack`}>
            <span className="projects-hero__stack-core-shine" aria-hidden="true" />
            <span className="projects-hero__stack-core-value">{skills.length}</span>
            <span className="projects-hero__stack-core-label">Stack</span>
          </div>

          <ul className="projects-hero__stack-orbit" aria-label={copy.stackSpectrumLabel}>
            {skills.map((item, index) => {
              const { x, y } = getStackNodePosition(index, skills.length)
              const icon = getSkillIcon(item.skill)
              const isActive = activeTags.has(item.skill)
              const isHovered = hoveredSkill === item.skill
              const isLinked = isSkillLinked(item.skill)

              return (
                <li
                  key={item.skill}
                  className={[
                    'projects-hero__stack-node',
                    isActive ? 'projects-hero__stack-node--active' : '',
                    isHovered ? 'projects-hero__stack-node--hovered' : '',
                    isLinked ? 'projects-hero__stack-node--linked' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={
                    {
                      '--stack-node-x': `${x}%`,
                      '--stack-node-y': `${y}%`,
                      '--stack-weight': item.count / item.maxCount,
                    } as CSSProperties
                  }
                >
                  <button
                    type="button"
                    className="projects-hero__stack-node-btn"
                    aria-label={item.skill}
                    aria-pressed={isHovered}
                    onMouseEnter={() => setHoveredSkill(item.skill)}
                    onMouseLeave={() => setHoveredSkill((current) => (current === item.skill ? null : current))}
                    onFocus={() => setHoveredSkill(item.skill)}
                    onBlur={() => setHoveredSkill((current) => (current === item.skill ? null : current))}
                    onClick={() => {
                      if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

                      setHoveredSkill((current) => (current === item.skill ? null : item.skill))
                    }}
                  >
                    <span className="projects-hero__stack-node-ring" aria-hidden="true" />
                    <span className="projects-hero__stack-node-surface">
                      {icon ? (
                        <img src={icon} alt="" className="projects-hero__stack-node-icon" loading="lazy" decoding="async" />
                      ) : (
                        <span className="projects-hero__stack-node-fallback" aria-hidden="true">
                          {item.skill.charAt(0)}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <p className="projects-hero__stack-readout" aria-live="polite">
          <span className="projects-hero__stack-readout-label">{readoutLabel}</span>
        </p>
      </div>
    </aside>
  )
}

export function ProjectsPageIntro({ projects, inView }: ProjectsPageIntroProps) {
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLDivElement>()
  const copy = siteCopy.sections.projectsPage
  const portfolioSkills = getAllPortfolioSkills(projects)
  const aiBuildCount = getAiBuildCount(projects)
  const pythonBuildCount = getPythonBuildCount(projects)
  const liveDemoCount = getLiveDemoCount(projects)

  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)
  const hoverClearTimerRef = useRef<number | null>(null)

  const hoveredProject = projects.find((project) => project.id === hoveredProjectId) ?? null

  const cancelClearHoveredProject = useCallback(() => {
    if (hoverClearTimerRef.current !== null) {
      window.clearTimeout(hoverClearTimerRef.current)
      hoverClearTimerRef.current = null
    }
  }, [])

  const clearHoveredProject = useCallback(() => {
    cancelClearHoveredProject()
    setHoveredProjectId(null)
  }, [cancelClearHoveredProject])

  const scheduleClearHoveredProject = useCallback(() => {
    cancelClearHoveredProject()
    hoverClearTimerRef.current = window.setTimeout(() => {
      hoverClearTimerRef.current = null
      setHoveredProjectId(null)
    }, 140)
  }, [cancelClearHoveredProject])

  const activateHoveredProject = useCallback(
    (projectId: string) => {
      cancelClearHoveredProject()
      setHoveredProjectId(projectId)
    },
    [cancelClearHoveredProject],
  )

  return (
    <section
      className={['projects-hero', inView ? 'projects-hero--in-view' : ''].filter(Boolean).join(' ')}
      aria-label={copy.introEyebrow}
    >
      <ShineBorderCard hoverOnly className="projects-hero__card">
        <div
          className="projects-hero__inner"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            {
              '--projects-hero-spot-x': `${spotlight.x}%`,
              '--projects-hero-spot-y': `${spotlight.y}%`,
            } as CSSProperties
          }
        >
          <span className="projects-hero__aurora projects-hero__aurora--one" aria-hidden="true" />
          <span className="projects-hero__aurora projects-hero__aurora--two" aria-hidden="true" />
          <span className="projects-hero__mesh" aria-hidden="true" />
          <span
            className={[
              'projects-hero__spotlight-bg',
              spotlight.active ? 'projects-hero__spotlight-bg--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          />

          <header className="projects-hero__head">
            <p className="projects-hero__eyebrow">{copy.introEyebrow}</p>
            <div className="projects-hero__head-row">
              <h2 className="projects-hero__title">{copy.introTitle}</h2>
              <span className="projects-hero__live-badge">
                <span className="projects-hero__live-dot" aria-hidden="true" />
                {liveDemoCount} live
              </span>
            </div>
          </header>

          <div className="projects-hero__bento">
            <div
              className={[
                'projects-hero__stage',
                hoveredProjectId ? 'projects-hero__stage--focus' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div
                className="projects-hero__constellation"
                onMouseLeave={scheduleClearHoveredProject}
              >
                <div
                  className={[
                    'projects-hero__orbit-hub',
                    hoveredProjectId ? 'projects-hero__orbit-hub--focus' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <header className="projects-hero__orbit-map-head">
                    <span className="projects-hero__orbit-map-head-glow" aria-hidden="true" />
                    <div className="projects-hero__orbit-map-head-copy">
                      <span className="projects-hero__orbit-map-label">{copy.orbitMapLabel}</span>
                      <p className="projects-hero__orbit-map-hint">
                        {hoveredProject ? copy.orbitProjectHint(hoveredProject.title) : copy.orbitMapHint}
                      </p>
                    </div>
                  </header>

                  <div className="projects-hero__orbit-wrap">
                    <div
                      className={[
                        'projects-hero__orbit-field',
                        hoveredProjectId ? 'projects-hero__orbit-field--focus' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-label="Product constellation"
                    >
                  <span className="projects-hero__orbit-ring projects-hero__orbit-ring--outer" />
                  <span className="projects-hero__orbit-ring projects-hero__orbit-ring--inner" />
                  <span className="projects-hero__orbit-scan" aria-hidden="true" />

                  <div className="projects-hero__orbit-core">
                    <span className="projects-hero__orbit-value">{projects.length}</span>
                    <span className="projects-hero__orbit-label">{copy.orbitLabel}</span>
                  </div>

                  {projects.map((project, index) => {
                    const isActive = hoveredProjectId === project.id

                    return (
                      <button
                        key={project.id}
                        type="button"
                        className={[
                          'projects-hero__orbit-logo',
                          isActive ? 'projects-hero__orbit-logo--active' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        style={
                          {
                            '--orbit-i': index,
                            '--orbit-total': projects.length,
                          } as CSSProperties
                        }
                        onMouseEnter={() => activateHoveredProject(project.id)}
                        onMouseLeave={(event) => handleOrbitLogoMouseLeave(event, scheduleClearHoveredProject)}
                        onFocus={() => activateHoveredProject(project.id)}
                        onBlur={(event) => {
                          if (isOrbitLogoTarget(event.relatedTarget)) return
                          clearHoveredProject()
                        }}
                        aria-label={project.title}
                        aria-describedby={isActive ? 'projects-hero-orbit-caption' : undefined}
                      >
                        <span className="projects-hero__orbit-logo-surface">
                          <ProjectLogo project={project} size="sm" featured={isActive} />
                        </span>
                      </button>
                    )
                  })}
                </div>
                  </div>

                <p
                  id="projects-hero-orbit-caption"
                  className={[
                    'projects-hero__orbit-caption',
                    hoveredProject ? 'projects-hero__orbit-caption--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {hoveredProject ? hoveredProject.title : copy.orbitCaptionHint}
                  <span className="projects-hero__hero-tip projects-hero__hero-tip--caption" aria-hidden="true">
                    <span className="projects-hero__hero-tip-shine" />
                    <span className="projects-hero__hero-tip-hint">{copy.orbitCaptionHint}</span>
                    <span className="projects-hero__hero-tip-label">
                      {hoveredProject ? hoveredProject.title : copy.orbitMapHint}
                    </span>
                    <span className="projects-hero__hero-tip-arrow" />
                  </span>
                </p>

                  <OrbitSignalPanel projects={projects} activeProject={hoveredProject} />
                </div>
              </div>

                <div
                  className={[
                    'projects-hero__brief-stage',
                    hoveredProject ? 'projects-hero__brief-stage--focus' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseLeave={(event) => {
                    if (shouldKeepOrbitHover(event.relatedTarget)) return
                    scheduleClearHoveredProject()
                  }}
                >
                <div
                  className={[
                    'projects-hero__brief-layer',
                    hoveredProject ? 'projects-hero__brief-layer--hidden' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-hidden={Boolean(hoveredProject)}
                >
                  <PortfolioBrief
                    projects={projects}
                    pythonBuildCount={pythonBuildCount}
                    aiBuildCount={aiBuildCount}
                    liveDemoCount={liveDemoCount}
                    stackCount={getUniqueTechCount(projects)}
                    repoCount={getOpenSourceCount(projects)}
                  />
                </div>

                <div className="projects-hero__brief-layer projects-hero__brief-layer--spotlight">
                  {hoveredProject ? <ProductSpotlight project={hoveredProject} /> : null}
                </div>
              </div>
            </div>

            <StackLatticePanel skills={portfolioSkills} activeProject={hoveredProject} />
          </div>
        </div>
      </ShineBorderCard>
    </section>
  )
}
