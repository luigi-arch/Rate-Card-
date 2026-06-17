"use client";

import { createContext, useContext } from "react";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

/**
 * The merged, published site content. Falls back to code defaults when used
 * outside a provider (e.g. isolated previews), so components never crash.
 */
export function useContent(): SiteContent {
  return useContext(ContentContext) ?? DEFAULT_CONTENT;
}
