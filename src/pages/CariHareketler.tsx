import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";

const columns = [
  { key: "date", label: "TARİH" },
  { key: "description", label: "AÇIKLAMA" },
  { key: "type", label: "TÜR" },
  {
    key: "amount",
    label: "TUTAR",
    render: (val: string, row: any) => (
      <span className={row.type === "Gelir" ? "font-semibold text-medical-green" : "font-semibold text-medical-red"}>
        {val}
      </span>
    ),
  },
];

const data = [
  { date: "15.03.2026", description: "Vitamin satışı", type: "Gelir", amount: "₺1.250" },
  { date: "14.03.2026", description: "Tedarikçi ödemesi", type: "Gider", amount: "₺3.400" },
  { date: "13.03.2026", description: "Danışmanlık ücreti", type: "Gelir", amount: "₺500" },
];

export default function CariHareketler() {
  return (
    <div>
      <PageHeader title="Cari Hareketlerim" subtitle="Gelir ve gider hareketlerinizi takip edin" />
      <DataTable columns={columns} data={data} searchPlaceholder="Hareket ara..." />
    </div>
  );
}
