import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-director-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-screen-white mb-2">
              BEDROOM DIRECTOR
            </h3>
            <p className="text-screen-white/60 text-sm max-w-md">
              From bedroom to big screen. Discover AI creative tools, learn from the community, and create professional work from anywhere.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-screen-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools" className="text-screen-white/60 hover:text-neon-purple transition-colors">
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-screen-white/60 hover:text-neon-purple transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-screen-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://twitter.com/bedroomdirector" target="_blank" rel="noopener noreferrer" className="text-screen-white/60 hover:text-neon-purple transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com/bedroomdirector" target="_blank" rel="noopener noreferrer" className="text-screen-white/60 hover:text-neon-purple transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-900">
          <p className="text-screen-white/40 text-sm text-center">
            © {new Date().getFullYear()} Bedroom Director. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
