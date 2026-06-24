"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { type FormatId } from "@/lib/content";
import { useContent } from "@/context/content";

interface SelectionState {
  // Step 1 — headaches
  selected: string[];
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  selectedHeadacheLabels: string[];
  recommendedFormatIds: FormatId[];
  recommendedServiceIds: string[];

  // Step 2 — format (follows recommendation until manually pinned)
  activeFormatId: FormatId;
  setActiveFormat: (id: FormatId) => void;
  formatEngaged: boolean;

  // Step 3 — package + add-ons
  selectedPackage: string | null;
  setSelectedPackage: (name: string | null) => void;
  selectedAddOns: string[];
  toggleAddOn: (label: string) => void;
  isAddOnSelected: (label: string) => boolean;

  // Qualifiers
  budget: string;
  setBudget: (v: string) => void;
  timeline: string;
  setTimeline: (v: string) => void;

  // Personalisation — captured at the diagnosis gate, reused in the brief
  client: { name: string; company: string; email: string };
  setClient: (patch: Partial<{ name: string; company: string; email: string }>) => void;

  // Derived journey state
  progress: { step1: boolean; step2: boolean; step3: boolean; pct: number };
  briefCount: number;
}

const SelectionContext = createContext<SelectionState | null>(null);

const DEFAULT_FORMAT: FormatId = "explained";

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const { formats: FORMATS, services: SERVICES, headaches: HEADACHES } = useContent();
  const [selected, setSelected] = useState<string[]>([]);
  const [manualFormatId, setManualFormatId] = useState<FormatId | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [client, setClientState] = useState({ name: "", company: "", email: "" });
  const setClient = useCallback(
    (patch: Partial<{ name: string; company: string; email: string }>) =>
      setClientState((prev) => ({ ...prev, ...patch })),
    []
  );

  const toggle = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const clear = useCallback(() => setSelected([]), []);
  const isSelected = useCallback(
    (id: string) => selected.includes(id),
    [selected]
  );

  const selectedHeadacheLabels = useMemo(
    () =>
      selected
        .map((id) => HEADACHES.find((h) => h.id === id)?.label)
        .filter((l): l is string => Boolean(l)),
    [selected, HEADACHES]
  );

  // All recommended target ids (formats + services), ordered by how many selected
  // headaches map to each. A headache can recommend several targets via `recommends`;
  // the legacy single `formatId` is honoured as a fallback for un-migrated content.
  const recommendedTargetIds = useMemo(() => {
    const counts = new Map<string, number>();
    for (const id of selected) {
      const h = HEADACHES.find((x) => x.id === id);
      if (!h) continue;
      const targets = h.recommends ?? (h.formatId ? [h.formatId] : []);
      for (const t of targets) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
  }, [selected, HEADACHES]);

  // Split into recommended video formats and non-video services for the UI.
  const recommendedFormatIds = useMemo(
    () => recommendedTargetIds.filter((id) => FORMATS.some((f) => f.id === id)),
    [recommendedTargetIds, FORMATS]
  );
  const recommendedServiceIds = useMemo(
    () => recommendedTargetIds.filter((id) => SERVICES.some((s) => s.id === id)),
    [recommendedTargetIds, SERVICES]
  );

  // Active format = manual pin, else top recommendation, else default.
  const activeFormatId: FormatId =
    manualFormatId ?? recommendedFormatIds[0] ?? DEFAULT_FORMAT;
  const setActiveFormat = useCallback(
    (id: FormatId) => setManualFormatId(id),
    []
  );
  const formatEngaged = manualFormatId !== null || recommendedFormatIds.length > 0;

  const toggleAddOn = useCallback((label: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  }, []);
  const isAddOnSelected = useCallback(
    (label: string) => selectedAddOns.includes(label),
    [selectedAddOns]
  );

  const progress = useMemo(() => {
    const step1 = selected.length > 0;
    const step2 = formatEngaged;
    // Step 3 = anything that fleshes out the brief: a ready-made package,
    // an extra service or an add-on.
    const step3 = selectedPackage !== null || selectedAddOns.length > 0;
    const done = [step1, step2, step3].filter(Boolean).length;
    return { step1, step2, step3, pct: Math.round((done / 3) * 100) };
  }, [selected.length, formatEngaged, selectedPackage, selectedAddOns.length]);

  const briefCount =
    selectedHeadacheLabels.length +
    (progress.step2 ? 1 : 0) +
    (selectedPackage ? 1 : 0) +
    selectedAddOns.length;

  const value: SelectionState = {
    selected,
    toggle,
    clear,
    isSelected,
    selectedHeadacheLabels,
    recommendedFormatIds,
    recommendedServiceIds,
    activeFormatId,
    setActiveFormat,
    formatEngaged,
    selectedPackage,
    setSelectedPackage,
    selectedAddOns,
    toggleAddOn,
    isAddOnSelected,
    budget,
    setBudget,
    timeline,
    setTimeline,
    client,
    setClient,
    progress,
    briefCount,
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection(): SelectionState {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return ctx;
}
