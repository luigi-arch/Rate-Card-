/**
 * Normalise a pasted video URL (YouTube / Vimeo / Instagram / other) into a URL that
 * can be dropped into an <iframe src>. Anything we don't recognise is returned as-is,
 * so a direct embeddable URL still works.
 */
export function toEmbedUrl(url: string): string {
  const raw = url.trim();
  if (!raw) return raw;

  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "");

    // YouTube: watch?v=ID, youtu.be/ID, /shorts/ID, or already /embed/ID
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname.startsWith("/embed/")) return raw;
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      const shorts = u.pathname.match(/^\/shorts\/([^/]+)/);
      if (shorts) return `https://www.youtube.com/embed/${shorts[1]}`;
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // Vimeo: vimeo.com/ID -> player.vimeo.com/video/ID
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }

    // Instagram: append /embed to a reel/post permalink
    if (host === "instagram.com") {
      const clean = u.pathname.replace(/\/+$/, "");
      if (/^\/(p|reel|tv)\//.test(clean)) {
        return `https://www.instagram.com${clean}/embed`;
      }
    }
  } catch {
    // not a valid absolute URL — fall through and return raw
  }

  return raw;
}
