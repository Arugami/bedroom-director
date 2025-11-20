"use client";

import React from "react";

interface StudioStickyBarProps {
  children: React.ReactNode;
}

export default function StudioStickyBar({ children }: StudioStickyBarProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-bedroom-purple/10 shadow-2xl isolation-isolate">
      {/* Triple-layer solid background to completely block content */}
      <div className="absolute inset-0 bg-[#000000]" />
      <div className="absolute inset-0 bg-director-black" />
      <div className="absolute inset-0 bg-black" />

      {/* Film grain texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-[1]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      {/* Purple gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bedroom-purple/30 to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-[2] container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </div>
    </div>
  );
}
