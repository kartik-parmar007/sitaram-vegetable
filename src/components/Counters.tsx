import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 5000, suffix: "+", label: "ગ્રાહકો", icon: "👥" },
  { value: 100, suffix: "+", label: "ગામો", icon: "🏡" },
  { value: 50, suffix: "+", label: "શાકભાજી", icon: "🥬" },
  { value: 24, suffix: "x7", label: "સેવા", icon: "⏰" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
};

export const Counters = () => (
  <section className="py-24 bg-background relative">
    <div className="container">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="relative group p-8 rounded-3xl bg-card shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 text-center overflow-hidden"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="absolute -top-6 -right-6 text-7xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">{s.icon}</div>
            <div className="relative">
              <div className="font-display text-5xl lg:text-6xl gold-text font-bold">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 font-guj-sans text-foreground text-lg">{s.label}</div>
              <div className="hairline mt-4 opacity-60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
