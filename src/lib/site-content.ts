import { getSupabaseClient } from "@/lib/supabase";

/**
 * The editable site document stored in `site_content.data` (jsonb).
 * Phase 1 covers media assets + key text overrides; the shape is extensible
 * for full field editing later. Anything absent falls back to code defaults.
 */
export interface SiteOverrides {
  assets?: Record<string, string>; // slot id -> public URL
  text?: Record<string, string>; // text key -> value
}

/** Named media slots the CMS can fill. */
export const ASSET_SLOTS = [
  { id: "hero.video", label: "Hero showreel (video)", accept: "video/*", aspect: "video" },
  { id: "hero.image", label: "Hero showreel (image fallback)", accept: "image/*", aspect: "video" },
  { id: "format.explained", label: "Logo — SideStreet Explained", accept: "image/*", aspect: "wide" },
  { id: "format.street-views", label: "Logo — Street Views", accept: "image/*", aspect: "wide" },
  { id: "format.guides", label: "Logo — SideStreet Guides", accept: "image/*", aspect: "wide" },
  { id: "format.mini-docs", label: "Logo — Mini Docs", accept: "image/*", aspect: "wide" },
  { id: "format.interviews", label: "Logo — Interviews", accept: "image/*", aspect: "wide" },
  { id: "work.aps-bank", label: "Case study — APS Bank", accept: "image/*", aspect: "video" },
  { id: "work.form", label: "Case study — FORM", accept: "image/*", aspect: "video" },
  { id: "work.embassy-cinemas", label: "Case study — Embassy Cinemas", accept: "image/*", aspect: "video" },
] as const;

/** Editable plain-text fields (key -> label + default lives in components). */
export const TEXT_FIELDS = [
  { id: "hero.line1", label: "Hero headline — line 1", placeholder: "You bring the headache." },
  { id: "hero.line2", label: "Hero headline — line 2", placeholder: "We build the story." },
  { id: "hero.sub", label: "Hero subtext", placeholder: "This isn’t a list of deliverables…" },
  { id: "tagline", label: "Tagline pill", placeholder: "Malta’s largest youth news platform." },
] as const;

/** Read the published content document (public read via RLS). */
export async function getSiteContent(): Promise<SiteOverrides> {
  const supabase = getSupabaseClient();
  if (!supabase) return {};
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return {};
    return (data.data ?? {}) as SiteOverrides;
  } catch {
    return {};
  }
}
