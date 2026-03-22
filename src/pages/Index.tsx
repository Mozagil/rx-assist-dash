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
  TrendingDown,
  ArrowUpRight,
  AlertTriangle,
  Clock,
  Eye,
  MoreVertical,
  ShoppingCart,
  FlaskConical,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

/* ── KPI data ─────────────────────────────────── */
const stats = [
  {
    title: "Toplam Üye",
    value: "1,248",
    change: "+10%",
    changeDir: "up" as const,
    sub: "Son Haftadan Beri",
    icon: Users,
    featured: true,
    color: "stat-card-blue",
    iconBg: "bg-medical-blue-light",
    iconColor: "text-medical-blue",
    path: "/danisan-listesi",
  },
  {
    title: "Desteği Biten",
    value: "34",
    change: "-8%",
    changeDir: "down" as const,
    sub: "Son Haftadan Beri",
    icon: UserX,
    color: "stat-card-red",
    iconBg: "bg-medical-red-light",
    iconColor: "text-medical-red",
    path: "/destegi-biten",
  },
  {
    title: "Kontrol Aramaları",
    value: "87",
    change: "+10%",
    changeDir: "up" as const,
    sub: "Son Haftadan Beri",
    icon: PhoneCall,
    color: "stat-card-green",
    iconBg: "bg-medical-green-light",
    iconColor: "text-medical-green",
    path: "/kontrol-aramalari",
  },
  {
    title: "Değerlendirmeler",
    value: "56",
    change: "+5%",
    changeDir: "up" as const,
    sub: "Son Haftadan Beri",
    icon: ClipboardCheck,
    color: "stat-card-amber",
    iconBg: "bg-medical-amber-light",
    iconColor: "text-medical-amber",
    path: "/degerlendirme-aramalari",
  },
  {
    title: "Ciro",
    value: "₺124.500",
    change: "+8%",
    changeDir: "up" as const,
    sub: "Geçen Aya Göre",
    icon: Receipt,
    color: "stat-card-purple",
    iconBg: "bg-medical-purple-light",
    iconColor: "text-medical-purple",
    path: "/cari-hareketler",
  },
  {
    title: "Aylık Büyüme",
    value: "%15",
    change: "+3%",
    changeDir: "up" as const,
    sub: "Geçen Aya Göre",
    icon: HeartPulse,
    color: "stat-card-cyan",
    iconBg: "bg-medical-cyan-light",
    iconColor: "text-medical-cyan",
    path: "#",
  },
  {
    title: "Aktif Tedaviler",
    value: "—",
    change: "",
    changeDir: "up" as const,
    sub: "Yakında",
    icon: Pill,
    color: "stat-card-teal",
    iconBg: "bg-medical-teal-light",
    iconColor: "text-medical-teal",
    path: "#",
  },
  {
    title: "Randevular",
    value: "—",
    change: "",
    changeDir: "up" as const,
    sub: "Yakında",
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

const salesData = [
  { month: "Oca", gelir: 72000 },
  { month: "Şub", gelir: 82000 },
  { month: "Mar", gelir: 65000 },
  { month: "Nis", gelir: 52000 },
  { month: "May", gelir: 48000 },
  { month: "Haz", gelir: 60000 },
  { month: "Tem", gelir: 35000 },
  { month: "Ağu", gelir: 40000 },
  { month: "Eyl", gelir: 32000 },
  { month: "Eki", gelir: 85000 },
  { month: "Kas", gelir: 92000 },
  { month: "Ara", gelir: 98000 },
];

const topSelling = [
  { name: "Omega-3", value: 4200 },
  { name: "Probiyotik", value: 3800 },
  { name: "Vitamin D", value: 3200 },
  { name: "Majistral", value: 2800 },
];

const quickActions = [
  { title: "Yeni Danışan", icon: UserPlus, path: "/yeni-danisan", color: "bg-medical-blue-light text-medical-blue" },
  { title: "Protokol Ekle", icon: FileText, path: "/protokollerim", color: "bg-medical-green-light text-medical-green" },
  { title: "Ürün Ekle", icon: Pill, path: "/urunler", color: "bg-medical-purple-light text-medical-purple" },
  { title: "Formül Ekle", icon: FlaskConical, path: "/formuller", color: "bg-medical-amber-light text-medical-amber" },
];

const barColors = [
  "hsl(220, 70%, 50%)",
  "hsl(262, 60%, 55%)",
  "hsl(190, 60%, 45%)",
  "hsl(152, 60%, 42%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 84%, 60%)",
  "hsl(220, 70%, 65%)",
  "hsl(262, 60%, 65%)",
  "hsl(190, 60%, 55%)",
  "hsl(152, 60%, 52%)",
  "hsl(38, 92%, 60%)",
  "hsl(220, 70%, 45%)",
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* KPI Cards - Coup style with first card featured */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className={`stat-card ${stat.featured ? "stat-card-featured" : stat.color}`}
            onClick={() => stat.path !== "#" && navigate(stat.path)}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  stat.featured ? "bg-white/15" : stat.iconBg
                }`}
              >
                <stat.icon className={`h-5 w-5 ${stat.featured ? "text-white" : stat.iconColor}`} />
              </div>
              {stat.change && (
                <span
                  className={`change-badge ${
                    stat.featured
                      ? "bg-white/15 text-white"
                      : stat.changeDir === "up"
                      ? "change-badge-up"
                      : "change-badge-down"
                  }`}
                >
                  {stat.changeDir === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              )}
            </div>
            <p className={`text-xs font-medium mb-1 ${stat.featured ? "stat-title" : "text-muted-foreground"}`}>
              {stat.title}
            </p>
            <p
              className={`font-display text-2xl font-bold mb-1 ${
                stat.featured ? "stat-value" : "text-foreground"
              }`}
            >
              {stat.value}
            </p>
            <p className={`text-[11px] ${stat.featured ? "stat-change" : "text-muted-foreground"}`}>
              {stat.sub}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Sales Analytics (Bar) + CTA Banner + Top Selling */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Sales Analytics - Coup-style bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="medical-card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="dashboard-section-title">Satış Analizi</h3>
            <select className="text-xs border border-border rounded-lg px-3 py-1.5 bg-accent text-foreground outline-none">
              <option>Bu Ay</option>
              <option>Bu Hafta</option>
              <option>Bu Yıl</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} barSize={28} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 9%, 46%)" axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid hsl(220, 13%, 91%)",
                    fontSize: "12px",
                    boxShadow: "0 4px 12px hsl(220, 20%, 30% / 0.1)",
                  }}
                  formatter={(value: number) => [`₺${value.toLocaleString("tr-TR")}`, "Gelir"]}
                />
                <Bar
                  dataKey="gelir"
                  radius={[6, 6, 0, 0]}
                  fill="hsl(220, 70%, 50%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right column: CTA + Top Selling */}
        <div className="space-y-4">
          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl p-6 text-white relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(220, 70%, 40%) 0%, hsl(262, 60%, 50%) 100%)",
            }}
          >
            <div className="relative z-10">
              <h3 className="font-display text-lg font-bold mb-2">Eczanenizin Verimliliğini Artırın</h3>
              <p className="text-sm text-white/80 mb-4">Danışan takibini optimize edin, formüllerinizi yönetin.</p>
              <button
                onClick={() => navigate("/yeni-danisan")}
                className="inline-flex items-center gap-2 rounded-lg bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-all"
              >
                Başlayın <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
            <div className="absolute -right-2 -bottom-8 h-32 w-32 rounded-full bg-white/5" />
          </motion.div>

          {/* Top Selling */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="medical-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="dashboard-section-title">En Çok Satan</h3>
              <select className="text-xs border border-border rounded-lg px-3 py-1.5 bg-accent text-foreground outline-none">
                <option>Bu Ay</option>
              </select>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSelling} barSize={36}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} stroke="hsl(220, 9%, 46%)" />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 91%)", fontSize: "12px" }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {topSelling.map((_, i) => (
                      <Bar key={i} dataKey="value" fill={["hsl(152, 60%, 42%)", "hsl(152, 60%, 52%)", "hsl(152, 60%, 62%)", "hsl(152, 60%, 72%)"][i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Latest Orders (Danışanlar) + Cari Hareketler */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Latest Orders - Coup table style */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="medical-card p-0 overflow-hidden lg:col-span-2"
        >
          <div className="flex items-center justify-between p-5">
            <h3 className="dashboard-section-title">Son Danışanlar</h3>
            <button
              onClick={() => navigate("/danisan-listesi")}
              className="text-xs font-medium text-primary hover:underline"
            >
              Tümünü Gör
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="medical-table">
              <thead>
                <tr>
                  <th>Hasta</th>
                  <th>Telefon</th>
                  <th>Kayıt Tarihi</th>
                  <th>Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((p, i) => (
                  <tr key={i}>
                    <td className="font-medium">{p.name}</td>
                    <td className="text-muted-foreground">{p.phone}</td>
                    <td className="text-muted-foreground">{p.date}</td>
                    <td>
                      <span className={`badge-status ${p.status === "Aktif" ? "badge-active" : "badge-pending"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button className="icon-btn p-1.5"><Eye className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Cari Hareketler */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="medical-card"
        >
          <h3 className="dashboard-section-title mb-4">
            <Receipt className="h-4 w-4 text-primary" />
            Son Hareketler
          </h3>
          <div className="space-y-3">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    tx.type === "gelir" ? "bg-medical-green-light" : "bg-medical-red-light"
                  }`}>
                    {tx.type === "gelir" ? (
                      <TrendingUp className="h-4 w-4 text-medical-green" />
                    ) : (
                      <ShoppingCart className="h-4 w-4 text-medical-red" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{tx.desc}</p>
                    <p className="text-[11px] text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold shrink-0 ${
                    tx.type === "gelir" ? "text-medical-green" : "text-medical-red"
                  }`}
                >
                  {tx.type === "gelir" ? "+" : "-"}{tx.amount}
                </span>
              </div>
            ))}
            <button
              onClick={() => navigate("/cari-hareketler")}
              className="w-full text-center text-xs font-medium text-primary hover:underline pt-2"
            >
              Tümünü Gör →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions + Yaklaşan Randevular */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
                className="flex flex-col items-center gap-3 rounded-xl border border-border p-4 transition-all hover:shadow-md hover:-translate-y-1 hover:border-primary/20"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-foreground">{action.title}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Yaklaşan Randevular */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="medical-card"
        >
          <h3 className="dashboard-section-title mb-4">
            <Clock className="h-4 w-4 text-primary" />
            Yaklaşan Randevular
          </h3>
          <div className="space-y-3">
            {upcomingAppointments.map((apt, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border p-3.5 hover:bg-accent transition-colors">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-medical-blue-light">
                  <CalendarClock className="h-5 w-5 text-medical-blue" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{apt.patient}</p>
                  <p className="text-xs text-muted-foreground">{apt.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-foreground">{apt.date}</p>
                  <p className="text-xs text-primary font-bold">{apt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Kritik Ürünler */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
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
              className={`flex items-center justify-between rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                product.status === "Kritik"
                  ? "border-medical-red/30 bg-medical-red-light"
                  : "border-medical-amber/30 bg-medical-amber-light"
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{product.name}</p>
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
