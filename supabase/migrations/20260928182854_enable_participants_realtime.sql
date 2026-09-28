-- Broadcast participant changes over Supabase Realtime so a team's screen can
-- follow its race status live (waiting room -> form -> finished). Realtime
-- applies the table's RLS select policy, so each team only receives its own
-- rows and the admin receives all.
alter publication supabase_realtime add table public.participants;
