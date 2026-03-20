import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";

export default function Urunler() {
  return (
    <div>
      <PageHeader title="Ürünler" subtitle="Ürün kataloğunuzu yönetin" />
      <div className="medical-card flex items-center justify-center py-16 text-muted-foreground">
        Ürün listesi yakında eklenecek
      </div>
    </div>
  );
}
