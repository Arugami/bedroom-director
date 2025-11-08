import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-900/50 bg-director-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tight text-screen-white">
                BEDROOM DIRECTOR
              </span>
            </Link>
            <p className="text-screen-white/60 text-sm leading-relaxed max-w-md">
              From bedroom to big screen. Discover and master AI creative tools
              for video, image, music, and audio generation.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-screen-white font-semibold mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tools"
                  className="text-screen-white/60 hover:text-bedroom-purple transition-colors text-sm"
                >
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-screen-white/60 hover:text-bedroom-purple transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/tools?category=VIDEO_GEN"
                  className="text-screen-white/60 hover:text-bedroom-purple transition-colors text-sm"
                >
                  Video Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/tools?category=IMAGE_GEN"
                  className="text-screen-white/60 hover:text-bedroom-purple transition-colors text-sm"
                >
                  Image Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-screen-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/Arugami/bedroom-director"
                target="_blank"
                rel="noopener noreferrer"
                className="text-screen-white/60 hover:text-bedroom-purple transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/bedroomdirector"
                target="_blank"
                rel="noopener noreferrer"
                className="text-screen-white/60 hover:text-bedroom-purple transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@bedroomdirector.com"
                className="text-screen-white/60 hover:text-bedroom-purple transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-screen-white/40 text-sm">
              © {currentYear} Bedroom Director. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-screen-white/40 hover:text-screen-white/60 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-screen-white/40 hover:text-screen-white/60 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
