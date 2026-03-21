import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import { Plus, Edit, Trash2, FlaskConical } from "lucide-react";
import DataTable from "@/components/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = "vitamin" | "homeopati" | "dermokozmetik" | "aromaterapi" | "bach" | "majistral";

interface Product {
  id: string;
  category: Category;
  urunAdi: string;
  miktar: string;
  kutuIcerigi: string;
  doz: string;
  tarih: string;
  fiyat: string;
  bitisTarihi: string;
  alindi: boolean | null;
  icerik?: string;
  mgMl?: string;
  formulHatirla?: boolean;
}

const categories: { key: Category; label: string; isFormul: boolean }[] = [
  { key: "vitamin", label: "Vitamin", isFormul: false },
  { key: "homeopati", label: "Homeopati", isFormul: false },
  { key: "dermokozmetik", label: "Dermokozmetik", isFormul: false },
  { key: "aromaterapi", label: "Aromaterapi", isFormul: true },
  { key: "bach", label: "Bach Çiçekleri", isFormul: true },
  { key: "majistral", label: "Majistral", isFormul: true },
];

// Mock formula data from Formüller page
const savedFormulas = {
  majistral: [
    { name: "Salisilik Asit Krem %2", ingredients: "Salisilik Asit, Vazelin, Lanolin" },
    { name: "Üre Krem %10", ingredients: "Üre, Gliserin, Parafin" },
  ],
  aromaterapi: [
    { name: "Lavanta Yağı Karışımı", ingredients: "Lavanta, Jojoba, Badem Yağı" },
    { name: "Nane-Okaliptüs Buhar", ingredients: "Nane Yağı, Okaliptüs, Çay Ağacı" },
  ],
  bach: [
    { name: "Rescue Remedy", ingredients: "Star of Bethlehem, Rock Rose, Impatiens, Cherry Plum, Clematis" },
  ],
};

const emptySupportForm = {
  urunAdi: "", miktar: "1", kutuIcerigi: "", doz: "1x1", tarih: new Date().toISOString().split("T")[0], fiyat: "",
  icerik: "", mgMl: "", formulHatirla: false, formulKaynak: "manual" as "manual" | "select",
};

