import { useParams, useLocation } from "react-router-dom";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import {
  MessageSquare, ClipboardList, FileText, Camera,
  Package, Target, MessageCircle, HeartPulse,
  DollarSign, Stethoscope
} from "lucide-react";

const sections = [
  {
    icon: MessageSquare, label: "Ön Görüşme", color: "var(--primary)",
    summary: "Son görüşme: 15.03.2026 — Hedef: Kilo kontrolü. Şikayetler: Yorgunluk, uyku bozukluğu."
  },
  {
    icon: ClipboardList, label: "Anamnez", color: "var(--medical-blue)",
    summary: "Kronik hastalık yok. Aile geçmişi: Diyabet (anne tarafı)."
  },
  {
    icon: FileText, label: "Tahlil", color: "var(--medical-green)",
    summary: "Son tahlil: 10.03.2026 — Vitamin D düşük, Demir normal sınırda."
  },
  {
    icon: Camera, label: "Fotoğraflar", color: "var(--medical-purple)",
    summary: "3 adet fotoğraf yüklendi. Son güncelleme: 12.03.2026"
  },
  {
    icon: Package, label: "Verilen Destek", color: "var(--secondary)",
    summary: "Aktif ürünler: 4 (Vitamin D, Omega-3, Probiyotik, Magnezyum)"
  },
  {
    icon: Target, label: "Hedefler", color: "var(--medical-amber)",
    summary: "3 aktif hedef: Kilo verme (devam), Uyku düzeni (tamamlandı), Enerji artışı (devam)"
  },
  {
    icon: MessageCircle, label: "Hasta Geri Bildirimi", color: "var(--medical-cyan)",
    summary: "Son geri bildirim: 'Vitamin D takviyeleri çok faydalı oldu.'"
  },
  {
    icon: HeartPulse, label: "Yaşam Tarzı", color: "var(--medical-green)",
    summary: "Haftalık egzersiz: 3 gün. Beslenme: Dengeli. Uyku: 6-7 saat."
  },
  {
    icon: Stethoscope, label: "Protokol", color: "var(--medical-blue)",
    summary: "Aktif protokol: Bağışıklık Güçlendirme (3. hafta)"
  },
  {
    icon: DollarSign, label: "Ciro", color: "var(--medical-amber)",
    summary: "Toplam harcama: ₺2,450. Son işlem: 15.03.2026 — ₺320"
  },
];

export default function KayitOzeti() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { name?: string } | null;
  const name = state?.name || "Danışan";

  return (
    <div>
      <BackButton />
      <PageHeader title={`Kayıt Özeti — ${name}`} subtitle="Danışanın tüm kayıtlarının genel görünümü" />

      <div className="space-y-3 max-w-3xl mx-auto">
        {sections.map((s, i) => (
          <div
            key={i}
            className="medical-card p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `hsl(${s.color} / 0.12)` }}
            >
              <s.icon className="h-5 w-5" style={{ color: `hsl(${s.color})` }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground mb-1">{s.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
