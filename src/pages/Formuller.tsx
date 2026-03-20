import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import BackButton from "@/components/BackButton";
import DataTable from "@/components/DataTable";
import { Edit, Trash2, Plus, FlaskConical, Flower2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const majistralData = [
  { name: "Salisilik Asit Krem %2", ingredients: "Salisilik Asit, Vazelin, Lanolin", date: "10.03.2026" },
  { name: "Üre Krem %10", ingredients: "Üre, Gliserin, Parafin", date: "05.03.2026" },
];

const aromaterapiData = [
  { name: "Lavanta Yağı Karışımı", ingredients: "Lavanta, Jojoba, Badem Yağı", date: "12.03.2026" },
  { name: "Nane-Okaliptüs Buhar", ingredients: "Nane Yağı, Okaliptüs, Çay Ağacı", date: "08.03.2026" },
];

const makeColumns = () => [
  { key: "name", label: "FORMÜL ADI" },
  { key: "ingredients", label: "İÇERİK" },
  { key: "date", label: "TARİH" },
  {
    key: "actions",
    label: "İŞLEMLER",
    render: () => (
      <div className="flex items-center gap-1">
        <button className="icon-btn"><Edit className="h-4 w-4" /></button>
        <button className="icon-btn text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
      </div>
    ),
  },
];

export default function Formuller() {
  return (
    <div>
      <BackButton />
      <PageHeader title="Formüller" subtitle="Majistral ve aromaterapi formüllerinizi yönetin" />

      <Tabs defaultValue="majistral" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="majistral" className="gap-2">
            <FlaskConical className="h-4 w-4" /> Majistral Formüller
          </TabsTrigger>
          <TabsTrigger value="aromaterapi" className="gap-2">
            <Flower2 className="h-4 w-4" /> Aromaterapi Formüller
          </TabsTrigger>
        </TabsList>

        <TabsContent value="majistral">
          <div className="mb-4 flex justify-end">
            <button className="btn-medical-primary">
              <Plus className="h-4 w-4" /> Majistral Formül Ekle
            </button>
          </div>
          <DataTable columns={makeColumns()} data={majistralData} searchPlaceholder="Formül ara..." />
        </TabsContent>

        <TabsContent value="aromaterapi">
          <div className="mb-4 flex justify-end">
            <button className="btn-medical-primary">
              <Plus className="h-4 w-4" /> Aromaterapi Formül Ekle
            </button>
          </div>
          <DataTable columns={makeColumns()} data={aromaterapiData} searchPlaceholder="Formül ara..." />
        </TabsContent>
      </Tabs>
    </div>
  );
}
