/**
 * Normalise whatever the user pastes (a plain URL, a share link with tracking
 * params, or a full embed `<blockquote>` / `<iframe>` snippet) into a URL that can
 * be dropped into an <iframe src>. Anything we don't recognise is returned as the
 * first URL found (or the raw string), so a direct embeddable URL still works.
 */
export function toEmbedUrl(input: string): string {
  const raw = (input || "").trim();
  if (!raw) return raw;

  // Pasted embed codes (Instagram blockquote, YouTube iframe, …) contain the real
  // link inside an attribute — pull out the first http(s) URL from the string.
  const match = raw.match(/https?:\/\/[^\s"'<>]+/);
  const candidate = match ? match[0] : raw;

  try {
    const u = new URL(candidate);
    const host = u.hostname.replace(/^www\./, "");

    // YouTube: watch?v=ID, youtu.be/ID, /shorts/ID, or already /embed/ID
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname.startsWith("/embed/")) return candidate;
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      const shorts = u.pathname.match(/^\/shorts\/([^/]+)/);
      if (shorts) return `https://www.youtube.com/embed/${shorts[1]}`;
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // Vimeo: vimeo.com/ID -> player.vimeo.com/video/ID
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }
    if (host === "player.vimeo.com") return candidate;

    // Instagram: post / reel / tv permalink -> /embed (drops tracking query).
    if (host === "instagram.com") {
      const m = u.pathname.match(/^\/(p|reel|reels|tv)\/([^/]+)/);
      if (m) {
        const type = m[1] === "reels" ? "reel" : m[1];
        return `https://www.instagram.com/${type}/${m[2]}/embed`;
      }
    }
  } catch {
    // not a valid absolute URL — fall through and return the candidate
  }

  return candidate;
}
