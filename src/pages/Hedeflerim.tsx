import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";

const columns = [
  { key: "name", label: "HASTA ADI VE SOYADI" },
  { key: "target", label: "HEDEF" },
  { key: "product", label: "VERİLEN DESTEK ÜRÜN" },
  { key: "remaining", label: "KALAN GÜN" },
  { key: "duration", label: "TEDAVİ SÜRESİ" },
  {
    key: "result",
    label: "SONUÇ",
    render: (val: string) => (
      <span className={`badge-status ${val === "Başarılı" ? "badge-active" : val === "Devam Ediyor" ? "badge-info" : "badge-pending"}`}>{val}</span>
    ),
  },
  { key: "createdAt", label: "OLUŞTURULMA TARİHİ" },
];

const data = [
  { name: "Ahmet Yılmaz", target: "Kilo Vermek", product: "Protein Tozu", remaining: "45", duration: "90 Gün", result: "Devam Ediyor", createdAt: "01.01.2026" },
  { name: "Fatma Demir", target: "Bağışıklık", product: "C Vitamini", remaining: "0", duration: "60 Gün", result: "Başarılı", createdAt: "15.01.2026" },
];

export default function Hedeflerim() {
  return (
    <div>
      <PageHeader title="Hedeflerim" subtitle="Tedavi hedeflerini takip edin" />
      <DataTable columns={columns} data={data} searchPlaceholder="Hedef ara..." />
    </div>
  );
}
