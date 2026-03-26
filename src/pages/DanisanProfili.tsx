import { useParams, useLocation, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";
import {
  MessageSquare, Sparkles, Package, FileSearch, FileHeart,
  FlaskConical, CalendarHeart, Megaphone, ClipboardList,
} from "lucide-react";

const buttons = [
  { label: "Ön Görüşme", icon: MessageSquare, path: "on-gorusme", color: "var(--primary)" },
  { label: "Dermokozmetik Ürünleri", icon: Sparkles, path: "dermokozmetik-urunleri", color: "var(--medical-purple)" },
  { label: "Diğer Destek Ürünleri", icon: Package, path: "diger-destek-urunleri", color: "var(--secondary)" },
  { label: "Saç Analiz Raporu", icon: FileSearch, path: "sac-analiz", color: "var(--medical-amber)" },
  { label: "Cilt Analiz Raporu", icon: FileHeart, path: "cilt-analiz", color: "var(--medical-cyan)" },
  { label: "Verilen Testler", icon: FlaskConical, path: "verilen-testler", color: "var(--medical-green)" },
  { label: "Cilt Bakım Talebi", icon: CalendarHeart, path: "cilt-bakim-talebi", color: "var(--medical-blue)" },
  { label: "Kampanya Mesajı İlet", icon: Megaphone, path: "kampanya-mesaji", color: "var(--medical-red)" },
  { label: "Danışan Özeti", icon: ClipboardList, path: "kayit-ozeti", color: "var(--medical-teal)" },
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

        <button
          onClick={() => navigate(`/danisan/${id}`, { state: { name, contact } })}
          className="inline-block px-6 py-2 rounded-lg bg-[hsl(var(--primary))] text-primary-foreground font-semibold text-sm mb-3 hover:opacity-90 transition-opacity cursor-pointer"
        >
          {name}
        </button>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p><span className="font-semibold text-foreground">Ad Soyad:</span> {name}</p>
          <p><span className="font-semibold text-foreground">Telefon:</span> {contact}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
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
