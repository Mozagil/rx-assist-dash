import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const data = [
  { id: "1", name: "Ahmet Yılmaz", contact: "0532 123 4567", date: "15.01.2026" },
  { id: "2", name: "Fatma Demir", contact: "0541 987 6543", date: "20.02.2026" },
  { id: "3", name: "Mehmet Kaya", contact: "0555 456 7890", date: "01.03.2026" },
];

export default function DanisanListesi() {
  const navigate = useNavigate();

  const columns = [
    {
      key: "name",
      label: "HASTA ADI VE SOYADI",
      render: (value: string, row: any) => (
        <button
          onClick={() => navigate(`/danisan/${row.id}`, { state: { name: row.name, contact: row.contact } })}
          className="text-[hsl(var(--primary))] font-semibold hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          {value}
        </button>
      ),
    },
    { key: "contact", label: "İLETİŞİM" },
    { key: "date", label: "KAYIT TARİHİ" },
    {
      key: "actions",
      label: "İŞLEMLER",
      render: (_: any, row: any) => (
        <div className="flex items-center gap-1">
          <button className="icon-btn" onClick={() => navigate(`/danisan/${row.id}`, { state: { name: row.name, contact: row.contact } })}><Eye className="h-4 w-4" /></button>
          <button className="icon-btn"><Edit className="h-4 w-4" /></button>
          <button className="icon-btn text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <BackButton />
      <PageHeader title="Danışan Listesi" subtitle="Tüm kayıtlı danışanlarınızı görüntüleyin" />
      <DataTable columns={columns} data={data} searchPlaceholder="Danışan ara..." />
    </div>
  );
}
