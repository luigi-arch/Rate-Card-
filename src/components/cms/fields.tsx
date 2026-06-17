"use client";

import { useState } from "react";
import { uploadAsset } from "@/app/admin/actions";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

/** A collapsible top-level section panel. */
export function Panel({
  title,
  subtitle,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-2xl border border-line bg-paper"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
        <span>
          <span className="font-display text-xl text-fg">{title}</span>
          {subtitle && (
            <span className="ml-2 text-xs text-muted">{subtitle}</span>
          )}
        </span>
        <span className="text-lg text-muted transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="space-y-4 border-t border-line px-5 py-5">{children}</div>
    </details>
  );
}

/** A labelled sub-group inside a panel (e.g. one item in a repeater). */
export function Group({
  title,
  actions,
  children,
}: {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface/40 p-4">
      {(title || actions) && (
        <div className="mb-3 flex items-center justify-between gap-2">
          {title && (
            <p className="text-sm font-semibold text-fg">{title}</p>
          )}
          {actions && <div className="flex items-center gap-1">{actions}</div>}
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm outline-none focus:border-gold";

/* ------------------------------------------------------------------ */
/* Scalar fields                                                       */
/* ------------------------------------------------------------------ */

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium">{label}</span>}
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium">{label}</span>}
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label?: string;
  value: number | null;
  onChange: (v: number | null) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium">{label}</span>}
      <input
        type="number"
        value={value ?? ""}
        placeholder={placeholder ?? "Custom (leave blank)"}
        onChange={(e) => {
          const v = e.target.value.trim();
          onChange(v === "" ? null : Number(v));
        }}
        className={inputCls}
      />
    </label>
  );
}

export function ToggleField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-gold"
      />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Row controls                                                        */
/* ------------------------------------------------------------------ */

function IconBtn({
  onClick,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-lg border border-line text-sm text-muted transition-colors hover:border-fg hover:text-fg disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}

/** Move-up / move-down / remove controls for an item at `index`. */
export function RowControls({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (from: number, to: number) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <>
      <IconBtn
        title="Move up"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
      >
        ↑
      </IconBtn>
      <IconBtn
        title="Move down"
        disabled={index === count - 1}
        onClick={() => onMove(index, index + 1)}
      >
        ↓
      </IconBtn>
      <IconBtn title="Remove" onClick={() => onRemove(index)}>
        ✕
      </IconBtn>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* List editors                                                        */
/* ------------------------------------------------------------------ */

/** Helpers shared by the list editors. */
export function move<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/** Edit a flat list of strings — add / remove / reorder. */
export function StringListEditor({
  label,
  items,
  onChange,
  placeholder,
  addLabel = "Add item",
}: {
  label?: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  return (
    <div>
      {label && <p className="mb-2 text-sm font-medium">{label}</p>}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <input
              value={item}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className={inputCls}
            />
            <RowControls
              index={i}
              count={items.length}
              onMove={(from, to) => onChange(move(items, from, to))}
              onRemove={(idx) => onChange(items.filter((_, x) => x !== idx))}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-2 rounded-full border border-dashed border-line-strong px-3.5 py-1.5 text-xs font-semibold text-muted hover:border-fg hover:text-fg"
      >
        + {addLabel}
      </button>
    </div>
  );
}

/**
 * Edit a list of objects. Each item is rendered via `children(item, update, i)`
 * where `update` shallow-merges a patch into that item. Supports add / remove /
 * reorder.
 */
export function Repeater<T>({
  items,
  onChange,
  makeBlank,
  children,
  itemTitle,
  addLabel = "Add",
}: {
  items: T[];
  onChange: (next: T[]) => void;
  makeBlank: () => T;
  children: (
    item: T,
    update: (patch: Partial<T>) => void,
    index: number
  ) => React.ReactNode;
  itemTitle?: (item: T, index: number) => string;
  addLabel?: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <Group
          key={i}
          title={itemTitle ? itemTitle(item, i) : `Item ${i + 1}`}
          actions={
            <RowControls
              index={i}
              count={items.length}
              onMove={(from, to) => onChange(move(items, from, to))}
              onRemove={(idx) => onChange(items.filter((_, x) => x !== idx))}
            />
          }
        >
          {children(
            item,
            (patch) => {
              const next = [...items];
              next[i] = { ...item, ...patch };
              onChange(next);
            },
            i
          )}
        </Group>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, makeBlank()])}
        className="rounded-full border border-dashed border-line-strong px-4 py-2 text-xs font-semibold text-muted hover:border-fg hover:text-fg"
      >
        + {addLabel}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

/** Upload / preview / clear a single image or video asset. */
export function ImageField({
  label,
  value,
  onChange,
  slot,
  accept = "image/*",
  onError,
}: {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  slot: string;
  accept?: string;
  onError?: (message: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const isVideo = accept.includes("video");

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("slot", slot);
      const res = await uploadAsset(fd);
      if (!res.ok || !res.url) throw new Error(res.error ?? "Upload failed");
      onChange(res.url);
    } catch (e) {
      onError?.(`Upload failed: ${(e as Error).message}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-xs text-muted-2 hover:text-fg hover:underline"
          >
            Remove
          </button>
        )}
      </div>
      <div className="mt-2 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-ink">
        {value ? (
          isVideo ? (
            <video src={value} className="h-full w-full object-cover" muted loop autoPlay playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="h-full w-full object-contain" />
          )
        ) : (
          <span className="font-mono text-[0.65rem] text-white/40">empty</span>
        )}
      </div>
      <label className="press mt-2 block cursor-pointer rounded-full border border-line-strong py-2 text-center text-sm font-semibold hover:border-fg">
        {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
        <input
          type="file"
          accept={accept}
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
        />
      </label>
    </div>
  );
}
