import { ProductCard } from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

export const ProductGrid = () => {
  const { products } = useProducts();

  const showcase = [...products, ...products];

  return (
    <section id="harvest" className="relative py-24 bg-gradient-ivory overflow-hidden">
      <div className="mb-20 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex gap-6 animate-marquee w-max pause-on-hover">
          {showcase.map((p, i) => (
            <div key={i} className="relative w-56 h-72 rounded-2xl overflow-hidden flex-shrink-0 shadow-luxe group">
              <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-4">
                <div className="text-3xl">{p.emoji}</div>
                <div className="font-guj font-bold text-ivory text-2xl mt-1">{p.name}</div>
                <div className="text-gold text-sm font-guj-sans">₹{p.prices[0].price}/કિ.ગ્રા</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-eyebrow justify-center inline-flex">Our Harvest</span>
          <h2 className="mt-6 font-guj font-bold text-5xl sm:text-6xl text-foreground leading-[1.1]">
            તાજા <span className="italic gold-text">શાકભાજી</span>
          </h2>
          <p className="mt-4 font-guj-sans text-muted-foreground">ખેતરથી સીધા તમારા ઘરે — કાર્ટમાં નાખો અને WhatsApp પર ઓર્ડર કરો</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
