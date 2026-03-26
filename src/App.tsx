import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import DanisanListesi from "./pages/DanisanListesi";
import DanisanProfili from "./pages/DanisanProfili";
import OnGorusme from "./pages/OnGorusme";
import VerilenDestek from "./pages/VerilenDestek";
import KontrolAramalari from "./pages/KontrolAramalari";
import DegerlendirmeAramalari from "./pages/DegerlendirmeAramalari";
import CiltBakimRandevulari from "./pages/CiltBakimRandevulari";
import DermokozmetikBiten from "./pages/DermokozmetikBiten";
import DigerDestekBiten from "./pages/DigerDestekBiten";
import CariHareketler from "./pages/CariHareketler";
import Kullanicilar from "./pages/Kullanicilar";
import YeniDanisan from "./pages/YeniDanisan";
import DanisanProtokoller from "./pages/DanisanProtokoller";
import DanisanBilgilendirme from "./pages/DanisanBilgilendirme";
import KayitOzeti from "./pages/KayitOzeti";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/danisan-listesi" element={<DanisanListesi />} />
            <Route path="/danisan/:id" element={<DanisanProfili />} />
            <Route path="/danisan/:id/on-gorusme" element={<OnGorusme />} />
            <Route path="/danisan/:id/verilen-destek" element={<VerilenDestek />} />
            <Route path="/danisan/:id/dermokozmetik-urunleri" element={<VerilenDestek />} />
            <Route path="/danisan/:id/diger-destek-urunleri" element={<VerilenDestek />} />
            <Route path="/danisan/:id/protokol" element={<DanisanProtokoller />} />
            <Route path="/danisan/:id/bilgilendirme" element={<DanisanBilgilendirme />} />
            <Route path="/danisan/:id/kayit-ozeti" element={<KayitOzeti />} />
            <Route path="/kontrol-aramalari" element={<KontrolAramalari />} />
            <Route path="/degerlendirme-aramalari" element={<DegerlendirmeAramalari />} />
            <Route path="/cilt-bakim-randevulari" element={<CiltBakimRandevulari />} />
            <Route path="/dermokozmetik-biten" element={<DermokozmetikBiten />} />
            <Route path="/diger-destek-biten" element={<DigerDestekBiten />} />
            <Route path="/cari-hareketler" element={<CariHareketler />} />
            <Route path="/kullanicilar" element={<Kullanicilar />} />
            <Route path="/yeni-danisan" element={<YeniDanisan />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
