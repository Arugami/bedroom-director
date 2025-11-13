import Link from "next/link";
import { Heart, Eye, Copy, ExternalLink, Sparkles } from "lucide-react";
import { Prompt } from "@/lib/data/prompts";

interface PromptCardProps {
  prompt: Prompt;
}

const CATEGORY_COLORS: Record<string, string> = {
  video: "bg-bedroom-purple/20 text-bedroom-purple border-bedroom-purple/40",
  image: "bg-[#FF8C42]/20 text-[#FF8C42] border-[#FF8C42]/40",
  voice: "bg-[#00CED1]/20 text-[#00CED1] border-[#00CED1]/40",
  music: "bg-[#FCD34D]/20 text-[#FCD34D] border-[#FCD34D]/40",
};

export default function PromptCard({ prompt }: PromptCardProps) {
  const categoryColor = CATEGORY_COLORS[prompt.category] || "bg-gray-800/20 text-gray-400 border-gray-700/40";

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt_text);
    // TODO: Add toast notification
  };

  const handleTryThis = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Will implement deep linking in next step
    window.open(`/tools/${prompt.tool_slug}`, '_blank');
  };

  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="group relative block"
    >
      <div className="relative h-full rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700 hover:shadow-2xl hover:shadow-bedroom-purple/20 transition-all duration-300">
        {/* Result Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-bedroom-purple/20 to-gray-900 overflow-hidden">
          {/* Placeholder for actual image/video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-screen-white/20 text-sm uppercase tracking-wide">
              {prompt.category} result
            </div>
          </div>

          {/* Featured Badge */}
          {prompt.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#FF8C42]/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>
          )}

          {/* Category Badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wide border ${categoryColor}`}>
            {prompt.category}
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                <Heart className="w-4 h-4" />
                <span>{prompt.likes}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                <Eye className="w-4 h-4" />
                <span>{prompt.views}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-screen-white mb-2 group-hover:text-purple-bloom transition-colors line-clamp-1">
            {prompt.title}
          </h3>

          {/* Prompt Text */}
          <div className="mb-4">
            <p className="text-screen-white/70 text-sm line-clamp-2 mb-2">
              {prompt.prompt_text}
            </p>
          </div>

          {/* Tool Used */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-screen-white/50 text-xs">Tool:</span>
              <span className="text-bedroom-purple text-sm font-medium">
                {prompt.tool_used}
              </span>
            </div>
          </div>

          {/* Style Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {prompt.style_tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-black/40 border border-gray-700/50 rounded-md text-screen-white/60 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Author */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800/50">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-bedroom-purple to-purple-bloom flex items-center justify-center text-white text-xs font-bold">
              {prompt.author.name.charAt(0)}
            </div>
            <span className="text-screen-white/60 text-sm">
              {prompt.author.name}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleTryThis}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-medium rounded-lg transition-all text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Try This
            </button>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 border border-gray-700/50 hover:border-gray-600 text-screen-white/70 hover:text-screen-white rounded-lg transition-all text-sm"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
