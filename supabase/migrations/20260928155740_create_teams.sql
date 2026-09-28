-- Teams: one row per team account. The team name is chosen at sign-up and passed
-- as `team_name` in the user metadata; a trigger creates the row, so the browser
-- never inserts into this table directly.
--
-- Admins are auth users with `app_metadata.role = 'admin'` (only settable with the
-- service role / dashboard, never by the user) and have no team row.

create table public.teams (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null
    constraint teams_name_trimmed check (name = btrim(name))
    constraint teams_name_length check (char_length(name) between 2 and 50),
  created_at timestamptz not null default now()
);

comment on table public.teams is 'A registered team (one per auth account).';

-- Names are unique regardless of case ("Red Bull" and "red bull" clash).
create unique index teams_name_unique_ci on public.teams (lower(name));

alter table public.teams enable row level security;

create policy "Signed-in users can read teams"
  on public.teams for select
  to authenticated
  using (true);

create policy "Teams can rename themselves"
  on public.teams for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- No insert/delete policies: rows are created by the trigger below and removed
-- by the cascade when the auth user is deleted.

-- Only the name may be changed by the team itself.
revoke update on public.teams from anon, authenticated;
grant update (name) on public.teams to authenticated;

-- Creates the team row for every new auth user that signs up with a team name.
-- Raises (and therefore aborts the sign-up) when the name is invalid or taken.
-- Users created without one (e.g. the admin, added from the dashboard) get no team.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.raw_user_meta_data ? 'team_name' then
    insert into public.teams (id, name)
    values (new.id, btrim(new.raw_user_meta_data ->> 'team_name'));
  end if;
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Lets the registration form tell the user a name is taken before signing up
-- (a failed trigger only surfaces as a generic "Database error saving new user").
-- Team names are not secret: signed-in users can already read them all.
create function public.is_team_name_available(team_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select not exists (
    select 1 from public.teams where lower(name) = lower(btrim(team_name))
  );
$$;

revoke execute on function public.is_team_name_available(text) from public;
grant execute on function public.is_team_name_available(text) to anon, authenticated;

-- Whether the caller is an admin, from the `app_metadata.role` claim of their JWT.
-- Use it in RLS policies that grant admins extra access.
create function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
