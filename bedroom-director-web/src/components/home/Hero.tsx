"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, ChevronDown } from "lucide-react";

const QUICK_CATEGORIES = [
  { label: "Video", value: "VIDEO_GEN" },
  { label: "Image", value: "IMAGE_GEN" },
  { label: "Voice & Audio", value: "VOICE_AUDIO" },
  { label: "Music", value: "MUSIC" },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Content fades in after scrolling 100px
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Twilight gradient background - purple to blue dusk sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#0f172a]" />

      {/* Background Video - Director's Chair with Subtle Motion */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/cinematic_twilight_scene_with_directors_chair_silhouette.mp4" type="video/mp4" />
      </video>


      {/* Warm accent lighting - orange glow from bottom */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-[#FF8C42]/10 via-[#FF8C42]/5 to-transparent" />

      {/* Purple ambient glow - theatrical uplighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-bedroom-purple/10 via-transparent to-transparent" />

      {/* Atmospheric haze - cinematic depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-bedroom-purple/5 to-transparent" />

      {/* Film grain texture - visible but not distracting */}
      <div className="absolute inset-0 grain-texture opacity-15" />

      {/* Main content container - fades in on scroll */}
      <div 
        className={`relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24 transition-opacity duration-1000 ${
          scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Content - minimal overlay on mobile, fades in on scroll */}
          <div className="relative mx-auto max-w-4xl">
            
            {/* Main Logo/Title - smaller on mobile */}
            <h1 className="font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-screen-white mb-4 md:mb-8 text-center" 
                style={{ 
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.8), 0 4px 40px rgba(0, 0, 0, 0.6)'
                }}>
              BEDROOM DIRECTOR
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-2xl md:text-3xl text-screen-white/90 font-normal mb-8 md:mb-16 text-center tracking-wide"
               style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.7)' }}>
              From bedroom to big screen
            </p>

            {/* W+K-inspired Copy - hidden on mobile, shown on desktop */}
            <div className="hidden md:block space-y-4 mb-16 text-lg sm:text-xl md:text-2xl text-screen-white/95 text-center max-w-3xl mx-auto">
              <p className="font-light tracking-wide" style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)' }}>
                Your bedroom is your studio.
              </p>
              <p className="font-light tracking-wide" style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)' }}>
                Your laptop is your camera.
              </p>
              <p className="font-light tracking-wide" style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)' }}>
                Your imagination is your budget.
              </p>
            </div>

            {/* CTA Buttons - hidden on mobile */}
            <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/tools"
                className="group inline-flex items-center gap-2 px-10 py-5 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-2xl shadow-bedroom-purple/30 hover:shadow-bedroom-purple/50"
              >
                Discover Tools
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-10 py-5 bg-transparent border-2 border-bedroom-purple/40 text-screen-white font-semibold rounded-lg hover:bg-bedroom-purple/10 hover:border-bedroom-purple/60 transition-all shadow-lg shadow-black/20"
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
                  className="w-full pl-14 pr-5 py-5 bg-black/70 border-2 border-gray-800/60 rounded-xl text-screen-white placeholder:text-screen-white/40 focus:outline-none focus:border-bedroom-purple/50 focus:ring-2 focus:ring-bedroom-purple/20 transition-all backdrop-blur-md shadow-xl"
                />
              </form>

              {/* Category Quick Filters */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <span className="text-screen-white/60 text-sm self-center font-medium">Quick filters:</span>
                {QUICK_CATEGORIES.map((category) => (
                  <Link
                    key={category.value}
                    href={`/tools?category=${category.value}`}
                    className="px-4 py-2 bg-black/50 backdrop-blur-sm border border-gray-700/60 rounded-lg text-screen-white/80 text-sm hover:border-bedroom-purple/60 hover:bg-bedroom-purple/20 hover:text-screen-white transition-all shadow-md"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - more prominent when content is hidden */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20 transition-opacity duration-500 ${
          scrolled ? 'opacity-0 md:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-sm font-medium md:hidden">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-white/60 md:text-white/40" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-director-black to-transparent pointer-events-none" />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40 pointer-events-none" />
    </section>
  );
}
