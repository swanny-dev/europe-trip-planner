create table if not exists public.trip_state (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.trip_state enable row level security;
