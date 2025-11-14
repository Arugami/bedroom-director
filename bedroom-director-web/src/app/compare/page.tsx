"use client";

import { useComparison } from "@/contexts/ComparisonContext";
import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ComparePage() {
  const { comparisonTools, removeFromComparison, clearComparison } = useComparison();
  const router = useRouter();

  if (comparisonTools.length === 0) {
    return (
      <div className="min-h-screen bg-director-black flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-screen-white mb-4">
            Your Arsenal is Empty
          </h1>
          <p className="text-screen-white/70 mb-8">
            Add tools to compare from the catalog.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Tools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-director-black">
      {/* Cinematic Header */}
      <section className="relative py-16 overflow-hidden">
        {/* Twilight gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-director-black" />
        {/* Purple ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-bedroom-purple/10 via-transparent to-transparent" />
        {/* Film grain */}
        <div className="absolute inset-0 grain-texture opacity-15" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-screen-white/70 hover:text-screen-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={clearComparison}
              className="px-4 py-2 bg-transparent border border-gray-800 hover:border-red-500/50 text-screen-white/70 hover:text-red-400 rounded-lg transition-all text-sm font-medium"
            >
              Clear All
            </button>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-screen-white mb-4 text-center"
            style={{
              textShadow: "0 2px 30px rgba(124, 58, 237, 0.5), 0 4px 60px rgba(0, 0, 0, 0.8)"
            }}
          >
            Pick Your Weapon
          </h1>
          <p className="text-screen-white/90 text-center text-lg">
            Comparing {comparisonTools.length} {comparisonTools.length === 1 ? "tool" : "tools"}
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="relative py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 bg-director-black border border-gray-900/50 p-4 text-left">
                    <span className="text-xs font-semibold text-screen-white/40 uppercase tracking-wider">
                      Attribute
                    </span>
                  </th>
                  {comparisonTools.map((tool) => (
                    <th
                      key={tool.id}
                      className="border border-gray-900/50 p-4 bg-black/40 backdrop-blur-sm min-w-[280px]"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-screen-white mb-1 text-left">
                            {tool.model}
                          </h3>
                          <p className="text-xs text-screen-white/50 text-left">
                            by {tool.vendor}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromComparison(tool.id)}
                          className="p-1 hover:bg-red-500/10 rounded transition-colors flex-shrink-0"
                          title="Remove"
                        >
                          <X className="w-4 h-4 text-screen-white/50 hover:text-red-400" />
                        </button>
                      </div>
                      {/* Thumbnail */}
                      <div className="relative aspect-video w-full rounded overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                        {tool.thumbnailUrl ? (
                          <Image
                            src={tool.thumbnailUrl}
                            alt={tool.model}
                            fill
                            className="object-cover"
                            sizes="280px"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-bedroom-purple/10 flex items-center justify-center">
                              <svg className="w-6 h-6 text-bedroom-purple/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Pricing */}
                <ComparisonRow
                  label="Pricing"
                  tools={comparisonTools}
                  getValue={(tool) => tool.pricing || "N/A"}
                />

                {/* Free Tier */}
                <ComparisonRow
                  label="Free Tier"
                  tools={comparisonTools}
                  getValue={(tool) =>
                    tool.pricing?.toLowerCase().includes("free") ? "✓ Available" : "✗ None"
                  }
                  highlight={(value) => value.includes("✓")}
                />

                {/* API Access */}
                <ComparisonRow
                  label="API Access"
                  tools={comparisonTools}
                  getValue={(tool) => {
                    const hasAPI =
                      tool.notableSources?.toLowerCase().includes("api") ||
                      tool.notableSources?.toLowerCase().includes("fal.ai") ||
                      tool.notableSources?.toLowerCase().includes("replicate");
                    return hasAPI ? "✓ Available" : "✗ No API";
                  }}
                  highlight={(value) => value.includes("✓")}
                />

                {/* Commercial Use */}
                <ComparisonRow
                  label="Commercial Use"
                  tools={comparisonTools}
                  getValue={(tool) => {
                    const hasCommercial =
                      tool.license?.toLowerCase().includes("commercial") ||
                      tool.licenseType?.toLowerCase().includes("commercial");
                    return hasCommercial ? "✓ Allowed" : "Check License";
                  }}
                  highlight={(value) => value.includes("✓")}
                />

                {/* Speed */}
                {comparisonTools.some((t) => t.speed) && (
                  <ComparisonRow
                    label="Speed"
                    tools={comparisonTools}
                    getValue={(tool) => tool.speed || "N/A"}
                  />
                )}

                {/* Key Features */}
                <ComparisonRow
                  label="Key Features"
                  tools={comparisonTools}
                  getValue={(tool) => tool.keyFeatures || "N/A"}
                  multiline
                />

                {/* Distinctive Edge */}
                <ComparisonRow
                  label="Distinctive Edge"
                  tools={comparisonTools}
                  getValue={(tool) => tool.distinctiveEdge || "N/A"}
                  multiline
                  emphasize
                />

                {/* Drawbacks */}
                <ComparisonRow
                  label="Drawbacks"
                  tools={comparisonTools}
                  getValue={(tool) => tool.drawbacks || "N/A"}
                  multiline
                  warning
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper component for table rows
interface ComparisonRowProps {
  label: string;
  tools: any[];
  getValue: (tool: any) => string;
  multiline?: boolean;
  emphasize?: boolean;
  warning?: boolean;
  highlight?: (value: string) => boolean;
}

function ComparisonRow({
  label,
  tools,
  getValue,
  multiline = false,
  emphasize = false,
  warning = false,
  highlight,
}: ComparisonRowProps) {
  return (
    <tr>
      <td className="sticky left-0 z-20 bg-director-black border border-gray-900/50 p-4 font-semibold text-screen-white/90">
        {label}
      </td>
      {tools.map((tool) => {
        const value = getValue(tool);
        const isHighlighted = highlight?.(value);

        return (
          <td
            key={tool.id}
            className={`border border-gray-900/50 p-4 ${
              emphasize
                ? "bg-bedroom-purple/5"
                : warning
                ? "bg-red-500/5"
                : "bg-black/20"
            }`}
          >
            <div
              className={`${
                multiline ? "text-sm" : "text-sm"
              } ${
                isHighlighted
                  ? "text-green-400 font-semibold"
                  : emphasize
                  ? "text-screen-white"
                  : warning
                  ? "text-screen-white/70"
                  : "text-screen-white/80"
              }`}
            >
              {value}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
