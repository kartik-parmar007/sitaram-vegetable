import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { resolveImage } from "@/lib/productImages";
import { products as fallback, type Product } from "@/data/products";

type Row = {
  id: string; name: string; name_en: string; emoji: string; image: string;
  badge: string; freshness: number; origin: string; harvested: string;
  variety: string; trend: string; prices: { qty: string; price: number; note?: string }[];
  position: number;
};

const toProduct = (r: Row): Product => ({
  id: r.id,
  name: r.name,
  nameEn: r.name_en,
  emoji: r.emoji,
  image: resolveImage(r.image),
  badge: r.badge,
  freshness: r.freshness,
  origin: r.origin,
  harvested: r.harvested,
  variety: r.variety,
  trend: (r.trend as Product["trend"]) || "stable",
  prices: r.prices ?? [],
});

export const useProducts = () => {
  const [data, setData] = useState<Product[]>(fallback);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data: rows, error } = await supabase
      .from("products")
      .select("*")
      .order("position", { ascending: true });
    if (!error && rows && rows.length) setData(rows.map((r) => toProduct(r as unknown as Row)));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { products: data, loading, reload: load };
};
