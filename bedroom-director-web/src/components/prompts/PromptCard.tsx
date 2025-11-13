"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Eye, Copy, ExternalLink, Sparkles, Zap } from "lucide-react";
import { Prompt } from "@/lib/data/prompts";

interface PromptCardProps {
  prompt: Prompt;
  onCopy?: (prompt: Prompt) => void;
  onTryThis?: (prompt: Prompt) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  video: "bg-bedroom-purple/20 text-bedroom-purple border-bedroom-purple/40",
  image: "bg-[#FF8C42]/20 text-[#FF8C42] border-[#FF8C42]/40",
  voice: "bg-[#00CED1]/20 text-[#00CED1] border-[#00CED1]/40",
  music: "bg-[#FCD34D]/20 text-[#FCD34D] border-[#FCD34D]/40",
};

export default function PromptCard({ prompt, onCopy, onTryThis }: PromptCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const categoryColor = CATEGORY_COLORS[prompt.category] || "bg-gray-800/20 text-gray-400 border-gray-700/40";

  // Generate realistic "tried by" count based on likes and views
  const triedByCount = Math.floor(prompt.views * 0.15);

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt_text);
    onCopy?.(prompt);
  };

  const handleTryThis = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt_text);
    onTryThis?.(prompt);
  };

  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-bedroom-purple/50 hover:shadow-2xl hover:shadow-bedroom-purple/30 transition-all duration-300">
        {/* Result Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-bedroom-purple/20 to-gray-900 overflow-hidden">
          {/* Placeholder for actual image/video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-screen-white/20 text-sm uppercase tracking-wide">
              {prompt.category} result
            </div>
          </div>

          {/* Hover Overlay with Prompt Text */}
          <div
            className={`absolute inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="text-center">
              <p className="text-screen-white/90 text-sm leading-relaxed line-clamp-6 mb-4">
                {prompt.prompt_text}
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleTryThis}
                  className="flex items-center gap-2 px-4 py-2 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-medium rounded-lg transition-all text-sm"
                >
                  <Zap className="w-4 h-4" />
                  Try This
                </button>
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 border border-gray-700/50 text-screen-white rounded-lg transition-all text-sm"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
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
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                <Heart className="w-4 h-4" />
                <span>{prompt.likes}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                <Eye className="w-4 h-4" />
                <span>{prompt.views}</span>
              </div>
            </div>
            {/* W+K: Social Proof */}
            <div className="flex items-center gap-1 bg-bedroom-purple/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
              <Zap className="w-3 h-3" />
              <span>Tried by {triedByCount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Content - Jobs: Simple & Clear */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-screen-white mb-3 group-hover:text-purple-bloom transition-colors line-clamp-1">
            {prompt.title}
          </h3>

          {/* Tool Used - Most Important Info */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800/50">
            <div className="flex items-center gap-2">
              <span className="text-screen-white/50 text-xs">Tool:</span>
              <span className="text-bedroom-purple text-sm font-medium">
                {prompt.tool_used}
              </span>
            </div>
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-bedroom-purple to-purple-bloom flex items-center justify-center text-white text-xs font-bold">
                {prompt.author.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Style Tags - Minimal */}
          <div className="flex flex-wrap gap-2 mb-4">
            {prompt.style_tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-black/40 border border-gray-700/50 rounded-md text-screen-white/60 text-xs"
              >
                {tag}
              </span>
            ))}
            {prompt.style_tags.length > 2 && (
              <span className="px-2 py-1 text-screen-white/40 text-xs">
                +{prompt.style_tags.length - 2}
              </span>
            )}
          </div>

          {/* Pro Tip Preview */}
          {prompt.tips && (
            <div className="mb-4 p-3 bg-bedroom-purple/10 border border-bedroom-purple/20 rounded-lg">
              <p className="text-screen-white/70 text-xs line-clamp-2">
                💡 {prompt.tips}
              </p>
            </div>
          )}

          {/* Action Buttons - Jobs: One Primary Action */}
          <button
            onClick={handleTryThis}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all shadow-lg shadow-bedroom-purple/20 hover:shadow-bedroom-purple/40"
          >
            <Zap className="w-4 h-4" />
            Try This Prompt
          </button>
        </div>
      </div>
    </Link>
  );
}
