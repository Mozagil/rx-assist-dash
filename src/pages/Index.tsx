import { useNavigate } from "react-router-dom";
import {
  Users,
  UserX,
  PhoneCall,
  ClipboardCheck,
  Receipt,
  HeartPulse,
  Pill,
  CalendarClock,
  UserPlus,
  FileText,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  Clock,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Toplam Üye",
    value: "1.248",
    change: "+12 bu ay",
    icon: Users,
    color: "stat-card-blue",
    iconBg: "bg-medical-blue-light",
    iconColor: "text-medical-blue",
    path: "/danisan-listesi",
  },
  {
    title: "Desteği Biten",
    value: "34",
    change: "Son 30 gün",
    icon: UserX,
    color: "stat-card-red",
    iconBg: "bg-medical-red-light",
    iconColor: "text-medical-red",
    path: "/destegi-biten",
  },
  {
    title: "Kontrol Aramaları",
    value: "87",
    change: "Bu hafta 12",
    icon: PhoneCall,
    color: "stat-card-green",
    iconBg: "bg-medical-green-light",
    iconColor: "text-medical-green",
    path: "/kontrol-aramalari",
  },
  {
    title: "Değerlendirme Aramaları",
    value: "56",
    change: "Bu hafta 8",
    icon: ClipboardCheck,
    color: "stat-card-amber",
    iconBg: "bg-medical-amber-light",
    iconColor: "text-medical-amber",
    path: "/degerlendirme-aramalari",
  },
  {
    title: "Ciro",
    value: "₺124.500",
    change: "+8% geçen aya göre",
    icon: Receipt,
    color: "stat-card-purple",
    iconBg: "bg-medical-purple-light",
    iconColor: "text-medical-purple",
    path: "/cari-hareketler",
  },
  {
    title: "Aylık Büyüme",
    value: "%15",
    change: "Geçen aya göre",
    icon: HeartPulse,
    color: "stat-card-cyan",
    iconBg: "bg-medical-cyan-light",
    iconColor: "text-medical-cyan",
    path: "#",
  },
  {
    title: "Aktif Tedaviler",
    value: "—",
    change: "Yakında",
    icon: Pill,
    color: "stat-card-teal",
    iconBg: "bg-medical-teal-light",
    iconColor: "text-medical-teal",
    path: "#",
  },
  {
    title: "Randevular",
    value: "—",
    change: "Yakında",
    icon: CalendarClock,
    color: "stat-card-green",
    iconBg: "bg-medical-green-light",
    iconColor: "text-medical-green",
    path: "#",
  },
];

const recentPatients = [
  { name: "Ahmet Yılmaz", phone: "0532 123 4567", date: "15.03.2026", status: "Aktif" },
  { name: "Fatma Demir", phone: "0541 987 6543", date: "14.03.2026", status: "Aktif" },
  { name: "Mehmet Kaya", phone: "0555 456 7890", date: "13.03.2026", status: "Bekliyor" },
  { name: "Ayşe Çelik", phone: "0543 321 9876", date: "12.03.2026", status: "Aktif" },
];

const upcomingAppointments = [
  { patient: "Ahmet Yılmaz", type: "Kontrol", date: "19.03.2026", time: "10:00" },
  { patient: "Fatma Demir", type: "Değerlendirme", date: "19.03.2026", time: "11:30" },
  { patient: "Ali Öztürk", type: "Kontrol", date: "20.03.2026", time: "09:00" },
];

const criticalProducts = [
  { name: "Omega-3 Plus", stock: 5, status: "Kritik" },
  { name: "Vitamin D3", stock: 12, status: "Düşük" },
  { name: "Probiyotik Forte", stock: 3, status: "Kritik" },
];

const recentTransactions = [
  { desc: "Ahmet Yılmaz - Destek Paketi", amount: "₺2.500", date: "15.03.2026", type: "gelir" },
  { desc: "Omega-3 Plus Alımı", amount: "₺1.200", date: "14.03.2026", type: "gider" },
  { desc: "Fatma Demir - Tedavi", amount: "₺3.800", date: "14.03.2026", type: "gelir" },
];

const chartData = [
  { month: "Eki", gelir: 85000, buyume: 8 },
  { month: "Kas", gelir: 92000, buyume: 10 },
  { month: "Ara", gelir: 98000, buyume: 12 },
  { month: "Oca", gelir: 105000, buyume: 11 },
  { month: "Şub", gelir: 115000, buyume: 14 },
  { month: "Mar", gelir: 124500, buyume: 15 },
];

