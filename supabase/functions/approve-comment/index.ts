import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'
import { corsPreflight, jsonResponse } from '../_shared/cors.ts'

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return corsPreflight()
  if (req.method !== 'POST') {
    return jsonResponse({ code: 'method_not_allowed' }, 405)
  }

  const secret = Deno.env.get('ADMIN_APPROVE_SECRET')
  if (!secret || secret.length < 16) {
    return jsonResponse({ code: 'server_misconfigured' }, 500)
  }

  const hdr = req.headers.get('x-admin-secret')
  if (!hdr || hdr !== secret) {
    return jsonResponse({ code: 'unauthorized' }, 401)
  }

  let body: { id?: string }
  try {
    body = await req.json()
  } catch {
    return jsonResponse({ code: 'invalid_json' }, 400)
  }

  const id = typeof body.id === 'string' ? body.id.trim() : ''
  if (!id || !UUID_RE.test(id)) {
    return jsonResponse({ code: 'invalid_body' }, 400)
  }

  const url = Deno.env.get('SUPABASE_URL')
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) {
    return jsonResponse({ code: 'server_misconfigured' }, 500)
  }

  const supabase = createClient(url, key)
  const { data, error } = await supabase
    .from('comments')
    .update({ verified: true })
    .eq('id', id)
    .select('id')
    .maybeSingle()

  if (error) {
    return jsonResponse({ code: 'server_error' }, 500)
  }
  if (!data) {
    return jsonResponse({ code: 'not_found' }, 404)
  }

  return jsonResponse({ ok: true, id: data.id }, 200)
})
