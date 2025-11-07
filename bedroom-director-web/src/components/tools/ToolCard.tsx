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
      <div className="group h-full p-6 bg-black/60 border border-gray-900 rounded-xl hover:border-neon-purple hover:bg-black/80 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 cinematic-shadow hover:neon-box-glow backdrop-blur-sm">
        {/* Category Badge */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 ${categoryColor} text-white text-xs font-semibold rounded-full`}>
            {categoryLabel}
          </span>
        </div>

        {/* Tool Name & Vendor */}
        <h3 className="text-xl font-bold text-screen-white mb-1 group-hover:text-neon-purple transition-colors">
          {tool.model}
        </h3>
        <p className="text-sm text-screen-white/60 mb-4">
          {tool.vendor}
        </p>

        {/* Description */}
        <p className="text-screen-white/70 text-sm line-clamp-3 mb-4">
          {tool.distinctiveEdge || tool.keyFeatures}
        </p>

        {/* View Details Link */}
        <div className="flex items-center gap-2 text-neon-purple text-sm font-medium group-hover:gap-3 transition-all">
          View Details
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
