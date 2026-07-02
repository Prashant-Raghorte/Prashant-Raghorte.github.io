import './ReadMore.css'

type ReadMoreToggleProps = {
  expanded: boolean
  onToggle: () => void
  className?: string
}

export function ReadMoreToggle({ expanded, onToggle, className = '' }: ReadMoreToggleProps) {
  return (
    <button
      type="button"
      className={`read-more__toggle ${className}`.trim()}
      onClick={onToggle}
      aria-expanded={expanded}
    >
      {expanded ? 'Show less' : 'Read more'}
      <span
        className={`read-more__toggle-icon ${expanded ? 'read-more__toggle-icon--open' : ''}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}
