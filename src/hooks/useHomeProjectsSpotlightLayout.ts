import { useEffect, useLayoutEffect, useState, type RefObject } from 'react'
import { getSkillIcon } from '@/utils/skillIcons'

const DESKTOP_LAYOUT_MIN = 993
const TAG_GAP_PX = 6

function parseGapPx(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : TAG_GAP_PX
}

function createMeasureList(className: string): HTMLUListElement {
  const measureList = document.createElement('ul')
  measureList.className = className
  Object.assign(measureList.style, {
    position: 'fixed',
    left: '-9999px',
    top: '0',
    visibility: 'hidden',
    pointerEvents: 'none',
    flexWrap: 'nowrap',
    width: 'auto',
    maxWidth: 'none',
  })
  document.body.appendChild(measureList)
  return measureList
}

type CountTagsOptions = {
  moreClassName?: string
  buildChip?: (tag: string, measureList: HTMLUListElement) => HTMLElement
  unmeasuredFallback?: number
}

/** Count how many tags fit across a fixed number of lines using real chip widths. */
export function countTagsForLines(
  container: HTMLElement,
  tags: readonly string[],
  maxLines: number,
  options: CountTagsOptions = {},
): number {
  const { moreClassName = '', buildChip } = options
  const availableWidth = container.clientWidth
  if (tags.length === 0) return 0
  if (availableWidth <= 0) {
    return Math.min(options.unmeasuredFallback ?? 4, tags.length)
  }

  const listStyle = window.getComputedStyle(container)
  const gap = parseGapPx(listStyle.columnGap || listStyle.gap)
  const measureList = createMeasureList(container.className)

  const measureTagWidth = (tag: string) => {
    if (buildChip) {
      const chip = buildChip(tag, measureList)
      const width = chip.getBoundingClientRect().width
      measureList.removeChild(chip)
      return width
    }

    const chip = document.createElement('li')
    chip.textContent = tag
    measureList.appendChild(chip)
    const width = chip.getBoundingClientRect().width
    measureList.removeChild(chip)
    return width
  }

  const tagWidths = tags.map(measureTagWidth)

  const moreWidths = new Map<number, number>()
  const measureMoreWidth = (count: number) => {
    if (moreWidths.has(count)) return moreWidths.get(count)!
    const chip = document.createElement('li')
    if (moreClassName) chip.className = moreClassName
    chip.textContent = `+${count}`
    measureList.appendChild(chip)
    const width = chip.getBoundingClientRect().width
    measureList.removeChild(chip)
    moreWidths.set(count, width)
    return width
  }

  let visibleCount = 0
  let index = 0

  for (let line = 0; line < maxLines && index < tags.length; line += 1) {
    let used = 0
    let lineCount = 0
    const isLastLine = line === maxLines - 1

    while (index < tags.length) {
      const tagWidth = tagWidths[index]
      const gapBefore = lineCount > 0 ? gap : 0
      const hiddenAfter = tags.length - index - 1
      const reserve =
        isLastLine && hiddenAfter > 0 ? gap + measureMoreWidth(hiddenAfter) : 0

      if (used + gapBefore + tagWidth + reserve > availableWidth) {
        if (lineCount === 0 && !isLastLine) break
        break
      }

      used += gapBefore + tagWidth
      lineCount += 1
      index += 1
      visibleCount += 1
    }
  }

  document.body.removeChild(measureList)

  return Math.max(1, visibleCount)
}

/** Count how many tags fit on one line using real chip widths. */
export function countTagsForSingleLine(
  container: HTMLElement,
  tags: readonly string[],
  options: CountTagsOptions = {},
): number {
  return countTagsForLines(container, tags, 1, options)
}

function buildSpotlightTagChip(tag: string, measureList: HTMLUListElement): HTMLElement {
  const chip = document.createElement('li')
  chip.className = 'home-projects__spotlight-tag'
  const surface = document.createElement('span')
  surface.className = 'home-projects__spotlight-tag-surface'
  const icon = getSkillIcon(tag)

  if (icon) {
    const img = document.createElement('img')
    img.className = 'home-projects__spotlight-tag-icon'
    img.src = icon
    img.alt = ''
    surface.appendChild(img)
  } else {
    const fallback = document.createElement('span')
    fallback.className = 'home-projects__spotlight-tag-fallback'
    fallback.textContent = tag.charAt(0)
    fallback.setAttribute('aria-hidden', 'true')
    surface.appendChild(fallback)
  }

  const label = document.createElement('span')
  label.className = 'home-projects__spotlight-tag-label'
  label.textContent = tag
  surface.appendChild(label)
  chip.appendChild(surface)
  measureList.appendChild(chip)

  return chip
}

