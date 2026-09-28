import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types.ts'

export type TypedSupabaseClient = SupabaseClient<Database>

export function createSupabaseClient(url: string, key: string): TypedSupabaseClient {
  if (!url || !key) {
    throw new Error('Missing Supabase URL or key. Check your environment variables.')
  }
  return createClient<Database>(url, key)
}
