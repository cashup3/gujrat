-- Run in Supabase SQL Editor (new project or full reset).
-- Deploy Edge Functions: submit-comment + approve-comment (see .env.example notes).
-- Set secret: supabase secrets set ADMIN_APPROVE_SECRET="your-long-random-string"

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  display_name text,
  content text not null,
  verified boolean not null default false,
  constraint comments_content_len check (char_length(content) between 1 and 8000)
);

create index if not exists comments_verified_created_at_idx
  on public.comments (verified, created_at desc);

-- Rate limiting (written only by Edge Function + service role).
create table if not exists public.comment_rate_events (
  id bigserial primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists comment_rate_events_ip_created_idx
  on public.comment_rate_events (ip_hash, created_at desc);

grant usage, select on sequence public.comment_rate_events_id_seq to service_role;

alter table public.comments enable row level security;
alter table public.comment_rate_events enable row level security;

-- Public: read verified comments only. Inserts go through submit-comment Edge Function.
grant select on public.comments to anon;
revoke all on public.comment_rate_events from public;
grant all on public.comment_rate_events to postgres;
grant all on public.comment_rate_events to service_role;

drop policy if exists "Public can read verified comments" on public.comments;
create policy "Public can read verified comments"
  on public.comments for select
  using (verified = true);

drop policy if exists "Anyone can submit unverified comments" on public.comments;

-- Optional: approve via Dashboard (Table Editor) or approve-comment Edge Function + x-admin-secret.
