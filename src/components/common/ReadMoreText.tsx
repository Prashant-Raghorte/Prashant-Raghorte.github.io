import { useEffect, useRef, useState } from 'react'
import { ReadMoreToggle } from '@/components/common/ReadMoreToggle'
import './ReadMore.css'

const CHAR_FALLBACK_THRESHOLD = 150

type ReadMoreTextProps = {
  text: string
  maxLines?: number
  className?: string
}

export function ReadMoreText({ text, maxLines = 3, className = '' }: ReadMoreTextProps) {
  const [expanded, setExpanded] = useState(false)
  const [needsToggle, setNeedsToggle] = useState(text.length > CHAR_FALLBACK_THRESHOLD)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    const checkOverflow = () => {
      if (expanded) {
        setNeedsToggle(text.length > CHAR_FALLBACK_THRESHOLD)
        return
      }

      element.classList.add('read-more__text--clamped')
      element.style.webkitLineClamp = String(maxLines)

      const clamped = element.scrollHeight > element.clientHeight + 1
      setNeedsToggle(clamped || text.length > CHAR_FALLBACK_THRESHOLD)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [text, maxLines, expanded])

  return (
    <div className={className}>
      <p
        ref={contentRef}
        className={[
          'read-more__text',
          !expanded && needsToggle ? 'read-more__text--clamped' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={!expanded && needsToggle ? { WebkitLineClamp: maxLines } : undefined}
      >
        {text}
      </p>
      {needsToggle && (
        <ReadMoreToggle expanded={expanded} onToggle={() => setExpanded((current) => !current)} />
      )}
    </div>
  )
}
