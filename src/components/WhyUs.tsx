import { Leaf, Truck, Sprout, Award } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Freshness Guarantee",
    body: "Harvested at peak ripeness and cold-chain delivered. If it doesn't arrive at its very best, we replace it — no questions asked.",
  },
  {
    icon: Sprout,
    title: "Direct Sourcing",
    body: "We bypass the mandi chain entirely. Every crate is traceable to a partner farm we've personally visited.",
  },
  {
    icon: Award,
    title: "Hand-Graded Quality",
    body: "Each vegetable is sized, weighed, and finished by hand — only the top 12% of the harvest carries the Verdé seal.",
  },
  {
    icon: Truck,
    title: "Considered Delivery",
    body: "Climate-controlled fleets, 48-hour windows, and discreet packaging worthy of a luxury kitchen.",
  },
];

export const WhyUs = () => (
  <section id="why" className="relative py-32 bg-charcoal text-ivory overflow-hidden">
    <div className="absolute inset-0 bg-gradient-emerald-glow opacity-60" />
    <div className="absolute top-20 right-0 w-[40rem] h-[40rem] rounded-full bg-emerald/10 blur-3xl" />

    <div className="container relative">
      <div className="max-w-3xl mb-20">
        <span className="section-eyebrow">Our Philosophy</span>
        <h2 className="mt-6 font-display text-5xl sm:text-6xl leading-[1.05]">
          Premium isn't a price tag —
          <span className="italic gold-text"> it's a practice.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group relative p-10 rounded-2xl glass-dark hover:bg-ivory/[0.04] transition-all duration-500 animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="absolute top-10 right-10 font-display text-6xl text-gold/15 group-hover:text-gold/30 transition-colors">
              0{i + 1}
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mb-8 shadow-gold">
              <f.icon className="h-6 w-6 text-charcoal" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-2xl mb-3">{f.title}</h3>
            <p className="text-ivory/70 leading-relaxed">{f.body}</p>
            <div className="hairline mt-8 opacity-50" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
