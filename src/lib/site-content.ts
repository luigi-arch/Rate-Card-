import { getSupabaseClient } from "@/lib/supabase";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

/**
 * The editable site document is stored in `site_content.data` (jsonb) as a
 * (possibly partial) {@link SiteContent}. At read time we merge it over
 * {@link DEFAULT_CONTENT} per top-level key — a stored value wins when present,
 * and arrays are replaced wholesale. Anything absent falls back to the code
 * defaults, so newly added fields keep working against older stored documents.
 */
export function mergeContent(stored: Partial<SiteContent> | null | undefined): SiteContent {
  const out = { ...DEFAULT_CONTENT };
  if (!stored) return out;
  for (const key of Object.keys(DEFAULT_CONTENT) as (keyof SiteContent)[]) {
    const value = stored[key];
    if (value !== undefined && value !== null) {
      // Stored document is authored as a whole, so a shallow per-key override
      // is correct; missing keys retain their defaults.
      (out as Record<string, unknown>)[key] = value;
    }
  }
  return out;
}

/** Read the published content document (public read via RLS), merged over defaults. */
export async function getSiteContent(): Promise<SiteContent> {
  const supabase = getSupabaseClient();
  if (!supabase) return mergeContent(null);
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return mergeContent(null);
    return mergeContent((data.data ?? null) as Partial<SiteContent> | null);
  } catch {
    return mergeContent(null);
  }
}
