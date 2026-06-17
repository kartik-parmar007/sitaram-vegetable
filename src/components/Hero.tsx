import { useEffect, useState } from "react";
import farmImg from "@/assets/farm.jpg";
import potato from "@/assets/potato.jpg";
import onion from "@/assets/onion.jpg";
import garlic from "@/assets/garlic.jpg";
import tomato from "@/assets/tomato.jpg";
import { Phone, MessageCircle, ChevronDown } from "lucide-react";
import { PHONE, WHATSAPP } from "@/data/products";

const floats = [
  { src: potato, top: "12%", left: "6%", size: 110, delay: "0s", dur: "9s" },
  { src: onion, top: "22%", right: "8%", size: 130, delay: "1.5s", dur: "11s" },
  { src: garlic, bottom: "22%", left: "9%", size: 95, delay: "3s", dur: "10s" },
  { src: tomato, bottom: "14%", right: "12%", size: 120, delay: "2s", dur: "12s" },
];

export const Hero = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-charcoal">
      {/* Cinematic image bg with Ken Burns */}
      <div className="absolute inset-0" style={{ transform: `translate3d(0, ${scroll * 0.3}px, 0)` }}>
        <img src={farmImg} alt="ખેડૂત તાજા શાકભાજી લણી રહ્યો છે" width={1920} height={1080} className="h-[115vh] w-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />
      </div>

      {/* Floating veggies */}
      {floats.map((f, i) => (
        <div
          key={i}
          className="absolute hidden md:block rounded-full overflow-hidden shadow-luxe border-2 border-gold/30 animate-float"
          style={{
            top: f.top, left: f.left, right: f.right, bottom: f.bottom,
            width: f.size, height: f.size,
            animationDelay: f.delay, animationDuration: f.dur,
          }}
        >
          <img src={f.src} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
      ))}

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-emerald/20 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative container min-h-screen flex flex-col justify-center items-center text-center pt-28 pb-24">
        <div className="inline-flex items-center gap-2.5 mb-10 px-5 py-2 rounded-full glass animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-ivory/90">Live · આજનો માલ ઉપલબ્ધ</span>
        </div>

        <h1 className="font-guj font-bold text-ivory leading-[1.05] animate-fade-up">
          <span className="block text-5xl sm:text-7xl lg:text-8xl">તાજા શાકભાજી</span>
          <span className="block text-3xl sm:text-5xl lg:text-6xl mt-3 italic text-gold-soft font-display">સીધા ખેડૂતો પાસેથી</span>
          <span className="block text-xl sm:text-3xl lg:text-4xl mt-4 font-guj-sans font-light text-ivory/80">હોલસેલ અને રિટેલ ભાવ</span>
        </h1>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a href={`tel:${PHONE}`} className="group inline-flex items-center justify-center gap-3 bg-gold text-charcoal px-8 py-5 rounded-full font-guj-sans font-semibold text-base hover:shadow-gold transition-all hover:-translate-y-1 animate-pulse-glow">
            <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            હમણાં કૉલ કરો
          </a>
          <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("નમસ્તે, મારે શાકભાજી મંગાવવા છે")}`} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-5 rounded-full font-guj-sans font-semibold text-base hover:shadow-lg transition-all hover:-translate-y-1">
            <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
            વોટ્સએપ પર ઓર્ડર
          </a>
        </div>

        {/* Trust mini-row */}
        <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-ivory/70 font-guj-sans text-sm animate-fade-up" style={{ animationDelay: "0.6s" }}>
          {["🚜 ખેડૂત પાસેથી", "⭐ તાજું માલ", "🏆 પ્રીમિયમ", "🚚 ઝડપી ડિલિવરી"].map((t) => (
            <span key={t} className="flex items-center gap-2">{t}</span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/60 flex flex-col items-center gap-2 animate-fade-in">
        <span className="font-guj-sans text-[11px]">નીચે જુઓ</span>
        <ChevronDown className="h-4 w-4 animate-bounce text-gold" />
      </div>
    </section>
  );
};
