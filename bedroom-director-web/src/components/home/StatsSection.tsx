export default function StatsSection() {
  const stats = [
    {
      value: "156+",
      label: "AI Tools Cataloged",
      color: "text-bedroom-purple"
    },
    {
      value: "Daily",
      label: "Updated",
      color: "text-[#00CED1]" // Retro Teal
    },
    {
      value: "10,000+",
      label: "Bedroom Directors",
      color: "text-[#FF8C42]" // Sunset Orange
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Twilight gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a]" />
      
      {/* Atmospheric lighting - purple glow from bottom */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-bedroom-purple/15 via-bedroom-purple/5 to-transparent" />
      
      {/* Warm accent from top */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#FF8C42]/8 to-transparent" />
      
      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-12" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div 
                className={`text-6xl sm:text-7xl md:text-6xl lg:text-7xl font-bold ${stat.color} mb-4 transition-all group-hover:scale-110`}
                style={{ 
                  textShadow: '0 0 30px currentColor, 0 0 60px currentColor' 
                }}
              >
                {stat.value}
              </div>
              <div className="text-screen-white/70 text-base sm:text-lg tracking-wider uppercase font-medium group-hover:text-screen-white/90 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
