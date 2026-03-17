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
    label: "İŞLEMLER",
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
  { name: "Ahmet Yılmaz", phone: "0532 123 4567", registerDate: "15.01.2026", callDate: "20.03.2026", remaining: "3", status: "Bekliyor" },
  { name: "Fatma Demir", phone: "0541 987 6543", registerDate: "20.02.2026", callDate: "18.03.2026", remaining: "1", status: "Bekliyor" },
  { name: "Mehmet Kaya", phone: "0555 456 7890", registerDate: "01.03.2026", callDate: "15.03.2026", remaining: "0", status: "Arandı" },
];

export default function KontrolAramalari() {
  return (
    <div>
      <PageHeader title="Kontrol Aramaları" subtitle="Planlanan ve tamamlanan kontrol aramaları" />
      <DataTable columns={columns} data={data} searchPlaceholder="Hasta ara..." />
    </div>
  );
}
