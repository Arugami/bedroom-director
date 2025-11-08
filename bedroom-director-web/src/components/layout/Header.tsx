"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

          {/* Desktop Navigation */}
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

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-900/50">
            <div className="flex flex-col space-y-4">
              <Link
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-screen-white/70 hover:text-bedroom-purple transition-colors px-2 py-2"
              >
                Tools
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-screen-white/70 hover:text-bedroom-purple transition-colors px-2 py-2"
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
