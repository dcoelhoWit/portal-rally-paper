-- Race progress of each registered team: status plus start/end time of day
-- (the day itself is the event's date). New registrations start as 'waiting'
-- with no times; existing rows get the same defaults.

alter table public.participants
  add column status text not null default 'waiting'
    constraint participants_status_valid
      check (status in ('waiting', 'in_progress', 'finished')),
  add column start_time time,
  add column end_time time,
  add constraint participants_end_needs_start
    check (end_time is null or start_time is not null),
  add constraint participants_end_after_start
    check (end_time is null or end_time >= start_time);

comment on column public.participants.status is 'waiting | in_progress | finished';
comment on column public.participants.start_time is 'Time of day the team started (event date).';
comment on column public.participants.end_time is 'Time of day the team finished (event date).';

-- Teams register themselves, but must not choose their own status or times:
-- inserts may only set the event and team; everything else takes its default.
revoke insert on public.participants from anon, authenticated;
grant insert (event_id, team_id) on public.participants to authenticated;
