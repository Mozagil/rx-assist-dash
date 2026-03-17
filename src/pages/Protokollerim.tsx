import PageHeader from "@/components/PageHeader";
import { Edit, FileText, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";

const protocols = [
  { id: 1, title: "Kilo Kontrol Protokolü", description: "Diyetisyen eşliğinde 3 aylık kilo kontrol programı. Haftalık takip ve ölçüm yapılır." },
  { id: 2, title: "Bağışıklık Güçlendirme", description: "Mevsimsel geçişlerde bağışıklık sistemini destekleyen vitamin ve mineral protokolü." },
  { id: 3, title: "Cilt Bakım Protokolü", description: "Akne ve cilt problemleri için özelleştirilmiş tedavi protokolü." },
];

export default function Protokollerim() {
  return (
    <div>
      <PageHeader
        title="Protokollerim"
        subtitle="Tedavi protokollerinizi yönetin"
        actions={
          <button className="btn-medical-primary">
            <Plus className="h-4 w-4" /> Yeni Protokol
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {protocols.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="protocol-card flex flex-col"
          >
            <h3 className="font-display text-base font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
              <button className="btn-medical-outline flex-1 text-xs">
                <Edit className="h-3.5 w-3.5" /> Düzenle
              </button>
              <button className="btn-medical-outline flex-1 text-xs">
                <FileText className="h-3.5 w-3.5" /> PDF
              </button>
              <button className="btn-medical-danger flex-1 text-xs">
                <Trash2 className="h-3.5 w-3.5" /> Sil
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