export default function VerilenDestek() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { name?: string } | null;
  const name = state?.name || "Danışan";

  const [activeCategory, setActiveCategory] = useState<Category>("vitamin");
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"manual" | "select">("manual");
  const [form, setForm] = useState(emptySupportForm);

  const currentCat = categories.find(c => c.key === activeCategory)!;

  const handleAdd = () => {
    const product: Product = {
      id: Date.now().toString(),
      category: activeCategory,
      urunAdi: form.urunAdi,
      miktar: form.miktar,
      kutuIcerigi: form.kutuIcerigi,
      doz: form.doz,
      tarih: new Date(form.tarih).toLocaleDateString("tr-TR"),
      fiyat: form.fiyat,
      bitisTarihi: "",
      alindi: null,
      icerik: form.icerik,
      mgMl: form.mgMl,
      formulHatirla: form.formulHatirla,
    };
    setProducts(prev => [...prev, product]);
    setForm(emptySupportForm);
    setShowForm(false);
  };

  const toggleAlindi = (productId: string, value: boolean) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, alindi: value } : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleFormulaSelect = (formulaName: string) => {
    const formulas = savedFormulas[activeCategory as keyof typeof savedFormulas] || [];
    const found = formulas.find(f => f.name === formulaName);
    if (found) {
      setForm(prev => ({ ...prev, urunAdi: found.name, icerik: found.ingredients }));
    }
  };

  const categoryProducts = products.filter(p => p.category === activeCategory);
  const alinanlar = categoryProducts.filter(p => p.alindi === true);
  const alinmayanlar = categoryProducts.filter(p => p.alindi === false);
  const bekleyenler = categoryProducts.filter(p => p.alindi === null);

  const productColumns = [
    { key: "urunAdi", label: "ÜRÜNÜN ADI" },
    { key: "miktar", label: "MİKTAR (KUTU SAYISI)" },
    { key: "kutuIcerigi", label: "ADET (KUTU İÇERİĞİ)" },
    { key: "doz", label: "DOZ" },
    { key: "tarih", label: "VERİLDİĞİ TARİH" },
    { key: "fiyat", label: "FİYAT (₺)" },
    {
      key: "alindi_status",
      label: "DURUM",
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 text-xs cursor-pointer">
            <input type="radio" name={`alindi-${row.id}`} checked={row.alindi === true} onChange={() => toggleAlindi(row.id, true)} className="accent-[hsl(var(--medical-green))]" />
            Alındı
          </label>
          <label className="flex items-center gap-1 text-xs cursor-pointer">
            <input type="radio" name={`alindi-${row.id}`} checked={row.alindi === false} onChange={() => toggleAlindi(row.id, false)} className="accent-[hsl(var(--medical-red))]" />
            Alınmadı
          </label>
        </div>
      ),
    },
    {
      key: "actions",
      label: "İŞLEMLER",
      render: (_: any, row: any) => (
        <div className="flex items-center gap-1">
          <button className="icon-btn"><Edit className="h-4 w-4" /></button>
          <button className="icon-btn text-destructive" onClick={() => deleteProduct(row.id)}><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  const statusColumns = [
    { key: "urunAdi", label: "ÜRÜNÜN ADI" },
    { key: "miktar", label: "MİKTAR" },
    { key: "doz", label: "DOZ" },
    { key: "tarih", label: "TARİH" },
    { key: "fiyat", label: "FİYAT (₺)" },
    {
      key: "actions",
      label: "İŞLEMLER",
      render: (_: any, row: any) => (
        <div className="flex items-center gap-1">
          <button className="icon-btn"><Edit className="h-4 w-4" /></button>
          <button className="icon-btn text-destructive" onClick={() => deleteProduct(row.id)}><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  const availableFormulas = savedFormulas[activeCategory as keyof typeof savedFormulas] || [];

  return (
    <div>
      <BackButton />
      <PageHeader title={`Verilen Destek — ${name}`} subtitle="Danışana verilen desteklerin durumlarını takip edin." />

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => { setActiveCategory(cat.key); setShowForm(false); setFormMode("manual"); }}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeCategory === cat.key
                ? "bg-[hsl(var(--secondary))] text-secondary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-bold text-foreground mb-4 text-center">{currentCat.label}</h2>

      {!showForm ? (
        <div className="flex justify-end gap-2 mb-4">
          {currentCat.isFormul && (
            <>
              <button onClick={() => { setShowForm(true); setFormMode("manual"); }} className="btn-medical-primary">
                <Plus className="h-4 w-4" /> Formül Ekle
              </button>
              <button onClick={() => { setShowForm(true); setFormMode("select"); }} className="btn-medical-secondary">
                <FlaskConical className="h-4 w-4" /> Formüllerden Seç
              </button>
            </>
          )}
          {!currentCat.isFormul && (
            <button onClick={() => { setShowForm(true); setFormMode("manual"); }} className="btn-medical-primary">
              <Plus className="h-4 w-4" /> Ürün Ekle
            </button>
          )}
        </div>
      ) : (
        <div className="medical-card p-6 mb-6">
          {/* Formula dropdown when selecting from saved formulas */}
          {formMode === "select" && currentCat.isFormul && (
            <div className="mb-4">
              <label className="text-xs font-semibold text-foreground mb-1 block">Kayıtlı Formüllerden Seçin</label>
              {availableFormulas.length > 0 ? (
                <Select onValueChange={handleFormulaSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Formül seçiniz..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFormulas.map((f, idx) => (
                      <SelectItem key={idx} value={f.name}>
                        {f.name} — {f.ingredients}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground">Bu kategoride kayıtlı formül bulunmamaktadır.</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentCat.isFormul && (
              <>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-foreground mb-1 block">İçerik</label>
                  <textarea value={form.icerik} onChange={e => setForm(p => ({ ...p, icerik: e.target.value }))}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] outline-none" rows={2} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">mg/ml</label>
                  <input value={form.mgMl} onChange={e => setForm(p => ({ ...p, mgMl: e.target.value }))}
                    className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] outline-none" />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.formulHatirla} onChange={e => setForm(p => ({ ...p, formulHatirla: e.target.checked }))}
                      className="accent-[hsl(var(--primary))] w-4 h-4" />
                    Formülü Hatırla
                  </label>
                </div>
              </>
            )}
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Ürünün Adı</label>
              <input value={form.urunAdi} onChange={e => setForm(p => ({ ...p, urunAdi: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] outline-none" placeholder="Ürün adı" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Miktar (Kutu)</label>
              <input type="number" value={form.miktar} onChange={e => setForm(p => ({ ...p, miktar: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] outline-none" min="1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Kutu İçeriği</label>
              <div className="flex gap-2">
                <input value={form.kutuIcerigi} onChange={e => setForm(p => ({ ...p, kutuIcerigi: e.target.value }))}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] outline-none" placeholder="Miktar" />
                <select className="rounded-lg border border-border px-2 py-2 text-sm bg-background">
                  <option>ADET</option><option>ML</option><option>GR</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Doz</label>
              <input value={form.doz} onChange={e => setForm(p => ({ ...p, doz: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] outline-none" placeholder="1x1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Verildiği Tarih</label>
              <input type="date" value={form.tarih} onChange={e => setForm(p => ({ ...p, tarih: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Fiyat (₺)</label>
              <input value={form.fiyat} onChange={e => setForm(p => ({ ...p, fiyat: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] outline-none" placeholder="0 veya 0,50" />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => { setShowForm(false); setForm(emptySupportForm); }} className="btn-medical-ghost">İptal</button>
            <button onClick={handleAdd} className="btn-medical-primary"><Plus className="h-4 w-4" /> Ekle</button>
          </div>
        </div>
      )}

      {/* Bekleyenler */}
      {bekleyenler.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" /> Bekleyenler
          </h3>
          <DataTable columns={productColumns} data={bekleyenler} searchPlaceholder="Ürün ara..." />
        </div>
      )}

      {/* Alınanlar - always visible */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--medical-green))]" /> Alınanlar
        </h3>
        {alinanlar.length > 0 ? (
          <DataTable columns={statusColumns} data={alinanlar} searchPlaceholder="Ürün ara..."
            rowClassName={() => "row-status-green"} />
        ) : (
          <div className="medical-card p-6 text-center text-muted-foreground text-sm">Henüz alınan ürün bulunmamaktadır.</div>
        )}
      </div>

      {/* Alınmayanlar - always visible */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--medical-red))]" /> Alınmayanlar
        </h3>
        {alinmayanlar.length > 0 ? (
          <DataTable columns={statusColumns} data={alinmayanlar} searchPlaceholder="Ürün ara..."
            rowClassName={() => "row-status-red"} />
        ) : (
          <div className="medical-card p-6 text-center text-muted-foreground text-sm">Henüz alınmayan ürün bulunmamaktadır.</div>
        )}
      </div>

      {categoryProducts.length === 0 && !showForm && (
        <div className="medical-card p-12 text-center text-muted-foreground">
          Bu kategoride henüz ürün eklenmemiştir.
        </div>
      )}
    </div>
  );
}
