"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, ExternalLink } from "lucide-react";
import DirectorSidebar from "@/components/layout/DirectorSidebar";
import StudioHero from "@/components/layout/StudioHero";
import { getShowcaseSidebarConfig } from "@/lib/sidebarConfig";
import { getAllCreations, getAllCategories } from "@/lib/data/creations";

export default function ShowcasePage() {
  const allCreations = getAllCreations();
  const categories = getAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCreations = selectedCategory === "all"
    ? allCreations
    : allCreations.filter((c) => c.category === selectedCategory);

  // Get sidebar configuration
  const sidebarSections = getShowcaseSidebarConfig(
    selectedCategory,
    setSelectedCategory
  );

  return (
    <div className="flex min-h-screen bg-director-black">
      {/* Director Sidebar - "Gallery" Mode */}
      <DirectorSidebar
        mode="gallery"
        sections={sidebarSections}
        defaultCollapsed={false}
        storageKey="showcase-sidebar-collapsed"
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
      {/* Studio Hero */}
      <StudioHero
        title="AI Creations Showcase"
        subtitle="See what's possible. Learn from the best. Get inspired."
        kicker="Real AI-generated work from the community"
      />

      {/* Creations Grid */}
      <section className="relative py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <p className="text-screen-white/60 text-sm mb-6">
            {filteredCreations.length} {filteredCreations.length === 1 ? "creation" : "creations"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCreations.map((creation) => (
              <Link
                key={creation.id}
                href={`/showcase/${creation.slug}`}
                className="group relative"
              >
                {/* Card */}
                <div className="relative rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-gray-800/50 transition-all duration-300 hover:scale-105 hover:border-gray-700 hover:shadow-2xl hover:shadow-bedroom-purple/20">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-bedroom-purple/20 to-gray-900 overflow-hidden">
                    {/* Placeholder for video thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    
                    {/* Views badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                      {creation.views} views
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-bedroom-purple/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold uppercase tracking-wide">
                      {creation.category}
                    </div>

                    {/* Featured badge */}
                    {creation.featured && (
                      <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#FF8C42]/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold uppercase tracking-wide">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-screen-white mb-2 group-hover:text-purple-bloom transition-colors">
                      {creation.title}
                    </h3>
                    
                    <p className="text-screen-white/60 text-sm mb-4">
                      by {creation.creator.name}
                    </p>

                    <p className="text-screen-white/70 text-sm mb-4 line-clamp-2">
                      {creation.description}
                    </p>

                    {/* Tools used */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {creation.tools.slice(0, 3).map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-black/40 border border-gray-700/50 rounded-lg text-screen-white/70 text-xs"
                        >
                          {tool.name}
                        </span>
                      ))}
                      {creation.tools.length > 3 && (
                        <span className="px-3 py-1 bg-black/40 border border-gray-700/50 rounded-lg text-screen-white/70 text-xs">
                          +{creation.tools.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Awards */}
                    {creation.awards && creation.awards.length > 0 && (
                      <div className="mb-4">
                        <span className="text-bedroom-purple text-xs font-semibold">
                          🏆 {creation.awards.length} {creation.awards.length === 1 ? "Award" : "Awards"}
                        </span>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-purple-bloom text-sm font-medium group-hover:gap-3 transition-all">
                      Watch & Learn
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filteredCreations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-screen-white/60 text-lg">
                No creations found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
      </main>
    </div>
  );
}
