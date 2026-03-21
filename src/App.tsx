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
import DestegiBiten from "./pages/DestegiBiten";
import KontrolAramalari from "./pages/KontrolAramalari";
import DegerlendirmeAramalari from "./pages/DegerlendirmeAramalari";
import Protokollerim from "./pages/Protokollerim";
import Hedeflerim from "./pages/Hedeflerim";
import BilgilendirmeMesajlari from "./pages/BilgilendirmeMesajlari";
import YeniDanisan from "./pages/YeniDanisan";
import Urunler from "./pages/Urunler";
import Formuller from "./pages/Formuller";
import CariHareketler from "./pages/CariHareketler";
import Kullanicilar from "./pages/Kullanicilar";
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
            <Route path="/danisan/:id/protokol" element={<DanisanProtokoller />} />
            <Route path="/danisan/:id/bilgilendirme" element={<DanisanBilgilendirme />} />
            <Route path="/danisan/:id/kayit-ozeti" element={<KayitOzeti />} />
            <Route path="/destegi-biten" element={<DestegiBiten />} />
            <Route path="/kontrol-aramalari" element={<KontrolAramalari />} />
            <Route path="/degerlendirme-aramalari" element={<DegerlendirmeAramalari />} />
            <Route path="/protokollerim" element={<Protokollerim />} />
            <Route path="/hedeflerim" element={<Hedeflerim />} />
            <Route path="/bilgilendirme-mesajlari" element={<BilgilendirmeMesajlari />} />
            <Route path="/yeni-danisan" element={<YeniDanisan />} />
            <Route path="/urunler" element={<Urunler />} />
            <Route path="/formuller" element={<Formuller />} />
            <Route path="/cari-hareketler" element={<CariHareketler />} />
            <Route path="/kullanicilar" element={<Kullanicilar />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
