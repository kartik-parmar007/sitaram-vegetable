import { Leaf, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { PHONE, WHATSAPP } from "@/data/products";

export const Footer = () => (
  <footer id="contact" className="relative bg-charcoal text-ivory pt-24 pb-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-emerald-glow opacity-40" />
    <div className="container relative">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center"><Leaf className="h-5 w-5 text-charcoal" /></div>
            <span className="font-display text-3xl">તાજાશાક</span>
          </div>
          <p className="font-guj-sans text-ivory/60 leading-relaxed text-sm">
            સીધા ખેડૂતો પાસેથી તાજા શાકભાજી — હોલસેલ અને રિટેલ ભાવે.
          </p>
        </div>

        <div>
          <h4 className="font-guj font-semibold text-gold mb-5">સંપર્ક</h4>
          <ul className="space-y-4 font-guj-sans text-sm text-ivory/75">
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 text-gold mt-0.5" /><span>એ.પી.એમ.સી. યાર્ડ, અમદાવાદ – 380015</span></li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /><a href={`tel:${PHONE}`}>+91 98765 43210</a></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /><span>info@tajashaak.example</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-guj font-semibold text-gold mb-5">હમણાં ઓર્ડર</h4>
          <div className="flex flex-col gap-3">
            <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 bg-gold text-charcoal px-5 py-3.5 rounded-full font-guj-sans font-semibold hover:shadow-gold transition-all">
              <Phone className="h-4 w-4" /> કૉલ કરો
            </a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3.5 rounded-full font-guj-sans font-semibold hover:opacity-90 transition-opacity">
              <MessageCircle className="h-4 w-4" /> વોટ્સએપ
            </a>
          </div>
        </div>
      </div>

      <div className="hairline mb-8" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
        <p className="font-guj-sans">© {new Date().getFullYear()} તાજાશાક. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Made by{" "}
          <a href="https://eaglebyte.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-soft transition-colors font-medium tracking-wide">
            Eagle Byte Technologies
          </a>
        </p>
      </div>
    </div>
  </footer>
);
