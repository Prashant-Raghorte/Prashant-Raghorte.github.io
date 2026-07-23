import { useEffect, useState, type CSSProperties } from 'react'
import { siteCopy } from '@/config/copy'
import { siteConfig } from '@/config/site'
import { PageHeader } from '@/components/common/PageHeader'
import { ContactConnectPanel } from '@/sections/contact/ContactConnectPanel'
import { ContactForm } from '@/sections/contact/ContactForm'
import { PageMeta } from '@/components/seo/PageMeta'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useInView } from '@/hooks/useInView'
import { getContactChannels } from '@/utils/contactChannels'
import '@/components/common/PageHeader.css'
import '@/components/ui/ShineBorderCard.css'
import '@/sections/contact/ContactSection.css'

function formatIstClock(date: Date) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function splitIstClock(clock: string) {
  return clock.split(':')
}

export function ContactPage() {
  const channelCount = getContactChannels().length
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 })
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const istClock = formatIstClock(now)
  const [istHours, istMinutes, istSeconds] = splitIstClock(istClock)
  const latencyMs = 18 + (now.getSeconds() % 9)
  const uplink = 92 + (now.getSeconds() % 7)
  const deskReady = siteConfig.availability.state === 'open'

  return (
    <>
      <PageMeta page="contact" />
      <PageHeader
        className="page-header--projects"
        title={siteCopy.pages.contact.title}
        subtitle={siteCopy.pages.contact.subtitle}
      />

      <section
        ref={ref}
        className={['contact-studio', inView ? 'contact-studio--in-view' : '']
          .filter(Boolean)
          .join(' ')}
        aria-labelledby="contact-studio-title"
      >
        <div className="container contact-studio__frame">
          <div className="contact-studio__wash" aria-hidden="true">
            <span className="contact-studio__beam contact-studio__beam--a" />
            <span className="contact-studio__beam contact-studio__beam--b" />
            <span className="contact-studio__beam contact-studio__beam--c" />
            <span className="contact-studio__mesh" />
            <span className="contact-studio__noise" />
          </div>

          <header className="contact-studio__head">
            <span className="contact-studio__head-accent" aria-hidden="true" />
            <div className="contact-studio__head-copy">
              <h2 className="contact-studio__head-title">
                {siteCopy.pages.contact.showcaseWidgetTitle}
              </h2>
              <p className="contact-studio__head-hint">
                {siteCopy.pages.contact.showcaseWidgetHint}
              </p>
            </div>
          </header>

          <ShineBorderCard
            hoverOnly
            className="contact-studio__status contact-glass contact-glass--status"
          >
            <header
              className={[
                'contact-glass__face',
                'contact-desk',
                deskReady ? 'contact-desk--ready' : 'contact-desk--limited',
              ].join(' ')}
              aria-label="Contact desk status"
            >
              <span className="contact-desk__scan" aria-hidden="true" />
              <span className="contact-desk__grid" aria-hidden="true" />
              <span className="contact-desk__frame contact-desk__frame--tl" aria-hidden="true" />
              <span className="contact-desk__frame contact-desk__frame--tr" aria-hidden="true" />
              <span className="contact-desk__frame contact-desk__frame--bl" aria-hidden="true" />
              <span className="contact-desk__frame contact-desk__frame--br" aria-hidden="true" />

              <div className="contact-desk__top">
                <span className="contact-desk__channel">
                  <span className="contact-desk__channel-dot" aria-hidden="true" />
                  SIGNAL · DESK
                  <span className="contact-desk__beamline" aria-hidden="true" />
                </span>
                <span className="contact-desk__top-meta" aria-hidden="true">
                  <span>CH-{String(channelCount).padStart(2, '0')}</span>
                  <span>LINK SECURE</span>
                  <span>SLA · FAST</span>
                  <span className="contact-desk__top-meta--accent">{uplink}% UPLINK</span>
                </span>
              </div>

              <div className="contact-desk__main">
                <div
                  className="contact-desk__node"
                  aria-hidden="true"
                  style={{ '--desk-uplink': `${uplink}%` } as CSSProperties}
                >
                  <span className="contact-desk__gauge" />
                  <span className="contact-desk__orbit contact-desk__orbit--outer" />
                  <span className="contact-desk__orbit contact-desk__orbit--mid" />
                  <span className="contact-desk__sweep" />
                  <span className="contact-desk__core" />
                </div>

                <div className="contact-desk__lead">
                  <span className="contact-desk__kicker">Contact desk</span>
                  <span className="contact-desk__title">
                    {deskReady ? 'Ready for new conversations' : siteConfig.availability.label}
                  </span>
                  <span className="contact-desk__sub">
                    Direct routes online · async replies preferred
                  </span>
                  <div className="contact-desk__routes" aria-hidden="true">
                    {Array.from({ length: channelCount }, (_, index) => (
                      <span
                        key={index}
                        className="contact-desk__route"
                        style={{ '--route-i': index } as CSSProperties}
                      />
                    ))}
                    <span className="contact-desk__routes-label">{channelCount} live routes</span>
                  </div>
                </div>

                <div className="contact-desk__metrics" role="list">
                  <div className="contact-desk__wave" aria-hidden="true">
                    <span className="contact-desk__wave-label">RX</span>
                    <div className="contact-desk__wave-bars">
                      {Array.from({ length: 14 }, (_, index) => (
                        <span
                          key={index}
                          className="contact-desk__bar"
                          style={{ '--bar-i': index } as CSSProperties}
                        />
                      ))}
                    </div>
                    <span className="contact-desk__wave-label">TX</span>
                  </div>

                  {siteConfig.location ? (
                    <div className="contact-desk__metric" role="listitem">
                      <span className="contact-desk__metric-idx" aria-hidden="true">
                        01
                      </span>
                      <span className="contact-desk__metric-key">Base</span>
                      <span className="contact-desk__metric-val">{siteConfig.location}</span>
                      <span className="contact-desk__metric-hint">UTC+05:30</span>
                    </div>
                  ) : null}
                  <div className="contact-desk__metric contact-desk__metric--live" role="listitem">
                    <span className="contact-desk__metric-idx" aria-hidden="true">
                      02
                    </span>
                    <span className="contact-desk__metric-key">IST clock</span>
                    <span className="contact-desk__metric-val contact-desk__metric-val--mono">
                      <span className="contact-desk__digits" aria-label={istClock}>
                        <span className="contact-desk__digit">{istHours}</span>
                        <span className="contact-desk__colon" aria-hidden="true">
                          :
                        </span>
                        <span className="contact-desk__digit">{istMinutes}</span>
                        <span className="contact-desk__colon" aria-hidden="true">
                          :
                        </span>
                        <span className="contact-desk__digit">{istSeconds}</span>
                      </span>
                      <span className="contact-desk__tick" aria-hidden="true" />
                    </span>
                    <span className="contact-desk__metric-hint">live sync</span>
                  </div>
                  <div className="contact-desk__metric" role="listitem">
                    <span className="contact-desk__metric-idx" aria-hidden="true">
                      03
                    </span>
                    <span className="contact-desk__metric-key">Reply window</span>
                    <span className="contact-desk__metric-val">1–2 business days</span>
                    <span className="contact-desk__metric-hint">email · form</span>
                  </div>
                </div>
              </div>

              <div className="contact-desk__footer" aria-hidden="true">
                <span className="contact-desk__footer-item">
                  HANDSHAKE
                  <strong>OK</strong>
                </span>
                <span className="contact-desk__footer-item">
                  LATENCY
                  <strong>{latencyMs}ms</strong>
                </span>
                <span className="contact-desk__footer-item">
                  BUFFER
                  <strong>CLEAR</strong>
                </span>
                <span className="contact-desk__footer-track">
                  <span
                    className="contact-desk__footer-fill"
                    style={{ '--desk-uplink': `${uplink}%` } as CSSProperties}
                  />
                </span>
              </div>
            </header>
          </ShineBorderCard>

          <div className="contact-studio__stage">
            <div className="contact-studio__brand">
              <div className="contact-studio__kicker-row">
                <p className="contact-studio__kicker">
                  <span className="contact-studio__kicker-idx" aria-hidden="true">
                    01
                  </span>
                  <span className="contact-studio__kicker-text">New thread</span>
                  <span className="contact-studio__kicker-beam" aria-hidden="true" />
                </p>
                <span className="contact-studio__session" aria-hidden="true">
                  <span className="contact-studio__session-ring">
                    <span className="contact-studio__session-dot" />
                  </span>
                  session live
                </span>
              </div>

              <h2 id="contact-studio-title" className="contact-studio__title">
                <span className="contact-studio__title-line">Start</span>
                <span className="contact-studio__title-line contact-studio__title-line--accent">
                  the conversation
                </span>
              </h2>

              <p className="contact-studio__lede">
                <span className="contact-studio__lede-rail" aria-hidden="true" />
                <span className="contact-studio__lede-copy">{siteCopy.pages.contact.lede}</span>
              </p>

              <ShineBorderCard
                hoverOnly
                className="contact-studio__dock-wrap contact-glass contact-glass--dock"
              >
                <div className="contact-glass__face">
                  <div className="contact-studio__dock-head">
                    <p className="contact-studio__dock-label">Jump in directly</p>
                    <span className="contact-studio__dock-count" aria-hidden="true">
                      {channelCount} routes
                    </span>
                  </div>
                  <ContactConnectPanel />
                </div>
              </ShineBorderCard>
            </div>

            <ShineBorderCard
              hoverOnly
              className="contact-studio__thread contact-glass contact-glass--thread"
            >
              <div
                className="contact-glass__face contact-glass__face--thread"
                aria-label="Message composer"
              >
                <ContactForm />
              </div>
            </ShineBorderCard>
          </div>
        </div>
      </section>
    </>
  )
}
