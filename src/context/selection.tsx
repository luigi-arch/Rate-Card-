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

  // Derived journey state
  progress: { step1: boolean; step2: boolean; step3: boolean; pct: number };
  briefCount: number;
}

const SelectionContext = createContext<SelectionState | null>(null);

const DEFAULT_FORMAT: FormatId = "explained";

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const { formats: FORMATS, headaches: HEADACHES } = useContent();
  const [selected, setSelected] = useState<string[]>([]);
  const [manualFormatId, setManualFormatId] = useState<FormatId | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

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

  // Recommended formats, ordered by how many selected headaches map to them.
  const recommendedFormatIds = useMemo(() => {
    const counts = new Map<FormatId, number>();
    for (const id of selected) {
      const h = HEADACHES.find((x) => x.id === id);
      if (!h) continue;
      counts.set(h.formatId, (counts.get(h.formatId) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([fid]) => fid)
      .filter((fid) => FORMATS.some((f) => f.id === fid));
  }, [selected, FORMATS, HEADACHES]);

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
    const step3 = selectedPackage !== null;
    const done = [step1, step2, step3].filter(Boolean).length;
    return { step1, step2, step3, pct: Math.round((done / 3) * 100) };
  }, [selected.length, formatEngaged, selectedPackage]);

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
