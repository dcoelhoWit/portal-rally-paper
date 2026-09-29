-- A zone clue is either an image or an audio recording; the rally paper shows the image or
-- embeds an audio player. The app picks which from the file extension, so `clue_path` must
-- end in one it knows (keep in sync with `features/zones/clueKind.ts`). PDFs are dropped:
-- no clue has been uploaded yet.

update storage.buckets
set allowed_mime_types = array[
  'image/jpeg',
  'image/png',
  'image/webp',
  'audio/mpeg', -- .mp3
  'audio/mp4', -- .m4a (e.g. iPhone voice memos)
  'audio/x-m4a',
  'audio/aac',
  'audio/wav',
  'audio/x-wav'
]
where id = 'zone-clues';

alter table public.zones
  add constraint zones_clue_path_supported_type
    check (clue_path ~* '\.(jpe?g|png|webp|mp3|m4a|aac|wav)$');

comment on column public.zones.clue_path is
  'Object path of the clue (image or audio) in the zone-clues storage bucket, under ''<event id>/''.';
