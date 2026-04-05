-- If you already ran the older schema (anon INSERT on comments), run this once.

create table if not exists public.comment_rate_events (
  id bigserial primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists comment_rate_events_ip_created_idx
  on public.comment_rate_events (ip_hash, created_at desc);

grant usage, select on sequence public.comment_rate_events_id_seq to service_role;

alter table public.comment_rate_events enable row level security;

revoke all on public.comment_rate_events from public;
grant all on public.comment_rate_events to postgres;
grant all on public.comment_rate_events to service_role;

drop policy if exists "Anyone can submit unverified comments" on public.comments;
revoke insert on public.comments from anon;
