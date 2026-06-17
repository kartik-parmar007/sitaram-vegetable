import type { Product } from "@/data/products";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const ProductCard = ({ product, onOpen, index }: { product: Product; onOpen: (p: Product) => void; index: number }) => {
  const Trend = product.trend === "up" ? TrendingUp : product.trend === "down" ? TrendingDown : Minus;
  const trendColor = product.trend === "up" ? "text-red-500" : product.trend === "down" ? "text-emerald-600" : "text-muted-foreground";

  return (
    <button
      onClick={() => onOpen(product)}
      className="group relative text-left bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-700 hover:-translate-y-3 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-charcoal">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <span className="glass-dark text-ivory text-[10px] font-guj-sans px-3 py-1.5 rounded-full">
            {product.badge}
          </span>
          <span className="bg-gold text-charcoal text-[10px] font-guj-sans font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal animate-pulse" /> {product.freshness}% તાજું
          </span>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl">{product.emoji}</span>
            <span className="text-gold-soft text-[10px] uppercase tracking-[0.25em]">{product.variety}</span>
          </div>
          <h3 className="font-guj font-bold text-ivory text-3xl">{product.name}</h3>
        </div>
      </div>

      <div className="p-5 bg-card">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-guj-sans">1 કિ.ગ્રા ભાવ</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display text-3xl text-foreground">₹{product.prices[0].price}</span>
              <Trend className={`h-4 w-4 ${trendColor}`} />
            </div>
          </div>
          <span className="text-[11px] font-guj-sans text-primary group-hover:text-accent transition-colors px-4 py-2 rounded-full bg-secondary/70 group-hover:bg-primary group-hover:text-primary-foreground">
            વિગતો →
          </span>
        </div>
      </div>
    </button>
  );
};
