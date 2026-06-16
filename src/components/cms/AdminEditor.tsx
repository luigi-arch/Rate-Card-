"use client";

import { useState } from "react";
import {
  ASSET_SLOTS,
  TEXT_FIELDS,
  type SiteOverrides,
} from "@/lib/site-content";
import { saveSiteContent, signOutAction, uploadAsset } from "@/app/admin/actions";

export default function AdminEditor({ initial }: { initial: SiteOverrides }) {
  const [assets, setAssets] = useState<Record<string, string>>(
    initial.assets ?? {}
  );
  const [text, setText] = useState<Record<string, string>>(initial.text ?? {});
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleUpload(slot: string, file: File) {
    setMsg(null);
    setUploading(slot);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("slot", slot);
      const res = await uploadAsset(fd);
      if (!res.ok || !res.url) throw new Error(res.error ?? "Upload failed");
      setAssets((prev) => ({ ...prev, [slot]: res.url! }));
    } catch (e) {
      setMsg({ ok: false, text: `Upload failed: ${(e as Error).message}` });
    } finally {
      setUploading(null);
    }
  }

  function clearAsset(slot: string) {
    setAssets((prev) => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    const res = await saveSiteContent({ assets, text });
    setSaving(false);
    setMsg(
      res.ok
        ? { ok: true, text: "Saved & published. Refresh the site to see it." }
        : { ok: false, text: res.error ?? "Save failed." }
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      {/* top bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="font-display text-2xl tracking-[0.04em]">
            SIDE<span className="text-gold">STREET</span> CMS
          </p>
          <p className="text-xs text-muted">Content management</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="press rounded-full border border-line-strong px-4 py-2 text-sm font-semibold hover:border-fg"
          >
            View site ↗
          </a>
          <form action={signOutAction}>
            <button className="press rounded-full border border-line-strong px-4 py-2 text-sm font-semibold hover:border-fg">
              Sign out
            </button>
          </form>
        </div>
      </header>

      {/* text */}
      <section className="mt-10">
        <h2 className="font-display text-3xl">Copy</h2>
        <p className="mt-1 text-sm text-muted">
          Leave blank to use the built-in default.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {TEXT_FIELDS.map((f) => (
            <div key={f.id} className={f.id === "hero.sub" ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block text-sm font-medium">{f.label}</label>
              {f.id === "hero.sub" ? (
                <textarea
                  rows={2}
                  value={text[f.id] ?? ""}
                  placeholder={f.placeholder}
                  onChange={(e) =>
                    setText((p) => ({ ...p, [f.id]: e.target.value }))
                  }
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
              ) : (
                <input
                  value={text[f.id] ?? ""}
                  placeholder={f.placeholder}
                  onChange={(e) =>
                    setText((p) => ({ ...p, [f.id]: e.target.value }))
                  }
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* media */}
      <section className="mt-12">
        <h2 className="font-display text-3xl">Media</h2>
        <p className="mt-1 text-sm text-muted">
          Upload photos & video for each slot. PNG/SVG/JPG or MP4.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {ASSET_SLOTS.map((slot) => {
            const url = assets[slot.id];
            const isVideo = slot.accept.includes("video");
            return (
              <div key={slot.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{slot.label}</p>
                  {url && (
                    <button
                      onClick={() => clearAsset(slot.id)}
                      className="text-xs text-muted-2 hover:text-fg hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="mt-3 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-ink">
                  {url ? (
                    isVideo ? (
                      <video src={url} className="h-full w-full object-cover" muted loop autoPlay playsInline />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={url} alt={slot.label} className="h-full w-full object-contain" />
                    )
                  ) : (
                    <span className="font-mono text-[0.65rem] text-white/40">
                      empty
                    </span>
                  )}
                </div>

                <label className="press mt-3 block cursor-pointer rounded-full border border-line-strong py-2 text-center text-sm font-semibold hover:border-fg">
                  {uploading === slot.id ? "Uploading…" : url ? "Replace" : "Upload"}
                  <input
                    type="file"
                    accept={slot.accept}
                    className="hidden"
                    disabled={uploading === slot.id}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(slot.id, file);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            );
          })}
        </div>
      </section>

      {/* save bar */}
      <div className="sticky bottom-4 mt-12 flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper/95 p-4 shadow-lg backdrop-blur">
        {msg ? (
          <p className={`text-sm ${msg.ok ? "text-fg" : "text-red-600"}`}>
            {msg.text}
          </p>
        ) : (
          <p className="text-sm text-muted">Changes publish to the live site.</p>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="press rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wide text-black disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save & publish"}
        </button>
      </div>
    </div>
  );
}
