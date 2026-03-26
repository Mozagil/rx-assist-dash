import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";

const data = [
  { id: "1", name: "Ali Öztürk", product: "Omega-3", endDate: "18.03.2026", phone: "0532 654 3210" },
  { id: "2", name: "Zeynep Ak", product: "Probiyotik", endDate: "21.03.2026", phone: "0544 111 2233" },
  { id: "3", name: "Hasan Yıldız", product: "Vitamin D3", endDate: "24.03.2026", phone: "0533 444 5566" },
];

const columns = [
  { key: "name", label: "DANIŞAN" },
  { key: "product", label: "ÜRÜN" },
  { key: "endDate", label: "BİTİŞ TARİHİ" },
  { key: "phone", label: "TELEFON" },
];

export default function DigerDestekBiten() {
  return (
    <div>
      <BackButton />
      <PageHeader title="Diğer Destek Ürünü Biten" subtitle="Destek ürünü biten danışanlar" />
      <DataTable columns={columns} data={data} searchPlaceholder="Danışan ara..." />
    </div>
  );
}
