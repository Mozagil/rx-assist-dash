import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Eye, Edit, Trash2 } from "lucide-react";

const columns = [
  { key: "patient", label: "HASTA" },
  { key: "category", label: "KATEGORİ" },
  { key: "product", label: "ÜRÜN ADI" },
  { key: "endDate", label: "BİTİŞ TARİHİ" },
  { key: "givenDate", label: "VERİLDİĞİ TARİH" },
  {
    key: "status",
    label: "DURUM",
    render: (val: string) => (
      <span className={`badge-status ${val === "Bitti" ? "badge-expired" : "badge-pending"}`}>{val}</span>
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
  { patient: "Ahmet Yılmaz", category: "Vitamin", product: "D3 Vitamini", endDate: "10.03.2026", givenDate: "10.01.2026", status: "Bitti" },
  { patient: "Fatma Demir", category: "Mineral", product: "Magnezyum", endDate: "25.03.2026", givenDate: "25.01.2026", status: "Yakında" },
];

export default function DestegiBiten() {
  return (
    <div>
      <PageHeader title="Desteği Biten" subtitle="Destek süresi sona eren veya yakında bitecek olan danışanlar" />
      <DataTable columns={columns} data={data} searchPlaceholder="Hasta ara..." />
    </div>
  );
}
