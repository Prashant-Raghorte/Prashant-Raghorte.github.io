import { getSkillIcon } from '@/utils/skillIcons'
import './SkillChip.css'

type SkillChipProps = {
  name: string
}

export function SkillChip({ name }: SkillChipProps) {
  const icon = getSkillIcon(name)

  return (
    <li className="skills-chip">
      {icon ? (
        <img src={icon} alt="" className="skills-chip__icon" loading="lazy" decoding="async" />
      ) : (
        <span className="skills-chip__fallback" aria-hidden="true">
          {name.charAt(0)}
        </span>
      )}
      <span className="skills-chip__label">{name}</span>
    </li>
  )
}
