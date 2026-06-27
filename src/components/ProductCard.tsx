import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

export const ProductCard = ({ product, index }: { product: Product; onOpen?: (p: Product) => void; index: number }) => {
  const [selectedTier, setSelectedTier] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const tier = product.prices[selectedTier];
  const total = tier.price * qty;

  const handleAdd = () => {
    addItem(product, selectedTier, qty);
    setAdded(true);
    toast.success(`${product.name} કાર્ટમાં ઉમેરાયું!`, { duration: 2000 });
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="group relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-700 hover:-translate-y-2 animate-fade-up flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span className="glass-dark text-ivory text-[10px] font-guj-sans px-3 py-1.5 rounded-full">
            {product.badge}
          </span>
          <span className="bg-gold text-charcoal text-[10px] font-guj-sans font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal animate-pulse" /> {product.freshness}%
          </span>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-5">
          <div className="text-4xl mb-1">{product.emoji}</div>
          <h3 className="font-guj font-bold text-ivory text-3xl">{product.name}</h3>
          <p className="text-gold-soft font-guj-sans text-sm mt-0.5">{product.nameEn}</p>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-guj-sans font-semibold">ભાવ પસંદ કરો</p>
          <div className="flex flex-wrap gap-2">
            {product.prices.map((p, i) => (
              <button
                key={p.qty}
                onClick={() => { setSelectedTier(i); setQty(1); }}
                className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 text-xs transition-all duration-200 ${
                  selectedTier === i
                    ? "border-gold bg-gradient-forest text-primary-foreground shadow-luxe"
                    : "border-border bg-card hover:border-gold/50"
                }`}
              >
                <span className="font-guj-sans font-medium">{p.qty}</span>
                <span className={`font-display font-bold mt-0.5 ${selectedTier === i ? "text-gold" : "text-foreground"}`}>
                  ₹{p.price.toLocaleString()}
                </span>
                {p.note && (
                  <span className="text-[9px] font-guj-sans mt-0.5 text-gold-soft/80">{p.note}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-secondary/70 rounded-full p-1">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 rounded-full bg-secondary hover:bg-gold hover:text-charcoal flex items-center justify-center transition-colors"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center font-medium font-guj-sans">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-8 h-8 rounded-full bg-secondary hover:bg-gold hover:text-charcoal flex items-center justify-center transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-guj-sans">કુલ</div>
            <div className="font-display text-2xl text-foreground">₹{total.toLocaleString()}</div>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-guj-sans font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
            added
              ? "bg-emerald-600 text-white shadow-lg"
              : "bg-gold text-charcoal hover:shadow-gold animate-pulse-glow"
          }`}
        >
          {added ? (
            <><Check className="h-4 w-4" /> ઉમેરાયું!</>
          ) : (
            <><ShoppingCart className="h-4 w-4" /> કાર્ટમાં નાખો</>
          )}
        </button>
      </div>
    </div>
  );
};
