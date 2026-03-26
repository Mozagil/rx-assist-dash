import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  PhoneCall,
  ClipboardCheck,
  Receipt,
  UserCog,
  ChevronLeft,
  Stethoscope,
  Menu,
  Sparkles,
  PackageX,
  CalendarHeart,
} from "lucide-react";

const menuItems = [
  { title: "Ana Sayfa", path: "/", icon: LayoutDashboard },
  { title: "Yeni Danışan Ekle", path: "/yeni-danisan", icon: UserPlus },
  { title: "Danışan Listesi", path: "/danisan-listesi", icon: Users },
  { title: "Kontrol Aramaları", path: "/kontrol-aramalari", icon: PhoneCall },
  { title: "Değerlendirme Aramaları", path: "/degerlendirme-aramalari", icon: ClipboardCheck },
  { title: "Cilt Bakım Randevuları", path: "/cilt-bakim-randevulari", icon: CalendarHeart },
  { title: "Dermokozmetik Biten", path: "/dermokozmetik-biten", icon: Sparkles },
  { title: "Diğer Destek Ürünü Biten", path: "/diger-destek-biten", icon: PackageX },
  { title: "Cari Hareketlerim", path: "/cari-hareketler", icon: Receipt },
  { title: "Kullanıcılar", path: "/kullanicilar", icon: UserCog },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-card shadow-md md:hidden"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col transition-all duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          width: collapsed ? "var(--sidebar-width-collapsed)" : "var(--sidebar-width)",
          background: "hsl(var(--sidebar-background))",
          boxShadow: "var(--shadow-sidebar)",
        }}
      >
        <div
          className="flex h-16 items-center gap-3 px-4"
          style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ background: "hsl(var(--sidebar-primary))" }}
          >
            <Stethoscope className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="font-display text-sm font-bold text-primary-foreground truncate">
                DermPanel
              </h1>
              <p className="text-[10px] truncate" style={{ color: "hsl(var(--sidebar-foreground))" }}>
                Dermokozmetik Yönetim
              </p>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="px-4 py-3" style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                DP
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-primary-foreground truncate">Eczacı</p>
                <p className="text-[11px] truncate" style={{ color: "hsl(var(--sidebar-foreground))" }}>
                  Yönetici
                </p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <div className="space-y-0.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`sidebar-link relative ${isActive ? "sidebar-link-active" : ""}`}
                  title={item.title}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="hidden md:block p-3" style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-lg p-2 transition-colors duration-150"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--sidebar-accent))")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
