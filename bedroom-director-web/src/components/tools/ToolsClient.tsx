"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tool, CATEGORIES, CATEGORY_LABELS } from "@/lib/types/tools";
import ToolCard from "@/components/tools/ToolCard";
import DirectorSidebar, { SidebarSection } from "@/components/layout/DirectorSidebar";
import StudioHero from "@/components/layout/StudioHero";
import StudioStickyBar from "@/components/layout/StudioStickyBar";
import { Search, Clock, TrendingUp, Sparkles } from "lucide-react";

interface ToolsClientProps {
  tools: Tool[];
}

type SortOption = "newest" | "featured" | "alphabetical";

export default function ToolsClient({ tools }: ToolsClientProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

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

  // Category counts for sidebar badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: tools.length,
    };

    Object.values(CATEGORIES).forEach((category) => {
      counts[category] = tools.filter((tool) => tool.category === category).length;
    });

    return counts;
  }, [tools]);

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

  // Sidebar sections for DirectorSidebar (Filters for Tools)
  const sidebarSections: SidebarSection[] = [
    {
      title: "Filter by Category",
      items: [
        {
          id: "ALL",
          label: "All Tools",
          icon: <Sparkles className="w-5 h-5" />,
          onClick: () => setSelectedCategory("ALL"),
          active: selectedCategory === "ALL",
          badge: categoryCounts.ALL,
          color: "text-bedroom-purple",
        },
        ...Object.values(CATEGORIES).map((cat) => ({
          id: cat,
          label: CATEGORY_LABELS[cat] || cat,
          icon: <Sparkles className="w-5 h-5" />,
          onClick: () => setSelectedCategory(cat),
          active: selectedCategory === cat,
          badge: categoryCounts[cat],
        })),
      ],
    },
  ];

  const newToolsCount = tools.filter(t => t.isNew).length;

  return (
    <div className="flex min-h-screen bg-director-black">
      {/* Director Sidebar - Full Arsenal Mode */}
      <DirectorSidebar
        mode="full-arsenal"
        sections={sidebarSections}
        storageKey="tools-sidebar-collapsed"
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Studio Hero */}
        <StudioHero
          title="Tool Catalog"
          subtitle={`${tools.length} AI creative tools. Deeply researched. Actually compared.`}
          kicker={`${newToolsCount} new this week`}
        />

        {/* Scene Canvas CTA - Cinematic Banner */}
        <section className="relative py-12 overflow-hidden border-y border-gray-900/30">
          {/* Twilight gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#1e1b4b]" />

          {/* Neon glow accents */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-teal/5 via-bedroom-purple/10 to-neon-orange/5" />

          {/* Film grain */}
          <div className="absolute inset-0 grain-texture opacity-10" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left: Text Content */}
              <div className="text-center lg:text-left">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-screen-white mb-3"
                  style={{
                    textShadow: "0 2px 20px rgba(0, 206, 209, 0.4), 0 4px 40px rgba(124, 58, 237, 0.3)"
                  }}
                >
                  Ready to Create Your Scene?
                </h2>
                <p className="text-screen-white/80 text-lg max-w-2xl">
                  Build complete production workflows with Scene Canvas.
                  Combine tools, plan shots, and bring your vision to life.
                </p>
              </div>

              {/* Right: CTA Button */}
              <a
                href="/scene-canvas"
                className="group relative px-8 py-4 bg-gradient-to-r from-bedroom-purple to-purple-bloom rounded-lg font-bold text-screen-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-bedroom-purple/50 whitespace-nowrap"
                style={{
                  boxShadow: "0 4px 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.2)"
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Open Scene Canvas
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {/* Neon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-teal/20 to-bedroom-purple/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </section>

        {/* Sticky Filter Bar */}
        <StudioStickyBar>
          {/* Sort Options */}
          <div className="flex items-center justify-end gap-2 mb-4">
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
        </StudioStickyBar>

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
