import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Stethoscope className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-sm font-bold text-foreground">EczaPanel</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modern eczane yönetim sistemi. Hasta takibi, formüller ve cari hareketlerinizi tek panelden yönetin.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Hızlı Linkler</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/danisan-listesi" className="text-muted-foreground hover:text-primary transition-colors">Danışan Listesi</Link></li>
              <li><Link to="/urunler" className="text-muted-foreground hover:text-primary transition-colors">Ürünler</Link></li>
              <li><Link to="/formuller" className="text-muted-foreground hover:text-primary transition-colors">Formüller</Link></li>
            </ul>
          </div>

          {/* Destek */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Destek</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#sss" className="text-muted-foreground hover:text-primary transition-colors">Sıkça Sorulan Sorular</a></li>
              <li><a href="#bize-ulasin" className="text-muted-foreground hover:text-primary transition-colors">Bize Ulaşın</a></li>
              <li><a href="#kullanim-sartlari" className="text-muted-foreground hover:text-primary transition-colors">Kullanım Şartları</a></li>
            </ul>
          </div>

          {/* Yasal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Yasal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#kvkk" className="text-muted-foreground hover:text-primary transition-colors">KVKK Aydınlatma Metni</a></li>
              <li><a href="#gizlilik" className="text-muted-foreground hover:text-primary transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#cerez" className="text-muted-foreground hover:text-primary transition-colors">Çerez Politikası</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4">
        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 EczaPanel — Eczane Yönetim Sistemi. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <a href="#kvkk" className="hover:text-primary transition-colors">KVKK</a>
            <a href="#gizlilik" className="hover:text-primary transition-colors">Gizlilik</a>
            <a href="#kullanim-sartlari" className="hover:text-primary transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
