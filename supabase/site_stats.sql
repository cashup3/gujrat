-- Run in Supabase SQL Editor after comments_schema.sql.
-- Public read for homepage counters; writes only via admin-api Edge Function (service role).

create table if not exists public.site_stats (
  id smallint primary key default 1 check (id = 1),
  -- Amounts in PKR paisa (100 paisa = 1 rupee), same numeric pattern as typical "cents" fields.
  raised_cents bigint not null default 0,
  donor_count int not null default 0,
  goal_cents bigint
);

insert into public.site_stats (id, raised_cents, donor_count, goal_cents)
values (1, 0, 0, null)
on conflict (id) do nothing;

alter table public.site_stats enable row level security;

drop policy if exists "Anyone can read site stats" on public.site_stats;
create policy "Anyone can read site stats"
  on public.site_stats for select
  using (true);

-- No insert/update/delete for anon — only service role (Edge Functions).
