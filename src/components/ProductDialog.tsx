import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Minus, Plus, MapPin, Leaf, Clock, Award, Phone, MessageCircle } from "lucide-react";
import { PHONE, WHATSAPP } from "@/data/products";

export const ProductDialog = ({ product, onClose }: { product: Product | null; onClose: () => void }) => {
  const [selectedTier, setSelectedTier] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) { setSelectedTier(0); setQty(1); }
  }, [product]);

  if (!product) return null;
  const tier = product.prices[selectedTier];
  const total = tier.price * qty;
  const waText = encodeURIComponent(`નમસ્તે, મારે ${product.name} ${tier.qty} × ${qty} = ₹${total} નો ઓર્ડર કરવો છે`);

  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-6xl p-0 overflow-hidden border-0 bg-card max-h-[92vh] overflow-y-auto">
        <div className="grid lg:grid-cols-2">
          <div className="relative bg-charcoal aspect-square lg:aspect-auto lg:min-h-[600px] overflow-hidden">
            <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="glass-dark text-ivory text-xs font-guj-sans px-3 py-1.5 rounded-full">{product.badge}</span>
              <span className="bg-gold text-charcoal text-xs font-guj-sans font-semibold px-3 py-1.5 rounded-full">{product.freshness}% તાજું</span>
            </div>
            <div className="absolute bottom-6 left-6">
              <div className="text-6xl mb-2">{product.emoji}</div>
              <div className="font-guj font-bold text-ivory text-5xl">{product.name}</div>
              <div className="text-gold-soft font-guj-sans mt-1">{product.variety}</div>
            </div>
          </div>

          <div className="p-8 lg:p-10 overflow-y-auto">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: MapPin, label: "ખેતર", value: product.origin },
                { icon: Clock, label: "લણણી", value: product.harvested },
                { icon: Leaf, label: "તાજગી", value: `${product.freshness}%` },
                { icon: Award, label: "ગ્રેડ", value: product.badge },
              ].map((s) => (
                <div key={s.label} className="p-3.5 rounded-xl bg-secondary/60 border border-border">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-guj-sans">
                    <s.icon className="h-3 w-3 text-accent" /> {s.label}
                  </div>
                  <div className="mt-1 text-sm font-medium text-foreground font-guj-sans">{s.value}</div>
                </div>
              ))}
            </div>

            <h3 className="text-xs font-guj-sans font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3">ભાવ યાદી</h3>
            <div className="grid grid-cols-1 gap-2 mb-6">
              {product.prices.map((p, i) => (
                <button
                  key={p.qty}
                  onClick={() => setSelectedTier(i)}
                  className={`group relative flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all duration-300 hover:-translate-y-0.5 ${
                    selectedTier === i
                      ? "border-gold bg-gradient-forest text-primary-foreground shadow-luxe"
                      : "border-border bg-card hover:border-gold/50 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full transition-all ${selectedTier === i ? "bg-gold animate-pulse" : "bg-border"}`} />
                    <span className="font-guj-sans font-medium">{p.qty}</span>
                    {p.note && (
                      <span className={`text-[10px] font-guj-sans px-2 py-0.5 rounded-full ${selectedTier === i ? "bg-gold/25 text-gold-soft" : "bg-accent/15 text-accent"}`}>
                        {p.note}
                      </span>
                    )}
                  </div>
                  <span className="font-display text-xl">₹{p.price.toLocaleString()}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-forest text-primary-foreground mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-guj-sans">કુલ રકમ</div>
                <div className="font-display text-3xl">₹{total.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2 bg-ivory/10 rounded-full p-1.5">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-full bg-ivory/10 hover:bg-gold hover:text-charcoal flex items-center justify-center transition-colors"><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-full bg-ivory/10 hover:bg-gold hover:text-charcoal flex items-center justify-center transition-colors"><Plus className="h-3.5 w-3.5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 bg-gold text-charcoal py-4 rounded-full text-sm font-guj-sans font-semibold hover:shadow-gold transition-all hover:-translate-y-0.5">
                <Phone className="h-4 w-4" /> કૉલ કરો
              </a>
              <a href={`https://wa.me/${WHATSAPP}?text=${waText}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-full text-sm font-guj-sans font-semibold hover:opacity-90 transition-opacity">
                <MessageCircle className="h-4 w-4" /> વોટ્સએપ
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
