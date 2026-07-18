import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ReadMoreToggle } from '@/components/common/ReadMoreToggle'
import './ReadMore.css'

type ReadMoreTextProps = {
  text: string
  maxLines?: number
  className?: string
}

function measureClampedOverflow(element: HTMLParagraphElement, maxLines: number): boolean {
  const hadClamp = element.classList.contains('read-more__text--clamped')
  const previousLineClamp = element.style.webkitLineClamp

  element.classList.add('read-more__text--clamped')
  element.style.webkitLineClamp = String(maxLines)

  const overflow = element.scrollHeight > element.clientHeight + 1

  if (!hadClamp) {
    element.classList.remove('read-more__text--clamped')
  }
  element.style.webkitLineClamp = previousLineClamp

  return overflow
}

export function ReadMoreText({ text, maxLines = 3, className = '' }: ReadMoreTextProps) {
  const [expanded, setExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [hasMeasured, setHasMeasured] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    setExpanded(false)
    setHasMeasured(false)
  }, [text, maxLines])

  useLayoutEffect(() => {
    const element = contentRef.current
    if (!element) return

    const checkOverflow = () => {
      setIsOverflowing(measureClampedOverflow(element, maxLines))
      setHasMeasured(true)
    }

    checkOverflow()

    const observer = new ResizeObserver(checkOverflow)
    observer.observe(element)
    window.addEventListener('resize', checkOverflow)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkOverflow)
    }
  }, [text, maxLines])

  const shouldClamp = !expanded && (hasMeasured ? isOverflowing : true)

  return (
    <div className={className}>
      <p
        ref={contentRef}
        className={['read-more__text', shouldClamp ? 'read-more__text--clamped' : '']
          .filter(Boolean)
          .join(' ')}
        style={shouldClamp ? { WebkitLineClamp: maxLines } : undefined}
      >
        {text}
      </p>
      {hasMeasured && isOverflowing ? (
        <ReadMoreToggle expanded={expanded} onToggle={() => setExpanded((current) => !current)} />
      ) : null}
    </div>
  )
}
