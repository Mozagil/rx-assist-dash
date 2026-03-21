import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import pharmacyBg from "@/assets/pharmacy-bg.jpg";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full lg:w-[480px] flex-col justify-center px-8 md:px-12 lg:px-16 bg-background">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-xl bg-[hsl(var(--primary))] flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground font-[var(--font-display)]">EczaPanel</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Hesabınıza giriş yapın" : "Yeni bir hesap oluşturun"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-semibold text-foreground mb-1.5 block">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] focus:border-[hsl(var(--primary))] outline-none transition-all"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] focus:border-[hsl(var(--primary))] outline-none transition-all"
                  placeholder="ornek@eczane.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1.5 block">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-10 py-3 text-sm focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] focus:border-[hsl(var(--primary))] outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-[hsl(var(--primary))] hover:underline font-medium">
                  Şifremi Unuttum
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] text-primary-foreground py-3 font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[hsl(var(--primary)/0.25)]"
            >
              {isLogin ? "Giriş Yap" : "Kayıt Ol"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[hsl(var(--primary))] font-semibold hover:underline"
              >
                {isLogin ? "Kayıt Ol" : "Giriş Yap"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Wallpaper */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${pharmacyBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[hsl(var(--primary)/0.6)]" />
        <div className="relative z-10 text-center text-white px-12 max-w-lg">
          <h2 className="text-3xl font-bold mb-4 font-[var(--font-display)]">
            Eczanenizi Dijital Olarak Yönetin
          </h2>
          <p className="text-base opacity-90 leading-relaxed">
            Hasta takibi, formül yönetimi, stok kontrolü ve finansal raporlama — hepsi tek bir platformda.
          </p>
        </div>
      </div>
    </div>
  );
}
