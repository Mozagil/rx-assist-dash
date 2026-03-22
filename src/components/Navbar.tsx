import { Bell, Search, Settings, ChevronDown, MessageSquare, Maximize2, Moon } from "lucide-react";

export default function Navbar() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Günaydın" : now.getHours() < 18 ? "İyi Günler" : "İyi Akşamlar";
  const dateStr = now.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Left - Greeting */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-medical-green animate-pulse" />
            <span className="font-display text-sm font-semibold text-foreground">{greeting}</span>
          </div>
          <p className="text-xs text-muted-foreground ml-4">{dateStr}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Hasta, ürün veya formül ara..."
            className="search-input pl-9 w-64 text-xs h-9"
          />
        </div>

        <button className="icon-btn hidden sm:flex">
          <MessageSquare className="h-[18px] w-[18px]" />
        </button>

        <button className="icon-btn relative">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
            3
          </span>
        </button>

        <button className="icon-btn hidden sm:flex">
          <Maximize2 className="h-[18px] w-[18px]" />
        </button>

        <button className="icon-btn">
          <Settings className="h-[18px] w-[18px]" />
        </button>

        {/* Profile */}
        <button className="ml-2 flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all hover:bg-accent">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white text-xs font-bold">
            EP
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-foreground">Eczacı</p>
            <p className="text-[10px] text-muted-foreground">Yönetici</p>
          </div>
          <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
