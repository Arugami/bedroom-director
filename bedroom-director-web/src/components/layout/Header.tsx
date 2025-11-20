"use client";

import Link from "next/link";
import { Menu, X, GitCompare } from "lucide-react";
import { useState } from "react";
import { useComparison } from "@/contexts/ComparisonContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { comparisonTools, toggleTray } = useComparison();
  const pathname = usePathname();

  const navItems = [
    { href: "/tools", label: "Tools" },
    { href: "/scene-canvas", label: "Scene Canvas" },
    { href: "/prompts", label: "Prompts" },
    { href: "/showcase", label: "Showcase" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Studio surfaces (tools, prompts, showcase, scene-canvas) use
  // a sidebar app shell and their own in-surface chrome. Reserve
  // the global header for marketing/about style pages.
  const isStudioRoute =
    pathname.startsWith("/tools") ||
    pathname.startsWith("/prompts") ||
    pathname.startsWith("/showcase") ||
    pathname.startsWith("/scene-canvas");

  // Full brand slate only on top-level non-studio pages.
  const showTopNav = pathname === "/" || pathname.startsWith("/about");

  const getSectionLabel = () => {
    if (pathname.startsWith("/scene-canvas")) return "Scene Canvas";
    if (pathname.startsWith("/tools")) return "Tools";
    if (pathname.startsWith("/prompts")) return "Prompt Library";
    if (pathname.startsWith("/showcase")) return "Showcase";
    if (pathname.startsWith("/about")) return "About";
    return "";
  };

  // Skip the global header entirely on studio routes.
  if (isStudioRoute) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-900/50 bg-director-black/98 backdrop-blur supports-[backdrop-filter]:bg-director-black/95 shadow-lg shadow-bedroom-purple/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo / Slate or Section Label */}
          {showTopNav ? (
import Logo from "@/components/common/Logo";

          // ... inside the component ...

          {/* Logo / Slate or Section Label */}
          {showTopNav ? (
            <Link href="/" className="block">
              <Logo />
            </Link>
          ) : (
          ): (
              <div className = "flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.3em] text-screen-white/70">
              <span className = "text-screen-white/50">Bedroom Director</span>
        {getSectionLabel() && (
          <>
            <span className="text-screen-white/30">•</span>
            <span className="text-screen-white/80">
              {getSectionLabel()}
            </span>
          </>
        )}
      </div>
          )}

      {/* Desktop Navigation */}
      {showTopNav && (
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-xs font-medium">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-1 py-1"
              >
                <span
                  className={`uppercase tracking-[0.25em] transition-colors ${active
                      ? "text-screen-white"
                      : "text-screen-white/60 hover:text-screen-white"
                    }`}
                >
                  {item.label}
                </span>
                {active && (
                  <span className="absolute inset-x-1 -bottom-1 h-[2px] rounded-full bg-bedroom-purple shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
                )}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Right-side utilities */}
      <div className="flex items-center gap-3">
        {/* Comparison Counter (desktop) */}
        {comparisonTools.length > 0 && (
          <button
            onClick={toggleTray}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all shadow-lg shadow-bedroom-purple/30"
          >
            <GitCompare className="w-4 h-4" />
            <span>Compare ({comparisonTools.length})</span>
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-screen-white/80 hover:text-screen-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>

        {/* Mobile Navigation Menu */ }
  {
    isMobileMenuOpen && (
      <nav className="md:hidden py-4 border-t border-gray-900/50">
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-2 py-2 text-sm uppercase tracking-[0.2em] transition-colors ${active
                    ? "text-screen-white"
                    : "text-screen-white/70 hover:text-bedroom-purple"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Mobile Comparison Counter */}
          {comparisonTools.length > 0 && (
            <button
              onClick={() => {
                toggleTray();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-bedroom-purple hover:bg-purple-bloom text-screen-white font-semibold rounded-lg transition-all shadow-lg shadow-bedroom-purple/30 mx-2"
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare ({comparisonTools.length})</span>
            </button>
          )}
        </div>
      </nav>
    )
  }
      </div >
    </header >
  );
}
