"use client";

import { createContext, useContext, useMemo } from "react";
import type { SiteOverrides } from "@/lib/site-content";

interface ContentValue {
  /** Returns the CMS asset URL for a slot, or the provided fallback. */
  asset: (slot: string, fallback?: string) => string | undefined;
  /** Returns the CMS text override for a key, or the provided fallback. */
  text: (key: string, fallback: string) => string;
}

const ContentContext = createContext<ContentValue | null>(null);

export function ContentProvider({
  value,
  children,
}: {
  value: SiteOverrides;
  children: React.ReactNode;
}) {
  const api = useMemo<ContentValue>(
    () => ({
      asset: (slot, fallback) => value.assets?.[slot] || fallback,
      text: (key, fallback) => value.text?.[key]?.trim() || fallback,
    }),
    [value]
  );
  return <ContentContext.Provider value={api}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentValue {
  const ctx = useContext(ContentContext);
  // Safe default so components work even outside a provider (e.g. admin previews).
  if (!ctx) {
    return {
      asset: (_slot, fallback) => fallback,
      text: (_key, fallback) => fallback,
    };
  }
  return ctx;
}
