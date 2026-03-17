import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Edit, FileText, Trash2, Plus, Upload } from "lucide-react";
import { motion } from "framer-motion";

const pdfColumns = [
  { key: "name", label: "DOSYA ADI" },
  { key: "date", label: "YÜKLEME TARİHİ" },
  { key: "size", label: "BOYUT" },
  {
    key: "actions",
    label: "İŞLEMLER",
    render: () => (
      <div className="flex items-center gap-1">
        <button className="icon-btn"><FileText className="h-4 w-4" /></button>
        <button className="icon-btn text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
      </div>
    ),
  },
];

const pdfData = [
  { name: "Bilgilendirme_Mart.pdf", date: "10.03.2026", size: "1.2 MB" },
  { name: "Vitamin_Rehberi.pdf", date: "05.03.2026", size: "850 KB" },
];

const messages = [
  { id: 1, title: "Bahar Dönemi Vitamin Rehberi", description: "Bahar aylarında bağışıklık sisteminizi güçlendirmek için önerilen vitaminler ve mineraller hakkında bilgilendirme." },
  { id: 2, title: "Yeni Ürün Tanıtımı", description: "Eczanemize yeni gelen organik gıda takviyesi ürünleri hakkında detaylı bilgilendirme mesajı." },
];

export default function BilgilendirmeMesajlari() {
  return (
    <div>
      <PageHeader
        title="Bilgilendirme Mesajlarım"
        subtitle="PDF ve mesajlarınızı yönetin"
        actions={
          <div className="flex gap-2">
            <button className="btn-medical-outline">
              <Upload className="h-4 w-4" /> PDF Ekle
            </button>
            <button className="btn-medical-primary">
              <Plus className="h-4 w-4" /> Yeni Mesaj
            </button>
          </div>
        }
      />

      {/* PDF Table */}
      <div className="mb-8">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Eklenen PDF'ler</h2>
        <DataTable columns={pdfColumns} data={pdfData} searchPlaceholder="PDF ara..." />
      </div>

      {/* Messages */}
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Mesajlar</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {messages.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="message-card flex flex-col"
            >
              <h3 className="font-display text-base font-semibold text-foreground">{m.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{m.description}</p>
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
    </div>
  );
}
