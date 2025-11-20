"use client";

import { ReactNode } from "react";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { SceneProvider } from "@/contexts/SceneContext";
import ComparisonTray from "@/components/comparison/ComparisonTray";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ComparisonProvider>
      <SceneProvider>
        {children}
        <ComparisonTray />
      </SceneProvider>
    </ComparisonProvider>
  );
}
