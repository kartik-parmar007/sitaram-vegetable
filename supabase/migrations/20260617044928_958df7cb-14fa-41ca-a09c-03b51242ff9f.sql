
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '🥬',
  image TEXT NOT NULL,
  badge TEXT NOT NULL DEFAULT '',
  freshness INTEGER NOT NULL DEFAULT 95,
  origin TEXT NOT NULL DEFAULT '',
  harvested TEXT NOT NULL DEFAULT '',
  variety TEXT NOT NULL DEFAULT '',
  trend TEXT NOT NULL DEFAULT 'stable',
  prices JSONB NOT NULL DEFAULT '[]'::jsonb,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public can insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update products" ON public.products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public can delete products" ON public.products FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_products_position ON public.products(position);
