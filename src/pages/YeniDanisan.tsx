import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";

export default function YeniDanisan() {
  return (
    <div>
      <PageHeader title="Yeni Danışan Ekle" subtitle="Yeni bir danışan kaydı oluşturun" />
      <div className="medical-card max-w-2xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Ad</label>
            <input type="text" className="search-input" placeholder="Adını giriniz" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Soyad</label>
            <input type="text" className="search-input" placeholder="Soyadını giriniz" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Telefon</label>
            <input type="tel" className="search-input" placeholder="0532 123 4567" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">E-posta</label>
            <input type="email" className="search-input" placeholder="ornek@email.com" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Notlar</label>
            <textarea className="search-input min-h-[100px] resize-y" placeholder="Ek notlar..." />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="btn-medical-primary">
            <Plus className="h-4 w-4" /> Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}
