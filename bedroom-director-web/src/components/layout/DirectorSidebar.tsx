"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Film, Image, Mic, Music, Clock, Heart, TrendingUp, Sparkles, Filter, Menu, X, Pin, PinOff } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type SidebarMode = "full-arsenal" | "quick-draw" | "gallery";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  badge?: string | number;
  color?: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface DirectorSidebarProps {
  mode: SidebarMode;
  sections: SidebarSection[];
  defaultCollapsed?: boolean;
  storageKey?: string;
}

export default function DirectorSidebar({
  mode,
  sections,
  defaultCollapsed = false,
  storageKey = "director-sidebar-collapsed",
}: DirectorSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Load saved preference from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    }
  }, [storageKey]);

  // Save preference to localStorage
  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, String(newState));
    }
  };

  const isSceneCanvas = pathname.startsWith("/scene-canvas");

  // Width based on mode and pin state
  const getWidth = () => {
    const collapsed = isSceneCanvas && isCollapsed && !isPinned;

    if (collapsed) return "w-16"; // Icon-only mode
    switch (mode) {
      case "full-arsenal":
        return "w-64";
      case "quick-draw":
        return "w-64";
      case "gallery":
        return "w-64";
      default:
        return "w-64";
    }
  };

  const topOffsetClass =
    pathname.startsWith("/tools") ||
      pathname.startsWith("/prompts") ||
      pathname.startsWith("/showcase") ||
      pathname.startsWith("/scene-canvas")
      ? "top-0"
      : "top-16";

  const studioNavSection: SidebarSection = {
    title: "Studio Navigation",
    items: [
      {
        id: "nav-tools",
        label: "Tools",
        icon: <Film className="w-5 h-5" />,
        onClick: () => router.push("/tools"),
        active: pathname.startsWith("/tools"),
      },
      {
        id: "nav-scene-canvas",
        label: "Scene Canvas",
        icon: <Sparkles className="w-5 h-5" />,
        onClick: () => router.push("/scene-canvas"),
        active: pathname.startsWith("/scene-canvas"),
      },
      {
        id: "nav-prompts",
        label: "Prompts",
        icon: <Image className="w-5 h-5" />,
        onClick: () => router.push("/prompts"),
        active: pathname.startsWith("/prompts"),
      },
      {
        id: "nav-showcase",
        label: "Showcase",
        icon: <Film className="w-5 h-5" />,
        onClick: () => router.push("/showcase"),
        active: pathname.startsWith("/showcase"),
      },
    ],
  };

  const allSections: SidebarSection[] = [studioNavSection, ...sections];

  return (
    <>
      {/* Mobile Menu Button - Cinematic Design */}
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[70] group"
          aria-label="Open menu"
        >
          <div className="relative">
            {/* Purple glow background */}
            <div className="absolute inset-0 bg-bedroom-purple/20 blur-xl rounded-full" />

            {/* Main button */}
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-director-black via-director-black to-bedroom-purple/10 border-2 border-bedroom-purple/30 hover:border-bedroom-purple/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              {/* Film strip lines */}
              <div className="flex flex-col gap-1.5">
                <div className="w-6 h-0.5 bg-gradient-to-r from-bedroom-purple to-screen-white rounded-full transition-all duration-300 group-hover:w-7" />
                <div className="w-6 h-0.5 bg-gradient-to-r from-bedroom-purple to-screen-white rounded-full" />
                <div className="w-6 h-0.5 bg-gradient-to-r from-bedroom-purple to-screen-white rounded-full transition-all duration-300 group-hover:w-7" />
              </div>

              {/* Sprocket holes (film strip aesthetic) */}
              <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-1 bg-bedroom-purple/40 rounded-full" />
              <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-1 bg-bedroom-purple/40 rounded-full" />
            </div>
          </div>
        </button>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`${getWidth()} hidden lg:block flex-shrink-0 transition-all duration-300 ease-in-out relative`}
      >
        {/* Sidebar Container */}
        <div className={`fixed ${topOffsetClass} left-0 bottom-0 bg-director-black/95 backdrop-blur-xl border-r border-white/5 overflow-y-auto z-30`}>
          {/* Film grain texture */}
          <div className="absolute inset-0 grain-texture opacity-5 pointer-events-none" />

          {/* Purple glow border */}
          <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-bedroom-purple/0 via-bedroom-purple/30 to-bedroom-purple/0" />

          <div className={`${getWidth()} relative z-10 py-6`}>
            {/* Sidebar Content */}
            <div className="px-3 space-y-6">
              {/* Brand Block */}
              <Link
                href="/"
                className={`
                mb-4 flex items-center gap-3 rounded-lg border border-white/10 bg-bedroom-purple/5
                px-3 py-3 transition-all hover:bg-bedroom-purple/10 hover:border-bedroom-purple/70
                ${isCollapsed ? "justify-center" : ""}
              `}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-bedroom-purple/50 bg-bedroom-purple/15 text-bedroom-purple shadow-[0_0_18px_rgba(168,85,247,0.35)]">
                  <span className="text-[10px] font-semibold tracking-[0.28em]">
                    BD
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11px] font-semibold tracking-[0.32em] text-screen-white">
                      BEDROOM
                    </span>
                    <span className="-mt-0.5 text-[11px] font-semibold tracking-[0.32em] text-screen-white">
                      DIRECTOR
                    </span>
                    <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-screen-white/40">
                      Studio workspace
                    </span>
                  </div>
                )}
              </Link>

              {/* Expand/Collapse Button (Scene Canvas only) */}
              {isSceneCanvas && (
                <button
                  onClick={() => setIsPinned(!isPinned)}
                  className="mb-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                  title={isPinned ? "Collapse sidebar" : "Expand sidebar"}
                >
                  {isPinned ? (
                    <>
                      <ChevronLeft className="w-4 h-4" />
                      {!isCollapsed && <span className="text-xs">Collapse</span>}
                    </>
                  ) : (
                    <>
                      <ChevronRight className="w-4 h-4" />
                      {!isCollapsed && <span className="text-xs">Expand</span>}
                    </>
                  )}
                </button>
              )}

              {allSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {/* Section Title */}
                  {!isCollapsed && (
                    <h3 className="px-3 mb-3 text-xs font-semibold text-screen-white/50 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  )}

                  {/* Section Items */}
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={item.onClick}
                        className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-200 group relative
                        ${item.active
                            ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/40"
                            : "text-screen-white/70 hover:bg-black/40 hover:text-screen-white"
                          }
                        ${isCollapsed ? "justify-center" : ""}
                      `}
                        title={isCollapsed ? item.label : undefined}
                      >
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 ${item.active
                            ? "text-screen-white"
                            : item.color
                              ? item.color
                              : "text-screen-white/70 group-hover:text-screen-white"
                            }`}
                        >
                          {item.icon}
                        </div>

                        {/* Label (hidden when collapsed) */}
                        {!isCollapsed && (
                          <span className="flex-1 text-left text-sm font-medium truncate">
                            {item.label}
                          </span>
                        )}

                        {/* Badge (hidden when collapsed) */}
                        {!isCollapsed && item.badge && (
                          <span className="px-2 py-0.5 bg-bedroom-purple/20 text-bedroom-purple text-xs font-semibold rounded-full">
                            {item.badge}
                          </span>
                        )}

                        {/* Purple glow on active */}
                        {item.active && (
                          <div className="absolute inset-0 rounded-lg bg-bedroom-purple/10 blur-xl -z-10" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Scene Canvas collapse control */}
              {isSceneCanvas && (
                <button
                  onClick={toggleCollapsed}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-bedroom-purple/40 text-xs font-medium text-screen-white/70 hover:bg-bedroom-purple/15 hover:text-screen-white transition-all"
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isCollapsed ? (
                    <ChevronRight className="w-3 h-3" />
                  ) : (
                    <ChevronLeft className="w-3 h-3" />
                  )}
                  {!isCollapsed && <span>Collapse sidebar</span>}
                </button>
              )}
            </div>

            {/* Mode Indicator (collapsed only for Scene Canvas) */}
            {isSceneCanvas && isCollapsed && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="w-1 h-8 bg-gradient-to-b from-bedroom-purple/0 via-bedroom-purple/50 to-bedroom-purple/0 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[55] animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          />

          {/* Mobile Sidebar */}
          <div className="lg:hidden fixed top-0 left-0 bottom-0 w-64 bg-director-black/95 backdrop-blur-xl border-r border-white/5 overflow-y-auto z-[60] animate-in slide-in-from-left duration-300">
            {/* Film grain texture */}
            <div className="absolute inset-0 grain-texture opacity-5 pointer-events-none" />

            {/* Purple glow border */}
            <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-bedroom-purple/0 via-bedroom-purple/30 to-bedroom-purple/0" />

            <div className="w-64 relative z-10 py-6">
              {/* Sidebar Content */}
              <div className="px-3 space-y-6">
                {/* Brand Block */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mb-4 flex items-center gap-3 rounded-lg border border-white/10 bg-bedroom-purple/5 px-3 py-3 transition-all hover:bg-bedroom-purple/10 hover:border-bedroom-purple/70"
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
                      Studio workspace
                    </span>
                  </div>
                </Link>

                {allSections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {/* Section Title */}
                    <h3 className="px-3 mb-3 text-xs font-semibold text-screen-white/50 uppercase tracking-wider">
                      {section.title}
                    </h3>

                    {/* Section Items */}
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            item.onClick?.();
                            setIsMobileMenuOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                            transition-all duration-200 group relative
                            ${item.active
                              ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/40"
                              : "text-screen-white/70 hover:bg-black/40 hover:text-screen-white"
                            }
                          `}
                        >
                          {/* Icon */}
                          <div
                            className={`flex-shrink-0 ${item.active
                              ? "text-screen-white"
                              : item.color
                                ? item.color
                                : "text-screen-white/70 group-hover:text-screen-white"
                              }`}
                          >
                            {item.icon}
                          </div>

                          {/* Label */}
                          <span className="flex-1 text-left text-sm font-medium truncate">
                            {item.label}
                          </span>

                          {/* Badge */}
                          {item.badge && (
                            <span className="px-2 py-0.5 bg-bedroom-purple/20 text-bedroom-purple text-xs font-semibold rounded-full">
                              {item.badge}
                            </span>
                          )}

                          {/* Purple glow on active */}
                          {item.active && (
                            <div className="absolute inset-0 rounded-lg bg-bedroom-purple/10 blur-xl -z-10" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
