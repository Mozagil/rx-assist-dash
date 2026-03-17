import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  PhoneCall,
  ClipboardCheck,
  FileText,
  Target,
  Mail,
  Pill,
  FlaskConical,
  Receipt,
  UserCog,
  ChevronLeft,
  Stethoscope,
} from "lucide-react";

const menuItems = [
  { title: "Ana Sayfa", path: "/", icon: Home },
  { title: "Yeni Danışan Ekle", path: "/yeni-danisan", icon: UserPlus },
  { title: "Danışan Listesi", path: "/danisan-listesi", icon: Users },
  { title: "Kontrol Aramaları", path: "/kontrol-aramalari", icon: Phone },
  { title: "Değerlendirme Aramaları", path: "/degerlendirme-aramalari", icon: Star },
  { title: "Protokollerim", path: "/protokollerim", icon: FileText },
  { title: "Hedeflerim", path: "/hedeflerim", icon: Target },
  { title: "Bilgilendirme Mesajlarım", path: "/bilgilendirme-mesajlari", icon: MessageSquare },
  { title: "Ürünler", path: "/urunler", icon: Package },
  { title: "Formüller", path: "/formuller", icon: FlaskConical },
  { title: "Cari Hareketlerim", path: "/cari-hareketler", icon: Wallet },
  { title: "Kullanıcılar", path: "/kullanicilar", icon: Shield },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen flex-col transition-all duration-300"
      style={{
        width: collapsed ? "var(--sidebar-width-collapsed)" : "var(--sidebar-width)",
        background: `hsl(var(--sidebar-background))`,
        boxShadow: "var(--shadow-sidebar)",
      }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4" style={{ borderBottom: '1px solid hsl(var(--sidebar-border))' }}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'hsl(var(--sidebar-primary))' }}>
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-base font-bold text-white">EczaPanel</h1>
              <p className="text-[10px]" style={{ color: 'hsl(var(--sidebar-foreground))' }}>Eczane Yönetim Sistemi</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'hsl(var(--sidebar-primary))' }}>
            <Activity className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
                title={item.title}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className="p-3" style={{ borderTop: '1px solid hsl(var(--sidebar-border))' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 transition-colors duration-150"
          style={{ color: 'hsl(var(--sidebar-foreground))' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'hsl(var(--sidebar-accent))')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </aside>
  );
}
