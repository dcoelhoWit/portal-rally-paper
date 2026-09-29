-- Zones: the stops of an event's rally paper, each with a clue and a challenge, managed by
-- the admin. A zone gives the race away, so a team may only read an event's zones once
-- its own race in that event has started.

create table public.zones (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  name text not null
    constraint zones_name_trimmed check (name = btrim(name))
    constraint zones_name_not_blank check (name <> ''),
  clue_url text not null,
  challenge text not null,
  created_at timestamptz not null default now()
);

comment on table public.zones is 'A stop of an event''s rally paper, managed by the admin.';
comment on column public.zones.clue_url is 'URL of the clue that leads teams to the zone.';
comment on column public.zones.challenge is 'What a team must do once it reaches the zone.';

create index zones_event_id_idx on public.zones (event_id);

alter table public.zones enable row level security;

create policy "Teams read zones once their race has started; admins read all"
  on public.zones for select
  to authenticated
  using (
    (select public.is_admin())
    or exists (
      select 1
      from public.participants p
      where p.event_id = zones.event_id
        and p.team_id = (select auth.uid())
        and p.status in ('in_progress', 'finished')
    )
  );

create policy "Admins can create zones"
  on public.zones for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "Admins can update zones"
  on public.zones for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admins can delete zones"
  on public.zones for delete
  to authenticated
  using ((select public.is_admin()));
