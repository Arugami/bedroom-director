"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tool, CATEGORIES, CATEGORY_LABELS } from "@/lib/types/tools";
import ToolCard from "@/components/tools/ToolCard";
import { Search } from "lucide-react";

interface ToolsClientProps {
  tools: Tool[];
}

export default function ToolsClient({ tools }: ToolsClientProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

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
    return tools.filter((tool) => {
      const matchesSearch =
        !searchQuery ||
        tool.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keyFeatures.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [tools, searchQuery, selectedCategory]);

  const categories = ["ALL", ...Object.values(CATEGORIES)];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-screen-white mb-4">
            Browse AI Tools
          </h1>
          <p className="text-screen-white/60 text-lg">
            Discover {tools.length}+ AI creative tools for your next project
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-screen-white/40" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-800 rounded-lg text-screen-white placeholder:text-screen-white/40 focus:outline-none focus:ring-2 focus:ring-bedroom-purple focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-bedroom-purple text-white"
                    : "bg-gray-900/50 text-screen-white/70 hover:bg-gray-900 border border-gray-800"
                }`}
              >
                {category === "ALL" ? "All Tools" : CATEGORY_LABELS[category] || category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-screen-white/60">
            Showing {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
          </p>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-screen-white/60 text-lg">
              No tools found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
