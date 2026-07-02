import { siteCopy } from '@/config/copy'
import { PageHeader } from '@/components/common/PageHeader'
import { ContactConnectPanel } from '@/sections/contact/ContactConnectPanel'
import { ContactForm } from '@/sections/contact/ContactForm'
import { PageMeta } from '@/components/seo/PageMeta'
import '@/components/common/PageHeader.css'
import '@/sections/contact/ContactSection.css'

export function ContactPage() {
  return (
    <>
      <PageMeta page="contact" />
      <PageHeader
        title={siteCopy.pages.contact.title}
        subtitle={siteCopy.pages.contact.subtitle}
      />
      <section className="section-block contact-page">
        <div className="container contact-section">
          <ContactForm />
          <ContactConnectPanel />
        </div>
      </section>
    </>
  )
}
