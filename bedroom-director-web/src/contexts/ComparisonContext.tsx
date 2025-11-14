"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Tool } from "@/lib/types/tools";

interface ComparisonContextType {
  comparisonTools: Tool[];
  addToComparison: (tool: Tool) => void;
  removeFromComparison: (toolId: string) => void;
  clearComparison: () => void;
  isInComparison: (toolId: string) => boolean;
  toggleTray: () => void;
  isTrayOpen: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_COMPARISON_ITEMS = 4; // Limit to 4 tools for readability

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonTools, setComparisonTools] = useState<Tool[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  const addToComparison = (tool: Tool) => {
    if (comparisonTools.length >= MAX_COMPARISON_ITEMS) {
      alert(`Maximum ${MAX_COMPARISON_ITEMS} tools can be compared at once.`);
      return;
    }

    if (!comparisonTools.find((t) => t.id === tool.id)) {
      setComparisonTools([...comparisonTools, tool]);
      setIsTrayOpen(true); // Auto-open tray when adding
    }
  };

  const removeFromComparison = (toolId: string) => {
    setComparisonTools(comparisonTools.filter((t) => t.id !== toolId));
  };

  const clearComparison = () => {
    setComparisonTools([]);
    setIsTrayOpen(false);
  };

  const isInComparison = (toolId: string) => {
    return comparisonTools.some((t) => t.id === toolId);
  };

  const toggleTray = () => {
    setIsTrayOpen(!isTrayOpen);
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparisonTools,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        toggleTray,
        isTrayOpen,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider");
  }
  return context;
}
