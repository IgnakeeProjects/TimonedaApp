import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../../env';

let client: SupabaseClient | undefined;

export const supabase = client ??= createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);