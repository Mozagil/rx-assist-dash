import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import { Plus, SkipForward, Save, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";

interface Interview {
  id: string;
  date: string;
  hedef: string;
  sikayetler: string;
  ilaclar: string;
  vitaminler: string;
  dermokozmetik: string;
  majistral: string;
  aromaterapi: string;
  onerilen: string;
}

const fields = [
  { key: "hedef", label: "Hasta Anamnezi (Hedef)", required: true },
  { key: "sikayetler", label: "Şikayetler", required: true },
  { key: "ilaclar", label: "Kullandığı İlaçlar", required: true },
  { key: "vitaminler", label: "Kullandığı Vitaminler", required: true },
  { key: "dermokozmetik", label: "Kullandığı Dermokozmetikler", required: true },
  { key: "majistral", label: "Kullandığı Majistral Ürünleri", required: true },
  { key: "aromaterapi", label: "Kullandığı Aromaterapi Ürünleri", required: true },
  { key: "onerilen", label: "Önerilen Destek Ürünler", required: true },
];

export default function OnGorusme() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { name?: string } | null;
  const name = state?.name || "Danışan";

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  const handleSave = () => {
    const newErrors: Record<string, boolean> = {};
    let hasError = false;
    fields.forEach(f => {
      if (!form[f.key]?.trim()) {
        newErrors[f.key] = true;
        hasError = true;
      }
    });
    setErrors(newErrors);
    if (hasError) return;

    const interview: Interview = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("tr-TR"),
      ...form as any,
    };
    setInterviews(prev => [interview, ...prev]);
    setForm({});
    setShowForm(false);
  };

  const handleSkip = (key: string) => {
    setForm(prev => ({ ...prev, [key]: "-" }));
    setErrors(prev => ({ ...prev, [key]: false }));
  };

  return (
    <div>
      <BackButton />
      <PageHeader title={`Ön Görüşme — ${name}`} subtitle="Danışan ön görüşme kayıtları" />

      {!showForm && (
        <div className="mb-6 flex justify-end">
          <button onClick={() => setShowForm(true)} className="btn-medical-primary">
            <Plus className="h-4 w-4" /> Ön Görüşme Ekle
          </button>
        </div>
      )}

      {showForm && (
        <div className="medical-card p-6 mb-6 space-y-4">
          {fields.map(f => (
            <div key={f.key}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" />
                  {f.label}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setForm(prev => ({ ...prev, [f.key]: (prev[f.key] || "") }));
                      setErrors(prev => ({ ...prev, [f.key]: false }));
                    }}
                    className="text-xs text-[hsl(var(--primary))] hover:text-[hsl(var(--primary)/0.8)] flex items-center gap-1 transition-colors font-medium"
                  >
                    <Plus className="h-3 w-3" /> Ekle
                  </button>
                  <button
                    onClick={() => handleSkip(f.key)}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <SkipForward className="h-3 w-3" /> Geç
                  </button>
                </div>
              </div>
              <textarea
                value={form[f.key] || ""}
                onChange={e => {
                  setForm(prev => ({ ...prev, [f.key]: e.target.value }));
                  setErrors(prev => ({ ...prev, [f.key]: false }));
                }}
                className={`w-full rounded-lg border px-3 py-2 text-sm bg-background transition-colors focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] focus:border-[hsl(var(--primary))] outline-none ${
                  errors[f.key] ? "border-destructive" : "border-border"
                }`}
                rows={2}
                placeholder={`${f.label} giriniz...`}
              />
              {errors[f.key] && (
                <p className="text-xs text-destructive mt-1">Bu alan zorunludur</p>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => { setShowForm(false); setForm({}); setErrors({}); }} className="btn-medical-ghost">
              İptal
            </button>
            <button onClick={handleSave} className="btn-medical-primary">
              <Save className="h-4 w-4" /> Kaydet
            </button>
          </div>
        </div>
      )}

      {interviews.length === 0 && !showForm && (
        <div className="medical-card p-12 text-center text-muted-foreground">
          Henüz ön görüşme kaydı bulunmamaktadır.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interviews.map(i => (
          <button
            key={i.id}
            onClick={() => setSelectedInterview(i)}
            className="medical-card p-5 text-left hover:shadow-lg hover:scale-[1.01] transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground">{i.date}</span>
              <Eye className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(var(--primary))] transition-colors" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">Hedef: {i.hedef}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">Şikayetler: {i.sikayetler}</p>
          </button>
        ))}
      </div>

      {/* Structured detail modal for interview */}
      <Dialog open={!!selectedInterview} onOpenChange={() => setSelectedInterview(null)}>
        <DialogContent className="sm:max-w-lg border-none shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-lg bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))]" />
          <DialogHeader className="pt-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
                <FileText className="h-5 w-5 text-[hsl(var(--primary))]" />
              </div>
              <DialogTitle className="text-lg font-bold text-foreground font-[var(--font-display)]">
                Ön Görüşme — {selectedInterview?.date}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="mt-2 space-y-3">
            {selectedInterview && fields.map(f => (
              <div key={f.key} className="rounded-lg bg-[hsl(var(--primary)/0.04)] border border-[hsl(var(--primary)/0.1)] p-4">
                <h4 className="text-sm font-bold text-[hsl(var(--primary))] mb-1">{f.label}</h4>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {(selectedInterview as any)[f.key] || "-"}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
