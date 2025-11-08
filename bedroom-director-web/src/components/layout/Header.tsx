"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-900/50 bg-director-black/98 backdrop-blur supports-[backdrop-filter]:bg-director-black/95 shadow-lg shadow-bedroom-purple/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-screen-white hover:text-bedroom-purple transition-colors">
              BEDROOM DIRECTOR
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/tools"
              className="text-screen-white/70 hover:text-purple-bloom transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/about"
              className="text-screen-white/70 hover:text-purple-bloom transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-screen-white/80 hover:text-screen-white transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
