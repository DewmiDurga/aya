create table if not exists cycle_predictions (
  user_id uuid references profiles(id) on delete cascade primary key,
  predicted_start date,
  predicted_range_low date,
  predicted_range_high date,
  confidence text check (confidence in ('high','medium','low')),
  avg_cycle_length numeric,
  std_dev numeric,
  updated_at timestamptz default now()
);
