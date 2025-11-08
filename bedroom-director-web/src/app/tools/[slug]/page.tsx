import { getTools, getToolBySlug, CATEGORY_LABELS } from "@/lib/data/tools";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tools = getTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);

  if (!tool) {
    notFound();
  }

  const categoryLabel = CATEGORY_LABELS[tool.category] || tool.category;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-screen-white/60 hover:text-screen-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        {/* Tool Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-screen-white mb-2">
                {tool.model}
              </h1>
              <p className="text-xl text-screen-white/70 mb-4">{tool.vendor}</p>
              <span className="inline-block px-4 py-2 bg-bedroom-purple text-white text-sm font-semibold rounded-full">
                {categoryLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Tool Details */}
        <div className="space-y-8">
          {/* Distinctive Edge */}
          {tool.distinctiveEdge && (
            <div>
              <h2 className="text-2xl font-bold text-screen-white mb-4">
                What Makes It Special
              </h2>
              <p className="text-screen-white/80 text-lg leading-relaxed">
                {tool.distinctiveEdge}
              </p>
            </div>
          )}

          {/* Pro Tips */}
          {tool.proTips && (
            <div className="p-6 bg-bedroom-purple/10 border-l-4 border-bedroom-purple rounded-lg">
              <h2 className="text-xl font-bold text-bedroom-purple mb-3 flex items-center gap-2">
                <span>💡</span> Pro Tips
              </h2>
              <p className="text-screen-white/90 leading-relaxed">
                {tool.proTips}
              </p>
            </div>
          )}

          {/* Key Features */}
          {tool.keyFeatures && (
            <div>
              <h2 className="text-2xl font-bold text-screen-white mb-4">
                Key Features
              </h2>
              <p className="text-screen-white/80 leading-relaxed">
                {tool.keyFeatures}
              </p>
            </div>
          )}

          {/* Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.pricing && (
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold text-screen-white/60 mb-2">
                  Pricing
                </h3>
                <p className="text-screen-white">{tool.pricing}</p>
              </div>
            )}

            {tool.skillLevel && (
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold text-screen-white/60 mb-2">
                  Skill Level
                </h3>
                <p className="text-screen-white">{tool.skillLevel}</p>
              </div>
            )}

            {tool.speed && (
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold text-screen-white/60 mb-2">
                  Speed
                </h3>
                <p className="text-screen-white">{tool.speed}</p>
              </div>
            )}

            {tool.durationResolution && (
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold text-screen-white/60 mb-2">
                  Output
                </h3>
                <p className="text-screen-white">{tool.durationResolution}</p>
              </div>
            )}

            {tool.modality && (
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold text-screen-white/60 mb-2">
                  Modality
                </h3>
                <p className="text-screen-white">{tool.modality}</p>
              </div>
            )}

            {tool.licenseType && (
              <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold text-screen-white/60 mb-2">
                  License
                </h3>
                <p className="text-screen-white">{tool.licenseType}</p>
              </div>
            )}
          </div>

          {/* Controls */}
          {tool.controls && (
            <div>
              <h2 className="text-2xl font-bold text-screen-white mb-4">
                Controls
              </h2>
              <p className="text-screen-white/80 leading-relaxed">
                {tool.controls}
              </p>
            </div>
          )}

          {/* Drawbacks */}
          {tool.drawbacks && (
            <div>
              <h2 className="text-2xl font-bold text-screen-white mb-4">
                Considerations
              </h2>
              <p className="text-screen-white/80 leading-relaxed">
                {tool.drawbacks}
              </p>
            </div>
          )}

          {/* Sources */}
          {tool.notableSources && (
            <div>
              <h2 className="text-2xl font-bold text-screen-white mb-4">
                Resources
              </h2>
              <div className="flex flex-wrap gap-2">
                {tool.notableSources.split(';').map((source, index) => (
                  source.trim() && (
                    <a
                      key={index}
                      href={source.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-bedroom-purple hover:border-bedroom-purple/50 transition-all"
                    >
                      <span className="text-sm">Learn More</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
