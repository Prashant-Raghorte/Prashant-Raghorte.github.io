import { useEffect, useId, useRef, useState } from 'react'
import { siteCopy } from '@/config/copy'
import { ChevronDownIcon } from '@/components/ui/icons'
import type { HomeSkillTabId } from '@/utils/skillCategories'

export type AboutSkillsCategoryOption = {
  id: HomeSkillTabId
  title: string
  count: number
}

type AboutSkillsCategoryPickerProps = {
  label: string
  items: AboutSkillsCategoryOption[]
  value: HomeSkillTabId
  onChange: (id: HomeSkillTabId) => void
}

export function AboutSkillsCategoryPicker({
  label,
  items,
  value,
  onChange,
}: AboutSkillsCategoryPickerProps) {
  const listboxId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const activeItem = items.find((item) => item.id === value) ?? items[0]

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const selectItem = (id: HomeSkillTabId) => {
    onChange(id)
    setOpen(false)
  }

  if (!activeItem) {
    return null
  }

  return (
    <div
      ref={rootRef}
      className={['about-skills__category-picker', open ? 'about-skills__category-picker--open' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <span className="about-skills__category-picker-label" id={`${listboxId}-label`}>
        {label}
      </span>

      <button
        type="button"
        className="about-skills__category-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={`${listboxId}-label ${listboxId}-value`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="about-skills__category-trigger-rail" aria-hidden="true">
          <span className="about-skills__category-trigger-node" />
        </span>
        <span className="about-skills__category-trigger-copy">
          <span className="about-skills__category-trigger-title" id={`${listboxId}-value`}>
            {activeItem.title}
          </span>
          <span className="about-skills__category-trigger-meta">
            {siteCopy.skills.skillCount(activeItem.count)}
          </span>
        </span>
        <span className="about-skills__category-trigger-chevron" aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </button>

      <ul
        id={listboxId}
        className="about-skills__category-menu"
        role="listbox"
        aria-labelledby={`${listboxId}-label`}
        aria-activedescendant={`${listboxId}-option-${value}`}
        hidden={!open}
      >
        {items.map((item, index) => {
          const isActive = item.id === value

          return (
            <li key={item.id} role="presentation">
              <button
                type="button"
                id={`${listboxId}-option-${item.id}`}
                role="option"
                aria-selected={isActive}
                className={[
                  'about-skills__category-option',
                  isActive ? 'about-skills__category-option--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => selectItem(item.id)}
              >
                <span className="about-skills__category-option-rail" aria-hidden="true">
                  <span className="about-skills__category-option-node" />
                  {index < items.length - 1 ? (
                    <span className="about-skills__category-option-connector" />
                  ) : null}
                </span>
                <span className="about-skills__category-option-copy">
                  <span className="about-skills__category-option-title">{item.title}</span>
                  <span className="about-skills__category-option-meta">
                    {siteCopy.skills.skillCount(item.count)}
                  </span>
                </span>
                {isActive ? (
                  <span className="about-skills__category-option-check" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
