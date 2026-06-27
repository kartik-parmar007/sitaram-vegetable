import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { WHATSAPP } from "@/data/products";
import { X, Minus, Plus, Trash2, ShoppingCart, MapPin, User, Phone, FileText } from "lucide-react";

export const CartDrawer = () => {
  const { items, removeItem, updateQty, clearCart, total, count, cartOpen, setCartOpen } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateName = (v: string) => {
    const t = v.trim();
    if (!t) return "નામ જરૂરી છે";
    if (t.length < 2) return "ઓછામાં ઓછા 2 અક્ષર";
    if (!/^[\u0A80-\u0BFFa-zA-Z\s]+$/.test(t)) return "ફક્ત અક્ષરો લખો";
    return "";
  };

  const validatePhone = (v: string) => {
    const d = v.replace(/\D/g, "");
    if (!d) return "મોબાઈલ નંબર જરૂરી છે";
    if (d.length !== 10) return "10 અંકનો નંબર લખો";
    if (!/^[6-9]/.test(d)) return "ભારતીય નંબર 6-9 થી શરૂ થાય";
    return "";
  };

  const validateAddress = (v: string) => v.trim() ? "" : "સરનામું જરૂરી છે";
  const validateCity = (v: string) => v.trim() ? "" : "શહેર/ગામ જરૂરી છે";
  const validatePincode = (v: string) => {
    const d = v.replace(/\D/g, "");
    if (!d) return "પિનકોડ જરૂરી છે";
    if (d.length !== 6) return "6 અંકનો પિનકોડ";
    return "";
  };

  const setField = (field: string, value: string, validator: (v: string) => string) => {
    const setters: Record<string, React.Dispatch<React.SetStateAction<string>>> = { name: setName, phone: setPhone, address: setAddress, city: setCity, pincode: setPincode };
    setters[field](value);
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validator(value) }));
    }
  };

  const blurField = (field: string, validator: (v: string) => string, value: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validator(value) }));
  };

  const runAllValidations = () => {
    const e = {
      name: validateName(name),
      phone: validatePhone(phone),
      address: validateAddress(address),
      city: validateCity(city),
      pincode: validatePincode(pincode),
    };
    setErrors(e);
    setTouched({ name: true, phone: true, address: true, city: true, pincode: true });
    return Object.values(e).every((v) => !v);
  };

  const buildWhatsAppMsg = () => {
    let msg = "🛒 *સીતારામ ઓર્ગેનિક — ઓર્ડર*\n\n";
    msg += "📋 *વસ્તુઓ:*\n";
    msg += "──────────────\n";
    items.forEach((item, i) => {
      const tier = item.product.prices[item.tierIndex];
      const lineTotal = tier.price * item.quantity;
      msg += `${i + 1}. *${item.product.name}* (${item.product.nameEn})\n`;
      msg += `   ${tier.qty} × ${item.quantity} = ₹${lineTotal.toLocaleString()}\n`;
      if (tier.note) msg += `   📌 ${tier.note}\n`;
      msg += "\n";
    });
    msg += "──────────────\n";
    msg += `💰 *કુલ રકમ: ₹${total.toLocaleString()}*\n\n`;
    msg += "📍 *ડિલિવરી વિગતો:*\n";
    msg += `👤 નામ: ${name}\n`;
    msg += `📞 મોબાઈલ: ${phone}\n`;
    msg += `🏠 સરનામું: ${address}\n`;
    msg += `🏙️ શહેર: ${city}\n`;
    msg += `📮 પિનકોડ: ${pincode}\n\n`;
    msg += "─ આભાર! 🙏";
    return encodeURIComponent(msg);
  };

  const handleCheckout = () => {
    if (!runAllValidations()) return;
    const url = `https://wa.me/${WHATSAPP}?text=${buildWhatsAppMsg()}`;
    window.open(url, "_blank");
    clearCart();
    setShowCheckout(false);
    setCartOpen(false);
    setName("");
    setPhone("");
    setAddress("");
    setCity("");
    setPincode("");
    setErrors({});
    setTouched({});
  };

  const isFormValid = !validateName(name) && !validatePhone(phone) && !validateAddress(address) && !validateCity(city) && !validatePincode(pincode);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-charcoal/70 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => { setCartOpen(false); setShowCheckout(false); }}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-card shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {!showCheckout ? (
          <>
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="h-5 w-5 text-gold" />
                <span className="font-display text-xl text-foreground">કાર્ટ</span>
                {count > 0 && (
                  <span className="bg-gold text-charcoal text-[10px] font-bold px-2 py-0.5 rounded-full">{count}</span>
                )}
              </div>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground p-1 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <ShoppingCart className="h-16 w-16 mb-4 opacity-30" />
                  <p className="font-guj-sans text-lg">કાર્ટ ખાલી છે</p>
                  <p className="font-guj-sans text-sm mt-1">શાકભાજી ઉમેરો!</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => {
                    const tier = item.product.prices[item.tierIndex];
                    const lineTotal = tier.price * item.quantity;
                    return (
                      <li key={`${item.product.id}-${item.tierIndex}`} className="flex gap-3 p-3 rounded-2xl bg-secondary/50 border border-border">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-guj font-semibold text-foreground">{item.product.name}</p>
                              <p className="text-[10px] text-muted-foreground font-guj-sans">{tier.qty}</p>
                            </div>
                            <button onClick={() => removeItem(item.product.id, item.tierIndex)} className="text-muted-foreground hover:text-destructive p-1 transition-colors flex-shrink-0">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5 bg-card rounded-full p-0.5 border border-border">
                              <button onClick={() => updateQty(item.product.id, item.tierIndex, item.quantity - 1)} className="w-6 h-6 rounded-full hover:bg-gold hover:text-charcoal flex items-center justify-center transition-colors">
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-xs font-medium">{item.quantity}</span>
                              <button onClick={() => updateQty(item.product.id, item.tierIndex, item.quantity + 1)} className="w-6 h-6 rounded-full hover:bg-gold hover:text-charcoal flex items-center justify-center transition-colors">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="font-display font-bold text-foreground">₹{lineTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-5 pb-6 pt-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-guj-sans text-muted-foreground">કુલ રકમ</span>
                  <span className="font-display text-2xl font-bold text-foreground">₹{total.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-[#25D366] text-white py-4 rounded-full font-guj-sans font-semibold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  🛒 ચેકઆઉટ — WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-muted-foreground hover:text-destructive py-2 font-guj-sans text-sm transition-colors"
                >
                  કાર્ટ ખાલી કરો
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <span className="font-display text-xl text-foreground">ડિલિવરી વિગતો</span>
              <button onClick={() => setShowCheckout(false)} className="text-muted-foreground hover:text-foreground p-1 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-guj-sans mb-1.5">
                  <User className="h-3 w-3 text-gold" /> પૂરું નામ
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setField("name", e.target.value, validateName)}
                  onBlur={() => blurField("name", validateName, name)}
                  placeholder="તમારું નામ"
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-card font-guj-sans text-foreground focus:outline-none transition-colors ${errors.name && touched.name ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"}`}
                />
                {errors.name && touched.name && <p className="text-destructive text-[11px] font-guj-sans mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-guj-sans mb-1.5">
                  <Phone className="h-3 w-3 text-gold" /> મોબાઈલ નંબર
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setField("phone", e.target.value.replace(/[^\d\s]/g, "").slice(0, 12), validatePhone)}
                  onBlur={() => blurField("phone", validatePhone, phone)}
                  placeholder="98765 43210"
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-card font-guj-sans text-foreground focus:outline-none transition-colors ${errors.phone && touched.phone ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"}`}
                />
                {errors.phone && touched.phone && <p className="text-destructive text-[11px] font-guj-sans mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-guj-sans mb-1.5">
                  <MapPin className="h-3 w-3 text-gold" /> સરનામું
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setField("address", e.target.value, validateAddress)}
                  onBlur={() => blurField("address", validateAddress, address)}
                  placeholder="ઘર નંબર, ગલી, વિસ્તાર..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-card font-guj-sans text-foreground focus:outline-none transition-colors resize-none ${errors.address && touched.address ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"}`}
                />
                {errors.address && touched.address && <p className="text-destructive text-[11px] font-guj-sans mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-guj-sans mb-1.5">
                    🏙️ શહેર / ગામ
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setField("city", e.target.value, validateCity)}
                    onBlur={() => blurField("city", validateCity, city)}
                    placeholder="ભાવનગર"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-card font-guj-sans text-foreground focus:outline-none transition-colors ${errors.city && touched.city ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"}`}
                  />
                  {errors.city && touched.city && <p className="text-destructive text-[11px] font-guj-sans mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-guj-sans mb-1.5">
                    📮 પિનકોડ
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setField("pincode", e.target.value.replace(/\D/g, "").slice(0, 6), validatePincode)}
                    onBlur={() => blurField("pincode", validatePincode, pincode)}
                    placeholder="364004"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-card font-guj-sans text-foreground focus:outline-none transition-colors ${errors.pincode && touched.pincode ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"}`}
                  />
                  {errors.pincode && touched.pincode && <p className="text-destructive text-[11px] font-guj-sans mt-1">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-guj-sans mb-1.5">
                  <FileText className="h-3 w-3 text-gold" /> ઓર્ડર સારાંશ
                </label>
                <div className="p-3 rounded-xl bg-secondary/50 border border-border space-y-1.5">
                  {items.map((item) => {
                    const tier = item.product.prices[item.tierIndex];
                    const lineTotal = tier.price * item.quantity;
                    return (
                      <div key={`${item.product.id}-${item.tierIndex}`} className="flex justify-between font-guj-sans text-sm">
                        <span>{item.product.emoji} {item.product.name} × {item.quantity}</span>
                        <span className="font-display font-medium">₹{lineTotal.toLocaleString()}</span>
                      </div>
                    );
                  })}
                  <div className="hairline my-1" />
                  <div className="flex justify-between font-guj-sans font-semibold text-foreground">
                    <span>કુલ</span>
                    <span className="font-display text-lg">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-6 pt-4 border-t border-border space-y-2">
              <button
                onClick={handleCheckout}
                disabled={!isFormValid}
                className={`w-full py-4 rounded-full font-guj-sans font-semibold text-base flex items-center justify-center gap-2 transition-all ${
                  isFormValid
                    ? "bg-[#25D366] text-white hover:opacity-90"
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                }`}
              >
                📲 WhatsApp પર ઓર્ડર કરો
              </button>
              <button
                onClick={() => setShowCheckout(false)}
                className="w-full text-muted-foreground hover:text-foreground py-2 font-guj-sans text-sm transition-colors"
              >
                ← પાછા જાઓ
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};
