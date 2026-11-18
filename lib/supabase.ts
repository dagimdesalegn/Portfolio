import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * The public anon key is safe to use in a browser, but this project keeps
 * database writes behind server actions. Never put a Supabase service-role
 * key in NEXT_PUBLIC_* variables.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
