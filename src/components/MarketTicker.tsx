import { products } from "@/data/products";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const Arrow = ({ t }: { t: "up" | "down" | "stable" }) => {
  if (t === "up") return <TrendingUp className="h-3.5 w-3.5 text-red-400" />;
  if (t === "down") return <TrendingDown className="h-3.5 w-3.5 text-green-400" />;
  return <Minus className="h-3.5 w-3.5 text-ivory/60" />;
};

export const MarketTicker = () => {
  const items = [...products, ...products];
  return (
    <section id="rates" className="relative py-8 bg-charcoal text-ivory border-y border-gold/20 overflow-hidden">
      <div className="container flex items-center gap-6">
        <div className="flex items-center gap-2 flex-shrink-0 z-10 pr-6 bg-charcoal">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-guj-sans text-sm font-semibold">આજનો બજાર ભાવ</span>
          <span className="text-[10px] uppercase tracking-widest text-gold ml-2">LIVE</span>
        </div>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex gap-10 animate-ticker w-max">
            {items.map((p, i) => (
              <div key={i} className="flex items-center gap-3 font-guj-sans text-sm whitespace-nowrap">
                <span className="text-xl">{p.emoji}</span>
                <span className="text-ivory/90">{p.name}</span>
                <span className="text-gold font-semibold">₹{p.prices[0].price}/કિ.ગ્રા</span>
                <Arrow t={p.trend} />
                <span className="text-ivory/30">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
