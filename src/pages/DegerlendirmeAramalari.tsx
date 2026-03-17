import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Eye, Edit, Trash2 } from "lucide-react";

const columns = [
  { key: "name", label: "HASTA ADI VE SOYADI" },
  { key: "phone", label: "TELEFON" },
  { key: "registerDate", label: "KAYIT TARİHİ" },
  { key: "callDate", label: "KONTROL ARAMA TARİHİ" },
  { key: "remaining", label: "KALAN GÜN" },
  {
    key: "status",
    label: "DURUM",
    render: (val: string) => (
      <span className={`badge-status ${val === "Arandı" ? "badge-active" : val === "Bekliyor" ? "badge-pending" : "badge-expired"}`}>{val}</span>
    ),
  },
  {
    key: "actions",
    label: "İŞLEM",
    render: () => (
      <div className="flex items-center gap-1">
        <button className="icon-btn"><Eye className="h-4 w-4" /></button>
        <button className="icon-btn"><Edit className="h-4 w-4" /></button>
        <button className="icon-btn text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
      </div>
    ),
  },
];

const data = [
  { name: "Ahmet Yılmaz", phone: "0532 123 4567", registerDate: "15.01.2026", callDate: "22.03.2026", remaining: "5", status: "Bekliyor" },
  { name: "Fatma Demir", phone: "0541 987 6543", registerDate: "20.02.2026", callDate: "19.03.2026", remaining: "2", status: "Bekliyor" },
];

export default function DegerlendirmeAramalari() {
  return (
    <div>
      <PageHeader title="Değerlendirme Aramaları" subtitle="Değerlendirme araması planları ve durumları" />
      <DataTable columns={columns} data={data} searchPlaceholder="Hasta ara..." />
    </div>
  );
}
