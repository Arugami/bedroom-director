import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-director-black">
      {/* Cinematic Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Video - Director's Chair */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/cinematic_twilight_scene_with_directors_chair_silhouette.mp4" type="video/mp4" />
        </video>

        {/* Twilight gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/90 via-[#312e81]/85 to-director-black" />

        {/* Purple ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-bedroom-purple/10 via-transparent to-transparent" />

        {/* Film grain */}
        <div className="absolute inset-0 grain-texture opacity-15" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-screen-white mb-6"
              style={{
                textShadow: "0 2px 30px rgba(124, 58, 237, 0.5), 0 4px 60px rgba(0, 0, 0, 0.8)"
              }}
            >
              Your Bedroom Is Your Studio
            </h1>
            <p className="text-xl text-screen-white/90 leading-relaxed">
              Traditional filmmaking required expensive equipment, large teams, and Hollywood budgets. Not anymore.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section with Film Grain Background */}
      <div className="relative">
        {/* Subtle film grain for content sections */}
        <div className="absolute inset-0 grain-texture opacity-5 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Mission Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-lg text-screen-white/80 leading-relaxed mb-6">
              AI tools have democratized filmmaking. Anyone with a laptop can now create cinematic content that rivals big studios.
            </p>
            <p className="text-lg text-screen-white/80 leading-relaxed mb-6">
              But with hundreds of AI tools, where do you start?
            </p>
            <p className="text-lg text-screen-white/80 leading-relaxed">
              That's where we come in. Bedroom Director is your complete guide to AI creative tools.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2
            className="text-3xl font-bold text-screen-white mb-8"
            style={{
              textShadow: "0 2px 20px rgba(124, 58, 237, 0.4)"
            }}
          >
            We Help You:
          </h2>
          <div className="space-y-6">
            {[
              "Discover the right tools for your project",
              "Learn proven techniques from the community",
              "Create professional work from anywhere",
              "Connect with fellow bedroom directors",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-bedroom-purple flex-shrink-0 mt-1" />
                <p className="text-lg text-screen-white/80">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-screen-white/60 mt-8">
            No Hollywood studio required.
          </p>
        </div>

        {/* Manifesto */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="p-12 bg-gray-900/50 border border-gray-800/50 rounded-lg relative overflow-hidden">
            {/* Subtle purple glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-bedroom-purple/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl font-bold text-screen-white mb-8 text-center"
              style={{
                textShadow: "0 2px 20px rgba(124, 58, 237, 0.4)"
              }}
            >
              Here's to the Bedroom Directors.
            </h2>
            <div className="space-y-6 text-lg text-screen-white/80 leading-relaxed">
              <p>The ones who turn prompts into pictures.</p>
              <p>The ones who light scenes with imagination, not spotlights.</p>
              <p>The ones who know that great stories don't need permission.</p>
              <p className="pt-4 text-screen-white/60">
                They're not waiting for Hollywood.
              </p>
              <p className="text-screen-white/60">
                They're building the next Hollywood.
              </p>
              <p className="pt-6 text-2xl font-bold text-bedroom-purple text-center">
                Bedroom Director.
              </p>
            </div>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl font-bold text-screen-white mb-6"
            style={{
              textShadow: "0 2px 20px rgba(124, 58, 237, 0.4)"
            }}
          >
            Our Vision
          </h2>
          <p className="text-lg text-screen-white/80 leading-relaxed">
            A world where your location, budget, or connections don't determine if your story gets told. Where bedroom creators compete with big studios. Where the best story wins, not the biggest budget.
          </p>
        </div>
      </div>
    </div>
    </main>
  );
}
