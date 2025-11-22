"use client";

import React from "react";

interface StudioHeroProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  align?: "center" | "left";
}

export default function StudioHero({
  title,
  subtitle,
  kicker,
  align = "center",
}: StudioHeroProps) {
  const alignmentClasses =
    align === "left"
      ? "text-left items-start"
      : "text-center items-center";

  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background Video - Director's Chair */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
      >
        <source
          src="/cinematic_twilight_scene_with_directors_chair_silhouette.mp4"
          type="video/mp4"
        />
      </video>

      {/* Twilight gradient overlay - Deepened for drama */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29]/80 via-[#302b63]/70 to-director-black" />

      {/* Purple ambient glow - localized */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-bedroom-purple/20 blur-[120px] opacity-40 pointer-events-none" />

      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-20 mix-blend-overlay" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${alignmentClasses} max-w-4xl mx-auto`}>

          {/* Kicker - The "Label" */}
          {kicker && (
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-bedroom-purple/60" />
              <p className="text-bedroom-purple font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">
                {kicker}
              </p>
              <div className="h-px w-8 bg-bedroom-purple/60" />
            </div>
          )}

          {/* H1 - The "Headline" */}
          <h1
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-screen-white mb-6 sm:mb-8 leading-[0.9] tracking-tight"
            style={{
              textShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 80px rgba(124, 58, 237, 0.2)"
            }}
          >
            Cinema, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
              Reborn.
            </span>
          </h1>

          {/* Subtitle - The "Manifesto" */}
          {subtitle && (
            <p className="text-screen-white/80 text-lg sm:text-2xl md:text-3xl font-light leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
