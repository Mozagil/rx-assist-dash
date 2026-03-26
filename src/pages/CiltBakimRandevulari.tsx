import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";

const data = [
  { id: "1", name: "Ahmet Yılmaz", type: "Cilt Bakım", date: "28.03.2026", time: "10:00", status: "Onaylandı" },
  { id: "2", name: "Fatma Demir", type: "Cilt Analiz", date: "28.03.2026", time: "11:30", status: "Bekliyor" },
  { id: "3", name: "Zeynep Ak", type: "Cilt Bakım", date: "29.03.2026", time: "14:00", status: "Onaylandı" },
];

const columns = [
  { key: "name", label: "DANIŞAN" },
  { key: "type", label: "TÜR" },
  { key: "date", label: "TARİH" },
  { key: "time", label: "SAAT" },
  {
    key: "status", label: "DURUM",
    render: (v: string) => (
      <span className={`badge-status ${v === "Onaylandı" ? "badge-active" : "badge-pending"}`}>{v}</span>
    ),
  },
];

export default function CiltBakimRandevulari() {
  return (
    <div>
      <BackButton />
      <PageHeader title="Cilt Bakım Randevuları" subtitle="Cilt bakım randevularını yönetin" />
      <DataTable columns={columns} data={data} searchPlaceholder="Randevu ara..." />
    </div>
  );
}