const quickActions = [
  { title: "Yeni Danışan", icon: UserPlus, path: "/yeni-danisan", color: "bg-medical-blue-light text-medical-blue" },
  { title: "Protokol Ekle", icon: FileText, path: "/protokollerim", color: "bg-medical-green-light text-medical-green" },
  { title: "Ürün Ekle", icon: Pill, path: "/urunler", color: "bg-medical-purple-light text-medical-purple" },
  { title: "Formül Ekle", icon: TrendingUp, path: "/formuller", color: "bg-medical-amber-light text-medical-amber" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Eczane yönetim panelinize hoş geldiniz" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.25 }}
            className={`stat-card ${stat.color}`}
            onClick={() => stat.path !== "#" && navigate(stat.path)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.25 }}
        className="medical-card"
      >
        <h3 className="dashboard-section-title mb-4">
          <ArrowUpRight className="h-4 w-4 text-primary" />
          Hızlı İşlemler
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-foreground">{action.title}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chart + Cari Hareketler */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.25 }}
          className="medical-card lg:col-span-2"
        >
          <h3 className="dashboard-section-title mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            Gelir Grafiği
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(199, 70%, 44%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(199, 70%, 44%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 12%, 50%)" tickFormatter={(v) => `₺${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(210, 16%, 90%)",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`₺${value.toLocaleString("tr-TR")}`, "Gelir"]}
                />
                <Area
                  type="monotone"
                  dataKey="gelir"
                  stroke="hsl(199, 70%, 44%)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorGelir)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Cari Hareketler */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.25 }}
          className="medical-card"
        >
          <h3 className="dashboard-section-title mb-4">
            <Receipt className="h-4 w-4 text-primary" />
            Son Hareketler
          </h3>
          <div className="space-y-3">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{tx.desc}</p>
                  <p className="text-[11px] text-muted-foreground">{tx.date}</p>
                </div>
                <span
                  className={`text-xs font-semibold shrink-0 ${
                    tx.type === "gelir" ? "text-medical-green" : "text-medical-red"
                  }`}
                >
                  {tx.type === "gelir" ? "+" : "-"}{tx.amount}
                </span>
              </div>
            ))}
            <button
              onClick={() => navigate("/cari-hareketler")}
              className="w-full text-center text-xs font-medium text-primary hover:underline pt-1"
            >
              Tümünü Gör →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Son Danışanlar + Yaklaşan Randevular */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Son Danışanlar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.25 }}
          className="medical-card p-0 overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 pb-0">
            <h3 className="dashboard-section-title">
              <Users className="h-4 w-4 text-primary" />
              Son Danışanlar
            </h3>
            <button
              onClick={() => navigate("/danisan-listesi")}
              className="text-xs font-medium text-primary hover:underline"
            >
              Tümü →
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="medical-table">
              <thead>
                <tr>
                  <th>Hasta</th>
                  <th>Telefon</th>
                  <th>Tarih</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((p, i) => (
                  <tr key={i}>
                    <td className="font-medium">{p.name}</td>
                    <td>{p.phone}</td>
                    <td>{p.date}</td>
                    <td>
                      <span className={`badge-status ${p.status === "Aktif" ? "badge-active" : "badge-pending"}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Yaklaşan Randevular */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.25 }}
          className="medical-card"
        >
          <h3 className="dashboard-section-title mb-4">
            <Clock className="h-4 w-4 text-primary" />
            Yaklaşan Randevular
          </h3>
          <div className="space-y-3">
            {upcomingAppointments.map((apt, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-medical-blue-light">
                  <CalendarClock className="h-4 w-4 text-medical-blue" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{apt.patient}</p>
                  <p className="text-[11px] text-muted-foreground">{apt.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-foreground">{apt.date}</p>
                  <p className="text-[11px] text-primary font-medium">{apt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Kritik Ürünler */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.25 }}
        className="medical-card"
      >
        <h3 className="dashboard-section-title mb-4">
          <AlertTriangle className="h-4 w-4 text-medical-amber" />
          Kritik Stok Ürünleri
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {criticalProducts.map((product, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-lg border p-4 ${
                product.status === "Kritik"
                  ? "border-medical-red/30 bg-medical-red-light"
                  : "border-medical-amber/30 bg-medical-amber-light"
              }`}
            >
              <div>
                <p className="text-sm font-medium text-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">Stok: {product.stock} adet</p>
              </div>
              <span
                className={`badge-status ${
                  product.status === "Kritik" ? "badge-expired" : "badge-pending"
                }`}
              >
                {product.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
