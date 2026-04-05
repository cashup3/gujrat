/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DONATE_URL?: string
  readonly VITE_DONATE_URL_SECONDARY?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_SOCIAL_INSTAGRAM?: string
  readonly VITE_SOCIAL_TIKTOK?: string
  readonly VITE_SOCIAL_FACEBOOK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
