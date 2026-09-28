-- Events: rallies created by the admin and visible to every signed-in account.
-- `image` holds an object path inside the public `event-images` storage bucket
-- (e.g. '<event id>/cover.jpg'), not a full URL.

create table public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null
    constraint events_name_trimmed check (name = btrim(name))
    constraint events_name_length check (char_length(name) between 2 and 100),
  difficulty int not null
    constraint events_difficulty_range check (difficulty between 1 and 5),
  image text,
  date date not null,
  location text not null
    constraint events_location_not_blank check (btrim(location) <> ''),
  created_at timestamptz not null default now()
);

comment on table public.events is 'A rally event, managed by the admin.';
comment on column public.events.difficulty is 'Difficulty from 1 (easiest) to 5 (hardest).';
comment on column public.events.image is 'Object path in the event-images storage bucket.';

create index events_date_idx on public.events (date);

alter table public.events enable row level security;

create policy "Signed-in users can read events"
  on public.events for select
  to authenticated
  using (true);

create policy "Admins can create events"
  on public.events for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "Admins can update events"
  on public.events for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admins can delete events"
  on public.events for delete
  to authenticated
  using ((select public.is_admin()));

-- Storage: public bucket for event images. Public buckets serve files by URL
-- without a select policy; only the admin may upload, replace or delete them.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-images',
  'event-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp']
);

-- Needed for upserts (replacing an image) and for listing the bucket's objects.
create policy "Admins can list event images"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'event-images' and (select public.is_admin()));

create policy "Admins can upload event images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'event-images' and (select public.is_admin()));

create policy "Admins can update event images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'event-images' and (select public.is_admin()))
  with check (bucket_id = 'event-images' and (select public.is_admin()));

create policy "Admins can delete event images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'event-images' and (select public.is_admin()));
