import { useCallback, useEffect, useState, type FormEvent } from 'react'
import type { Locale } from './copy'
import { getCommentsSupabase, getSupabasePublicConfig } from './lib/supabase'

export type CommentsCopy = {
  commentsTitle: string
  commentsIntro: string
  commentsFormTitle: string
  commentsFormLead: string
  commentsStep1: string
  commentsStep2: string
  commentsStep3: string
  commentsStep3Email: string
  commentsOfflineLead: string
  commentsEmailButton: string
  commentsOfflinePublished: string
  commentsPublishedTitle: string
  commentsVerifiedBadge: string
  commentsNameLabel: string
  commentsNamePlaceholder: string
  commentsBodyLabel: string
  commentsBodyPlaceholder: string
  commentsSubmit: string
  commentsSubmitting: string
  commentsSuccess: string
  commentsError: string
  commentsErrorRateLimit: string
  commentsErrorProfanity: string
  commentsEmpty: string
  commentsAnonymous: string
  commentsLoading: string
}

type Row = {
  id: string
  created_at: string
  display_name: string | null
  content: string
}

const MAX_LEN = 8000
const MAILTO_BODY_MAX = 1600

function buildMailtoHref(
  email: string,
  displayName: string,
  body: string,
): string | undefined {
  const trimmed = body.trim()
  if (!trimmed) return undefined
  let text = displayName.trim()
    ? `From: ${displayName.trim()}\n\n${trimmed}`
    : trimmed
  if (text.length > MAILTO_BODY_MAX) {
    text = text.slice(0, MAILTO_BODY_MAX - 16).trimEnd() + '\n\n[…]'
  }
  const subject = encodeURIComponent('Message from the campaign site')
  const mailBody = encodeURIComponent(text)
  return `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${mailBody}`
}

