import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/supabase";

/**
 * Service-role Supabase client for the password-gated CMS (server-only).
 * Bypasses RLS, so callers MUST verify isAdminAuthed() first.
 * Requires SUPABASE_SERVICE_ROLE_KEY (Supabase dashboard → Settings → API).
 */
export function getAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(SUPABASE_URL, key, {
    auth: { persistSession: false },
  });
}
