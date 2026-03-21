import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import DetailModal from "@/components/DetailModal";
import { Edit, FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const messages = [
  { id: 1, title: "Bahar Dönemi Vitamin Rehberi", description: "Bahar aylarında bağışıklık sisteminizi güçlendirmek için önerilen vitaminler ve mineraller hakkında bilgilendirme." },
  { id: 2, title: "Yeni Ürün Tanıtımı", description: "Eczanemize yeni gelen organik gıda takviyesi ürünleri hakkında detaylı bilgilendirme mesajı." },
];

export default function DanisanBilgilendirme() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { name?: string } | null;
  const name = state?.name || "Danışan";
  const [selected, setSelected] = useState<typeof messages[0] | null>(null);

  return (
    <div>
      <BackButton />
      <PageHeader title={`Bilgilendirme Mesajları — ${name}`} subtitle="Danışana gönderilen bilgilendirme mesajlarını görüntüleyin" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {messages.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="message-card flex flex-col cursor-pointer"
            onClick={() => setSelected(m)}
          >
            <h3 className="font-display text-base font-semibold text-foreground">{m.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{m.description}</p>
            <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
              <button className="btn-medical-outline flex-1 text-xs" onClick={e => e.stopPropagation()}>
                <Edit className="h-3.5 w-3.5" /> Düzenle
              </button>
              <button className="btn-medical-outline flex-1 text-xs" onClick={e => e.stopPropagation()}>
                <FileText className="h-3.5 w-3.5" /> PDF
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
