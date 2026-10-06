create table if not exists daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  log_date date not null,
  mood text,
  symptoms text[] default '{}',
  notes text,
  unique (user_id, log_date)
);

create index if not exists idx_daily_logs_user_date
  on daily_logs (user_id, log_date desc);
