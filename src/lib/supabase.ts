import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export function getSupabasePublicConfig(): {
  url: string
  anonKey: string
} | null {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim()
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
  if (!url || !anonKey) return null
  return { url, anonKey }
}

export function getCommentsSupabase(): SupabaseClient | null {
  const c = getSupabasePublicConfig()
  if (!c) return null
  return createClient(c.url, c.anonKey)
}
