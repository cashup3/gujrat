import type { Locale } from './copy'

/** DB stores PKR in paisa (1 rupee = 100 paisa). */
export function formatPkr(paisa: number, locale: Locale = 'en') {
  const locTag = locale === 'ur' ? 'ur-PK' : 'en-PK'
  const frac = paisa % 100 === 0 ? 0 : 2
  return new Intl.NumberFormat(locTag, {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: frac,
  }).format(paisa / 100)
}
