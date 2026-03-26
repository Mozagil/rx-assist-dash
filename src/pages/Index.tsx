import { useNavigate } from "react-router-dom";
import {
  Users, PhoneCall, ClipboardCheck, Receipt,
  TrendingUp, CalendarClock, UserPlus,
  Sparkles, PackageX, CalendarHeart, Gift, Cake,
} from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const stats = [
  { title: "Toplam Üye", value: "1.248", change: "+12 bu ay", icon: Users, color: "stat-card-blue", iconBg: "bg-medical-blue-light", iconColor: "text-medical-blue", path: "/danisan-listesi" },
  { title: "Kontrol Aramaları", value: "87", change: "Bu hafta 12", icon: PhoneCall, color: "stat-card-green", iconBg: "bg-medical-green-light", iconColor: "text-medical-green", path: "/kontrol-aramalari" },
  { title: "Değerlendirme Aramaları", value: "56", change: "Bu hafta 8", icon: ClipboardCheck, color: "stat-card-amber", iconBg: "bg-medical-amber-light", iconColor: "text-medical-amber", path: "/degerlendirme-aramalari" },
  { title: "Cilt Bakım Randevuları", value: "24", change: "Bu hafta 6", icon: CalendarHeart, color: "stat-card-purple", iconBg: "bg-medical-purple-light", iconColor: "text-medical-purple", path: "/cilt-bakim-randevulari" },
  { title: "Dermokozmetik Biten", value: "18", change: "Son 30 gün", icon: Sparkles, color: "stat-card-red", iconBg: "bg-medical-red-light", iconColor: "text-medical-red", path: "/dermokozmetik-biten" },
  { title: "Diğer Destek Biten", value: "12", change: "Son 30 gün", icon: PackageX, color: "stat-card-cyan", iconBg: "bg-medical-cyan-light", iconColor: "text-medical-cyan", path: "/diger-destek-biten" },
  { title: "Ciro", value: "₺124.500", change: "+8% geçen aya göre", icon: Receipt, color: "stat-card-teal", iconBg: "bg-medical-teal-light", iconColor: "text-medical-teal", path: "/cari-hareketler" },
  { title: "Aylık Büyüme", value: "%15", change: "Geçen aya göre", icon: TrendingUp, color: "stat-card-green", iconBg: "bg-medical-green-light", iconColor: "text-medical-green", path: "#" },
];

const ciroData = [
  { month: "Eki", value: 85000 }, { month: "Kas", value: 92000 }, { month: "Ara", value: 98000 },
  { month: "Oca", value: 105000 }, { month: "Şub", value: 115000 }, { month: "Mar", value: 124500 },
];
const uyeData = [
  { month: "Eki", value: 1180 }, { month: "Kas", value: 1195 }, { month: "Ara", value: 1210 },
  { month: "Oca", value: 1222 }, { month: "Şub", value: 1236 }, { month: "Mar", value: 1248 },
];
const ciltBakimData = [
  { month: "Eki", value: 18 }, { month: "Kas", value: 22 }, { month: "Ara", value: 20 },
  { month: "Oca", value: 25 }, { month: "Şub", value: 28 }, { month: "Mar", value: 24 },
];
const ciltAnalizData = [
  { month: "Eki", value: 12 }, { month: "Kas", value: 15 }, { month: "Ara", value: 14 },
  { month: "Oca", value: 18 }, { month: "Şub", value: 20 }, { month: "Mar", value: 22 },
];
const sacAnalizData = [
  { month: "Eki", value: 8 }, { month: "Kas", value: 10 }, { month: "Ara", value: 12 },
  { month: "Oca", value: 11 }, { month: "Şub", value: 15 }, { month: "Mar", value: 17 },
];

const birthdays = [
  { name: "Ayşe Çelik", date: "28.03.2026", phone: "0543 321 9876" },
  { name: "Mehmet Kaya", date: "02.04.2026", phone: "0555 456 7890" },
  { name: "Fatma Demir", date: "05.04.2026", phone: "0541 987 6543" },
];

