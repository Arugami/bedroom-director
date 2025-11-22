"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Tool, CATEGORY_LABELS } from "@/lib/types/tools";
import { cn } from "@/lib/utils";
import { useComparison } from "@/contexts/ComparisonContext";
import { Check, Plus, ArrowRight } from "lucide-react";

interface ToolCardProps {
    tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    const { addTool, removeTool, isInComparison } = useComparison();
    const inComparison = isInComparison(tool.id);

    const handleCompareClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (inComparison) {
            removeTool(tool.id);
        } else {
            addTool(tool);
        }
    };

    // Category styling
    const categoryLabel = CATEGORY_LABELS[tool.category] || tool.category;
    const categoryColor = "bg-bedroom-purple/20";

    // Trust signals
    const hasAPI = tool.hasAPI;
    const hasCommercialUse = tool.commercialUse === "Yes";

    return (
        <div className="group relative h-full bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.4)] hover:scale-[1.02]">

            <Link href={`/tools/${tool.slug}`} className="block h-full relative aspect-video">
                {/* Full Bleed Image */}
                {tool.thumbnailUrl ? (
                    <Image
                        src={tool.thumbnailUrl}
                        alt={`${tool.model} interface`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                        <span className="text-4xl font-bold text-white/10">
                            {tool.model.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Cinematic Gradient Overlay - Always visible for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className={cn(
                        "px-2 py-1 text-[10px] font-bold tracking-wider uppercase rounded backdrop-blur-md border border-white/10 shadow-sm",
                        categoryColor,
                        "text-white"
                    )}>
                        {categoryLabel}
                    </span>
                    {tool.isNew && (
                        <span className="px-2 py-1 bg-bedroom-purple text-white text-[10px] font-bold tracking-wider uppercase rounded shadow-lg animate-pulse">
                            New
                        </span>
                    )}
                </div>

                {/* Comparison Button (Top Right) */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button
                        onClick={handleCompareClick}
                        className={cn(
                            "p-2 rounded-lg backdrop-blur-md border transition-all duration-300",
                            inComparison
                                ? "bg-bedroom-purple text-white border-bedroom-purple"
                                : "bg-black/40 text-white/70 hover:text-white border-white/20 hover:bg-black/60"
                        )}
                        title={inComparison ? "Remove from comparison" : "Add to comparison"}
                    >
                        {inComparison ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                </div>

                {/* Content Overlay (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">

                    {/* Title & Vendor */}
                    <div className="mb-2">
                        <h3 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-bedroom-purple transition-colors">
                            {tool.model}
                        </h3>
                        <p className="text-xs text-white/60 font-medium tracking-wide uppercase">
                            by {tool.vendor}
                        </p>
                    </div>

                    {/* Description (Reveals/Expands on Hover) */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                        <div className="overflow-hidden">
                            <p className="text-sm text-white/80 line-clamp-2 font-light leading-relaxed pt-2 border-t border-white/10 mt-2">
                                {tool.distinctiveEdge || tool.keyFeatures}
                            </p>

                            {/* Trust Signals in Expanded View */}
                            <div className="flex items-center gap-3 mt-4 pt-1">
                                {hasAPI && (
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider border border-emerald-400/30 px-1.5 py-0.5 rounded bg-emerald-400/10">API</span>
                                )}
                                {hasCommercialUse && (
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider border border-blue-400/30 px-1.5 py-0.5 rounded bg-blue-400/10">Commercial</span>
                                )}
                                <div className="ml-auto flex items-center gap-1 text-xs font-bold text-white group-hover:text-bedroom-purple transition-colors">
                                    Explore <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
