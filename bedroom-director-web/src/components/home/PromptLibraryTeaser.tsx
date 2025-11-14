import Link from "next/link";
import { ArrowRight, Sparkles, Copy, Zap } from "lucide-react";
import { getFeaturedPrompts } from "@/lib/data/prompts";

export default function PromptLibraryTeaser() {
  const featuredPrompts = getFeaturedPrompts().slice(0, 3);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Twilight gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-director-black via-[#1e1b4b] to-director-black" />
      
      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF8C42]/20 border border-[#FF8C42]/40 rounded-full text-[#FF8C42] text-sm font-semibold uppercase tracking-wide mb-4">
            <Sparkles className="w-4 h-4" />
            New Feature
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-screen-white mb-6"
            style={{ textShadow: "0 2px 20px rgba(0, 0, 0, 0.6)" }}
          >
            Steal These Prompts
          </h2>
          <p className="text-screen-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Copy-paste your way to legendary content. No permission needed.
          </p>
          <Link
            href="/prompts"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-bold rounded-lg transition-all shadow-lg shadow-bedroom-purple/30 hover:shadow-bedroom-purple/50"
          >
            Browse All Prompts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Featured Prompts Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredPrompts.map((prompt) => (
            <Link
              key={prompt.id}
              href={`/prompts/${prompt.slug}`}
              className="group relative block"
            >
              <div className="relative h-full rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-bedroom-purple/50 hover:shadow-2xl hover:shadow-bedroom-purple/30 transition-all duration-300">
                {/* Result Preview */}
                <div className="relative aspect-video bg-gradient-to-br from-bedroom-purple/20 to-gray-900 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-screen-white/20 text-sm uppercase tracking-wide">
                      {prompt.category} result
                    </div>
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#FF8C42]/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </div>

                  {/* Quick Actions on Hover */}
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-bedroom-purple/90 rounded-lg text-white text-xs font-semibold">
                      <Zap className="w-3 h-3" />
                      Try This
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-black/60 border border-gray-700/50 rounded-lg text-white text-xs">
                      <Copy className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-screen-white mb-2 group-hover:text-purple-bloom transition-colors line-clamp-1">
                    {prompt.title}
                  </h3>
                  <p className="text-screen-white/60 text-sm mb-3 line-clamp-2">
                    {prompt.prompt_text}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-bedroom-purple text-xs font-medium">
                      {prompt.tool_used}
                    </span>
                    <div className="flex items-center gap-1 text-screen-white/50 text-xs">
                      <Zap className="w-3 h-3" />
                      <span>Tried by {Math.floor(prompt.views * 0.15).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-screen-white/60 mb-4">
            Join thousands of creators using these prompts
          </p>
          <Link
            href="/prompts"
            className="inline-flex items-center gap-2 text-bedroom-purple hover:text-purple-bloom font-semibold transition-colors"
          >
            View All {getFeaturedPrompts().length}+ Prompts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
