import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  callAdminApi,
  clearStoredAdminSecret,
  getStoredAdminSecret,
  setStoredAdminSecret,
} from './adminApi'
import { formatPkr } from './formatPkr'
import { getSupabasePublicConfig } from './lib/supabase'
import './App.css'

type CommentRow = {
  id: string
  created_at: string
  display_name: string | null
  content: string
  verified: boolean
}

type StatsRow = {
  raised_cents: number
  donor_count: number
  goal_cents: number | null
}

export function AdminPortal() {
  const cfg = getSupabasePublicConfig()
  const [secretInput, setSecretInput] = useState('')
  const [sessionSecret, setSessionSecret] = useState<string | null>(() =>
    getStoredAdminSecret(),
  )
  const [loginError, setLoginError] = useState<string | null>(null)
  const [tab, setTab] = useState<'stats' | 'comments'>('stats')
  const [comments, setComments] = useState<CommentRow[]>([])
  const [stats, setStats] = useState<StatsRow | null>(null)
  const [raisedRupees, setRaisedRupees] = useState('')
  const [donorCount, setDonorCount] = useState('')
  const [goalRupees, setGoalRupees] = useState('')
  const [loading, setLoading] = useState(false)
  const [saveMsg, setSaveMsg] = useState<string | null>(null)

  const secret = sessionSecret

  const loadAll = useCallback(async () => {
    if (!cfg || !secret) return
    setLoading(true)
    setSaveMsg(null)
    const [cRes, sRes] = await Promise.all([
      callAdminApi(cfg.url, cfg.anonKey, secret, 'list_comments'),
      callAdminApi(cfg.url, cfg.anonKey, secret, 'get_stats'),
    ])
    setLoading(false)
    if (cRes.ok && cRes.data && typeof cRes.data === 'object' && 'comments' in cRes.data) {
      setComments((cRes.data as { comments: CommentRow[] }).comments)
    }
    if (sRes.ok && sRes.data && typeof sRes.data === 'object' && 'stats' in sRes.data) {
      const s = (sRes.data as { stats: StatsRow }).stats
      setStats(s)
      setRaisedRupees((s.raised_cents / 100).toFixed(2))
      setDonorCount(String(s.donor_count))
      setGoalRupees(
        s.goal_cents != null ? (s.goal_cents / 100).toFixed(2) : '',
      )
    }
    if (!cRes.ok || !sRes.ok) {
      if (cRes.status === 401 || sRes.status === 401) {
        clearStoredAdminSecret()
        setSessionSecret(null)
        setLoginError('Invalid secret or session expired.')
      }
    }
  }, [cfg, secret])

  useEffect(() => {
    if (cfg && secret) void loadAll()
  }, [cfg, secret, loadAll])

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoginError(null)
    if (!cfg || !secretInput.trim()) return
    const res = await callAdminApi(
      cfg.url,
      cfg.anonKey,
      secretInput.trim(),
      'get_stats',
    )
    if (!res.ok) {
      setLoginError('Wrong secret or server error. Check ADMIN_PORTAL_SECRET in Supabase.')
      return
    }
    setStoredAdminSecret(secretInput.trim())
    setSessionSecret(secretInput.trim())
    setSecretInput('')
  }

  function logout() {
    clearStoredAdminSecret()
    setSessionSecret(null)
    setComments([])
    setStats(null)
  }

  async function saveStats(e: React.FormEvent) {
    e.preventDefault()
    if (!cfg || !secret) return
    setSaveMsg(null)
    const raised = Math.round(parseFloat(raisedRupees || '0') * 100)
    const donors = parseInt(donorCount || '0', 10)
    const goal =
      goalRupees.trim() === ''
        ? null
        : Math.round(parseFloat(goalRupees) * 100)
    const res = await callAdminApi(cfg.url, cfg.anonKey, secret, 'set_stats', {
      raised_cents: raised,
      donor_count: donors,
      goal_cents: goal,
    })
    setSaveMsg(res.ok ? 'Saved.' : 'Could not save.')
    if (res.ok) void loadAll()
  }

  async function toggleVerified(c: CommentRow) {
    if (!cfg || !secret) return
    const res = await callAdminApi(
      cfg.url,
      cfg.anonKey,
      secret,
      'set_verified',
      { id: c.id, verified: !c.verified },
    )
    if (res.ok) void loadAll()
  }

  async function removeComment(id: string) {
    if (!cfg || !secret) return
    if (!confirm('Delete this message permanently?')) return
    const res = await callAdminApi(cfg.url, cfg.anonKey, secret, 'delete_comment', {
      id,
    })
    if (res.ok) void loadAll()
  }

  if (!cfg) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h1>Admin</h1>
          <p>
            Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>{' '}
            to your <code>.env</code>, then restart the dev server.
          </p>
          <p>
            <Link to="/">← Back to site</Link>
          </p>
        </div>
      </div>
    )
  }

  if (!sessionSecret) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h1>Admin sign in</h1>
          <p className="admin-lead">
            Enter the same secret you set in Supabase as{' '}
            <code>ADMIN_PORTAL_SECRET</code> (never commit it). It is not stored in
            this app’s build — only in your session after you sign in.
          </p>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <label>
              Admin secret
              <input
                type="password"
                autoComplete="off"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                placeholder="Paste your portal secret"
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
          {loginError ? <p className="admin-error">{loginError}</p> : null}
          <p className="admin-footer-link">
            <Link to="/">← Back to site</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Campaign admin</h1>
        <nav className="admin-nav">
          <button
            type="button"
            className={tab === 'stats' ? 'active' : ''}
            onClick={() => setTab('stats')}
          >
            Donations & totals
          </button>
          <button
            type="button"
            className={tab === 'comments' ? 'active' : ''}
            onClick={() => setTab('comments')}
          >
            Comments & messages
          </button>
          <button type="button" className="admin-logout" onClick={logout}>
            Sign out
          </button>
        </nav>
        <Link to="/" className="admin-site-link">
          View public site →
        </Link>
      </header>

      {loading ? <p className="admin-loading">Loading…</p> : null}

      {tab === 'stats' ? (
        <section className="admin-panel">
          <h2>Donation totals (manual)</h2>
          <p className="admin-lead">
            Update what visitors see in the stats strip. Amounts are in Pakistani
            rupees (PKR). Use totals from your payment provider, bank, or manual
            count.
          </p>
          <form className="admin-stats-form" onSubmit={saveStats}>
            <label>
              Total raised (PKR)
              <input
                type="number"
                step="0.01"
                min={0}
                value={raisedRupees}
                onChange={(e) => setRaisedRupees(e.target.value)}
              />
            </label>
            <label>
              Supporter / donor count
              <input
                type="number"
                min={0}
                step={1}
                value={donorCount}
                onChange={(e) => setDonorCount(e.target.value)}
              />
            </label>
            <label>
              Goal (PKR, optional)
              <input
                type="number"
                step="0.01"
                min={0}
                value={goalRupees}
                onChange={(e) => setGoalRupees(e.target.value)}
                placeholder="Leave empty to hide goal"
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Save totals
            </button>
          </form>
          {saveMsg ? <p className="admin-save-msg">{saveMsg}</p> : null}
          {stats ? (
            <p className="admin-preview">
              Preview:{' '}
              <strong>{formatPkr(stats.raised_cents)}</strong> ·{' '}
              <strong>{stats.donor_count}</strong> supporters
              {stats.goal_cents != null
                ? ` · goal ${formatPkr(stats.goal_cents)}`
                : ''}
            </p>
          ) : null}
        </section>
      ) : (
        <section className="admin-panel admin-comments-panel">
          <h2>All submissions</h2>
          <p className="admin-lead">
            Approve to show publicly. Unapproved stays hidden on the site.
          </p>
          {comments.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <ul className="admin-comment-list">
              {comments.map((c) => (
                <li key={c.id} className="admin-comment-row">
                  <div className="admin-comment-meta">
                    <time dateTime={c.created_at}>
                      {new Date(c.created_at).toLocaleString()}
                    </time>
                    <span className={c.verified ? 'badge-verified' : 'badge-pending'}>
                      {c.verified ? 'Verified' : 'Pending'}
                    </span>
                    <span className="admin-comment-name">
                      {c.display_name?.trim() || 'Anonymous'}
                    </span>
                  </div>
                  <p className="admin-comment-body">{c.content}</p>
                  <div className="admin-comment-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => void toggleVerified(c)}
                    >
                      {c.verified ? 'Unpublish' : 'Approve / publish'}
                    </button>
                    <button
                      type="button"
                      className="btn admin-btn-danger"
                      onClick={() => void removeComment(c.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  )
}
