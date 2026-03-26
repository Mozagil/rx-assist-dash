import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";

const data = [
  { id: "1", name: "Ayşe Çelik", product: "Nemlendirici Serum", endDate: "20.03.2026", phone: "0543 321 9876" },
  { id: "2", name: "Mehmet Kaya", product: "Güneş Koruyucu SPF50", endDate: "22.03.2026", phone: "0555 456 7890" },
  { id: "3", name: "Fatma Demir", product: "Anti-Aging Krem", endDate: "25.03.2026", phone: "0541 987 6543" },
];

const columns = [
  { key: "name", label: "DANIŞAN" },
  { key: "product", label: "ÜRÜN" },
  { key: "endDate", label: "BİTİŞ TARİHİ" },
  { key: "phone", label: "TELEFON" },
];

export default function DermokozmetikBiten() {
  return (
    <div>
      <BackButton />
      <PageHeader title="Dermokozmetik Biten" subtitle="Dermokozmetik ürünü biten danışanlar" />
      <DataTable columns={columns} data={data} searchPlaceholder="Danışan ara..." />
    </div>
  );
}
