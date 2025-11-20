"use client";

import React from "react";

interface StudioStickyBarProps {
  children: React.ReactNode;
}

export default function StudioStickyBar({ children }: StudioStickyBarProps) {
  return (
    <div className="sticky top-16 z-40 bg-director-black/95 backdrop-blur-lg border-b border-gray-900/50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </div>
    </div>
  );
}
