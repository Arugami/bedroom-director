import Link from "next/link";
import { Play, ExternalLink } from "lucide-react";
import { getFeaturedCreations } from "@/lib/data/creations";

export default function TrendingCreations() {
  const featured = getFeaturedCreations(3);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Twilight gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a]" />
      
      {/* Atmospheric lighting - warm from top */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#FF8C42]/8 to-transparent" />
      
      {/* Purple glow from bottom */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-bedroom-purple/10 to-transparent" />
      
      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-screen-white mb-4"
              style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)' }}>
            Trending AI Creations
          </h2>
          <p className="text-screen-white/70 text-lg max-w-2xl mx-auto">
            See what's possible. Learn from the best. Get inspired.
          </p>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featured.map((creation) => (
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
                    {creation.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-black/40 border border-gray-700/50 rounded-lg text-screen-white/70 text-xs"
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>

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

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 px-8 py-4 bg-bedroom-purple/10 border border-bedroom-purple/30 text-purple-bloom hover:bg-bedroom-purple/20 hover:border-bedroom-purple/50 rounded-lg transition-all font-medium"
          >
            View All Creations
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
