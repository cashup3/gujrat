const STORAGE_KEY = 'donation_admin_secret'

export function getStoredAdminSecret(): string | null {
  return sessionStorage.getItem(STORAGE_KEY)
}

export function setStoredAdminSecret(secret: string) {
  sessionStorage.setItem(STORAGE_KEY, secret)
}

export function clearStoredAdminSecret() {
  sessionStorage.removeItem(STORAGE_KEY)
}

export async function callAdminApi(
  supabaseUrl: string,
  anonKey: string,
  adminSecret: string,
  action: string,
  payload: Record<string, unknown> = {},
): Promise<{ ok: boolean; data?: unknown; status: number }> {
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/functions/v1/admin-api`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
      'x-admin-secret': adminSecret,
    },
    body: JSON.stringify({ action, ...payload }),
  })
  let data: unknown
  try {
    data = await res.json()
  } catch {
    data = null
  }
  return { ok: res.ok, data, status: res.status }
}
