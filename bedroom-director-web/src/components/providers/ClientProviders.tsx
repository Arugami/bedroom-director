"use client";

import { ReactNode } from "react";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import ComparisonTray from "@/components/comparison/ComparisonTray";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ComparisonProvider>
      {children}
      <ComparisonTray />
    </ComparisonProvider>
  );
}
