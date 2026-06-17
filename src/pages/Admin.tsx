import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { IMAGE_KEYS, resolveImage } from "@/lib/productImages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Lock, LogOut, Plus, Trash2, Save, ArrowUp, ArrowDown, Leaf, Upload, Loader2 } from "lucide-react";

const ADMIN_EMAIL = "Bluegamer1137@gmail.com";
const ADMIN_PASS = "ffmax@@1137";
const SESSION_KEY = "verde_admin_session";

type Tier = { qty: string; price: number; note?: string };
type Row = {
  id: string;
  name: string;
  name_en: string;
  emoji: string;
  image: string;
  badge: string;
  freshness: number;
  origin: string;
  harvested: string;
  variety: string;
  trend: string;
  prices: Tier[];
  position: number;
};

const empty = (): Row => ({
  id: "", name: "", name_en: "", emoji: "🥬", image: IMAGE_KEYS[0] ?? "potato",
  badge: "", freshness: 95, origin: "", harvested: "", variety: "", trend: "stable",
  prices: [{ qty: "1 કિ.ગ્રા", price: 0 }], position: 99,
});

const Login = ({ onAuth }: { onAuth: () => void }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && pass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onAuth();
    } else {
      setErr("ખોટું ઈમેલ અથવા પાસવર્ડ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-charcoal via-forest to-charcoal p-6">
      <Card className="w-full max-w-md p-8 bg-card/95 backdrop-blur shadow-luxe border-gold/20">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold mb-3">
            <Lock className="h-6 w-6 text-charcoal" />
          </div>
          <h1 className="font-display text-3xl">Admin Access</h1>
          <p className="font-guj-sans text-sm text-muted-foreground mt-1">તાજાશાક • Admin Panel</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required className="mt-1" />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</label>
            <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required className="mt-1" />
          </div>
          {err && <div className="text-sm text-destructive font-guj-sans">{err}</div>}
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Sign In</Button>
        </form>
      </Card>
    </div>
  );
};

