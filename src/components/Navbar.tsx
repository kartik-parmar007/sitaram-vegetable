import { useEffect, useState } from "react";
import { Phone, MessageCircle, X, Menu } from "lucide-react";
import { PHONE, WHATSAPP } from "@/data/products";
import logoImg from "/logo.png";

const links = [
  { href: "#harvest", label: "શાકભાજી" },
  { href: "#rates", label: "ભાવ" },
  { href: "#why", label: "અમારા વિશે" },
  { href: "#contact", label: "સંપર્ક" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 glass-dark" : "py-5 bg-transparent"
        }`}
      >
        <nav className="container flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 text-ivory" onClick={closeMenu}>
            <img src={logoImg} alt="Sitaram Organic Logo" className="w-12 h-12 rounded-full object-cover shadow-gold" />
            <div className="leading-none">
              <div className="font-display text-2xl tracking-wide">Sitaram Organic</div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-gold-soft/80 mt-0.5">
                sitaramorganic.com
              </div>
            </div>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8 font-guj-sans text-sm text-ivory/85">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative hover:text-gold transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right buttons */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE}`}
              aria-label="કૉલ કરો"
              className="hidden sm:inline-flex items-center gap-2 glass text-ivory px-4 py-2.5 rounded-full text-sm hover:bg-ivory/15 transition-colors"
            >
              <Phone className="h-4 w-4 text-gold" />
              <span className="font-guj-sans">કૉલ</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-guj-sans hidden sm:inline">વોટ્સએપ</span>
            </a>

            {/* Mobile hamburger / 3-line menu button */}
            <button
              className="lg:hidden text-ivory p-2 rounded-full glass hover:bg-ivory/15 transition-colors"
              aria-label={menuOpen ? "મેનુ બંધ કરો" : "મેનુ ખોલો"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile slide-in drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-charcoal shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ivory/10">
          <div className="flex items-center gap-2.5">
            <img src={logoImg} alt="Sitaram Organic" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-display text-xl text-ivory">Sitaram Organic</span>
          </div>
          <button
            onClick={closeMenu}
            className="text-ivory/60 hover:text-ivory transition-colors p-1"
            aria-label="બંધ"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-ivory/80 hover:text-gold hover:bg-ivory/5 font-guj-sans text-lg transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom CTA buttons */}
        <div className="px-6 pb-8 space-y-3 border-t border-ivory/10 pt-6">
          <a
            href={`tel:${PHONE}`}
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full bg-gold text-charcoal py-3.5 rounded-full font-guj-sans font-semibold hover:shadow-gold transition-all"
          >
            <Phone className="h-4 w-4" />
            કૉલ કરો
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3.5 rounded-full font-guj-sans font-semibold hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="h-4 w-4" />
            વોટ્સએપ
          </a>
          <p className="text-center text-[10px] text-ivory/30 pt-1">sitaramorganic.com</p>
        </div>
      </aside>
    </>
  );
};
