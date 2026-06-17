import { useEffect, useState } from "react";
import { Leaf, Phone, MessageCircle, Menu } from "lucide-react";
import { PHONE, WHATSAPP } from "@/data/products";

const links = [
  { href: "#harvest", label: "શાકભાજી" },
  { href: "#rates", label: "ભાવ" },
  { href: "#why", label: "અમારા વિશે" },
  { href: "#contact", label: "સંપર્ક" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3 glass-dark" : "py-5 bg-transparent"}`}>
      <nav className="container flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 text-ivory">
          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Leaf className="h-5 w-5 text-charcoal" strokeWidth={2} />
          </div>
          <div className="leading-none">
            <div className="font-display text-2xl tracking-wide">Sitaram Organic</div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-gold-soft/80 mt-0.5">sitaramorganic.com</div>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-8 font-guj-sans text-sm text-ivory/85">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative hover:text-gold transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all hover:after:w-full">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={`tel:${PHONE}`} aria-label="કૉલ કરો" className="hidden sm:inline-flex items-center gap-2 glass text-ivory px-4 py-2.5 rounded-full text-sm hover:bg-ivory/15 transition-colors">
            <Phone className="h-4 w-4 text-gold" /> <span className="font-guj-sans">કૉલ</span>
          </a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity shadow-lg">
            <MessageCircle className="h-4 w-4" /> <span className="font-guj-sans hidden sm:inline">વોટ્સએપ</span>
          </a>
          <button className="lg:hidden text-ivory p-2" aria-label="મેનુ"><Menu className="h-5 w-5" /></button>
        </div>
      </nav>
    </header>
  );
};
