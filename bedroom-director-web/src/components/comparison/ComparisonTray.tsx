"use client";

import { useComparison } from "@/contexts/ComparisonContext";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ComparisonTray() {
  const { comparisonTools, removeFromComparison, isTrayOpen, toggleTray, clearComparison } = useComparison();

  if (comparisonTools.length === 0) return null;

  return (
    <>
      {/* Mobile Overlay */}
      {isTrayOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleTray}
        />
      )}

      {/* Tray */}
      <aside
        className={`
          fixed top-16 right-0 h-[calc(100vh-4rem)]
          w-80 bg-director-black border-l border-gray-900/50
          transform transition-transform duration-300 ease-in-out
          z-50
          ${isTrayOpen ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-director-black border-b border-gray-900/50 p-4 z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-screen-white">
              Your Shortlist
            </h2>
            <button
              onClick={toggleTray}
              className="p-2 hover:bg-gray-900/50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-screen-white/70" />
            </button>
          </div>
          <p className="text-xs text-screen-white/50">
            {comparisonTools.length} of 4 tools selected
          </p>
        </div>

        {/* Tools List */}
        <div className="p-4 space-y-3">
          {comparisonTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-black/40 border border-gray-800/50 rounded-lg p-3 hover:border-bedroom-purple/50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full mb-2 rounded overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                {tool.thumbnailUrl ? (
                  <Image
                    src={tool.thumbnailUrl}
                    alt={tool.model}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-bedroom-purple/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-bedroom-purple/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Tool Info */}
              <div className="mb-2">
                <h3 className="text-sm font-bold text-screen-white line-clamp-1">
                  {tool.model}
                </h3>
                <p className="text-xs text-screen-white/50">by {tool.vendor}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromComparison(tool.id)}
                className="w-full px-3 py-1.5 bg-gray-900/50 hover:bg-red-500/10 text-screen-white/70 hover:text-red-400 border border-gray-800 hover:border-red-500/50 rounded text-xs font-medium transition-all"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-director-black border-t border-gray-900/50 p-4 space-y-2">
          <Link
            href="/compare"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all shadow-lg shadow-bedroom-purple/30"
          >
            Compare Side by Side
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={clearComparison}
            className="w-full px-4 py-2 bg-transparent border border-gray-800 hover:border-red-500/50 text-screen-white/70 hover:text-red-400 rounded-lg transition-all text-sm font-medium"
          >
            Clear All
          </button>
        </div>
      </aside>
    </>
  );
}
