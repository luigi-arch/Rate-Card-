import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for the rate-card landing page.
 * Uses the project's publishable (anon) key — safe to embed because the
 * `ratecard_leads` table has RLS that only permits INSERTs from the anon role
 * (reads are default-denied). Env vars override the baked-in defaults, so a
 * different project can be pointed at it without a code change:
 *   SUPABASE_URL  /  NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_ANON_KEY  /  NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
const DEFAULT_URL = "https://otucjmkjmsbojghkgnxm.supabase.co";
const DEFAULT_ANON_KEY = "sb_publishable_gGmrajsiBz_jR-FBwMLCCw_u_5gAW2k";

export function getSupabaseClient(): SupabaseClient | null {
  const url =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    DEFAULT_URL;
  const key =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    DEFAULT_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export const LEADS_TABLE = "ratecard_leads";

