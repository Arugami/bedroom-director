"use client";

import { useState, useMemo } from "react";
import { Search, Filter, TrendingUp, Clock, Heart, ExternalLink, Sparkles } from "lucide-react";
import PromptCard from "@/components/prompts/PromptCard";
import { Toast } from "@/components/ui/Toast";
import DirectorSidebar from "@/components/layout/DirectorSidebar";
import StudioHero from "@/components/layout/StudioHero";
import StudioStickyBar from "@/components/layout/StudioStickyBar";
import { getPromptsSidebarConfig } from "@/lib/sidebarConfig";
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

  // Get sidebar configuration
  const sidebarSections = getPromptsSidebarConfig(
    selectedCategory,
    sortBy,
    setSelectedCategory,
    (sort: string) => setSortBy(sort as SortOption)
  );

  return (
    <div className="flex min-h-screen bg-director-black">
      {/* Director Sidebar - "Quick Draw" Mode */}
      <DirectorSidebar
        mode="quick-draw"
        sections={sidebarSections}
        defaultCollapsed={false}
        storageKey="prompts-sidebar-collapsed"
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Toast Notifications */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

      {/* Studio Hero */}
      <StudioHero
        title="Prompt Library"
        subtitle="Steal these prompts. Create something legendary."
        kicker="Battle-tested prompts from the community"
      />

      {/* Sticky Search Bar */}
      <StudioStickyBar>
        {/* Search Bar */}
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
      </StudioStickyBar>

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
    </div>
  );
}
