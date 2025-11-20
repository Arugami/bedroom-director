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
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background Video - Director's Chair */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source
          src="/cinematic_twilight_scene_with_directors_chair_silhouette.mp4"
          type="video/mp4"
        />
      </video>

      {/* Twilight gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/90 via-[#312e81]/85 to-director-black" />

      {/* Purple ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-bedroom-purple/10 via-transparent to-transparent" />

      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-15" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${alignmentClasses}`}>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-screen-white mb-3 sm:mb-4"
            style={{
              textShadow:
                "0 2px 30px rgba(124, 58, 237, 0.5), 0 4px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-screen-white/95 text-lg sm:text-xl mb-2 max-w-2xl">
              {subtitle}
            </p>
          )}
          {kicker && (
            <p className="text-bedroom-purple/90 text-xs sm:text-sm font-medium">
              {kicker}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
