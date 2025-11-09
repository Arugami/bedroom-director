import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function BrandsUsingAI() {
  const brands = [
    { name: "Coca-Cola", logo: "/logos/coca-cola.png" },
    { name: "Nike", logo: "/logos/nike.png" },
    { name: "Apple", logo: "/logos/apple.png" },
    { name: "Spotify", logo: "/logos/spotify.png" },
    { name: "Netflix", logo: "/logos/netflix.png" },
    { name: "Adobe", logo: "/logos/adobe.png" },
  ];

  const featuredCampaign = {
    brand: "Coca-Cola",
    title: "Real Magic Holiday Campaign 2025",
    description: "Heartwarming AI-generated holiday moments that brought families together",
    thumbnail: "/placeholder-brand-campaign.jpg", // Replace with actual thumbnail
    tools: ["Sora 2 Pro", "ElevenLabs", "Runway Gen-4"],
    views: "2.3M",
    link: "#"
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dark background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-director-black" />
      
      {/* Subtle purple glow */}
      <div className="absolute inset-0 bg-gradient-radial from-bedroom-purple/5 via-transparent to-transparent" />
      
      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-8" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-screen-white mb-4"
              style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.6)' }}>
            Brands Creating with AI
          </h2>
          <p className="text-screen-white/70 text-lg max-w-2xl mx-auto">
            See how the world's leading brands are using AI to tell their stories
          </p>
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-16">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm border border-gray-800/40 rounded-lg hover:border-gray-700 hover:bg-black/30 transition-all group"
            >
              <div className="text-center w-full">
                {/* Placeholder for logo - replace with actual logo images */}
                <div className="w-full h-12 mb-2 flex items-center justify-center bg-gray-800/30 rounded group-hover:bg-gray-700/30 transition-all">
                  <span className="text-screen-white/40 text-xs uppercase tracking-wide">{brand.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Campaign */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-screen-white/80 mb-6 text-center">
            Featured Campaign
          </h3>
          
          <Link href={featuredCampaign.link} className="group block">
            <div className="relative rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700 hover:shadow-2xl hover:shadow-bedroom-purple/20 transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Thumbnail */}
                <div className="relative aspect-video md:aspect-auto bg-gradient-to-br from-bedroom-purple/20 to-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-screen-white/20 text-sm uppercase tracking-wide">Campaign Video</div>
                  </div>
                  
                  {/* Views badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                    {featuredCampaign.views} views
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-bedroom-purple text-sm font-semibold uppercase tracking-wide mb-2">
                    {featuredCampaign.brand}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-screen-white mb-3 group-hover:text-purple-bloom transition-colors">
                    {featuredCampaign.title}
                  </h4>
                  
                  <p className="text-screen-white/70 text-sm mb-6">
                    {featuredCampaign.description}
                  </p>

                  {/* Tools used */}
                  <div className="mb-6">
                    <p className="text-screen-white/50 text-xs uppercase tracking-wide mb-2">
                      Made with:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featuredCampaign.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-black/40 border border-gray-700/50 rounded-lg text-screen-white/70 text-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-purple-bloom text-sm font-medium group-hover:gap-3 transition-all">
                    View Campaign
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
