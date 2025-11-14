"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tool, CATEGORIES } from "@/lib/types/tools";
import ToolCard from "@/components/tools/ToolCard";
import ToolsSidebar from "@/components/tools/ToolsSidebar";
import { Search, Clock, TrendingUp, Sparkles, Menu } from "lucide-react";

interface ToolsClientProps {
  tools: Tool[];
}

type SortOption = "newest" | "featured" | "alphabetical";

export default function ToolsClient({ tools }: ToolsClientProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const searchParam = searchParams.get("search");
    const categoryParam = searchParams.get("category");

    if (searchParam) {
      setSearchQuery(searchParam);
    }

    if (categoryParam && Object.values(CATEGORIES).includes(categoryParam as any)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredTools = useMemo(() => {
    let results = tools.filter((tool) => {
      const matchesSearch =
        !searchQuery ||
        tool.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keyFeatures.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort results
    if (sortBy === "newest") {
      results = [...results].sort((a, b) => {
        if (!a.dateAdded || !b.dateAdded) return 0;
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      });
    } else if (sortBy === "featured") {
      results = [...results].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    } else {
      // alphabetical
      results = [...results].sort((a, b) => a.model.localeCompare(b.model));
    }

    return results;
  }, [tools, searchQuery, selectedCategory, sortBy]);

  const newToolsCount = tools.filter(t => t.isNew).length;

  return (
    <div className="flex min-h-screen bg-director-black">
      {/* Sidebar */}
      <ToolsSidebar
        tools={tools}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Cinematic Hero Section with Video */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Video - Director's Chair */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="/cinematic_twilight_scene_with_directors_chair_silhouette.mp4" type="video/mp4" />
          </video>

          {/* Twilight gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/90 via-[#312e81]/85 to-director-black" />

          {/* Purple ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-bedroom-purple/10 via-transparent to-transparent" />

          {/* Film grain */}
          <div className="absolute inset-0 grain-texture opacity-15" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-screen-white mb-4"
                style={{
                  textShadow: "0 2px 30px rgba(124, 58, 237, 0.5), 0 4px 60px rgba(0, 0, 0, 0.8)"
                }}
              >
                Your Arsenal
              </h1>
              <p className="text-screen-white/95 text-xl mb-2">
                {tools.length} AI creative tools. Deeply researched. Actually compared.
              </p>
              <p className="text-bedroom-purple/90 text-sm font-medium">
                {newToolsCount} new this week
              </p>
            </div>
          </div>
        </section>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-40 bg-director-black/95 backdrop-blur-lg border-b border-gray-900/50 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Mobile Menu Button + Sort in One Row */}
            <div className="flex items-center justify-between gap-4 mb-4">
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-bedroom-purple hover:bg-purple-bloom text-screen-white rounded-lg transition-all"
              >
                <Menu className="w-5 h-5" />
                <span className="font-medium">Categories</span>
              </button>

              {/* Sort Options */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setSortBy("featured")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === "featured"
                      ? "bg-bedroom-purple text-screen-white"
                      : "bg-black/40 text-screen-white/70 hover:bg-black/60"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Featured</span>
                </button>
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
                  onClick={() => setSortBy("alphabetical")}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === "alphabetical"
                      ? "bg-bedroom-purple text-screen-white"
                      : "bg-black/40 text-screen-white/70 hover:bg-black/60"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">A-Z</span>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-screen-white/40" />
              <input
                type="text"
                placeholder="Search tools, vendors, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-lg text-screen-white placeholder:text-screen-white/40 focus:outline-none focus:border-bedroom-purple transition-all"
              />
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <section className="relative py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-screen-white/60 text-sm">
                {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
              </p>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-screen-white/60 text-lg">
                  No tools found. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
