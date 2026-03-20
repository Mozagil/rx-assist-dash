import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import BackButton from "@/components/BackButton";
import StatusRadioCell from "@/components/StatusRadioCell";
import DataTable from "@/components/DataTable";
import { Eye, Edit, Trash2, PhoneCall } from "lucide-react";

interface CallRow {
  name: string;
  phone: string;
  registerDate: string;
  callDate: string;
  remaining: string;
  status: "aranmadi" | "ulasti" | "ulasilamadi";
  contactDate?: string;
}

export default function DegerlendirmeAramalari() {
  const [showCalled, setShowCalled] = useState(false);
  const [rows, setRows] = useState<CallRow[]>([
    { name: "Ahmet Yılmaz", phone: "0532 123 4567", registerDate: "15.01.2026", callDate: "22.03.2026", remaining: "5", status: "aranmadi" },
    { name: "Fatma Demir", phone: "0541 987 6543", registerDate: "20.02.2026", callDate: "19.03.2026", remaining: "2", status: "aranmadi" },
  ]);

  const handleStatusChange = (index: number, status: CallRow["status"], date?: Date) => {
    setRows(prev => prev.map((r, i) => i === index ? { ...r, status, contactDate: date ? date.toLocaleDateString("tr-TR") : undefined } : r));
  };

  const activeRows = rows.filter(r => r.status !== "ulasti");
  const calledRows = rows.filter(r => r.status === "ulasti");

  const getRowClass = (row: CallRow) => {
    if (row.status === "ulasti") return "row-status-green";
    if (row.status === "ulasilamadi") return "row-status-amber";
    return "row-status-red";
  };

  const columns = [
    { key: "name", label: "HASTA ADI VE SOYADI" },
    { key: "phone", label: "TELEFON" },
    { key: "registerDate", label: "KAYIT TARİHİ" },
    { key: "callDate", label: "KONTROL ARAMA TARİHİ" },
    { key: "remaining", label: "KALAN GÜN" },
    {
      key: "status",
      label: "DURUM",
      render: (_val: string, row: CallRow) => {
        const idx = rows.indexOf(row);
        return (
          <StatusRadioCell
            initialStatus={row.status}
            onConfirm={(s, d) => handleStatusChange(idx, s, d)}
          />
        );
      },
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

  const calledColumns = [
    { key: "name", label: "HASTA ADI VE SOYADI" },
    { key: "phone", label: "TELEFON" },
    { key: "callDate", label: "ARAMA TARİHİ" },
    { key: "contactDate", label: "ULAŞILAN TARİH" },
  ];

  const displayData = showCalled ? calledRows : activeRows;
  const displayColumns = showCalled ? calledColumns : columns;

  return (
    <div>
      <BackButton />
      <PageHeader
        title="Değerlendirme Aramaları"
        subtitle="Değerlendirme araması planları ve durumları"
        actions={
          <button
            className={showCalled ? "btn-medical-primary" : "btn-medical-outline"}
            onClick={() => setShowCalled(!showCalled)}
          >
            <PhoneCall className="h-4 w-4" />
            {showCalled ? "Bekleyenler" : `Arananlar (${calledRows.length})`}
          </button>
        }
      />
      <DataTable
        columns={displayColumns}
        data={displayData}
        searchPlaceholder="Hasta ara..."
        rowClassName={showCalled ? undefined : (row: any) => getRowClass(row)}
      />
    </div>
  );
}
