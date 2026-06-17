import c1 from "@/assets/customer1.jpg";
import c2 from "@/assets/customer2.jpg";
import c3 from "@/assets/customer3.jpg";
import { Star } from "lucide-react";

const reviews = [
  { name: "રમેશભાઈ પટેલ", role: "અમદાવાદ", photo: c1, quote: "દર અઠવાડિયે તાજો માલ. ભાવ વાજબી." },
  { name: "મીનાબેન શાહ", role: "વડોદરા", photo: c2, quote: "ઘરે ડિલિવરી, ઉત્તમ ગુણવત્તા." },
  { name: "જય મકવાણા", role: "શેફ, સુરત", photo: c3, quote: "રેસ્ટોરન્ટ માટે પરફેક્ટ — હંમેશા તાજું." },
];

export const Testimonials = () => (
  <section id="testimonials" className="relative py-28 bg-gradient-ivory">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="section-eyebrow justify-center inline-flex">Voices</span>
        <h2 className="mt-6 font-guj font-bold text-5xl sm:text-6xl text-foreground leading-[1.1]">
          ગ્રાહકોના <span className="italic gold-text">અભિપ્રાય</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            className="group relative p-8 rounded-3xl bg-card shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 animate-fade-up text-center"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="relative w-24 h-24 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full bg-gradient-gold blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <img src={r.photo} alt={r.name} loading="lazy" className="relative w-24 h-24 rounded-full object-cover border-4 border-gold/40" />
            </div>
            <div className="flex justify-center gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-gold text-gold" />)}
            </div>
            <blockquote className="font-guj text-lg leading-relaxed text-foreground">"{r.quote}"</blockquote>
            <div className="hairline my-5" />
            <figcaption>
              <div className="font-guj font-semibold text-foreground">{r.name}</div>
              <div className="text-xs font-guj-sans text-muted-foreground mt-1">{r.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