function buildProjectCardTagChip(tag: string, measureList: HTMLUListElement): HTMLElement {
  const chip = document.createElement('li')
  chip.className = 'project-card__tag'
  const surface = document.createElement('span')
  surface.className = 'project-card__tag-surface'
  const icon = getSkillIcon(tag)

  if (icon) {
    const img = document.createElement('img')
    img.className = 'project-card__tag-icon'
    img.src = icon
    img.alt = ''
    surface.appendChild(img)
  } else {
    const fallback = document.createElement('span')
    fallback.className = 'project-card__tag-fallback'
    fallback.textContent = tag.charAt(0)
    fallback.setAttribute('aria-hidden', 'true')
    surface.appendChild(fallback)
  }

  const label = document.createElement('span')
  label.className = 'project-card__tag-label'
  label.textContent = tag
  surface.appendChild(label)
  chip.appendChild(surface)
  measureList.appendChild(chip)

  return chip
}

/** Wrapped layouts below desktop sidebar — allow multiple rows. */
export function getSpotlightTagLimit(width: number): number {
  if (width <= 480) return 4
  if (width <= 560) return 5
  if (width <= 640) return 6
  if (width <= 768) return 8
  if (width <= 992) return 10
  return 12
}

export function getProjectCardTagLimit(width: number): number {
  if (width <= 480) return 5
  if (width <= 640) return 7
  if (width <= 768) return 9
  if (width <= 992) return 11
  return 14
}

const PROJECT_CARD_TAG_LINES = 2
const PROJECT_CARD_INITIAL_DESKTOP_TAGS = 4
const SPOTLIGHT_INITIAL_DESKTOP_TAGS = 2

function getInitialSpotlightTagLimit(tags: readonly string[]): number {
  if (typeof window === 'undefined') {
    return Math.min(SPOTLIGHT_INITIAL_DESKTOP_TAGS, tags.length)
  }

  const width = window.innerWidth
  if (width < DESKTOP_LAYOUT_MIN) {
    return Math.min(getSpotlightTagLimit(width), tags.length)
  }

  return Math.min(SPOTLIGHT_INITIAL_DESKTOP_TAGS, tags.length)
}

function getInitialProjectCardTagLimit(tags: readonly string[]): number {
  if (typeof window === 'undefined') {
    return Math.min(PROJECT_CARD_INITIAL_DESKTOP_TAGS, tags.length)
  }

  const width = window.innerWidth
  if (width < DESKTOP_LAYOUT_MIN) {
    return Math.min(getProjectCardTagLimit(width), tags.length)
  }

  return Math.min(PROJECT_CARD_INITIAL_DESKTOP_TAGS, tags.length)
}

export function useSpotlightTagsLine(
  containerRef: RefObject<HTMLElement | null>,
  tags: readonly string[],
) {
  const [tagLimit, setTagLimit] = useState(() => getInitialSpotlightTagLimit(tags))

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const syncLimit = () => {
      const viewportWidth = window.innerWidth

      if (viewportWidth < DESKTOP_LAYOUT_MIN) {
        setTagLimit(Math.min(getSpotlightTagLimit(viewportWidth), tags.length))
        return
      }

      setTagLimit(
        countTagsForSingleLine(container, tags, {
          moreClassName: 'home-projects__spotlight-tags-more',
          buildChip: buildSpotlightTagChip,
          unmeasuredFallback: SPOTLIGHT_INITIAL_DESKTOP_TAGS,
        }),
      )
    }

    syncLimit()

    const observer = new ResizeObserver(syncLimit)
    observer.observe(container)
    window.addEventListener('resize', syncLimit)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncLimit)
    }
  }, [containerRef, tags])

  return tagLimit
}

export function useProjectCardTagsLine(
  containerRef: RefObject<HTMLElement | null>,
  tags: readonly string[],
) {
  const [tagLimit, setTagLimit] = useState(() => getInitialProjectCardTagLimit(tags))

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const syncLimit = () => {
      const viewportWidth = window.innerWidth

      if (viewportWidth < DESKTOP_LAYOUT_MIN) {
        setTagLimit(Math.min(getProjectCardTagLimit(viewportWidth), tags.length))
        return
      }

      setTagLimit(
        countTagsForLines(container, tags, PROJECT_CARD_TAG_LINES, {
          moreClassName: 'project-card__tag-more',
          buildChip: buildProjectCardTagChip,
          unmeasuredFallback: PROJECT_CARD_INITIAL_DESKTOP_TAGS,
        }),
      )
    }

    syncLimit()

    const observer = new ResizeObserver(syncLimit)
    observer.observe(container)
    window.addEventListener('resize', syncLimit)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncLimit)
    }
  }, [containerRef, tags])

  return tagLimit
}

/** @deprecated Use useSpotlightTagsLine for per-project spotlight rows. */
export function useHomeProjectsSpotlightLayout() {
  const [tagLimit, setTagLimit] = useState(() =>
    typeof window !== 'undefined'
      ? getSpotlightTagLimit(window.innerWidth)
      : 2,
  )

  useEffect(() => {
    const syncLayout = () => {
      setTagLimit(getSpotlightTagLimit(window.innerWidth))
    }

    syncLayout()
    window.addEventListener('resize', syncLayout)

    return () => {
      window.removeEventListener('resize', syncLayout)
    }
  }, [])

  return { tagLimit }
}
