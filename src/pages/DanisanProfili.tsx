import { useParams, useLocation, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";
import {
  MessageSquare, ClipboardList, FileText, Camera,
  Pill, Target, MessageCircle, HeartPulse,
  DollarSign, Users, Stethoscope, Package
} from "lucide-react";

const buttons = [
  { label: "Ön Görüşme", icon: MessageSquare, path: "on-gorusme", color: "var(--primary)" },
  { label: "Anamnez", icon: ClipboardList, path: "anamnez", color: "var(--medical-blue)" },
  { label: "Tahlil", icon: FileText, path: "tahlil", color: "var(--medical-green)" },
  { label: "Fotoğraflar", icon: Camera, path: "fotograflar", color: "var(--medical-purple)" },
  { label: "Verilen Destek", icon: Package, path: "verilen-destek", color: "var(--secondary)" },
  { label: "Hedefler", icon: Target, path: "hedefler", color: "var(--medical-amber)" },
  { label: "Hasta Geri Bildirimi", icon: MessageCircle, path: "geri-bildirim", color: "var(--medical-cyan)" },
  { label: "Yaşam Tarzı", icon: HeartPulse, path: "yasam-tarzi", color: "var(--medical-green)" },
  { label: "Bilgilendirme Mesajı", icon: MessageSquare, path: "bilgilendirme", color: "var(--primary)" },
  { label: "Protokol", icon: Stethoscope, path: "protokol", color: "var(--medical-blue)" },
  { label: "Ciro", icon: DollarSign, path: "ciro", color: "var(--medical-amber)" },
  { label: "Kayıt Özeti", icon: Users, path: "kayit-ozeti", color: "var(--medical-purple)" },
];

export default function DanisanProfili() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { name?: string; contact?: string } | null;
  const name = state?.name || "Danışan";
  const contact = state?.contact || "";

  return (
    <div>
      <BackButton />

      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-[hsl(var(--primary)/0.12)] flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-[hsl(var(--primary))]" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-[var(--font-display)]">Danışan Profili</h1>
        </div>

        <div className="inline-block px-6 py-2 rounded-lg bg-[hsl(var(--primary))] text-primary-foreground font-semibold text-sm mb-3">
          {name}
        </div>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p><span className="font-semibold text-foreground">Ad Soyad:</span> {name}</p>
          <p><span className="font-semibold text-foreground">Telefon:</span> {contact}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
        {buttons.map((btn) => (
          <button
            key={btn.path}
            onClick={() => navigate(`/danisan/${id}/${btn.path}`, { state: { name, contact } })}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: `hsl(${btn.color})` }}
          >
            <btn.icon className="h-5 w-5 flex-shrink-0" />
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
