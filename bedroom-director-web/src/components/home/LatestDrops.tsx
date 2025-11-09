import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LatestDrops() {
  const newTools = [
    {
      name: "Veo 3.1",
      category: "Video Generation",
      description: "Google's latest video model with improved motion consistency and 4K output",
      addedDate: "2 days ago",
      link: "/tools/veo-3-1",
      badge: "NEW",
      gradient: "from-bedroom-purple/20 to-purple-bloom/10"
    },
    {
      name: "Kling 1.6",
      category: "Video Generation",
      description: "Enhanced lip-sync and character consistency for professional video creation",
      addedDate: "5 days ago",
      link: "/tools/kling-1-6",
      badge: "NEW",
      gradient: "from-[#00CED1]/20 to-[#00CED1]/10"
    },
    {
      name: "Recraft V3",
      category: "Image Generation",
      description: "Revolutionary text rendering and brand consistency for designers",
      addedDate: "1 week ago",
      link: "/tools/recraft-v3",
      badge: "NEW",
      gradient: "from-[#FF8C42]/20 to-[#FF8C42]/10"
    },
    {
      name: "Suno v4",
      category: "Music Generation",
      description: "Professional-quality music generation with better structure and clarity",
      addedDate: "1 week ago",
      link: "/tools/suno-v4",
      badge: "NEW",
      gradient: "from-[#FCD34D]/20 to-[#FCD34D]/10"
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Twilight gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-director-black via-[#1e1b4b] to-director-black" />
      
      {/* Atmospheric lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-bedroom-purple/8 via-transparent to-transparent" />
      
      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-bedroom-purple" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-screen-white"
                  style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)' }}>
                Latest Drops
              </h2>
            </div>
            <p className="text-screen-white/70 text-lg">
              Fresh tools added this week
            </p>
          </div>
          
          <Link
            href="/tools"
            className="hidden md:flex items-center gap-2 text-purple-bloom hover:text-purple-soft hover:gap-3 transition-all font-medium"
          >
            View All Tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newTools.map((tool, index) => (
            <Link
              key={index}
              href={tool.link}
              className="group relative"
            >
              <div className={`relative h-full p-6 rounded-xl bg-gradient-to-br ${tool.gradient} backdrop-blur-sm border border-gray-800/50 hover:border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-bedroom-purple/10`}>
                {/* NEW badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-bedroom-purple rounded-md text-white text-xs font-bold uppercase tracking-wide">
                  {tool.badge}
                </div>

                {/* Added date */}
                <div className="text-screen-white/40 text-xs mb-4">
                  {tool.addedDate}
                </div>

                {/* Tool name */}
                <h3 className="text-xl font-bold text-screen-white mb-2 group-hover:text-purple-bloom transition-colors">
                  {tool.name}
                </h3>

                {/* Category */}
                <div className="text-bedroom-purple text-sm font-medium mb-3">
                  {tool.category}
                </div>

                {/* Description */}
                <p className="text-screen-white/70 text-sm leading-relaxed">
                  {tool.description}
                </p>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center gap-2 text-purple-bloom text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all"
          >
            View All Tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
