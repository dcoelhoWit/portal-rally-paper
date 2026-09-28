-- Participants: which team is registered in which event. No row = not registered.
-- Teams register and cancel themselves, only for events that haven't happened
-- yet; the admin can manage any registration. Teams only see their own rows.

create table public.participants (
  event_id uuid not null references public.events (id) on delete cascade,
  team_id uuid not null references public.teams (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (event_id, team_id)
);

comment on table public.participants is 'Registration of a team in an event.';

-- The primary key covers lookups by event; this one covers "events of my team".
create index participants_team_id_idx on public.participants (team_id);

alter table public.participants enable row level security;

create policy "Teams read their own registrations; admins read all"
  on public.participants for select
  to authenticated
  using (team_id = (select auth.uid()) or (select public.is_admin()));

create policy "Teams register themselves in upcoming events; admins register anyone"
  on public.participants for insert
  to authenticated
  with check (
    (select public.is_admin())
    or (
      team_id = (select auth.uid())
      and exists (
        select 1 from public.events e
        where e.id = event_id and e.date >= current_date
      )
    )
  );

create policy "Teams cancel their own upcoming registrations; admins cancel any"
  on public.participants for delete
  to authenticated
  using (
    (select public.is_admin())
    or (
      team_id = (select auth.uid())
      and exists (
        select 1 from public.events e
        where e.id = event_id and e.date >= current_date
      )
    )
  );

-- A registration is either there or not: nothing to update.
revoke update on public.participants from anon, authenticated;
