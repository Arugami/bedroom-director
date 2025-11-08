"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

const QUICK_CATEGORIES = [
  { label: "Video", value: "VIDEO_GEN" },
  { label: "Image", value: "IMAGE_GEN" },
  { label: "Voice & Audio", value: "VOICE_AUDIO" },
  { label: "Music", value: "MUSIC" },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-director-black" style={{ margin: 0, padding: 0 }}>
      {/* Background Image - Director Silhouette */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/liveathehudson_cinematic_wallpaper_faint_silhouette_of_a_direct_de4467c3-260a-4f9f-be96-d16dc941a6e7.jpg')"
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Subtle purple ambient glow */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-bedroom-purple/5" />

      {/* Main content container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Content container - clean and minimal */}
          <div className="relative bg-director-black/40 backdrop-blur-sm border border-gray-800/30 rounded-2xl p-12 sm:p-16 md:p-20 mx-auto">
            
            {/* Main Logo/Title - Inter Bold wordmark per brand guidelines */}
            <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-screen-white mb-8 text-center" style={{ letterSpacing: '-0.02em' }}>
              BEDROOM DIRECTOR
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl md:text-3xl text-screen-white/80 font-normal mb-16 text-center tracking-wide">
              From bedroom to big screen
            </p>

            {/* W+K-inspired Copy */}
            <div className="space-y-4 mb-16 text-lg sm:text-xl md:text-2xl text-screen-white/90 text-center max-w-3xl mx-auto">
              <p className="font-light tracking-wide">Your bedroom is your studio.</p>
              <p className="font-light tracking-wide">Your laptop is your camera.</p>
              <p className="font-light tracking-wide">Your imagination is your budget.</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/tools"
                className="group inline-flex items-center gap-2 px-10 py-5 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-bedroom-purple/20 hover:shadow-bedroom-purple/40"
              >
                Discover Tools
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-10 py-5 bg-transparent border-2 border-bedroom-purple/40 text-screen-white font-semibold rounded-lg hover:bg-bedroom-purple/10 hover:border-bedroom-purple/60 transition-all"
              >
                Join the Movement
              </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    router.push(`/tools?search=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                className="relative"
              >
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-screen-white/40 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to create?"
                  className="w-full pl-14 pr-5 py-5 bg-black/60 border-2 border-gray-800 rounded-xl text-screen-white placeholder:text-screen-white/40 focus:outline-none focus:border-bedroom-purple/50 focus:ring-2 focus:ring-bedroom-purple/20 transition-all backdrop-blur-sm"
                />
              </form>

              {/* Category Quick Filters */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <span className="text-screen-white/40 text-sm self-center">Quick filters:</span>
                {QUICK_CATEGORIES.map((category) => (
                  <Link
                    key={category.value}
                    href={`/tools?category=${category.value}`}
                    className="px-4 py-2 bg-black/40 border border-gray-800 rounded-lg text-screen-white/70 text-sm hover:border-bedroom-purple/50 hover:bg-bedroom-purple/10 hover:text-screen-white transition-all"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-director-black to-transparent pointer-events-none" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40 pointer-events-none" />
    </section>
  );
}
