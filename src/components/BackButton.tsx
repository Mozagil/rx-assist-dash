import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-destructive-foreground bg-destructive hover:bg-destructive/90 transition-all mb-4 -ml-1 shadow-sm"
    >
      <ArrowLeft className="h-4 w-4" />
      Geri
    </button>
  );
}
