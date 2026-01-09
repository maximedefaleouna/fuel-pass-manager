import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, subMonths, subYears } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

export type PeriodType = "today" | "week" | "month" | "quarter" | "year" | "custom";

interface DateRange {
  from: Date;
  to: Date;
}

interface PeriodFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const periodOptions: { value: PeriodType; label: string }[] = [
  { value: "today", label: "Aujourd'hui" },
  { value: "week", label: "Cette semaine" },
  { value: "month", label: "Ce mois" },
  { value: "quarter", label: "Ce trimestre" },
  { value: "year", label: "Cette année" },
  { value: "custom", label: "Période personnalisée" },
];

export function getDateRangeForPeriod(period: PeriodType): DateRange {
  const now = new Date();
  
  switch (period) {
    case "today":
      return { from: startOfDay(now), to: endOfDay(now) };
    case "week":
      return { from: startOfWeek(now, { weekStartsOn: 1 }), to: endOfWeek(now, { weekStartsOn: 1 }) };
    case "month":
      return { from: startOfMonth(now), to: endOfMonth(now) };
    case "quarter": {
      const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
      const quarterEnd = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 + 3, 0);
      return { from: quarterStart, to: quarterEnd };
    }
    case "year":
      return { from: startOfYear(now), to: endOfYear(now) };
    default:
      return { from: startOfMonth(now), to: endOfMonth(now) };
  }
}

export function PeriodFilter({ value, onChange, className }: PeriodFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("month");
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customRange, setCustomRange] = useState<{ from?: Date; to?: Date }>({
    from: value.from,
    to: value.to,
  });

  const handlePeriodSelect = (period: PeriodType) => {
    setSelectedPeriod(period);
    if (period === "custom") {
      setIsCustomOpen(true);
    } else {
      const range = getDateRangeForPeriod(period);
      onChange(range);
      setIsOpen(false);
    }
  };

  const handleCustomApply = () => {
    if (customRange.from && customRange.to) {
      onChange({ from: customRange.from, to: customRange.to });
      setIsCustomOpen(false);
      setIsOpen(false);
    }
  };

  const formatDisplayDate = () => {
    if (selectedPeriod !== "custom") {
      return periodOptions.find(p => p.value === selectedPeriod)?.label || "Sélectionner";
    }
    return `${format(value.from, "dd/MM/yyyy", { locale: fr })} - ${format(value.to, "dd/MM/yyyy", { locale: fr })}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("min-w-[200px] justify-between", className)}>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDisplayDate()}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {!isCustomOpen ? (
          <div className="p-2 space-y-1">
            {periodOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedPeriod === option.value ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handlePeriodSelect(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <div className="text-sm font-medium">Sélectionner une période</div>
            <div className="flex gap-2">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Du</label>
                <CalendarComponent
                  mode="single"
                  selected={customRange.from}
                  onSelect={(date) => setCustomRange({ ...customRange, from: date })}
                  locale={fr}
                  className="border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Au</label>
                <CalendarComponent
                  mode="single"
                  selected={customRange.to}
                  onSelect={(date) => setCustomRange({ ...customRange, to: date })}
                  locale={fr}
                  className="border rounded-md"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setIsCustomOpen(false)}>
                Retour
              </Button>
              <Button 
                size="sm" 
                onClick={handleCustomApply}
                disabled={!customRange.from || !customRange.to}
              >
                Appliquer
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
