"use client";

import { Tool, CATEGORIES, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types/tools";
import { X } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface ToolsSidebarProps {
  tools: Tool[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ToolsSidebar({
  tools,
  selectedCategory,
  onSelectCategory,
  isOpen,
  onClose,
}: ToolsSidebarProps) {
  // Calculate tool counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: tools.length,
    };

    Object.values(CATEGORIES).forEach((category) => {
      counts[category] = tools.filter((tool) => tool.category === category).length;
    });

    return counts;
  }, [tools]);

  const categories = [
    { key: "ALL", label: "All Tools", color: "bg-bedroom-purple" },
    ...Object.values(CATEGORIES).map((cat) => ({
      key: cat,
      label: CATEGORY_LABELS[cat] || cat,
      color: CATEGORY_COLORS[cat] || "bg-gray-500",
    })),
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-4rem)]
          w-64 bg-director-black border-r border-gray-900/50
          transform transition-transform duration-300 ease-in-out
          z-50 lg:z-0 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          overflow-y-auto
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-900/50">
          <h2 className="text-lg font-bold text-screen-white">Tools</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-900/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-screen-white/70" />
          </button>
        </div>

        {/* Brand Block */}
        <div className="p-4 pb-2 border-b border-gray-900/50 hidden lg:block">
          <Link
            href="/"
            className="mb-4 flex items-center gap-3 rounded-lg border border-bedroom-purple/30 bg-bedroom-purple/5 px-3 py-3 transition-all hover:bg-bedroom-purple/10 hover:border-bedroom-purple/70"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-bedroom-purple/50 bg-bedroom-purple/15 text-bedroom-purple shadow-[0_0_18px_rgba(168,85,247,0.35)]">
              <span className="text-[10px] font-semibold tracking-[0.28em]">
                BD
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold tracking-[0.32em] text-screen-white">
                BEDROOM
              </span>
              <span className="-mt-0.5 text-[11px] font-semibold tracking-[0.32em] text-screen-white">
                DIRECTOR
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-screen-white/40">
                Tool catalog
              </span>
            </div>
          </Link>
        </div>

        {/* Category Filters */}
        <div className="p-4 space-y-2">
          <h3 className="text-xs font-semibold text-screen-white/40 uppercase tracking-wider mb-4">
            Filter by Category
          </h3>

          {categories.map((category) => {
            const isActive = selectedCategory === category.key;
            const count = categoryCounts[category.key] || 0;

            return (
              <button
                key={category.key}
                onClick={() => {
                  onSelectCategory(category.key);
                  onClose(); // Close mobile menu after selection
                }}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/20"
                      : "bg-black/40 text-screen-white/70 hover:bg-black/60 hover:text-screen-white border border-gray-800/50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Category Color Indicator */}
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-screen-white" : category.color
                    }`}
                  />
                  <span className="font-medium text-sm">{category.label}</span>
                </div>

                {/* Tool Count Badge */}
                <span
                  className={`
                    px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      isActive
                        ? "bg-screen-white/20 text-screen-white"
                        : "bg-gray-900/50 text-screen-white/50"
                    }
                  `}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="p-4 mt-auto border-t border-gray-900/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-bedroom-purple">{tools.length}</p>
            <p className="text-xs text-screen-white/40 uppercase tracking-wider">
              Total Tools
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
