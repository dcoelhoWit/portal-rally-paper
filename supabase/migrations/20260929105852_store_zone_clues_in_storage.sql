-- Zone clues are files in Storage rather than arbitrary URLs. `clue_path` holds an object
-- path inside the private `zone-clues` bucket, under the zone's event folder
-- (e.g. '<event id>/clue-1.jpg'). The table is still empty, so the rename loses nothing.

alter table public.zones rename column clue_url to clue_path;

alter table public.zones
  add constraint zones_clue_path_in_event_folder
    check (clue_path like event_id::text || '/_%');

comment on column public.zones.clue_path is
  'Object path of the clue in the zone-clues storage bucket, under ''<event id>/''.';

-- Storage: private bucket, since a clue must not be reachable before a team's race starts.
-- Files are served through signed URLs, which require passing the select policy below.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'zone-clues',
  'zone-clues',
  false,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
);

-- A team may read a clue file only if a zone it can see references it: the subquery runs
-- under the zones RLS policy, which only exposes zones once the team's race has started.
create policy "Teams read clues of their visible zones; admins read all"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'zone-clues'
    and (
      (select public.is_admin())
      or exists (select 1 from public.zones z where z.clue_path = objects.name)
    )
  );

create policy "Admins can upload zone clues"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'zone-clues' and (select public.is_admin()));

create policy "Admins can update zone clues"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'zone-clues' and (select public.is_admin()))
  with check (bucket_id = 'zone-clues' and (select public.is_admin()));

create policy "Admins can delete zone clues"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'zone-clues' and (select public.is_admin()));