const appointments = [
  { patient: "Ahmet Yılmaz", type: "Cilt Bakım", date: "28.03.2026", time: "10:00" },
  { patient: "Fatma Demir", type: "Cilt Analiz", date: "28.03.2026", time: "11:30" },
  { patient: "Ali Öztürk", type: "Saç Analiz", date: "29.03.2026", time: "09:00" },
  { patient: "Zeynep Ak", type: "Kontrol", date: "29.03.2026", time: "14:00" },
];

const chartConfig = (color: string, label: string) => ({
  color, label,
  gradientId: `grad-${label.replace(/\s/g, "")}`,
});

function MiniChart({ data, config, type = "area" }: { data: any[]; config: { color: string; label: string; gradientId: string }; type?: "area" | "bar" | "line" }) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        {type === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(210,16%,90%)", fontSize: "12px" }} />
            <Bar dataKey="value" fill={config.color} radius={[4, 4, 0, 0]} name={config.label} />
          </BarChart>
        ) : type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(210,16%,90%)", fontSize: "12px" }} />
            <Line type="monotone" dataKey="value" stroke={config.color} strokeWidth={2} dot={{ r: 4 }} name={config.label} />
          </LineChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={config.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={config.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 12%, 50%)" />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(210,16%,90%)", fontSize: "12px" }} />
            <Area type="monotone" dataKey="value" stroke={config.color} strokeWidth={2} fillOpacity={1} fill={`url(#${config.gradientId})`} name={config.label} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const charts = [
    { title: "Aylık Ciro", data: ciroData, config: chartConfig("hsl(199,70%,44%)", "Ciro"), type: "area" as const, formatter: (v: number) => `₺${(v / 1000).toFixed(0)}K` },
    { title: "Aylık Üye Sayısı", data: uyeData, config: chartConfig("hsl(160,45%,45%)", "Üye"), type: "line" as const },
    { title: "Aylık Cilt Bakım Sayısı", data: ciltBakimData, config: chartConfig("hsl(262,52%,50%)", "CiltBakım"), type: "bar" as const },
    { title: "Aylık Cilt Analiz Sayısı", data: ciltAnalizData, config: chartConfig("hsl(185,60%,40%)", "CiltAnaliz"), type: "area" as const },
    { title: "Aylık Saç Analiz Sayısı", data: sacAnalizData, config: chartConfig("hsl(38,92%,50%)", "SaçAnaliz"), type: "bar" as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Dermokozmetik yönetim panelinize hoş geldiniz" />

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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {charts.map((chart, i) => (
          <motion.div
            key={chart.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.05, duration: 0.25 }}
            className={`medical-card ${i === 0 ? "lg:col-span-2 xl:col-span-2" : ""}`}
          >
            <h3 className="dashboard-section-title mb-4">
              <TrendingUp className="h-4 w-4 text-primary" />
              {chart.title}
            </h3>
            <MiniChart data={chart.data} config={chart.config} type={chart.type} />
          </motion.div>
        ))}
      </div>

      {/* Doğum Günü + Randevu Tabloları */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.25 }}
          className="medical-card p-0 overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 pb-0">
            <h3 className="dashboard-section-title">
              <Cake className="h-4 w-4 text-medical-amber" />
              Danışan Doğum Günleri
            </h3>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="medical-table">
              <thead>
                <tr>
                  <th>Danışan</th>
                  <th>Doğum Tarihi</th>
                  <th>Telefon</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {birthdays.map((b, i) => (
                  <tr key={i}>
                    <td className="font-medium">{b.name}</td>
                    <td>{b.date}</td>
                    <td>{b.phone}</td>
                    <td>
                      <button className="text-xs text-primary hover:underline flex items-center gap-1">
                        <Gift className="h-3.5 w-3.5" /> Kutla
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.25 }}
          className="medical-card p-0 overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 pb-0">
            <h3 className="dashboard-section-title">
              <CalendarClock className="h-4 w-4 text-primary" />
              Randevu Özeti
            </h3>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="medical-table">
              <thead>
                <tr>
                  <th>Danışan</th>
                  <th>Tür</th>
                  <th>Tarih</th>
                  <th>Saat</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr key={i}>
                    <td className="font-medium">{a.patient}</td>
                    <td>
                      <span className="badge-status badge-info">{a.type}</span>
                    </td>
                    <td>{a.date}</td>
                    <td className="font-medium text-primary">{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
