import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="btn-medical-ghost text-muted-foreground mb-4 -ml-1"
    >
      <ArrowLeft className="h-4 w-4" />
      Geri
    </button>
  );
}
