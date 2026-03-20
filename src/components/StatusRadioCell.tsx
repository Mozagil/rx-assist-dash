import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type StatusValue = "aranmadi" | "ulasti" | "ulasilamadi";

interface StatusRadioCellProps {
  initialStatus?: StatusValue;
  onConfirm: (status: StatusValue, date?: Date) => void;
}

export default function StatusRadioCell({ initialStatus = "aranmadi", onConfirm }: StatusRadioCellProps) {
  const [status, setStatus] = useState<StatusValue>(initialStatus);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleChange = (val: StatusValue) => {
    if (val === "ulasti") {
      setShowDialog(true);
    } else {
      setStatus(val);
      onConfirm(val);
    }
  };

  const handleConfirm = () => {
    setStatus("ulasti");
    setShowDialog(false);
    onConfirm("ulasti", selectedDate);
  };

  const radioOptions: { value: StatusValue; label: string }[] = [
    { value: "ulasti", label: "Ulaşıldı" },
    { value: "ulasilamadi", label: "Ulaşılamadı" },
    { value: "aranmadi", label: "Aranmadı" },
  ];

  return (
    <>
      <div className="flex flex-col gap-1.5">
        {radioOptions.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex items-center gap-2 cursor-pointer text-xs font-medium rounded-md px-2 py-1 transition-colors",
              status === opt.value && opt.value === "ulasti" && "text-[hsl(var(--medical-green))] bg-[hsl(var(--medical-green-light))]",
              status === opt.value && opt.value === "ulasilamadi" && "text-[hsl(var(--medical-amber))] bg-[hsl(var(--medical-amber-light))]",
              status === opt.value && opt.value === "aranmadi" && "text-[hsl(var(--medical-red))] bg-[hsl(var(--medical-red-light))]",
              status !== opt.value && "text-muted-foreground hover:bg-accent"
            )}
          >
            <input
              type="radio"
              name={`status-${Math.random()}`}
              checked={status === opt.value}
              onChange={() => handleChange(opt.value)}
              className="accent-[hsl(var(--primary))] h-3.5 w-3.5"
            />
            {opt.label}
          </label>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md border-none shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-lg bg-gradient-to-r from-[hsl(var(--medical-green))] to-[hsl(var(--primary))]" />
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-[var(--font-display)]">
              Bu hastaya ulaşıldı mı?
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">Lütfen ulaşılan tarihi seçin:</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd.MM.yyyy") : "Tarih seçin"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>İptal</Button>
            <Button onClick={handleConfirm} className="bg-[hsl(var(--medical-green))] hover:bg-[hsl(var(--medical-green))]/90 text-white">
              Onayla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
