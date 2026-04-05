import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'
import { corsHeaders, corsPreflight, jsonResponse } from '../_shared/cors.ts'
import Filter from 'npm:bad-words@3.0.4'

const MAX_LEN = 8000
const MAX_NAME = 120
const WINDOW_HOURS = 1
const MAX_SUBMITS_PER_WINDOW = 5

const filter = new Filter()

function clientIp(req: Request): string {
  const xf = req.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0]?.trim() || 'unknown'
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}

async function ipHash(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function isProfane(text: string): boolean {
  const t = text.trim()
  if (!t) return false
  return filter.isProfane(t)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return corsPreflight()
  if (req.method !== 'POST') {
    return jsonResponse({ code: 'method_not_allowed' }, 405)
  }

  const url = Deno.env.get('SUPABASE_URL')
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) {
    return jsonResponse({ code: 'server_misconfigured' }, 500)
  }

  let body: { content?: string; display_name?: string | null }
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ code: 'invalid_json' }, 400)
  }

  const rawContent =
    typeof body.content === 'string' ? body.content.trim() : ''
  if (!rawContent || rawContent.length > MAX_LEN) {
    return jsonResponse({ code: 'invalid_body' }, 400)
  }

  let displayName: string | null = null
  if (body.display_name != null) {
    if (typeof body.display_name !== 'string') {
      return jsonResponse({ code: 'invalid_body' }, 400)
    }
    const n = body.display_name.trim()
    if (n.length > MAX_NAME) {
      return jsonResponse({ code: 'invalid_body' }, 400)
    }
    displayName = n.length ? n : null
  }

  if (isProfane(rawContent) || (displayName && isProfane(displayName))) {
    return jsonResponse({ code: 'profanity' }, 400)
  }

  const supabase = createClient(url, key)
  const hash = await ipHash(clientIp(req))

  const since = new Date(
    Date.now() - WINDOW_HOURS * 60 * 60 * 1000,
  ).toISOString()
  const { count, error: countErr } = await supabase
    .from('comment_rate_events')
    .select('*', { count: 'exact', head: true })
    .eq('ip_hash', hash)
    .gte('created_at', since)

  if (countErr) {
    return jsonResponse({ code: 'server_error' }, 500)
  }
  if ((count ?? 0) >= MAX_SUBMITS_PER_WINDOW) {
    return jsonResponse({ code: 'rate_limited' }, 429)
  }

  const { data: row, error: insErr } = await supabase
    .from('comments')
    .insert({
      display_name: displayName,
      content: rawContent,
      verified: false,
    })
    .select('id')
    .single()

  if (insErr) {
    return jsonResponse({ code: 'server_error' }, 500)
  }

  await supabase.from('comment_rate_events').insert({ ip_hash: hash })

  return jsonResponse({ ok: true, id: row.id }, 200)
})
