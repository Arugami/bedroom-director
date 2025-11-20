import { getFeaturedTools } from "@/lib/data/tools";
import ToolCard from "@/components/tools/ToolCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedTools() {
  const tools = getFeaturedTools(6);

  return (
    <section className="relative py-16 bg-director-black overflow-hidden">
      {/* Background Image - AI Projector Beam (perfect for AI tools section) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/liveathehudson_cinematic_wallpaper_AI_projector_beam_casting_ac_17a4443e-ea9e-4b26-a07c-a6757d59fd9c.jpg')"
        }}
      />
      
      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-50" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-screen-white mb-2">
              Featured Tools
            </h2>
            <p className="text-screen-white/60">
              Start creating with our most trusted picks
            </p>
          </div>
          <Link
            href="/tools"
            className="hidden sm:flex items-center gap-2 text-purple-bloom hover:text-purple-soft hover:gap-3 transition-all"
          >
            View All Tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all box-bloom"
          >
            View All Tools
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
