import { useState } from 'react'
import { ReadMoreToggle } from '@/components/common/ReadMoreToggle'
import './ReadMore.css'

type ReadMoreListProps = {
  items: string[]
  previewCount?: number
  className?: string
  listClassName?: string
  itemClassName?: string
}

export function ReadMoreList({
  items,
  previewCount = 2,
  className = '',
  listClassName = '',
  itemClassName = '',
}: ReadMoreListProps) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = items.length > previewCount

  return (
    <div className={className}>
      <ul
        className={[
          listClassName,
          'read-more__list',
          expanded ? 'read-more__list--expanded' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {items.map((item, index) => (
          <li
            key={item}
            className={[
              itemClassName,
              hasMore && !expanded && index >= previewCount ? 'read-more__list-item--hidden' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {item}
          </li>
        ))}
      </ul>
      {hasMore && (
        <ReadMoreToggle expanded={expanded} onToggle={() => setExpanded((current) => !current)} />
      )}
    </div>
  )
}
