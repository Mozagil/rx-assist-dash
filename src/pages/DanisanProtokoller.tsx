import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import DetailModal from "@/components/DetailModal";
import { Edit, FileText, Trash2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const protocols = [
  { id: 1, title: "Kilo Kontrol Protokolü", description: "Diyetisyen eşliğinde 3 aylık kilo kontrol programı. Haftalık takip ve ölçüm yapılır." },
  { id: 2, title: "Bağışıklık Güçlendirme", description: "Mevsimsel geçişlerde bağışıklık sistemini destekleyen vitamin ve mineral protokolü." },
  { id: 3, title: "Cilt Bakım Protokolü", description: "Akne ve cilt problemleri için özelleştirilmiş tedavi protokolü." },
];

export default function DanisanProtokoller() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { name?: string } | null;
  const name = state?.name || "Danışan";
  const [selected, setSelected] = useState<typeof protocols[0] | null>(null);

  const handleWhatsApp = (title: string) => {
    const text = encodeURIComponent(`Merhaba, ${title} protokolünüz hakkında bilgilendirme.`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div>
      <BackButton />
      <PageHeader title={`Protokoller — ${name}`} subtitle="Danışana ait protokolleri görüntüleyin" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {protocols.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="protocol-card flex flex-col cursor-pointer"
            onClick={() => setSelected(p)}
          >
            <h3 className="font-display text-base font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
              <button className="btn-medical-outline flex-1 text-xs" onClick={e => { e.stopPropagation(); handleWhatsApp(p.title); }}>
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </button>
              <button className="btn-medical-outline flex-1 text-xs" onClick={e => e.stopPropagation()}>
                <Edit className="h-3.5 w-3.5" /> Düzenle
              </button>
              <button className="btn-medical-outline flex-1 text-xs" onClick={e => e.stopPropagation()}>
                <FileText className="h-3.5 w-3.5" /> Aç
              </button>
              <button className="btn-medical-danger flex-1 text-xs" onClick={e => e.stopPropagation()}>
                <Trash2 className="h-3.5 w-3.5" /> Sil
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <DetailModal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title || ""}
        description={selected?.description || ""}
      />
    </div>
  );
}
