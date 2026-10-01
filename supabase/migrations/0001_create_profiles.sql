-- Extends Supabase auth.users with app-specific profile data
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  date_of_birth date,
  height_cm numeric,
  weight_kg numeric,
  menarche_date date,
  is_on_contraception boolean default false,
  has_pcos boolean,
  has_thyroid_condition boolean,
  cycle_type text check (cycle_type in ('regular','irregular','unknown')) default 'unknown',
  created_at timestamptz default now()
);

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
