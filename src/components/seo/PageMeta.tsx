import { useEffect } from 'react'
import { getPageSeo, type SeoPage } from '@/config/seo'
import { siteConfig } from '@/config/site'

type PageMetaProps = {
  page: SeoPage
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const META_SELECTOR = 'data-page-meta'

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
): void {
  const selector = `meta[${attribute}="${key}"][${META_SELECTOR}]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    element.setAttribute(META_SELECTOR, 'true')
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  const selector = `link[rel="${rel}"][${META_SELECTOR}]`
  let element = document.head.querySelector<HTMLLinkElement>(selector)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    element.setAttribute(META_SELECTOR, 'true')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function upsertJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]): void {
  const selector = `script[type="application/ld+json"]#${id}`
  let element = document.head.querySelector<HTMLScriptElement>(selector)

  if (!element) {
    element = document.createElement('script')
    element.type = 'application/ld+json'
    element.id = id
    element.setAttribute(META_SELECTOR, 'true')
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

export function PageMeta({ page, jsonLd }: PageMetaProps) {
  const seo = getPageSeo(page)

  useEffect(() => {
    document.title = seo.title

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'author', siteConfig.name)
    upsertMeta('name', 'robots', 'index, follow')

    upsertLink('canonical', seo.url)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', siteConfig.name)
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', seo.url)
    upsertMeta('property', 'og:image', seo.image)
    upsertMeta('property', 'og:locale', 'en_IN')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', seo.image)

    if (jsonLd) {
      upsertJsonLd('page-json-ld', jsonLd)
    }
  }, [jsonLd, seo.description, seo.image, seo.title, seo.url])

  return null
}
