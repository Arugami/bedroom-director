export default function AboutSection() {
  return (
    <section className="relative py-32 bg-director-black-soft overflow-hidden">
      {/* Background Image - Palm Tree (California/Hollywood vibes) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/liveathehudson_cinematic_wallpaper_of_a_single_palm_tree_swayin_0a03b191-6989-413d-a83e-d00cd63d88e2.jpg')"
        }}
      />
      
      {/* Purple ambient glow */}
      <div className="absolute inset-0 purple-ambient opacity-40" />
      {/* Film grain */}
      <div className="absolute inset-0 grain-texture" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Chiat/Day-inspired Manifesto */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-screen-white mb-12 leading-tight">
            Here's to the Bedroom Directors.
          </h2>

          <div className="space-y-6 text-lg sm:text-xl text-screen-white/80 leading-relaxed">
            <p>
              The ones who turn prompts into pictures.
            </p>
            <p>
              The ones who light scenes with imagination, not spotlights.
            </p>
            <p>
              The ones who know that great stories don't need permission.
            </p>
            <p className="pt-6 text-screen-white/60">
              They're not waiting for Hollywood.
            </p>
            <p className="text-screen-white/60">
              They're building the next Hollywood.
            </p>
            <p className="pt-8 text-2xl sm:text-3xl font-bold text-purple-bloom text-bloom">
              Bedroom Director.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
