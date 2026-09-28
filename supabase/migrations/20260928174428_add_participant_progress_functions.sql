-- Admin-only race progress transitions for a participant:
--   waiting -> in_progress (records start_time)
--   in_progress -> finished (records end_time)
-- Times come from the database clock in Portuguese local time, never from the
-- client. Direct UPDATEs on participants stay revoked; these functions are the
-- only way to change progress. Each returns the updated row, and raises when
-- the caller isn't an admin or the participant isn't in the expected status
-- (e.g. a double click or two admins acting at once).

create function public.start_participant(p_event_id uuid, p_team_id uuid)
returns public.participants
language plpgsql
security definer
set search_path = ''
as $$
declare
  result public.participants;
begin
  if not public.is_admin() then
    raise exception 'Only admins can start participants' using errcode = '42501';
  end if;

  update public.participants
  set status = 'in_progress',
      start_time = (now() at time zone 'Europe/Lisbon')::time
  where event_id = p_event_id and team_id = p_team_id and status = 'waiting'
  returning * into result;

  if not found then
    raise exception 'Participant is not waiting' using errcode = 'P0001';
  end if;

  return result;
end;
$$;

create function public.finish_participant(p_event_id uuid, p_team_id uuid)
returns public.participants
language plpgsql
security definer
set search_path = ''
as $$
declare
  result public.participants;
begin
  if not public.is_admin() then
    raise exception 'Only admins can finish participants' using errcode = '42501';
  end if;

  update public.participants
  set status = 'finished',
      end_time = (now() at time zone 'Europe/Lisbon')::time
  where event_id = p_event_id and team_id = p_team_id and status = 'in_progress'
  returning * into result;

  if not found then
    raise exception 'Participant is not in progress' using errcode = 'P0001';
  end if;

  return result;
end;
$$;

revoke execute on function public.start_participant(uuid, uuid) from public, anon;
revoke execute on function public.finish_participant(uuid, uuid) from public, anon;
grant execute on function public.start_participant(uuid, uuid) to authenticated;
grant execute on function public.finish_participant(uuid, uuid) to authenticated;
