import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function DetailModal({ open, onClose, title, description }: DetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-none shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-lg bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))]" />
        <DialogHeader className="pt-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/0.1)]">
              <FileText className="h-5 w-5 text-[hsl(var(--primary))]" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground font-[var(--font-display)]">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="mt-2 rounded-lg bg-[hsl(var(--primary)/0.04)] border border-[hsl(var(--primary)/0.1)] p-5">
          <p className="text-sm leading-relaxed text-foreground/80">{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
