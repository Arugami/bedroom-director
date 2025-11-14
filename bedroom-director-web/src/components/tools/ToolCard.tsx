"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plus, Check } from "lucide-react";
import { Tool, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types/tools";
import { useComparison } from "@/contexts/ComparisonContext";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const categoryLabel = CATEGORY_LABELS[tool.category] || tool.category;
  const categoryColor = CATEGORY_COLORS[tool.category] || "bg-gray-500";
  const inComparison = isInComparison(tool.id);

  // Determine if tool has API access or commercial license
  const hasAPI = tool.notableSources?.toLowerCase().includes('api') ||
                 tool.notableSources?.toLowerCase().includes('fal.ai') ||
                 tool.notableSources?.toLowerCase().includes('replicate');
  const hasCommercialUse = tool.license?.toLowerCase().includes('commercial') ||
                           tool.licenseType?.toLowerCase().includes('commercial');

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inComparison) {
      removeFromComparison(tool.id);
    } else {
      addToComparison(tool);
    }
  };

  return (
    <div className="group h-full bg-black/60 border border-gray-900 rounded-xl overflow-hidden hover:border-bedroom-purple hover:bg-black/80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-bedroom-purple/5 hover:shadow-xl hover:shadow-bedroom-purple/20 backdrop-blur-sm flex flex-col">
      {/* Thumbnail - 16:9 aspect ratio, dominates card */}
      <Link href={`/tools/${tool.slug}`} className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {tool.thumbnailUrl ? (
          <>
            <Image
              src={tool.thumbnailUrl}
              alt={`${tool.model} interface preview`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        ) : (
          /* Placeholder for tools without thumbnails */
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="text-center px-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-bedroom-purple/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-bedroom-purple/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 font-medium">{categoryLabel}</p>
            </div>
          </div>
        )}

        {/* Category badge on image */}
        <span className={`absolute top-3 left-3 px-3 py-1 ${categoryColor} text-white text-xs font-semibold rounded-full shadow-lg`}>
          {categoryLabel}
        </span>

        {/* New badge if applicable */}
        {tool.isNew && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-bedroom-purple text-white text-xs font-semibold rounded-full shadow-lg animate-pulse">
            NEW
          </span>
        )}
      </Link>

      {/* Content section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Tool Name & Vendor */}
        <Link href={`/tools/${tool.slug}`}>
          <h3 className="text-lg font-bold text-screen-white mb-1 group-hover:text-bedroom-purple transition-colors line-clamp-1">
            {tool.model}
          </h3>
        </Link>
        <p className="text-xs text-screen-white/50 mb-3">
          by {tool.vendor}
        </p>

        {/* Distinctive Edge - ONE line only (Chiat/Day: concise and poetic) */}
        <Link href={`/tools/${tool.slug}`}>
          <p className="text-screen-white/70 text-sm line-clamp-2 mb-4 flex-grow">
            {tool.distinctiveEdge || tool.keyFeatures}
          </p>
        </Link>

        {/* Trust Signal Badges - Quick scan (Sprint 1, Track 1) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hasAPI && (
            <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded font-medium">
              API
            </span>
          )}
          {hasCommercialUse && (
            <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs rounded font-medium">
              Commercial
            </span>
          )}
          {tool.pricing?.toLowerCase().includes('free') && (
            <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs rounded font-medium">
              Free Tier
            </span>
          )}
        </div>

        {/* Quick Specs - Pricing & Speed */}
        <div className="mb-4 flex items-center justify-between text-xs text-screen-white/60">
          <span className="font-medium">
            {tool.pricing && tool.pricing.length > 20
              ? `${tool.pricing.substring(0, 20)}...`
              : tool.pricing || 'See pricing'}
          </span>
          {tool.speed && (
            <span className="text-screen-white/50">
              {tool.speed}
            </span>
          )}
        </div>

        {/* CTAs - Chiat/Day voice: "Explore" instead of "View Details" */}
        <div className="flex items-center gap-2 mt-auto">
          <Link
            href={`/tools/${tool.slug}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-bedroom-purple/10 hover:bg-bedroom-purple text-screen-white/80 hover:text-screen-white text-sm font-medium rounded-lg transition-all group"
          >
            Explore
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={handleCompareClick}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1 ${
              inComparison
                ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/30"
                : "bg-gray-900/50 hover:bg-gray-800 text-screen-white/70 hover:text-screen-white border border-gray-800 hover:border-bedroom-purple/50"
            }`}
            title={inComparison ? "Remove from comparison" : "Add to comparison"}
          >
            {inComparison ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
