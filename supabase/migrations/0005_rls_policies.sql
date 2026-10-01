-- Row Level Security: every user can only read/write their own rows.
-- These policies apply when the client uses the anon key + user JWT.
-- The server's service-role key bypasses RLS by design (used only server-side).

alter table profiles enable row level security;
alter table period_logs enable row level security;
alter table daily_logs enable row level security;
alter table cycle_predictions enable row level security;

create policy "Users can view their own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users manage their own period logs"
  on period_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage their own daily logs"
  on daily_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can view their own predictions"
  on cycle_predictions for select using (auth.uid() = user_id);
