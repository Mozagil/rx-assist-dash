import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import DataTable from "@/components/DataTable";
import { Eye, Edit, Trash2 } from "lucide-react";

const columns = [
  { key: "name", label: "HASTA ADI VE SOYADI" },
  { key: "contact", label: "İLETİŞİM" },
  { key: "date", label: "KAYIT TARİHİ" },
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
  { name: "Ahmet Yılmaz", contact: "0532 123 4567", date: "15.01.2026" },
  { name: "Fatma Demir", contact: "0541 987 6543", date: "20.02.2026" },
  { name: "Mehmet Kaya", contact: "0555 456 7890", date: "01.03.2026" },
];

export default function DanisanListesi() {
  return (
    <div>
      <PageHeader title="Danışan Listesi" subtitle="Tüm kayıtlı danışanlarınızı görüntüleyin" />
      <DataTable columns={columns} data={data} searchPlaceholder="Danışan ara..." />
    </div>
  );
}
