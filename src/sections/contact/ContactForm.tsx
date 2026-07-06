import { useState, type FormEvent } from 'react'
import { siteCopy } from '@/config/copy'
import { Button } from '@/components/ui/Button'
import { SendIcon } from '@/components/ui/icons'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
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

const initialFields: FormFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
}

export function ContactForm() {
  const { contactForm } = siteCopy.sections
  const [fields, setFields] = useState<FormFields>(initialFields)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const updateField = (key: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }))
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
        subject: fields.subject.trim(),
        message: fields.message.trim(),
      })

      setStatus('success')
      setFields(initialFields)
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
    <ShineBorderCard hoverOnly className="contact-form-card">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__header">
          <h3 className="contact-form__title">{contactForm.title}</h3>
          <p className="contact-form__subtitle">{contactForm.subtitle}</p>
        </div>

        <div className="contact-form__grid">
          <label className="contact-form__field">
            <span className="contact-form__label">{contactForm.labels.name}</span>
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

          <label className="contact-form__field">
            <span className="contact-form__label">{contactForm.labels.email}</span>
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

        <label className="contact-form__field">
          <span className="contact-form__label">{contactForm.labels.subject}</span>
          <input
            type="text"
            name="subject"
            value={fields.subject}
            disabled={status === 'submitting'}
            placeholder={contactForm.placeholders.subject}
            onChange={(event) => updateField('subject', event.target.value)}
          />
        </label>

        <label className="contact-form__field">
          <span className="contact-form__label">{contactForm.labels.message}</span>
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

        <label className="contact-form__honeypot" aria-hidden="true">
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

        {status === 'success' && (
          <p className="contact-form__feedback contact-form__feedback--success" role="status">
            {contactForm.success}
          </p>
        )}

        {status === 'error' && errorMessage && (
          <p className="contact-form__feedback contact-form__feedback--error" role="alert">
            {errorMessage} {contactForm.errorFallback}
          </p>
        )}

        <div className="contact-form__actions">
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
    </ShineBorderCard>
  )
}
