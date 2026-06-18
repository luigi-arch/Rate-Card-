import { getSupabaseClient } from "@/lib/supabase";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

/**
 * The editable site document is stored in `site_content.data` (jsonb) as a
 * (possibly partial / older-shaped) {@link SiteContent}. At read time we DEEP
 * merge it over {@link DEFAULT_CONTENT} so the stored content wins, but any
 * field that doesn't exist yet in the saved document falls back to the code
 * default. This means new fields added in code (e.g. a new option on an
 * existing item) show up automatically without needing the CMS re-saved.
 *
 * Rules:
 *  - Objects merge key-by-key (recursively).
 *  - Arrays keep the stored items, order and membership (so the user's adds,
 *    removals and reordering are authoritative). Object items are matched to a
 *    default by `id` (or `name`) and deep-merged, so missing fields backfill
 *    from the matching default; items with no matching default are kept as-is.
 *  - Scalars: the stored value wins (including empty strings the user set).
 */

type Json = unknown;

function isObject(v: Json): v is Record<string, Json> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** A stable key for matching an array item to its default counterpart. */
function itemKey(v: Json): string | undefined {
  if (isObject(v)) {
    if (typeof v.id === "string") return `id:${v.id}`;
    if (typeof v.name === "string") return `name:${v.name}`;
  }
  return undefined;
}

function mergeValue(def: Json, stored: Json): Json {
  if (stored === undefined || stored === null) return def;

  if (Array.isArray(def) && Array.isArray(stored)) {
    const defByKey = new Map<string, Json>();
    for (const d of def) {
      const k = itemKey(d);
      if (k) defByKey.set(k, d);
    }
    return stored.map((s) => {
      const k = itemKey(s);
      const match = k ? defByKey.get(k) : undefined;
      return match !== undefined ? mergeValue(match, s) : s;
    });
  }

  if (isObject(def) && isObject(stored)) {
    const out: Record<string, Json> = { ...def };
    for (const key of Object.keys(stored)) {
      out[key] = mergeValue(key in def ? def[key] : undefined, stored[key]);
    }
    return out;
  }

  return stored;
}

export function mergeContent(
  stored: Partial<SiteContent> | null | undefined
): SiteContent {
  if (!stored) return DEFAULT_CONTENT;
  return mergeValue(DEFAULT_CONTENT, stored) as SiteContent;
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
