import { useMemo, useState, type CSSProperties, type FormEvent } from 'react'
import { siteCopy } from '@/config/copy'
import { Button } from '@/components/ui/Button'
import { SendIcon } from '@/components/ui/icons'
import { submitContactForm } from '@/utils/submitContactForm'
import './ContactForm.css'

type FormFields = {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const DEFAULT_SUBJECT = 'Professional inquiry'

const initialFields: FormFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
}

const THREAD_PROMPTS = [
  {
    id: 'welcome',
    text: 'Share the role, project, or collaboration brief — stack, timeline, and what you need help with.',
  },
  {
    id: 'pace',
    text: 'I usually reply within 1–2 business days with a clear next step.',
  },
] as const

const INTENT_CHIPS = [
  { id: 'role', label: 'Full-time role', subject: 'Full-time backend role' },
  { id: 'freelance', label: 'Freelance build', subject: 'Freelance / contract project' },
  { id: 'collab', label: 'Collaboration', subject: 'Technical collaboration' },
] as const

const MESSAGE_SOFT_LIMIT = 600

export function ContactForm() {
  const { contactForm } = siteCopy.sections
  const [fields, setFields] = useState<FormFields>(initialFields)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [activeIntent, setActiveIntent] = useState<string | null>(null)

  const updateField = (key: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }))
  }

  const steps = useMemo(
    () => [
      {
        id: 'identity',
        label: 'Identity',
        done: Boolean(fields.name.trim() && fields.email.trim()),
      },
      {
        id: 'topic',
        label: 'Topic',
        done: Boolean(fields.subject.trim()),
      },
      {
        id: 'brief',
        label: 'Brief',
        done: Boolean(fields.message.trim()),
      },
    ],
    [fields.email, fields.message, fields.name, fields.subject],
  )

  const completedSteps = steps.filter((step) => step.done).length
  const activeStepIndex = steps.findIndex((step) => !step.done)
  const messageLength = fields.message.length
  const progress = Math.round((completedSteps / steps.length) * 100)

  const applyIntent = (intent: (typeof INTENT_CHIPS)[number]) => {
    setActiveIntent(intent.id)
    updateField('subject', intent.subject)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (fields.website) {
      return
    }

    if (!fields.name.trim() || !fields.email.trim() || !fields.message.trim()) {
      setStatus('error')
      setErrorMessage('Please fill in your name, email, and message.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      await submitContactForm({
        name: fields.name.trim(),
        email: fields.email.trim(),
        subject: fields.subject.trim() || DEFAULT_SUBJECT,
        message: fields.message.trim(),
      })

      setStatus('success')
      setFields(initialFields)
      setActiveIntent(null)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again later.',
      )
    }
  }

  return (
    <div className="contact-thread">
      <div className="contact-thread__chrome">
        <div className="contact-thread__chrome-left" aria-hidden="true">
          <span className="contact-thread__dot contact-thread__dot--a" />
          <span className="contact-thread__dot contact-thread__dot--b" />
          <span className="contact-thread__dot contact-thread__dot--c" />
          <span className="contact-thread__chrome-title">inquiry · draft</span>
        </div>
        <div className="contact-thread__chrome-right" aria-hidden="true">
          <span className="contact-thread__encrypted">encrypted transit</span>
          <span className="contact-thread__progress-label">{progress}%</span>
        </div>
      </div>

      <div className="contact-thread__steps" aria-label="Compose progress">
        {steps.map((step, index) => {
          const isActive = activeStepIndex === index
          const isDone = step.done
          const stateLabel = isDone ? 'Done' : isActive ? 'Current' : 'Next'

          return (
            <div
              key={step.id}
              className={[
                'contact-thread__step',
                isDone ? 'contact-thread__step--done' : '',
                isActive ? 'contact-thread__step--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="contact-thread__step-index" aria-hidden="true">
                {isDone ? '✓' : String(index + 1).padStart(2, '0')}
              </span>
              <span className="contact-thread__step-copy">
                <span className="contact-thread__step-label">{step.label}</span>
                <span className="contact-thread__step-state">{stateLabel}</span>
              </span>
            </div>
          )
        })}
      </div>

      <div className="contact-thread__feed" aria-live="polite">
        <div className="contact-thread__typing" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        {THREAD_PROMPTS.map((prompt, index) => (
          <div
            key={prompt.id}
            className="contact-thread__bubble contact-thread__bubble--system"
            style={{ '--bubble-i': index } as CSSProperties}
          >
            <span className="contact-thread__bubble-tag">Prashant</span>
            <p className="contact-thread__bubble-text">{prompt.text}</p>
          </div>
        ))}

        {status === 'success' ? (
          <div className="contact-thread__bubble contact-thread__bubble--success" role="status">
            <span className="contact-thread__bubble-tag">Delivered</span>
            <p className="contact-thread__bubble-text">{contactForm.success}</p>
          </div>
        ) : null}
      </div>

      <form className="contact-thread__compose" onSubmit={handleSubmit} noValidate>
        <div className="contact-thread__intents" role="group" aria-label="Quick intent">
          {INTENT_CHIPS.map((intent) => (
            <button
              key={intent.id}
              type="button"
              className={[
                'contact-thread__intent',
                activeIntent === intent.id ? 'contact-thread__intent--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => applyIntent(intent)}
              disabled={status === 'submitting'}
            >
              {intent.label}
            </button>
          ))}
        </div>

        <div className="contact-thread__identity">
          <label className="contact-thread__field">
            <span className="contact-thread__label">{contactForm.labels.name}</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              value={fields.name}
              disabled={status === 'submitting'}
              placeholder={contactForm.placeholders.name}
              onChange={(event) => updateField('name', event.target.value)}
            />
          </label>
          <label className="contact-thread__field">
            <span className="contact-thread__label">{contactForm.labels.email}</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={fields.email}
              disabled={status === 'submitting'}
              placeholder={contactForm.placeholders.email}
              onChange={(event) => updateField('email', event.target.value)}
            />
          </label>
        </div>

        <label className="contact-thread__field">
          <span className="contact-thread__label">{contactForm.labels.subject}</span>
          <input
            type="text"
            name="subject"
            value={fields.subject}
            disabled={status === 'submitting'}
            placeholder={contactForm.placeholders.subject}
            onChange={(event) => {
              setActiveIntent(null)
              updateField('subject', event.target.value)
            }}
          />
        </label>

        <label className="contact-thread__field contact-thread__field--message">
          <span className="contact-thread__label-row">
            <span className="contact-thread__label">{contactForm.labels.message}</span>
            <span
              className={[
                'contact-thread__counter',
                messageLength > MESSAGE_SOFT_LIMIT ? 'contact-thread__counter--warn' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {messageLength}
            </span>
          </span>
          <textarea
            name="message"
            required
            rows={5}
            value={fields.message}
            disabled={status === 'submitting'}
            placeholder={contactForm.placeholders.message}
            onChange={(event) => updateField('message', event.target.value)}
          />
        </label>

        <label className="contact-thread__honeypot" aria-hidden="true">
          <span>Website</span>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={fields.website}
            onChange={(event) => updateField('website', event.target.value)}
          />
        </label>

        {status === 'error' && errorMessage ? (
          <p className="contact-thread__error" role="alert">
            {errorMessage} {contactForm.errorFallback}
          </p>
        ) : null}

        <div className="contact-thread__actions">
          <p className="contact-thread__hint">No spam · replies in 1–2 business days</p>
          <Button
            type="submit"
            variant="shine"
            disabled={status === 'submitting'}
            icon={<SendIcon />}
          >
            {status === 'submitting' ? contactForm.submitting : contactForm.submit}
          </Button>
        </div>
      </form>
    </div>
  )
}
