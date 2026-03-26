import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import { Plus, Save, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";

/* ---------- Types ---------- */
interface Interview {
  id: string;
  date: string;
  ciltTipi: string;
  ciltDurumu: string[];
  ciltHassasiyet: string[];
  sacDerisiTipi: string;
  sacDerisiRahatsizlik: string[];
}

/* ---------- Category data ---------- */
const ciltTipiOptions = [
  { value: "Normal", desc: "Dengeli, gözenekleri kapalı, ne yağlı ne kuru." },
  { value: "Yağlı", desc: "Parlama yapan, gözenekleri açık, siyah nokta oluşumuna meyilli." },
  { value: "Kuru", desc: "Mat, gergin, yağ salgısı yetersiz, ince çizgilenmeye meyilli." },
  { value: "Karma", desc: "Alın, burun ve çene (T bölgesi) yağlı; yanaklar normal veya kuru." },
];

const ciltDurumuOptions = [
  { value: "Nemsizlik (Dehidrasyon)", desc: "Cildin tipinden bağımsız olarak \"su\" kaybetmesi. (Yağlı ciltler de nemsiz kalabilir)." },
  { value: "Leke", desc: "Güneş, sivilce sonrası izler veya hormonal (melazma) lekeler." },
  { value: "Yaşlanma Belirtileri", desc: "Elastikiyet kaybı, sarkma veya yerleşik kırışıklıklar." },
  { value: "Matlık ve Işıltı Kaybı", desc: "Yorgun, grileşmiş, enerjisiz görünüm." },
  { value: "Genişlemiş Gözenek", desc: "Cilt yüzeyindeki doku bozukluğu." },
];

const ciltHassasiyetOptions = [
  { value: "Hassasiyet / Reaktivite", desc: "Yanma, batma, kaşıntı ve dış etkenlere aşırı tepki." },
  { value: "Akne", desc: "Aktif sivilceler." },
  { value: "Komedon", desc: "Deri altı pütürleri." },
  { value: "Roza (Gül Hastalığı)", desc: "Burun ve yanaklarda kalıcı kızarıklık, kılcal damar belirginliği." },
  { value: "Dermatit / Egzama", desc: "Bölgesel aşırı kuruluk, kaşıntılı plaklar veya pullanma." },
  { value: "Seboroik Dermatit", desc: "Özellikle burun kenarları ve saç çizgisinde yağlı pullanma." },
];

const sacDerisiTipiOptions = [
  { value: "Yağlı Saç Derisi", desc: "Saçlarım yıkandıktan bir gün (veya daha kısa süre) sonra ağırlaşıyor ve parlıyor. Hacimsiz görünüyor." },
  { value: "Kuru Saç Derisi", desc: "Saç derimde gerginlik ve kaşıntı var. Nadiren de olsa küçük, toz gibi beyaz döküntüler (kuru kepek) görüyorum." },
  { value: "Normal Saç Derisi", desc: "Yağlanma ve kuruluk dengeli. Saçlarımı 2-3 günde bir yıkamam yeterli oluyor." },
  { value: "Karma Saç Derisi", desc: "Saç diplerim çabuk yağlanıyor ama saç uçlarım aşırı kuru ve sert." },
];

const sacDerisiRahatsizlikOptions = [
  { value: "Yağlı Kepek (Sebore)", desc: "Saç derisine yapışan, sarımsı ve iri pullanmalar." },
  { value: "Hassasiyet ve Kaşıntı", desc: "Saç derisinde kızarıklık, dokunulduğunda acı veya sürekli kaşınma hissi." },
  { value: "Saç Dökülmesi", desc: "Günlük normal sınırın üzerinde dökülme (Bölgesel veya genel seyrelme)." },
  { value: "Seboroik Dermatit / Sedef", desc: "Tanısı konulmuş, tekrarlayan plaklar veya aşırı pullanma sorunu." },
];

/* ---------- Reusable Components ---------- */
function RadioGroup({ title, subtitle, options, value, onChange }: {
  title: string; subtitle?: string; options: { value: string; desc: string }[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="medical-card p-5 space-y-3">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground italic">{subtitle}</p>}
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
            value === opt.value ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.06)]" : "border-border hover:bg-accent/50"
          }`}>
            <input
              type="radio"
              name={title}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="mt-0.5 accent-[hsl(var(--primary))]"
            />
            <div>
              <span className="text-sm font-semibold text-foreground">{opt.value}</span>
              <span className="text-xs text-muted-foreground block mt-0.5">{opt.desc}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function CheckboxGroup({ title, subtitle, options, values, onChange }: {
  title: string; subtitle?: string; options: { value: string; desc: string }[];
  values: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) => {
    onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  };
  return (
    <div className="medical-card p-5 space-y-3">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground italic">{subtitle}</p>}
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
            values.includes(opt.value) ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.06)]" : "border-border hover:bg-accent/50"
          }`}>
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="mt-0.5 accent-[hsl(var(--primary))]"
            />
            <div>
              <span className="text-sm font-semibold text-foreground">{opt.value}</span>
              <span className="text-xs text-muted-foreground block mt-0.5">{opt.desc}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function OnGorusme() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { name?: string } | null;
  const name = state?.name || "Danışan";

  const [showForm, setShowForm] = useState(false);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  // Form state
  const [ciltTipi, setCiltTipi] = useState("");
  const [ciltDurumu, setCiltDurumu] = useState<string[]>([]);
  const [ciltHassasiyet, setCiltHassasiyet] = useState<string[]>([]);
  const [sacDerisiTipi, setSacDerisiTipi] = useState("");
  const [sacDerisiRahatsizlik, setSacDerisiRahatsizlik] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const resetForm = () => {
    setCiltTipi(""); setCiltDurumu([]); setCiltHassasiyet([]);
    setSacDerisiTipi(""); setSacDerisiRahatsizlik([]); setErrors([]);
  };

  const handleSave = () => {
    const errs: string[] = [];
    if (!ciltTipi) errs.push("Temel Cilt Tipi seçiniz");
    if (ciltDurumu.length === 0) errs.push("Cilt Durumu seçiniz");
    if (!sacDerisiTipi) errs.push("Saç Derisi Tipi seçiniz");
    if (errs.length > 0) { setErrors(errs); return; }

    const interview: Interview = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("tr-TR"),
      ciltTipi, ciltDurumu, ciltHassasiyet, sacDerisiTipi, sacDerisiRahatsizlik,
    };
    setInterviews(prev => [interview, ...prev]);
    resetForm();
    setShowForm(false);
  };

  const categories = [
    { title: "Temel Cilt Tipi", items: (i: Interview) => [i.ciltTipi] },
    { title: "Cilt Durumu ve Endişeleri", items: (i: Interview) => i.ciltDurumu },
    { title: "Cilt Hassasiyeti ve Rahatsızlıklar", items: (i: Interview) => i.ciltHassasiyet },
    { title: "Saç Derisi Tipi", items: (i: Interview) => [i.sacDerisiTipi] },
    { title: "Saç Derisi Rahatsızlıkları", items: (i: Interview) => i.sacDerisiRahatsizlik },
  ];

  return (
    <div>
      <BackButton />
      <PageHeader title={`Ön Görüşme — ${name}`} subtitle="Cilt ve saç derisi analiz formu" />

      {!showForm && (
        <div className="mb-6 flex justify-end">
          <button onClick={() => setShowForm(true)} className="btn-medical-primary">
            <Plus className="h-4 w-4" /> Ön Görüşme Ekle
          </button>
        </div>
      )}

      {showForm && (
        <div className="space-y-4 mb-6">
          {errors.length > 0 && (
            <div className="rounded-lg border border-destructive/30 bg-[hsl(var(--medical-red-light))] p-4">
              {errors.map((e, i) => <p key={i} className="text-sm text-destructive font-medium">• {e}</p>)}
            </div>
          )}

          <RadioGroup title="1. Temel Cilt Tipi" subtitle="Sadece bir seçenek işaretlenebilir" options={ciltTipiOptions} value={ciltTipi} onChange={setCiltTipi} />
          <CheckboxGroup title="2. Cilt Durumu ve Endişeleri" subtitle="Birden fazla seçenek işaretlenebilir" options={ciltDurumuOptions} values={ciltDurumu} onChange={setCiltDurumu} />
          <CheckboxGroup title="3. Cilt Hassasiyeti ve Rahatsızlıklar" subtitle="Birden fazla seçenek işaretlenebilir" options={ciltHassasiyetOptions} values={ciltHassasiyet} onChange={setCiltHassasiyet} />
          <RadioGroup title="4. Saç Derisi Tipi" subtitle="Şampuan seçimi esas olarak buraya göre yapılır." options={sacDerisiTipiOptions} value={sacDerisiTipi} onChange={setSacDerisiTipi} />
          <CheckboxGroup title="5. Saç Derisi Rahatsızlıkları ve Durumları" subtitle="Tedavi edici veya majistral ürünler için kritik bölüm." options={sacDerisiRahatsizlikOptions} values={sacDerisiRahatsizlik} onChange={setSacDerisiRahatsizlik} />

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => { setShowForm(false); resetForm(); }} className="btn-medical-ghost">İptal</button>
            <button onClick={handleSave} className="btn-medical-primary"><Save className="h-4 w-4" /> Kaydet</button>
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
            <h3 className="font-semibold text-foreground text-sm mb-1">Cilt Tipi: {i.ciltTipi}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">Saç Derisi: {i.sacDerisiTipi}</p>
          </button>
        ))}
      </div>

      {/* Detail Modal */}
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
            {selectedInterview && categories.map(cat => {
              const items = cat.items(selectedInterview);
              if (!items || items.length === 0 || (items.length === 1 && !items[0])) return null;
              return (
                <div key={cat.title} className="rounded-lg bg-[hsl(var(--primary)/0.04)] border border-[hsl(var(--primary)/0.1)] p-4">
                  <h4 className="text-sm font-bold text-[hsl(var(--primary))] mb-2">{cat.title}</h4>
                  <ul className="space-y-1">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
