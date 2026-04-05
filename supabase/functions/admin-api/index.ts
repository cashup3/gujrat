import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'
import { corsPreflight, jsonResponse } from '../_shared/cors.ts'

function authorized(req: Request): boolean {
  const secret = Deno.env.get('ADMIN_PORTAL_SECRET')
  if (!secret || secret.length < 16) return false
  return req.headers.get('x-admin-secret') === secret
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return corsPreflight()
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405)
  }
  if (!authorized(req)) {
    return jsonResponse({ error: 'unauthorized' }, 401)
  }

  const url = Deno.env.get('SUPABASE_URL')
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) {
    return jsonResponse({ error: 'server_misconfigured' }, 500)
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400)
  }

  const action = typeof body.action === 'string' ? body.action : ''
  const supabase = createClient(url, key)

  switch (action) {
    case 'list_comments': {
      const { data, error } = await supabase
        .from('comments')
        .select('id, created_at, display_name, content, verified')
        .order('created_at', { ascending: false })
      if (error) return jsonResponse({ error: 'database' }, 500)
      return jsonResponse({ comments: data ?? [] }, 200)
    }
    case 'set_verified': {
      const id = typeof body.id === 'string' ? body.id : ''
      if (!id) return jsonResponse({ error: 'invalid_body' }, 400)
      const verified = Boolean(body.verified)
      const { error } = await supabase
        .from('comments')
        .update({ verified })
        .eq('id', id)
      if (error) return jsonResponse({ error: 'database' }, 500)
      return jsonResponse({ ok: true }, 200)
    }
    case 'delete_comment': {
      const id = typeof body.id === 'string' ? body.id : ''
      if (!id) return jsonResponse({ error: 'invalid_body' }, 400)
      const { error } = await supabase.from('comments').delete().eq('id', id)
      if (error) return jsonResponse({ error: 'database' }, 500)
      return jsonResponse({ ok: true }, 200)
    }
    case 'get_stats': {
      const { data, error } = await supabase
        .from('site_stats')
        .select('raised_cents, donor_count, goal_cents')
        .eq('id', 1)
        .maybeSingle()
      if (error) return jsonResponse({ error: 'database' }, 500)
      return jsonResponse(
        {
          stats: data ?? {
            raised_cents: 0,
            donor_count: 0,
            goal_cents: null,
          },
        },
        200,
      )
    }
    case 'set_stats': {
      const raised = Number(body.raised_cents)
      const donors = Number(body.donor_count)
      const goalRaw = body.goal_cents
      const goal_cents =
        goalRaw === null || goalRaw === undefined || goalRaw === ''
          ? null
          : Number(goalRaw)
      if (!Number.isFinite(raised) || raised < 0 || !Number.isFinite(donors) || donors < 0) {
        return jsonResponse({ error: 'invalid_body' }, 400)
      }
      if (goal_cents !== null && (!Number.isFinite(goal_cents) || goal_cents < 0)) {
        return jsonResponse({ error: 'invalid_body' }, 400)
      }
      const { error } = await supabase.from('site_stats').upsert(
        {
          id: 1,
          raised_cents: Math.floor(raised),
          donor_count: Math.floor(donors),
          goal_cents: goal_cents === null ? null : Math.floor(goal_cents),
        },
        { onConflict: 'id' },
      )
      if (error) return jsonResponse({ error: 'database' }, 500)
      return jsonResponse({ ok: true }, 200)
    }
    default:
      return jsonResponse({ error: 'unknown_action' }, 400)
  }
})
