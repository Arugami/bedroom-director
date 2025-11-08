import Link from "next/link";
import { Film, Image, Mic, Music } from "lucide-react";

export default function CategoryShowcase() {
  const categories = [
    {
      title: "Video Generation",
      description: "Bring your stories to life",
      icon: Film,
      category: "VIDEO_GEN",
      gradient: "from-bedroom-purple/20 to-purple-bloom/20",
      iconColor: "text-bedroom-purple",
      glowColor: "shadow-bedroom-purple/30"
    },
    {
      title: "Image Generation",
      description: "Create stunning visuals",
      icon: Image,
      category: "IMAGE_GEN",
      gradient: "from-[#00CED1]/20 to-[#00CED1]/10",
      iconColor: "text-[#00CED1]",
      glowColor: "shadow-[#00CED1]/30"
    },
    {
      title: "Voice & Audio",
      description: "Give your projects a voice",
      icon: Mic,
      category: "VOICE_AUDIO",
      gradient: "from-[#FF8C42]/20 to-[#FF8C42]/10",
      iconColor: "text-[#FF8C42]",
      glowColor: "shadow-[#FF8C42]/30"
    },
    {
      title: "Music",
      description: "Compose your soundtrack",
      icon: Music,
      category: "MUSIC",
      gradient: "from-[#FCD34D]/20 to-[#FCD34D]/10",
      iconColor: "text-[#FCD34D]",
      glowColor: "shadow-[#FCD34D]/30"
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Twilight gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a]" />
      
      {/* Atmospheric lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-bedroom-purple/10 via-transparent to-transparent" />
      
      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-screen-white mb-4"
              style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)' }}>
            Explore by Category
          </h2>
          <p className="text-screen-white/70 text-lg max-w-2xl mx-auto">
            From video to voice, find the perfect AI tool for your creative vision
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.category}
                href={`/tools?category=${cat.category}`}
                className="group relative"
              >
                <div className={`relative h-64 rounded-xl bg-gradient-to-br ${cat.gradient} backdrop-blur-sm border border-gray-800/50 overflow-hidden transition-all duration-300 hover:scale-105 hover:border-gray-700 ${cat.glowColor} hover:shadow-2xl`}>
                  {/* Icon */}
                  <div className="absolute top-8 left-8">
                    <div className={`w-16 h-16 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center ${cat.iconColor} transition-all group-hover:scale-110`}>
                      <Icon className="w-8 h-8" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-screen-white mb-2 group-hover:text-white transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-screen-white/60 text-sm group-hover:text-screen-white/80 transition-colors">
                      {cat.description}
                    </p>
                  </div>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
