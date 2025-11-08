import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tool, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types/tools";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const categoryLabel = CATEGORY_LABELS[tool.category] || tool.category;
  const categoryColor = CATEGORY_COLORS[tool.category] || "bg-gray-500";

  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="group h-full p-4 sm:p-6 bg-black/60 border border-gray-900 rounded-xl hover:border-bedroom-purple hover:bg-black/80 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 shadow-lg shadow-bedroom-purple/5 hover:shadow-bedroom-purple/20 backdrop-blur-sm flex flex-col">
        {/* Category Badge & Best For */}
        <div className="mb-4 flex flex-wrap gap-2">
          <span className={`inline-block px-3 py-1 ${categoryColor} text-white text-xs font-semibold rounded-full`}>
            {categoryLabel}
          </span>
          {tool.bestFor && (
            <span className="inline-block px-3 py-1 bg-gray-800 text-screen-white/80 text-xs rounded-full">
              {tool.bestFor}
            </span>
          )}
          {tool.proTips && (
            <span className="inline-block px-3 py-1 bg-bedroom-purple/20 border border-bedroom-purple/40 text-bedroom-purple text-xs rounded-full">
              💡 Pro Tips
            </span>
          )}
        </div>

        {/* Tool Name & Vendor */}
        <h3 className="text-xl font-bold text-screen-white mb-1 group-hover:text-bedroom-purple transition-colors">
          {tool.model}
        </h3>
        <p className="text-sm text-screen-white/60 mb-3">
          by {tool.vendor}
        </p>

        {/* Distinctive Edge */}
        <p className="text-screen-white/70 text-sm line-clamp-3 mb-4 flex-grow">
          {tool.distinctiveEdge || tool.keyFeatures}
        </p>

        {/* Pricing & Speed Info */}
        <div className="mb-4 space-y-2">
          {tool.pricing && (
            <div className="text-xs text-screen-white/60">
              <span className="font-semibold text-screen-white/80">Pricing:</span>{" "}
              {tool.pricing.length > 60 ? `${tool.pricing.substring(0, 60)}...` : tool.pricing}
            </div>
          )}
          {tool.speed && (
            <div className="text-xs text-screen-white/60">
              <span className="font-semibold text-screen-white/80">Speed:</span> {tool.speed}
            </div>
          )}
        </div>

        {/* View Details Link */}
        <div className="flex items-center gap-2 text-bedroom-purple text-sm font-medium group-hover:gap-3 transition-all mt-auto">
          View Details
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
