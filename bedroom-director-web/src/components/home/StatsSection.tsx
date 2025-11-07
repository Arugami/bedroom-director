export default function StatsSection() {
  const stats = [
    {
      value: "156+",
      label: "AI Tools Cataloged",
    },
    {
      value: "Daily",
      label: "Updated",
    },
    {
      value: "10,000+",
      label: "Bedroom Directors",
    },
  ];

  return (
    <section className="relative py-24 border-y border-gray-900 bg-director-black-soft overflow-hidden">
      {/* Subtle purple glow */}
      <div className="absolute inset-0 purple-ambient opacity-30" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl sm:text-6xl font-bold text-purple-bloom mb-3 text-bloom transition-all group-hover:scale-105">
                {stat.value}
              </div>
              <div className="text-screen-white/70 text-lg tracking-wide uppercase text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
