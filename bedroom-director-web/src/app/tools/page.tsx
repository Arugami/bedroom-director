import { Suspense } from "react";
import { getTools } from "@/lib/data/tools";
import ToolsClient from "@/components/tools/ToolsClient";

export default function ToolsPage() {
  const tools = getTools();

  return (
    <Suspense fallback={
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-screen-white/60">Loading...</div>
      </div>
    }>
      <ToolsClient tools={tools} />
    </Suspense>
  );
}
