export function scrollToElement(element: HTMLElement) {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (!element) return

  scrollToElement(element)

  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}
