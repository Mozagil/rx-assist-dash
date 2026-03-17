import { useNavigate } from "react-router-dom";
import {
  Users,
  AlertTriangle,
  Phone,
  Star,
  Wallet,
  BarChart3,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";

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
    icon: AlertTriangle,
    color: "stat-card-red",
    iconBg: "bg-medical-red-light",
    iconColor: "text-medical-red",
    path: "/destegi-biten",
  },
  {
    title: "Kontrol Aramaları",
    value: "87",
    change: "Bu hafta 12",
    icon: Phone,
    color: "stat-card-green",
    iconBg: "bg-medical-green-light",
    iconColor: "text-medical-green",
    path: "/kontrol-aramalari",
  },
  {
    title: "Değerlendirme Aramaları",
    value: "56",
    change: "Bu hafta 8",
    icon: Star,
    color: "stat-card-amber",
    iconBg: "bg-medical-amber-light",
    iconColor: "text-medical-amber",
    path: "/degerlendirme-aramalari",
  },
  {
    title: "Ciro",
    value: "₺124.500",
    change: "+8% geçen aya göre",
    icon: Wallet,
    color: "stat-card-purple",
    iconBg: "bg-medical-purple-light",
    iconColor: "text-medical-purple",
    path: "/cari-hareketler",
  },
  {
    title: "Aylık Büyüme",
    value: "%15",
    change: "Geçen aya göre",
    icon: TrendingUp,
    color: "stat-card-cyan",
    iconBg: "bg-medical-cyan-light",
    iconColor: "text-medical-cyan",
    path: "#",
  },
  {
    title: "Aktif Tedaviler",
    value: "—",
    change: "Yakında",
    icon: BarChart3,
    color: "stat-card-blue",
    iconBg: "bg-medical-blue-light",
    iconColor: "text-medical-blue",
    path: "#",
  },
  {
    title: "Randevular",
    value: "—",
    change: "Yakında",
    icon: Calendar,
    color: "stat-card-green",
    iconBg: "bg-medical-green-light",
    iconColor: "text-medical-green",
    path: "#",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Eczane yönetim panelinize hoş geldiniz" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className={`stat-card ${stat.color}`}
            onClick={() => stat.path !== "#" && navigate(stat.path)}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
