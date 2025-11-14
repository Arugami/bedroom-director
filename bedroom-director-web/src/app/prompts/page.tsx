"use client";

import { useState, useMemo } from "react";
import { Search, Filter, TrendingUp, Clock, Heart, ExternalLink, Sparkles } from "lucide-react";
import PromptCard from "@/components/prompts/PromptCard";
import { Toast } from "@/components/ui/Toast";
import {
  getAllPrompts,
  getAllCategories,
  getAllStyles,
  searchPrompts as searchPromptsUtil,
  getMostLikedPrompts,
  getMostViewedPrompts,
  getNewestPrompts,
  Prompt,
} from "@/lib/data/prompts";

type SortOption = "newest" | "most-liked" | "most-viewed";

export default function PromptsPage() {
  const allPrompts = getAllPrompts();
  const categories = getAllCategories();
  const styles = getAllStyles();
  
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStyle, setSelectedStyle] = useState<string>("all");
  const [selectedOutcome, setSelectedOutcome] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPrompts = useMemo(() => {
    let results = allPrompts;

    // Apply search
    if (searchQuery.trim()) {
      results = searchPromptsUtil(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      results = results.filter((p) => p.category === selectedCategory);
    }

    // Apply style filter
    if (selectedStyle !== "all") {
      results = results.filter((p) =>
        p.style_tags.some((tag) => tag.toLowerCase() === selectedStyle.toLowerCase())
      );
    }

    // Apply outcome filter
    if (selectedOutcome !== "all") {
      results = results.filter((p) => p.outcome_type === selectedOutcome);
    }

    // Apply sorting
    if (sortBy === "most-liked") {
      results = [...results].sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "most-viewed") {
      results = [...results].sort((a, b) => b.views - a.views);
    } else {
      // newest
      results = [...results].sort(
        (a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
      );
    }

    return results;
  }, [searchQuery, selectedCategory, selectedStyle, selectedOutcome, sortBy, allPrompts]);

  const handleCopyPrompt = (prompt: Prompt) => {
    setToast({
      message: "✓ Prompt copied to clipboard!",
      type: "success",
    });
  };

  const handleTryThis = (prompt: Prompt) => {
    setToast({
      message: `✓ Prompt copied! Opening ${prompt.tool_used}...`,
      type: "info",
    });
    // Open tool page in new tab after short delay
    setTimeout(() => {
      window.open(`/tools/${prompt.tool_slug}`, '_blank');
    }, 800);
  };

  // Get featured prompt for hero
  const heroPrompt = useMemo(() => {
    const featured = allPrompts.filter(p => p.featured);
    return featured[0] || allPrompts[0];
  }, [allPrompts]);

  return (
    <main className="min-h-screen bg-director-black">
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Compact Hero Section */}
      <section className="relative py-12 overflow-hidden">
        {/* Twilight gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-director-black" />
        {/* Film grain */}
        <div className="absolute inset-0 grain-texture opacity-10" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-screen-white mb-2"
              style={{ textShadow: "0 2px 20px rgba(0, 0, 0, 0.6)" }}
            >
              The Arsenal
            </h1>
            <p className="text-screen-white/70">
              Steal these prompts. Create something legendary.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-director-black/95 backdrop-blur-lg border-b border-gray-900/50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Category Filters + Sort in One Row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Quick Category Filters */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === "all"
                    ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/30"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60 border border-gray-800/50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory("video")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === "video"
                    ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/30"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60 border border-gray-800/50"
                }`}
              >
                🎬 Video
              </button>
              <button
                onClick={() => setSelectedCategory("image")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === "image"
                    ? "bg-[#FF8C42] text-screen-white shadow-lg shadow-[#FF8C42]/30"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60 border border-gray-800/50"
                }`}
              >
                🖼️ Image
              </button>
              <button
                onClick={() => setSelectedCategory("voice")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === "voice"
                    ? "bg-[#00CED1] text-screen-white shadow-lg shadow-[#00CED1]/30"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60 border border-gray-800/50"
                }`}
              >
                🎙️ Voice
              </button>
              <button
                onClick={() => setSelectedCategory("music")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === "music"
                    ? "bg-[#FCD34D] text-screen-white shadow-lg shadow-[#FCD34D]/30"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60 border border-gray-800/50"
                }`}
              >
                🎵 Music
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortBy("newest")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  sortBy === "newest"
                    ? "bg-bedroom-purple text-screen-white"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Newest</span>
              </button>
              <button
                onClick={() => setSortBy("most-liked")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  sortBy === "most-liked"
                    ? "bg-bedroom-purple text-screen-white"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60"
                }`}
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Liked</span>
              </button>
              <button
                onClick={() => setSortBy("most-viewed")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  sortBy === "most-viewed"
                    ? "bg-bedroom-purple text-screen-white"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Trending</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-screen-white/40" />
              <input
                type="text"
                placeholder="Search prompts, tools, styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-lg text-screen-white placeholder:text-screen-white/40 focus:outline-none focus:border-bedroom-purple transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Section (Collapsible) */}
      <section className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-lg text-screen-white hover:border-gray-700 transition-all mx-auto"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide" : "Show"} Advanced Filters
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl">
              {/* Category Filter */}
              <div>
                <label className="block text-screen-white/70 text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-black/60 border border-gray-700/50 rounded-lg text-screen-white focus:outline-none focus:border-bedroom-purple transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Style Filter */}
              <div>
                <label className="block text-screen-white/70 text-sm font-medium mb-2">
                  Style
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-4 py-2 bg-black/60 border border-gray-700/50 rounded-lg text-screen-white focus:outline-none focus:border-bedroom-purple transition-all"
                >
                  <option value="all">All Styles</option>
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Outcome Filter */}
              <div>
                <label className="block text-screen-white/70 text-sm font-medium mb-2">
                  Outcome Type
                </label>
                <select
                  value={selectedOutcome}
                  onChange={(e) => setSelectedOutcome(e.target.value)}
                  className="w-full px-4 py-2 bg-black/60 border border-gray-700/50 rounded-lg text-screen-white focus:outline-none focus:border-bedroom-purple transition-all"
                >
                  <option value="all">All Types</option>
                  <option value="commercial">Commercial</option>
                  <option value="social">Social</option>
                  <option value="experimental">Experimental</option>
                </select>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Prompts Grid */}
      <section className="relative py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-screen-white/60 text-sm">
              {filteredPrompts.length} {filteredPrompts.length === 1 ? "prompt" : "prompts"}
            </p>
          </div>

          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <PromptCard 
                  key={prompt.id} 
                  prompt={prompt}
                  onCopy={handleCopyPrompt}
                  onTryThis={handleTryThis}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-screen-white/60 text-lg">
                No prompts found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
