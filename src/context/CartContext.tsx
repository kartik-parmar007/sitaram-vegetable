import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  tierIndex: number;
  quantity: number;
};

type CartCtx = {
  items: CartItem[];
  addItem: (product: Product, tierIndex: number, quantity: number) => void;
  removeItem: (productId: string, tierIndex: number) => void;
  updateQty: (productId: string, tierIndex: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
};

const STORAGE_KEY = "sitaram-cart";

const loadCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

const CartContext = createContext<CartCtx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((product: Product, tierIndex: number, quantity: number) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.tierIndex === tierIndex);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        return updated;
      }
      return [...prev, { product, tierIndex, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string, tierIndex: number) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.tierIndex === tierIndex)));
  }, []);

  const updateQty = useCallback((productId: string, tierIndex: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId && i.tierIndex === tierIndex ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, i) => {
    const tier = i.product.prices[i.tierIndex];
    return sum + tier.price * i.quantity;
  }, 0);

  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
