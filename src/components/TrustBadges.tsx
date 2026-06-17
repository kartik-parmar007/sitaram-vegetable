const badges = [
  { icon: "🚜", label: "ખેડૂત પાસેથી", sub: "Direct from Farm" },
  { icon: "⭐", label: "તાજું માલ", sub: "Always Fresh" },
  { icon: "🏆", label: "પ્રીમિયમ ગુણવત્તા", sub: "Premium Quality" },
  { icon: "🚚", label: "ઝડપી ડિલિવરી", sub: "Fast Delivery" },
];

export const TrustBadges = () => (
  <section id="why" className="py-20 bg-gradient-forest text-ivory relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-emerald-glow opacity-50" />
    <div className="container relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {badges.map((b, i) => (
          <div
            key={b.label}
            className="group glass-dark rounded-2xl p-6 lg:p-8 text-center hover:bg-ivory/10 transition-all duration-500 hover:-translate-y-2 animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="text-5xl lg:text-6xl mb-4 group-hover:scale-110 transition-transform duration-500 inline-block">{b.icon}</div>
            <div className="font-guj font-bold text-lg lg:text-xl">{b.label}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold-soft/80 mt-2">{b.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
