import { getCreationBySlug, getAllCreations } from "@/lib/data/creations";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play, ExternalLink, Award } from "lucide-react";

export async function generateStaticParams() {
  const creations = getAllCreations();
  return creations.map((creation) => ({
    slug: creation.slug,
  }));
}

export default function CreationPage({ params }: { params: { slug: string } }) {
  const creation = getCreationBySlug(params.slug);

  if (!creation) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-director-black">
      {/* Hero Section with Video */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-director-black" />
        
        {/* Video placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-bedroom-purple/20 to-gray-900 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border-2 border-white/20 cursor-pointer hover:scale-110 transition-transform">
            <Play className="w-12 h-12 text-white ml-2" fill="white" />
          </div>
        </div>

        {/* Back button */}
        <Link
          href="/showcase"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm border border-gray-700/50 rounded-lg text-screen-white hover:bg-black/80 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Showcase
        </Link>
      </section>

      {/* Content */}
      <section className="relative py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-1 bg-bedroom-purple/20 border border-bedroom-purple/40 rounded-full text-bedroom-purple text-sm font-semibold uppercase tracking-wide">
                {creation.category}
              </span>
              <span className="text-screen-white/60 text-sm">
                {creation.views} views
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-screen-white mb-4">
              {creation.title}
            </h1>

            <div className="flex items-center gap-4 text-screen-white/70">
              <span>by {creation.creator.name}</span>
              {creation.creator.type && (
                <span className="px-3 py-1 bg-black/40 border border-gray-700/50 rounded-lg text-xs">
                  {creation.creator.type}
                </span>
              )}
            </div>

            {creation.awards && creation.awards.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {creation.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-bedroom-purple/10 border border-bedroom-purple/30 rounded-lg">
                    <Award className="w-4 h-4 text-bedroom-purple" />
                    <span className="text-screen-white text-sm">{award}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="text-screen-white/80 text-lg leading-relaxed">
              {creation.longDescription}
            </p>
          </div>

          {/* Tools Used */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-screen-white mb-6">Tools Used</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {creation.tools.map((tool, i) => (
                <div key={i} className="p-6 bg-black/40 border border-gray-800/50 rounded-xl">
                  <h3 className="text-lg font-semibold text-screen-white mb-2">{tool.name}</h3>
                  <p className="text-screen-white/60 text-sm mb-2">{tool.category}</p>
                  <p className="text-screen-white/70 text-sm">{tool.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-screen-white mb-6">How It Was Made</h2>
            
            <div className="space-y-8">
              {/* Concept */}
              <div>
                <h3 className="text-xl font-semibold text-bedroom-purple mb-3">Concept</h3>
                <p className="text-screen-white/80">{creation.breakdown.concept}</p>
              </div>

              {/* Budget & Timeline */}
              {(creation.breakdown.budget || creation.breakdown.timeline) && (
                <div className="flex gap-8">
                  {creation.breakdown.budget && (
                    <div>
                      <h3 className="text-xl font-semibold text-bedroom-purple mb-3">Budget</h3>
                      <p className="text-screen-white/80">{creation.breakdown.budget}</p>
                    </div>
                  )}
                  {creation.breakdown.timeline && (
                    <div>
                      <h3 className="text-xl font-semibold text-bedroom-purple mb-3">Timeline</h3>
                      <p className="text-screen-white/80">{creation.breakdown.timeline}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Process */}
              <div>
                <h3 className="text-xl font-semibold text-bedroom-purple mb-3">Process</h3>
                <ul className="space-y-2">
                  {creation.breakdown.process.map((step, i) => (
                    <li key={i} className="flex gap-3 text-screen-white/80">
                      <span className="text-bedroom-purple font-semibold">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="text-xl font-semibold text-bedroom-purple mb-3">Challenges</h3>
                <ul className="space-y-2">
                  {creation.breakdown.challenges.map((challenge, i) => (
                    <li key={i} className="flex gap-3 text-screen-white/80">
                      <span className="text-bedroom-purple">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-xl font-semibold text-bedroom-purple mb-3">Results</h3>
                <ul className="space-y-2">
                  {creation.breakdown.results.map((result, i) => (
                    <li key={i} className="flex gap-3 text-screen-white/80">
                      <span className="text-bedroom-purple">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Prompts */}
          {creation.prompts && creation.prompts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-screen-white mb-6">Prompts Used</h2>
              <div className="space-y-6">
                {creation.prompts.map((promptData, i) => (
                  <div key={i} className="p-6 bg-black/40 border border-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-bedroom-purple">{promptData.tool}</h3>
                      <span className="text-screen-white/60 text-sm">{promptData.settings}</span>
                    </div>
                    <p className="text-screen-white/80 font-mono text-sm bg-black/40 p-4 rounded-lg border border-gray-700/30">
                      {promptData.prompt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center pt-8 border-t border-gray-800/50">
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 px-8 py-4 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all"
            >
              View More Creations
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
