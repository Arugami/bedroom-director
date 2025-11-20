"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tool, CATEGORIES, CATEGORY_LABELS } from "@/lib/types/tools";
import ToolCard from "@/components/tools/ToolCard";
import DirectorSidebar, { SidebarSection } from "@/components/layout/DirectorSidebar";
import StudioHero from "@/components/layout/StudioHero";
import StudioStickyBar from "@/components/layout/StudioStickyBar";
import { Search, Clock, TrendingUp, Sparkles, Image, Film, Mic, Music, Users, Layers, Wand2, Server } from "lucide-react";

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

  // Category icons mapping
  const categoryIcons: Record<string, React.ReactNode> = {
    ALL: <Sparkles className="w-5 h-5" />,
    IMAGE_GEN: <Image className="w-5 h-5" />,
    VIDEO_GEN: <Film className="w-5 h-5" />,
    VOICE_AUDIO: <Mic className="w-5 h-5" />,
    MUSIC: <Music className="w-5 h-5" />,
    LIP_SYNC: <Users className="w-5 h-5" />,
    PLATFORM_AGGREGATOR: <Layers className="w-5 h-5" />,
    POST_PROCESSING: <Wand2 className="w-5 h-5" />,
    API_INFRASTRUCTURE: <Server className="w-5 h-5" />,
  };

  // Quick category filters for mobile/desktop
  const quickCategories = [
    { id: "ALL", label: "All Tools", count: categoryCounts.ALL },
    ...Object.values(CATEGORIES).map((cat) => ({
      id: cat,
      label: CATEGORY_LABELS[cat] || cat,
      count: categoryCounts[cat],
    })),
  ];

  return (
    <div className="flex min-h-screen bg-director-black overflow-x-hidden">
      {/* Director Sidebar - Full Arsenal Mode */}
      <DirectorSidebar
        mode="full-arsenal"
        sections={sidebarSections}
        storageKey="tools-sidebar-collapsed"
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        {/* Studio Hero */}
        <StudioHero
          title="Tool Catalog"
          subtitle={`${tools.length} AI tools. Researched. Compared.`}
          kicker={`${newToolsCount} new this week`}
        />

        {/* Quick Category Filters - Horizontal Scroll */}
        <section className="relative border-b border-gray-900/30 bg-director-black/60 backdrop-blur-sm">
          {/* Film grain texture */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
          />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Horizontal scrolling container */}
            <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
              <div className="flex gap-2 sm:gap-3 min-w-max">
                {quickCategories.map((category) => {
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`group relative flex items-center gap-2 px-4 sm:px-5 py-3 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                        isActive
                          ? "bg-gradient-to-r from-bedroom-purple to-purple-bloom text-screen-white shadow-lg shadow-bedroom-purple/30"
                          : "bg-black/40 text-screen-white/70 hover:bg-black/60 hover:text-screen-white border border-gray-800/50 hover:border-bedroom-purple/30"
                      }`}
                    >
                      {/* Icon with glow on active */}
                      <div className="relative">
                        {categoryIcons[category.id]}
                        {isActive && (
                          <div className="absolute inset-0 bg-screen-white/30 blur-md rounded-full" />
                        )}
                      </div>

                      {/* Label */}
                      <span>{category.label}</span>

                      {/* Count badge */}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-screen-white/20 text-screen-white"
                          : "bg-bedroom-purple/10 text-bedroom-purple/60 group-hover:text-bedroom-purple"
                      }`}>
                        {category.count}
                      </span>

                      {/* Purple glow on active */}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-bedroom-purple/20 to-purple-bloom/20 rounded-lg blur-xl -z-10" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Fade indicators for scroll on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-director-black to-transparent pointer-events-none lg:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-director-black to-transparent pointer-events-none lg:hidden" />
        </section>

        {/* Scene Canvas CTA - Cinematic Banner */}
        <section className="relative py-4 sm:py-8 md:py-10 lg:py-12 overflow-hidden border-y border-gray-900/30">
          {/* Background Image - AI Projector Bedroom */}
          <img
            src="/liveathehudson_cinematic_wallpaper_AI_projector_beam_casting_ac_17a4443e-ea9e-4b26-a07c-a6757d59fd9c.jpg"
            alt="AI projector casting colorful light in bedroom"
            className="absolute inset-0 w-full h-full object-cover opacity-50 object-[85%_center] lg:object-center"
          />

          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />

          {/* Film grain */}
          <div className="absolute inset-0 grain-texture opacity-10" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-6">
              {/* Left: Text Content */}
              <div className="text-center lg:text-left">
                <h2
                  className="text-xl sm:text-3xl md:text-4xl font-bold text-screen-white mb-1.5 sm:mb-3"
                  style={{
                    textShadow: "0 2px 20px rgba(0, 206, 209, 0.4), 0 4px 40px rgba(124, 58, 237, 0.3)"
                  }}
                >
                  Ready to Create Your Scene?
                </h2>
                <p className="text-screen-white/80 text-sm sm:text-lg max-w-2xl leading-snug">
                  Build complete workflows with Scene Canvas. Combine tools and bring your vision to life.
                </p>
              </div>

              {/* Right: CTA Button */}
              <a
                href="/scene-canvas"
                className="group relative w-full sm:w-auto px-5 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-bedroom-purple to-purple-bloom rounded-lg font-bold text-sm sm:text-base text-screen-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-bedroom-purple/50 whitespace-nowrap"
                style={{
                  boxShadow: "0 4px 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.2)"
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Open Scene Canvas
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          {/* Mobile: search + categories + sort, all in one compact stack */}
          <div className="md:hidden space-y-3">
            {/* Search Bar - compact mobile variant */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-bedroom-purple/20 via-bedroom-purple/30 to-bedroom-purple/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <Search className="w-4 h-4 text-bedroom-purple/60 group-focus-within:text-bedroom-purple transition-colors duration-300" />
                    <div className="absolute inset-0 bg-bedroom-purple/30 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search your arsenal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative w-full pl-9 pr-3 py-3 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-xl border border-bedroom-purple/25 rounded-xl text-sm text-screen-white placeholder:text-screen-white/50 focus:outline-none focus:border-bedroom-purple/60 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl border border-bedroom-purple/0 group-focus-within:border-bedroom-purple/20 transition-all duration-500 pointer-events-none" />
              </div>
            </div>

            {/* Sort Options – condensed pills */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setSortBy("featured")}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  sortBy === "featured"
                    ? "bg-bedroom-purple text-screen-white shadow-md shadow-bedroom-purple/30"
                    : "bg-black/40 text-screen-white/70 border border-gray-800/70"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </button>
              <button
                onClick={() => setSortBy("newest")}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  sortBy === "newest"
                    ? "bg-bedroom-purple text-screen-white shadow-md shadow-bedroom-purple/30"
                    : "bg-black/40 text-screen-white/70 border border-gray-800/70"
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>Newest</span>
              </button>
              <button
                onClick={() => setSortBy("alphabetical")}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  sortBy === "alphabetical"
                    ? "bg-bedroom-purple text-screen-white shadow-md shadow-bedroom-purple/30"
                    : "bg-black/40 text-screen-white/70 border border-gray-800/70"
                }`}
              >
                <TrendingUp className="w-3 h-3" />
                <span>A-Z</span>
              </button>
            </div>
          </div>

          {/* Desktop / tablet: original layout with search + sort */}
          <div className="hidden md:block">
            {/* Sort Options */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 mb-3">
              <button
                onClick={() => setSortBy("featured")}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  sortBy === "featured"
                    ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/30"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60 hover:text-screen-white border border-gray-800/50 hover:border-bedroom-purple/30"
                }`}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Featured</span>
              </button>
              <button
                onClick={() => setSortBy("newest")}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  sortBy === "newest"
                    ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/30"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60 hover:text-screen-white border border-gray-800/50 hover:border-bedroom-purple/30"
                }`}
              >
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Newest</span>
              </button>
              <button
                onClick={() => setSortBy("alphabetical")}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  sortBy === "alphabetical"
                    ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/30"
                    : "bg-black/40 text-screen-white/70 hover:bg-black/60 hover:text-screen-white border border-gray-800/50 hover:border-bedroom-purple/30"
                }`}
              >
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>A-Z</span>
              </button>
            </div>

            {/* Search Bar - Cinematic Design */}
            <div className="relative max-w-2xl mx-auto group">
              {/* Purple glow background (intensifies on focus) */}
              <div className="absolute -inset-1 bg-gradient-to-r from-bedroom-purple/20 via-bedroom-purple/30 to-bedroom-purple/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

              {/* Search container */}
              <div className="relative">
                {/* Film grain texture overlay */}
                <div
                  className="absolute inset-0 rounded-xl opacity-[0.02] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                  }}
                />

                {/* Search icon with gradient */}
                <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-bedroom-purple/60 group-focus-within:text-bedroom-purple transition-colors duration-300" />
                    {/* Icon glow on focus */}
                    <div className="absolute inset-0 bg-bedroom-purple/30 blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Input field */}
                <input
                  type="text"
                  placeholder="Search your arsenal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-xl border-2 border-bedroom-purple/20 hover:border-bedroom-purple/40 focus:border-bedroom-purple/60 rounded-xl text-sm sm:text-base text-screen-white placeholder:text-screen-white/50 focus:outline-none transition-all duration-300 focus:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
                />

                {/* Animated border on focus */}
                <div className="absolute inset-0 rounded-xl border-2 border-bedroom-purple/0 group-focus-within:border-bedroom-purple/20 transition-all duration-500 pointer-events-none" />

                {/* Bottom accent line (like film strip) */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bedroom-purple/40 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </StudioStickyBar>

        {/* Tools Grid */}
        <section className="relative py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count - Enhanced */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                {/* Count badge */}
                <div className="flex items-center gap-2 px-4 py-2 bg-bedroom-purple/10 border border-bedroom-purple/20 rounded-lg backdrop-blur-sm">
                  <span className="text-bedroom-purple font-bold text-lg">
                    {filteredTools.length}
                  </span>
                  <span className="text-screen-white/70 text-sm">
                    {filteredTools.length === 1 ? "tool" : "tools"}
                  </span>
                </div>

                {/* Category indicator (if filtered) */}
                {selectedCategory !== "ALL" && (
                  <>
                    <span className="text-screen-white/30">in</span>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-gray-800/50 rounded-lg">
                      <div className="text-bedroom-purple/80">
                        {categoryIcons[selectedCategory]}
                      </div>
                      <span className="text-screen-white/80 text-sm font-medium">
                        {CATEGORY_LABELS[selectedCategory]}
                      </span>
                    </div>
                  </>
                )}

                {/* Search query indicator (if searching) */}
                {searchQuery && (
                  <>
                    <span className="text-screen-white/30">matching</span>
                    <div className="px-3 py-1.5 bg-black/40 border border-gray-800/50 rounded-lg">
                      <span className="text-screen-white/80 text-sm font-mono">
                        "{searchQuery}"
                      </span>
                    </div>
                  </>
                )}
              </div>
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
