import { getPromptBySlug, getAllPrompts } from "@/lib/data/prompts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Copy, ExternalLink, Heart, Eye, Sparkles, Settings } from "lucide-react";

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }));
}

export default function PromptDetailPage({ params }: { params: { slug: string } }) {
  const prompt = getPromptBySlug(params.slug);

  if (!prompt) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-director-black">
      {/* Hero Section with Result */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-director-black" />

        {/* Result preview */}
        <div className="absolute inset-0 bg-gradient-to-br from-bedroom-purple/20 to-gray-900 flex items-center justify-center">
          <div className="text-screen-white/20 text-lg uppercase tracking-wide">
            {prompt.category} Result Preview
          </div>
        </div>

        {/* Back button */}
        <Link
          href="/prompts"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm border border-gray-700/50 rounded-lg text-screen-white hover:bg-black/80 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Link>
      </section>

      {/* Content */}
      <section className="relative py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-1 bg-bedroom-purple/20 border border-bedroom-purple/40 rounded-full text-bedroom-purple text-sm font-semibold uppercase tracking-wide">
                {prompt.category}
              </span>
              <div className="flex items-center gap-3 text-screen-white/70 text-sm">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{prompt.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{prompt.views}</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-screen-white mb-4">
              {prompt.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bedroom-purple to-purple-bloom flex items-center justify-center text-white text-lg font-bold">
                {prompt.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-screen-white font-medium">{prompt.author.name}</p>
                <p className="text-screen-white/60 text-sm">@{prompt.author.username}</p>
              </div>
            </div>
          </div>

          {/* The Prompt */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-screen-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-bedroom-purple" />
                The Prompt
              </h2>
              <button
                onClick={() => navigator.clipboard.writeText(prompt.prompt_text)}
                className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 border border-gray-700/50 hover:border-gray-600 text-screen-white rounded-lg transition-all"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
            <div className="p-6 bg-black/40 border border-gray-800/50 rounded-xl">
              <p className="text-screen-white/90 text-lg leading-relaxed font-mono">
                {prompt.prompt_text}
              </p>
            </div>
          </div>

          {/* Tool & Settings */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Tool Used */}
            <div className="p-6 bg-black/40 border border-gray-800/50 rounded-xl">
              <h3 className="text-lg font-semibold text-screen-white mb-3 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-bedroom-purple" />
                Tool Used
              </h3>
              <Link
                href={`/tools/${prompt.tool_slug}`}
                className="text-bedroom-purple hover:text-purple-bloom text-xl font-medium transition-colors"
              >
                {prompt.tool_used}
              </Link>
              <div className="mt-4">
                <Link
                  href={`/tools/${prompt.tool_slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-medium rounded-lg transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Try This Tool
                </Link>
              </div>
            </div>

            {/* Settings */}
            <div className="p-6 bg-black/40 border border-gray-800/50 rounded-xl">
              <h3 className="text-lg font-semibold text-screen-white mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-bedroom-purple" />
                Settings Used
              </h3>
              <p className="text-screen-white/80">{prompt.settings}</p>
            </div>
          </div>

          {/* Style Tags */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-screen-white mb-4">Style Tags</h3>
            <div className="flex flex-wrap gap-3">
              {prompt.style_tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-black/40 border border-gray-700/50 rounded-lg text-screen-white/80"
                >
                  {tag}
                </span>
              ))}
              <span className="px-4 py-2 bg-bedroom-purple/20 border border-bedroom-purple/40 rounded-lg text-bedroom-purple">
                {prompt.outcome_type}
              </span>
            </div>
          </div>

          {/* Pro Tips */}
          {prompt.tips && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-screen-white mb-4">💡 Pro Tips</h3>
              <div className="p-6 bg-bedroom-purple/10 border border-bedroom-purple/30 rounded-xl">
                <p className="text-screen-white/90 leading-relaxed">{prompt.tips}</p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center pt-8 border-t border-gray-800/50">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 px-8 py-4 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all"
            >
              Explore More Prompts
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
