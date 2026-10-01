create table if not exists period_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  start_date date not null,
  end_date date,
  flow_intensity text check (flow_intensity in ('light','medium','heavy')),
  created_at timestamptz default now()
);

create index if not exists idx_period_logs_user_start
  on period_logs (user_id, start_date desc);
