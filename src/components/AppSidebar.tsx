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
  Menu,
  X,
  Stethoscope,
  LogOut,
} from "lucide-react";

const menuItems = [
  { title: "Ana Sayfa", path: "/", icon: LayoutDashboard },
  { title: "Yeni Danışan Ekle", path: "/yeni-danisan", icon: UserPlus },
  { title: "Danışan Listesi", path: "/danisan-listesi", icon: Users },
  { title: "Kontrol Aramaları", path: "/kontrol-aramalari", icon: PhoneCall },
  { title: "Değerlendirme Aramaları", path: "/degerlendirme-aramalari", icon: ClipboardCheck },
  { title: "Protokollerim", path: "/protokollerim", icon: FileText },
  { title: "Hedeflerim", path: "/hedeflerim", icon: Target },
  { title: "Bilgilendirme Mesajlarım", path: "/bilgilendirme-mesajlari", icon: Mail },
  { title: "Ürünler", path: "/urunler", icon: Pill },
  { title: "Formüller", path: "/formuller", icon: FlaskConical },
  { title: "Cari Hareketlerim", path: "/cari-hareketler", icon: Receipt },
  { title: "Kullanıcılar", path: "/kullanicilar", icon: UserCog },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-lg md:hidden"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
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
        {/* Logo area */}
        <div
          className="flex h-16 items-center justify-between px-4"
          style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "hsl(var(--sidebar-primary))" }}
            >
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="font-display text-sm font-bold text-white truncate">
                  EczaPanel
                </h1>
                <p className="text-[10px] truncate" style={{ color: "hsl(var(--sidebar-foreground))" }}>
                  Eczane Yönetim Sistemi
                </p>
              </div>
            )}
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4 text-white/60" />
          </button>
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-4 py-3" style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white text-xs font-bold">
                EP
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">Eczacı</p>
                <p className="text-[11px] truncate" style={{ color: "hsl(var(--sidebar-foreground))" }}>
                  Yönetici
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
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
        </nav>

        {/* Bottom area */}
        <div className="p-3 space-y-1" style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}>
          {!collapsed && (
            <button className="sidebar-link w-full text-left opacity-70 hover:opacity-100">
              <LogOut className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate">Çıkış Yap</span>
            </button>
          )}
          {/* Collapse toggle (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-full items-center justify-center rounded-lg p-2 transition-colors duration-150"
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