export function CommentsSection({
  locale,
  t,
  contactEmail,
}: {
  locale: Locale
  t: CommentsCopy
  contactEmail: string
}) {
  const supabase = getCommentsSupabase()
  const online = Boolean(getSupabasePublicConfig())
  const [rows, setRows] = useState<Row[]>([])
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'error'>(
    'idle',
  )
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success'>(
    'idle',
  )
  const [submitIssue, setSubmitIssue] = useState<
    null | 'generic' | 'rate' | 'profanity'
  >(null)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoadState('loading')
    const { data, error } = await supabase
      .from('comments')
      .select('id, created_at, display_name, content')
      .order('created_at', { ascending: false })
    if (error) {
      setLoadState('error')
      return
    }
    setRows((data ?? []) as Row[])
    setLoadState('idle')
  }, [supabase])

  useEffect(() => {
    if (!supabase) return
    void load()
  }, [supabase, load])

  useEffect(() => {
    setSubmitIssue(null)
  }, [content, name])

  useEffect(() => {
    if (submitState === 'success' && content.length > 0) {
      setSubmitState('idle')
    }
  }, [content, submitState])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!online || !supabase || submitState === 'sending') return
    const trimmed = content.trim()
    if (!trimmed || trimmed.length > MAX_LEN) return

    const cfg = getSupabasePublicConfig()
    if (!cfg) return

    setSubmitIssue(null)
    setSubmitState('sending')
    const displayName = name.trim() || null

    const endpoint = `${cfg.url.replace(/\/$/, '')}/functions/v1/submit-comment`
    let res: Response
    try {
      res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cfg.anonKey}`,
          apikey: cfg.anonKey,
        },
        body: JSON.stringify({
          content: trimmed,
          display_name: displayName,
        }),
      })
    } catch {
      setSubmitState('idle')
      setSubmitIssue('generic')
      return
    }

    let payload: { code?: string } = {}
    try {
      payload = (await res.json()) as { code?: string }
    } catch {
      /* ignore */
    }

    if (!res.ok) {
      setSubmitState('idle')
      if (res.status === 429 || payload.code === 'rate_limited') {
        setSubmitIssue('rate')
      } else if (payload.code === 'profanity') {
        setSubmitIssue('profanity')
      } else {
        setSubmitIssue('generic')
      }
      return
    }

    setSubmitState('success')
    setContent('')
    setName('')
  }

  const dateFmt = new Intl.DateTimeFormat(locale === 'en' ? 'en' : locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const mailHref = buildMailtoHref(contactEmail, name, content)

  return (
    <section
      id="comments"
      className="section comments-section"
      aria-labelledby="comments-title"
    >
      <h2 id="comments-title">{t.commentsTitle}</h2>
      <p className="lead comments-intro">{t.commentsIntro}</p>

      <div className="comment-box" aria-labelledby="comment-box-title">
        <div className="comment-box-inner">
          <h3 id="comment-box-title" className="comment-box-title">
            {t.commentsFormTitle}
          </h3>
          <p className="comment-box-lead">{t.commentsFormLead}</p>
          {!online ? (
            <p className="comment-box-offline-notice" role="note">
              {t.commentsOfflineLead}
            </p>
          ) : null}
          <ol className="comment-box-steps">
            <li>{t.commentsStep1}</li>
            <li>{t.commentsStep2}</li>
            <li>{online ? t.commentsStep3 : t.commentsStep3Email}</li>
          </ol>

          <form
            className="comment-form"
            onSubmit={onSubmit}
            aria-label={t.commentsFormTitle}
          >
            <label className="comment-field">
              <span className="comment-field-label">{t.commentsNameLabel}</span>
              <input
                type="text"
                name="display_name"
                autoComplete="name"
                maxLength={120}
                placeholder={t.commentsNamePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitState === 'sending'}
              />
            </label>
            <label className="comment-field">
              <span className="comment-field-label">{t.commentsBodyLabel}</span>
              <textarea
                name="content"
                required
                rows={7}
                maxLength={MAX_LEN}
                placeholder={t.commentsBodyPlaceholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={submitState === 'sending'}
                className="comment-textarea"
              />
            </label>
            <p className="comment-char-count">
              {content.length} / {MAX_LEN}
            </p>
            {online ? (
              <button
                type="submit"
                className="btn btn-primary comment-send-btn"
                disabled={
                  submitState === 'sending' || content.trim().length === 0
                }
              >
                {submitState === 'sending'
                  ? t.commentsSubmitting
                  : t.commentsSubmit}
              </button>
            ) : (
              <a
                className="btn btn-primary comment-send-btn"
                href={mailHref ?? '#'}
                onClick={(e) => {
                  if (!mailHref) e.preventDefault()
                }}
                aria-disabled={!mailHref}
              >
                {t.commentsEmailButton}
              </a>
            )}
            {submitState === 'success' ? (
              <p
                className="comment-form-feedback comment-form-success"
                role="status"
              >
                {t.commentsSuccess}
              </p>
            ) : null}
            {submitIssue === 'rate' ? (
              <p
                className="comment-form-feedback comment-form-error"
                role="alert"
              >
                {t.commentsErrorRateLimit}
              </p>
            ) : null}
            {submitIssue === 'profanity' ? (
              <p
                className="comment-form-feedback comment-form-error"
                role="alert"
              >
                {t.commentsErrorProfanity}
              </p>
            ) : null}
            {submitIssue === 'generic' ? (
              <p
                className="comment-form-feedback comment-form-error"
                role="alert"
              >
                {t.commentsError}
              </p>
            ) : null}
          </form>
        </div>
      </div>

      <div className="comments-published">
        <h3 className="comments-published-title">{t.commentsPublishedTitle}</h3>
        <div className="comments-list" aria-live="polite">
          {!online ? (
            <p className="comments-empty">{t.commentsOfflinePublished}</p>
          ) : loadState === 'loading' ? (
            <p className="comments-status">{t.commentsLoading}</p>
          ) : loadState === 'error' ? (
            <p className="comments-status comments-status-error">
              {t.commentsError}
            </p>
          ) : rows.length === 0 ? (
            <p className="comments-empty">{t.commentsEmpty}</p>
          ) : (
            rows.map((row) => (
              <article key={row.id} className="comment-card">
                <header className="comment-card-header">
                  <span className="comment-author">
                    {row.display_name?.trim() || t.commentsAnonymous}
                  </span>
                  <span
                    className="comment-verified"
                    title={t.commentsVerifiedBadge}
                  >
                    {t.commentsVerifiedBadge}
                  </span>
                  <time dateTime={row.created_at}>
                    {dateFmt.format(new Date(row.created_at))}
                  </time>
                </header>
                <p className="comment-body">{row.content}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
