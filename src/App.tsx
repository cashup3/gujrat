import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { CommentsSection } from './CommentsSection'
import { FooterSocial } from './FooterSocial'
import { copy } from './copy'
import { formatPkr } from './formatPkr'
import { getSupabasePublicConfig } from './lib/supabase'
import { isLocale, pathForLocale } from './localePath'
import './App.css'

const SUGGESTED_AMOUNTS = ['$25', '$50', '$100', '$250']

type SiteStatsRow = {
  raised_cents: number
  donor_count: number
  goal_cents: number | null
}

/** DB stores PKR in paisa (1 rupee = 100 paisa), same shape as former USD cents. */
const STATS_FALLBACK: SiteStatsRow = {
  raised_cents: 33_158_000,
  donor_count: 276,
  /** 500,000 PKR campaign goal */
  goal_cents: 50_000_000,
}

function App() {
  const { locale: localeParam } = useParams<{ locale: string }>()
  const navigate = useNavigate()
  const { hash } = useLocation()

  if (!isLocale(localeParam)) {
    return <Navigate to={pathForLocale('en')} replace />
  }

  const locale = localeParam

  const t = copy[locale]
  const donateUrl = import.meta.env.VITE_DONATE_URL?.trim()
  const donateSecondaryUrl = import.meta.env.VITE_DONATE_URL_SECONDARY?.trim()
  const contactEmail =
    import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'hello@example.org'
  const socialInstagram = import.meta.env.VITE_SOCIAL_INSTAGRAM?.trim()
  const socialTiktok = import.meta.env.VITE_SOCIAL_TIKTOK?.trim()
  const socialFacebook = import.meta.env.VITE_SOCIAL_FACEBOOK?.trim()
  const [siteStats, setSiteStats] = useState<SiteStatsRow | null>(null)
  const dir = locale === 'fa' || locale === 'ur' ? 'rtl' : 'ltr'
  const lang = locale === 'fa' ? 'fa' : locale === 'ur' ? 'ur' : 'en'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    localStorage.setItem('locale', locale)
  }, [lang, dir, locale])

  useEffect(() => {
    const cfg = getSupabasePublicConfig()
    if (!cfg) return
    const sb = createClient(cfg.url, cfg.anonKey)
    void sb
      .from('site_stats')
      .select('raised_cents, donor_count, goal_cents')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error && data) setSiteStats(data)
      })
  }, [])

  const displayStats = siteStats ?? STATS_FALLBACK
  const goalPaisa = displayStats.goal_cents
  const hasGoal = goalPaisa != null && goalPaisa > 0
  const progressPct = hasGoal
    ? Math.min(
        100,
        Math.round((displayStats.raised_cents / goalPaisa) * 100),
      )
    : null

  return (
    <div className="page" dir={dir}>
      <header className="header">
        <Link className="header-brand-row" to={pathForLocale(locale, '#top')}>
          <span className="brand">{t.brand}</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <a href="#about">{t.navAbout}</a>
          <a href="#impact">{t.navImpact}</a>
          <a href="#donate">{t.navDonate}</a>
          <a href="#cta">{t.navCta}</a>
          <a href="#faq">{t.navFaq}</a>
          <a href="#comments">{t.navComments}</a>
        </nav>
        <div className="lang-toggle">
          <span className="visually-hidden">{t.langLabel}</span>
          <button
            type="button"
            aria-pressed={locale === 'en'}
            onClick={() => navigate(pathForLocale('en', hash))}
          >
            EN
          </button>
          <button
            type="button"
            aria-pressed={locale === 'fa'}
            onClick={() => navigate(pathForLocale('fa', hash))}
          >
            FA
          </button>
          <button
            type="button"
            aria-pressed={locale === 'ur'}
            onClick={() => navigate(pathForLocale('ur', hash))}
          >
            UR
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <p className="bismillah" lang="ar" dir="rtl">
            {t.bismillah}
          </p>

          <figure className="portrait-frame hero-poster">
            <img
              src="/hero-poster.png"
              alt={t.leaderAlt}
              width={1200}
              height={675}
              loading="eager"
              decoding="async"
            />
            <figcaption>{t.leaderCaption}</figcaption>
          </figure>

          <div className="hero hero-after-poster">
            <p className="hero-kicker">{t.heroKicker}</p>
            <h1 id="hero-title">{t.heroTitle}</h1>
            <p className="hero-lead">{t.heroLead}</p>
            <p className="hero-strength">{t.heroStrength}</p>
            <div className="hero-actions">
              {donateUrl ? (
                <a
                  className="btn btn-primary"
                  href={donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.heroCta}
                </a>
              ) : (
                <span className="btn btn-primary btn-disabled">
                  {t.heroCta}
                </span>
              )}
              <a className="btn btn-secondary" href="#impact">
                {t.heroSecondary}
              </a>
            </div>
          </div>
        </section>

        <section
          className="stats stats-showcase"
          aria-label={t.statsCampaignProgress}
        >
          <div className="stats-progress-card">
            <div className="stats-progress-card-glow" aria-hidden />
            <div className="stats-progress-card-inner">
              <header className="stats-progress-header">
                <h2 className="stats-progress-title">{t.statsCampaignProgress}</h2>
                {progressPct != null ? (
                  <span className="stats-progress-pct">{progressPct}%</span>
                ) : null}
              </header>
              {progressPct != null ? (
                <div
                  className="stats-progress-track"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progressPct}
                  aria-label={t.statsProgressAria.replace(
                    '{pct}',
                    String(progressPct),
                  )}
                >
                  <div
                    className="stats-progress-fill"
                    style={{
                      width: `${progressPct}%`,
                      ...(dir === 'rtl' ? { marginInlineStart: 'auto' } : {}),
                    }}
                  />
                </div>
              ) : null}
              <div
                className={`stats-progress-meta${hasGoal ? '' : ' stats-progress-meta--single'}`}
              >
                <div className="stats-meta-block">
                  <span className="stats-meta-amount">
                    {formatPkr(displayStats.raised_cents, locale)}
                  </span>
                  <span className="stats-meta-caption">{t.statsRaisedShort}</span>
                </div>
                {hasGoal ? (
                  <>
                    <div className="stats-meta-ornament" aria-hidden />
                    <div className="stats-meta-block stats-meta-block-goal">
                      <span className="stats-meta-amount stats-meta-amount-goal">
                        {formatPkr(goalPaisa!, locale)}
                      </span>
                      <span className="stats-meta-caption">{t.statsOurGoal}</span>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <aside className="stats-supporters-card" aria-label={t.statsDonors}>
            <span className="stats-supporters-mark" aria-hidden>
              ✦
            </span>
            <div className="stats-supporters-value">
              {displayStats.donor_count.toLocaleString(
                locale === 'ur' ? 'ur-PK' : locale === 'fa' ? 'fa-IR' : 'en-PK',
              )}
            </div>
            <p className="stats-supporters-label">{t.statsDonors}</p>
          </aside>
          <p className="stat-note">{t.statsNote}</p>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <h2 id="about-title">{t.aboutTitle}</h2>
          <p className="lead">{t.aboutBody}</p>
          <p className="lead about-duty">{t.aboutDuty}</p>
        </section>

        <section id="impact" className="section" aria-labelledby="impact-title">
          <h2 id="impact-title">{t.impactTitle}</h2>
          <p className="lead">{t.impactIntro}</p>
          <ul className="impact-list">
            {t.impactItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="lead impact-closing">{t.impactClosing}</p>
        </section>

        <section id="donate" className="section" aria-labelledby="donate-title">
          <h2 id="donate-title">{t.donateTitle}</h2>
          <p className="lead">{t.donateIntro}</p>
          <p className="donate-uses-heading">
            <strong>{t.donateUsesTitle}</strong>
          </p>
          <ul className="impact-list donate-uses-list">
            {t.donateUses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="lead donate-hope">{t.donateHope}</p>
          <p className="lead donate-payment-note">{t.donatePaymentNote}</p>
          <div className="donate-panel">
            <p className="amounts-heading">
              <strong>{t.amountsTitle}</strong>
            </p>
            <div className="amounts" role="list">
              {SUGGESTED_AMOUNTS.map((a) => (
                <span key={a} className="amount-chip" role="listitem">
                  {a}
                </span>
              ))}
            </div>
            {!donateUrl ? (
              <p className="donate-hint">{t.donatePlaceholder}</p>
            ) : null}
            <div className="donate-actions">
              {donateUrl ? (
                <a
                  className="btn btn-primary"
                  href={donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.donatePrimary}
                </a>
              ) : (
                <span className="btn btn-primary btn-disabled">
                  {t.donatePrimary}
                </span>
              )}
              {donateSecondaryUrl ? (
                <a
                  className="btn btn-secondary"
                  href={donateSecondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.donateSecondary}
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section id="cta" className="section cta-section" aria-labelledby="cta-title">
          <div className="cta-panel">
            <h2 id="cta-title">{t.ctaTitle}</h2>
            <p className="lead">{t.ctaLead}</p>
            <p className="cta-closing">{t.ctaClosing}</p>
            <div className="cta-actions">
              {donateUrl ? (
                <a
                  className="btn btn-primary"
                  href={donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.heroCta}
                </a>
              ) : (
                <a className="btn btn-secondary" href="#donate">
                  {t.navDonate}
                </a>
              )}
            </div>
          </div>
        </section>

        <section id="faq" className="section" aria-labelledby="faq-title">
          <h2 id="faq-title">{t.faqTitle}</h2>
          <div className="faq">
            {t.faqItems.map((item) => (
              <article key={item.q} className="faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <CommentsSection
          locale={locale}
          t={t}
          contactEmail={contactEmail}
        />
      </main>

      <footer className="footer">
        <FooterSocial
          instagram={socialInstagram}
          tiktok={socialTiktok}
          facebook={socialFacebook}
        />
        <p>
          <a href={`mailto:${contactEmail}`}>{t.footerContact}</a>
          {' · '}
          <span>{contactEmail}</span>
        </p>
      </footer>
    </div>
  )
}

export default App
