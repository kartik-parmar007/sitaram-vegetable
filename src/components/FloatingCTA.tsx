import { Phone, MessageCircle } from "lucide-react";
import { PHONE, WHATSAPP } from "@/data/products";

export const FloatingCTA = () => (
  <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 md:hidden">
    <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-luxe flex items-center justify-center animate-pulse-glow">
      <MessageCircle className="h-6 w-6" />
    </a>
    <a href={`tel:${PHONE}`} aria-label="કૉલ" className="w-14 h-14 rounded-full bg-gold text-charcoal shadow-gold flex items-center justify-center">
      <Phone className="h-6 w-6" />
    </a>
  </div>
);
