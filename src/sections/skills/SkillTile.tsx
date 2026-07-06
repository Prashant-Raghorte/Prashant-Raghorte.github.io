import { getSkillIcon } from '@/utils/skillIcons'
import './SkillTile.css'

type SkillTileProps = {
  name: string
}

export function SkillTile({ name }: SkillTileProps) {
  const icon = getSkillIcon(name)

  return (
    <li className="skill-tile">
      <div className="skill-tile__surface">
        {icon ? (
          <img src={icon} alt="" className="skill-tile__icon" loading="lazy" decoding="async" />
        ) : (
          <span className="skill-tile__fallback" aria-hidden="true">
            {name.charAt(0)}
          </span>
        )}
        <span className="skill-tile__label">{name}</span>
      </div>
    </li>
  )
}

type SkillMoreTileProps = {
  count: number
  label: string
  onClick: () => void
}

export function SkillMoreTile({ count, label, onClick }: SkillMoreTileProps) {
  return (
    <li className="skill-tile">
      <button
        type="button"
        className="skill-tile__surface skill-tile__surface--more"
        onClick={onClick}
        aria-label={label}
      >
        <span className="skill-tile__more-count" aria-hidden="true">
          +{count}
        </span>
        <span className="skill-tile__label">more</span>
      </button>
    </li>
  )
}
