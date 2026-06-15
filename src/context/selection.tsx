"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FORMATS, HEADACHES, type FormatId } from "@/lib/content";

interface SelectionState {
  selected: string[]; // headache ids
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  selectedHeadacheLabels: string[];
  recommendedFormatIds: FormatId[];
}

const SelectionContext = createContext<SelectionState | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const isSelected = useCallback((id: string) => selected.includes(id), [selected]);

  const selectedHeadacheLabels = useMemo(
    () =>
      selected
        .map((id) => HEADACHES.find((h) => h.id === id)?.label)
        .filter((l): l is string => Boolean(l)),
    [selected]
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
  }, [selected]);

  const value: SelectionState = {
    selected,
    toggle,
    clear,
    isSelected,
    selectedHeadacheLabels,
    recommendedFormatIds,
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
