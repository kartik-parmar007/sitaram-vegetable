import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export const Loader = () => {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-gradient-emerald-glow opacity-60" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl animate-pulse">🥬</div>
          </div>
          {["🥔", "🍅", "🥕", "🧄"].map((e, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 text-2xl"
              style={{
                animation: `spin 3s linear infinite`,
                transformOrigin: `0 ${50 + i * 6}px`,
                transform: `translate(-50%, -50%) rotate(${i * 90}deg)`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {e}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-ivory/80">
          <Leaf className="h-4 w-4 text-gold" />
          <span className="font-display text-2xl tracking-wider">તાજાશાક</span>
        </div>
        <div className="text-[11px] uppercase tracking-[0.3em] text-ivory/40">લોડ થઈ રહ્યું છે…</div>
      </div>
    </div>
  );
};
