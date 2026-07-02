import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

type ButtonBaseProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  disabled?: boolean
  variant?: 'shine' | 'ghost' | 'soft'
}

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined
  to?: undefined
  download?: undefined
  onClick?: () => void
  type?: 'button' | 'submit'
}

type ButtonAsLink = ButtonBaseProps & {
  href: string
  to?: undefined
  download?: boolean | string
  onClick?: () => void
  target?: string
  rel?: string
}

type ButtonAsRouterLink = ButtonBaseProps & {
  to: string
  href?: undefined
  onClick?: () => void
}

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsRouterLink

export function Button(props: ButtonProps) {
  const {
    children,
    className = '',
    icon,
    variant = 'shine',
    ...rest
  } = props

  const classes = ['ui-btn', `ui-btn--${variant}`, className].filter(Boolean).join(' ')

  const content = (
    <>
      {icon && <span className="ui-btn__icon">{icon}</span>}
      <span className="ui-btn__label">{children}</span>
    </>
  )

  const inner =
    variant === 'shine' ? (
      <span className="ui-btn__inner">{content}</span>
    ) : variant === 'ghost' ? (
      <span className="ui-btn__inner ui-btn__inner--ghost">{content}</span>
    ) : (
      content
    )

  if ('to' in rest && rest.to) {
    const { to, onClick } = rest
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {inner}
      </Link>
    )
  }

  if ('href' in rest && rest.href) {
    const { href, download, onClick, target, rel } = rest
    return (
      <a
        href={href}
        className={classes}
        download={download}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {inner}
      </a>
    )
  }

  const { onClick, type = 'button', disabled } = rest as ButtonAsButton

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  )
}
