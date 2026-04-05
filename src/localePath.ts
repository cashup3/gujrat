import type { Locale } from './copy'

export function isLocale(s: string | undefined): s is Locale {
  return s === 'en' || s === 'fa' || s === 'ur'
}

/** Public site paths: /en, /fa, /ur */
export function pathForLocale(locale: Locale, hash = ''): string {
  return `/${locale}${hash}`
}

export function defaultLocaleFromStorage(): Locale {
  try {
    const saved = localStorage.getItem('locale') ?? undefined
    if (isLocale(saved)) return saved
  } catch {
    /* ignore */
  }
  return 'en'
}