const ProductEditor = ({ row, onChange, onSave, onDelete, onMove, isFirst, isLast }: {
  row: Row;
  onChange: (r: Row) => void;
  onSave: () => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const update = <K extends keyof Row>(k: K, v: Row[K]) => onChange({ ...row, [k]: v });
  const updatePrice = (i: number, patch: Partial<Tier>) => {
    const prices = row.prices.map((p, idx) => (idx === i ? { ...p, ...patch } : p));
    update("prices", prices);
  };
  const addPrice = () => update("prices", [...row.prices, { qty: "1 કિ.ગ્રા", price: 0 }]);
  const removePrice = (i: number) => update("prices", row.prices.filter((_, idx) => idx !== i));

  // Parse qty string like "5 કિ.ગ્રા" → { amount: "5", unit: "કિ.ગ્રા" }
  const UNITS = ["કિ.ગ્રા", "ગ્રામ", "નંગ", "ડઝન"] as const;
  type Unit = typeof UNITS[number];
  const parseQty = (qty: string): { amount: string; unit: Unit } => {
    for (const u of UNITS) {
      if (qty.endsWith(u)) return { amount: qty.slice(0, -u.length).trim(), unit: u };
    }
    return { amount: qty, unit: "કિ.ગ્રા" };
  };
  const composeQty = (amount: string, unit: string) => `${amount} ${unit}`;
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${row.id || "new"}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("product-images").upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { data, error: urlErr } = await supabase.storage.from("product-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (urlErr || !data) throw urlErr ?? new Error("URL failed");
      update("image", data.signedUrl);
      toast.success("ઈમેજ અપલોડ થયું");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-5 space-y-4 border-border/70">
      <div className="flex gap-4 items-start">
        <div className="relative group">
          <img src={resolveImage(row.image)} alt={row.name} className="w-24 h-24 rounded-xl object-cover shadow" />
          <label className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-xs font-medium">
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Upload className="h-4 w-4 mr-1" /> Change</>}
            <input type="file" accept="image/*" className="hidden" disabled={uploading}
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
          </label>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Gujarati Name</label>
            <Input value={row.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">English Name</label>
            <Input value={row.name_en} onChange={(e) => update("name_en", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Emoji</label>
            <Input value={row.emoji} onChange={(e) => update("emoji", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Image (URL or preset)</label>
            <div className="flex gap-2">
              <Input value={row.image} onChange={(e) => update("image", e.target.value)} placeholder="paste URL or preset key" />
              <select className="h-10 rounded-md border border-input bg-background px-2 text-sm" value="" onChange={(e) => e.target.value && update("image", e.target.value)}>
                <option value="">Preset…</option>
                {IMAGE_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Badge</label>
            <Input value={row.badge} onChange={(e) => update("badge", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Variety</label>
            <Input value={row.variety} onChange={(e) => update("variety", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Origin</label>
            <Input value={row.origin} onChange={(e) => update("origin", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Harvested</label>
            <Input value={row.harvested} onChange={(e) => update("harvested", e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Freshness %</label>
            <Input type="number" value={row.freshness} onChange={(e) => update("freshness", Number(e.target.value))} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Trend</label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={row.trend} onChange={(e) => update("trend", e.target.value)}>
              <option value="up">up</option>
              <option value="down">down</option>
              <option value="stable">stable</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">Sub-prices (કિંમતો)</h4>
          <Button type="button" size="sm" variant="outline" onClick={addPrice}><Plus className="h-3 w-3" /> Add tier</Button>
        </div>
        <div className="space-y-2">
          {row.prices.map((p, i) => {
            const { amount, unit } = parseQty(p.qty);
            return (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                {/* Amount number */}
                <Input
                  className="col-span-2"
                  type="number"
                  min={0}
                  placeholder="જથ્થો"
                  value={amount}
                  onChange={(e) => updatePrice(i, { qty: composeQty(e.target.value, unit) })}
                />
                {/* Unit dropdown */}
                <select
                  className="col-span-2 h-10 rounded-md border border-input bg-background px-2 text-sm font-guj-sans"
                  value={unit}
                  onChange={(e) => updatePrice(i, { qty: composeQty(amount, e.target.value) })}
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
                {/* Price */}
                <Input
                  className="col-span-3"
                  type="number"
                  placeholder="ભાવ ₹"
                  value={p.price}
                  onChange={(e) => updatePrice(i, { price: Number(e.target.value) })}
                />
                {/* Note */}
                <Input
                  className="col-span-4"
                  placeholder="નોંધ (optional)"
                  value={p.note ?? ""}
                  onChange={(e) => updatePrice(i, { note: e.target.value })}
                />
                {/* Delete */}
                <Button type="button" size="icon" variant="ghost" onClick={() => removePrice(i)} className="col-span-1 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-mono text-xs">#{row.position}</span>
          <Button type="button" size="icon" variant="outline" disabled={isFirst} onClick={() => onMove(-1)}><ArrowUp className="h-4 w-4" /></Button>
          <Button type="button" size="icon" variant="outline" disabled={isLast} onClick={() => onMove(1)}><ArrowDown className="h-4 w-4" /></Button>
          <span className="ml-2 font-mono text-xs opacity-60">id: {row.id || "(new)"}</span>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="destructive" size="sm" onClick={onDelete}><Trash2 className="h-4 w-4" /> Delete</Button>
          <Button type="button" size="sm" onClick={onSave}><Save className="h-4 w-4" /> Save</Button>
        </div>
      </div>
    </Card>
  );
};

const AdminPanel = ({ onLogout }: { onLogout: () => void }) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRow, setNewRow] = useState<Row>(empty());

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("position", { ascending: true });
    if (error) { toast.error(error.message); } else { setRows((data ?? []) as unknown as Row[]); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveRow = async (r: Row) => {
    if (!r.id) { toast.error("ID જરૂરી છે"); return; }
    const { error } = await supabase.from("products").upsert({
      id: r.id, name: r.name, name_en: r.name_en, emoji: r.emoji, image: r.image,
      badge: r.badge, freshness: r.freshness, origin: r.origin, harvested: r.harvested,
      variety: r.variety, trend: r.trend, prices: r.prices as unknown as never, position: r.position,
    });
    if (error) toast.error(error.message); else { toast.success("સેવ થયું"); load(); }
  };

  const deleteRow = async (id: string) => {
    if (!confirm("ડિલીટ કરવું છે?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("ડિલીટ થયું"); load(); }
  };

  const move = async (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const a = rows[i]; const b = rows[j];
    await supabase.from("products").update({ position: b.position }).eq("id", a.id);
    await supabase.from("products").update({ position: a.position }).eq("id", b.id);
    load();
  };

  const createNew = async () => {
    if (!newRow.id || !newRow.name) { toast.error("ID અને નામ જરૂરી છે"); return; }
    const maxPos = rows.reduce((m, r) => Math.max(m, r.position), 0);
    const r = { ...newRow, position: maxPos + 1 };
    const { error } = await supabase.from("products").insert(r as unknown as never);
    if (error) toast.error(error.message); else { toast.success("ઉમેરાયું"); setNewRow(empty()); load(); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-secondary/40">
      <header className="sticky top-0 z-30 bg-charcoal text-ivory border-b border-gold/20">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center"><Leaf className="h-4 w-4 text-charcoal" /></div>
            <div>
              <div className="font-display text-xl">તાજાશાક Admin</div>
              <div className="text-[10px] uppercase tracking-widest text-gold-soft/80">Product Management</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="text-sm text-ivory/80 hover:text-gold transition-colors">View Site →</a>
            <Button variant="outline" size="sm" onClick={onLogout} className="bg-transparent border-ivory/30 text-ivory hover:bg-ivory/10"><LogOut className="h-4 w-4" /> Logout</Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        <Card className="p-5 border-dashed border-2 border-primary/30 bg-primary/5">
          <h3 className="font-display text-2xl mb-4 flex items-center gap-2"><Plus className="h-5 w-5" /> Add New Vegetable</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <Input placeholder="ID (e.g. spinach)" value={newRow.id} onChange={(e) => setNewRow({ ...newRow, id: e.target.value })} />
            <Input placeholder="Gujarati name" value={newRow.name} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} />
            <Input placeholder="English name" value={newRow.name_en} onChange={(e) => setNewRow({ ...newRow, name_en: e.target.value })} />
            <Input placeholder="Emoji 🥬" value={newRow.emoji} onChange={(e) => setNewRow({ ...newRow, emoji: e.target.value })} />
          </div>
          <Button onClick={createNew}><Plus className="h-4 w-4" /> Create</Button>
        </Card>

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading...</div>
        ) : (
          <div className="space-y-4">
            {rows.map((r, i) => (
              <ProductEditor
                key={r.id}
                row={r}
                onChange={(nr) => setRows(rows.map((x) => (x.id === r.id ? nr : x)))}
                onSave={() => saveRow(rows.find((x) => x.id === r.id)!)}
                onDelete={() => deleteRow(r.id)}
                onMove={(dir) => move(i, dir)}
                isFirst={i === 0}
                isLast={i === rows.length - 1}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const Admin = () => {
  const [authed, setAuthed] = useState<boolean>(() => sessionStorage.getItem(SESSION_KEY) === "1");
  if (!authed) return <Login onAuth={() => setAuthed(true)} />;
  return <AdminPanel onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }} />;
};

export default Admin;
