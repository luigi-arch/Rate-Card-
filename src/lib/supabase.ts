import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for the rate-card landing page.
 * Uses the project's publishable (anon) key — safe to use because the
 * `ratecard_leads` table has RLS that only permits INSERTs from the anon role.
 *
 * Configure via environment variables (see .env.example):
 *   SUPABASE_URL  /  NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_ANON_KEY  /  NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export const LEADS_TABLE = "ratecard_leads";
