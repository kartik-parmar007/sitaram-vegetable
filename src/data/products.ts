import potato from "@/assets/potato.jpg";
import onion from "@/assets/onion.jpg";
import garlic from "@/assets/garlic.jpg";
import tomato from "@/assets/tomato.jpg";
import carrot from "@/assets/carrot.jpg";
import broccoli from "@/assets/broccoli.jpg";
import capsicum from "@/assets/capsicum.jpg";

export type Product = {
  id: string;
  name: string;          // Gujarati name
  nameEn: string;
  emoji: string;
  image: string;
  badge: string;         // Gujarati
  freshness: number;
  origin: string;        // Gujarati
  harvested: string;     // Gujarati
  variety: string;       // Gujarati
  trend: "up" | "down" | "stable";
  prices: { qty: string; price: number; note?: string }[];
};

export const products: Product[] = [
  {
    id: "potato", nameEn: "Potato", name: "બટાકા", emoji: "🥔", image: potato,
    badge: "પ્રીમિયમ", freshness: 98, origin: "ડીસા, ગુજરાત",
    harvested: "આજે સવારે", variety: "કુફરી ચંદ્રમુખી", trend: "stable",
    prices: [
      { qty: "1 કિ.ગ્રા", price: 45 },
      { qty: "5 કિ.ગ્રા", price: 210, note: "બચત ₹15" },
      { qty: "10 કિ.ગ્રા", price: 400, note: "બચત ₹50" },
      { qty: "50 કિ.ગ્રા", price: 1850, note: "હોલસેલ" },
      { qty: "100 કિ.ગ્રા", price: 3500, note: "બેસ્ટ ભાવ" },
    ],
  },
  {
    id: "onion", nameEn: "Onion", name: "ડુંગળી", emoji: "🧅", image: onion,
    badge: "તાજું", freshness: 96, origin: "મહુવા, ભાવનગર",
    harvested: "કાલે", variety: "લાલ ડુંગળી", trend: "up",
    prices: [
      { qty: "1 કિ.ગ્રા", price: 38 },
      { qty: "5 કિ.ગ્રા", price: 175, note: "બચત ₹15" },
      { qty: "10 કિ.ગ્રા", price: 330, note: "બચત ₹50" },
      { qty: "50 કિ.ગ્રા", price: 1550, note: "હોલસેલ" },
      { qty: "100 કિ.ગ્રા", price: 2900, note: "બેસ્ટ ભાવ" },
    ],
  },
  {
    id: "garlic", nameEn: "Garlic", name: "લસણ", emoji: "🧄", image: garlic,
    badge: "હેન્ડ ગ્રેડેડ", freshness: 99, origin: "જામનગર",
    harvested: "2 દિવસ", variety: "મોટી કળી", trend: "stable",
    prices: [
      { qty: "1 કિ.ગ્રા", price: 220 },
      { qty: "5 કિ.ગ્રા", price: 1050, note: "બચત ₹50" },
      { qty: "10 કિ.ગ્રા", price: 2000, note: "બચત ₹200" },
      { qty: "50 કિ.ગ્રા", price: 9500, note: "હોલસેલ" },
      { qty: "100 કિ.ગ્રા", price: 18000, note: "બેસ્ટ ભાવ" },
    ],
  },
  {
    id: "tomato", nameEn: "Tomato", name: "ટમેટા", emoji: "🍅", image: tomato,
    badge: "વેલ-પાકું", freshness: 97, origin: "આણંદ",
    harvested: "આજે", variety: "દેશી રોમા", trend: "down",
    prices: [
      { qty: "1 કિ.ગ્રા", price: 60 },
      { qty: "5 કિ.ગ્રા", price: 285, note: "બચત ₹15" },
      { qty: "10 કિ.ગ્રા", price: 540, note: "બચત ₹60" },
      { qty: "50 કિ.ગ્રા", price: 2500, note: "હોલસેલ" },
      { qty: "100 કિ.ગ્રા", price: 4750, note: "બેસ્ટ ભાવ" },
    ],
  },
  {
    id: "carrot", nameEn: "Carrot", name: "ગાજર", emoji: "🥕", image: carrot,
    badge: "કોલ્ડ ચેઈન", freshness: 95, origin: "વડોદરા",
    harvested: "આજે", variety: "નાન્તેસ", trend: "stable",
    prices: [
      { qty: "1 કિ.ગ્રા", price: 70 },
      { qty: "5 કિ.ગ્રા", price: 330, note: "બચત ₹20" },
      { qty: "10 કિ.ગ્રા", price: 620, note: "બચત ₹80" },
      { qty: "50 કિ.ગ્રા", price: 2900, note: "હોલસેલ" },
      { qty: "100 કિ.ગ્રા", price: 5500, note: "બેસ્ટ ભાવ" },
    ],
  },
  {
    id: "broccoli", nameEn: "Broccoli", name: "બ્રોકોલી", emoji: "🥦", image: broccoli,
    badge: "શેફ ચોઈસ", freshness: 96, origin: "મહેસાણા",
    harvested: "આજે", variety: "મેરેથોન", trend: "up",
    prices: [
      { qty: "1 કિ.ગ્રા", price: 180 },
      { qty: "5 કિ.ગ્રા", price: 860, note: "બચત ₹40" },
      { qty: "10 કિ.ગ્રા", price: 1650, note: "બચત ₹150" },
      { qty: "50 કિ.ગ્રા", price: 7800, note: "હોલસેલ" },
      { qty: "100 કિ.ગ્રા", price: 15000, note: "બેસ્ટ ભાવ" },
    ],
  },
  {
    id: "capsicum", nameEn: "Capsicum", name: "કેપ્સિકમ", emoji: "🫑", image: capsicum,
    badge: "ગ્રીનહાઉસ", freshness: 97, origin: "સુરત",
    harvested: "આજે", variety: "ઈન્દ્રા", trend: "stable",
    prices: [
      { qty: "1 કિ.ગ્રા", price: 95 },
      { qty: "5 કિ.ગ્રા", price: 450, note: "બચત ₹25" },
      { qty: "10 કિ.ગ્રા", price: 850, note: "બચત ₹100" },
      { qty: "50 કિ.ગ્રા", price: 4000, note: "હોલસેલ" },
      { qty: "100 કિ.ગ્રા", price: 7500, note: "બેસ્ટ ભાવ" },
    ],
  },
];

export const PHONE = "+919876543210";
export const WHATSAPP = "919876543210";
