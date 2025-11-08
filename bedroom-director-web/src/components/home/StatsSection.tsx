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
    <section className="relative py-24 border-y border-gray-900/30 bg-director-black overflow-hidden">
      {/* Very subtle purple glow */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-bedroom-purple/3" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl sm:text-6xl font-bold text-bedroom-purple mb-3 transition-all group-hover:scale-105 group-hover:text-purple-bloom">
                {stat.value}
              </div>
              <div className="text-screen-white/60 text-lg tracking-wide uppercase text-sm group-hover:text-screen-white/80 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
