import { useState } from "react";
import {
  Search,
  Calendar,
  Filter,
  FileDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  User,
  Fuel,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowUpDown,
  CalendarDays,
  CalendarRange,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, isWithinInterval, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface HistoryEntry {
  id: string;
  date: string;
  type: "attribution" | "retrait" | "expiration" | "annulation" | "creation_stock";
  code: string;
  employe?: string;
  service?: string;
  litrage: number;
  quantite: number;
  utilisateur: string;
  details: string;
}

const mockHistory: HistoryEntry[] = [
  { id: "1", date: "2024-05-20T14:30:00", type: "retrait", code: "BC-2024-0165", employe: "Martin Dubois", service: "Logistique", litrage: 20, quantite: 3, utilisateur: "Admin", details: "Retrait confirmé" },
  { id: "2", date: "2024-05-20T10:15:00", type: "attribution", code: "BC-2024-0166", employe: "Sophie Laurent", service: "Commercial", litrage: 15, quantite: 2, utilisateur: "Admin", details: "Email envoyé" },
  { id: "3", date: "2024-05-19T16:45:00", type: "retrait", code: "BC-2024-0164", employe: "Pierre Moreau", service: "Direction", litrage: 30, quantite: 2, utilisateur: "Admin", details: "Retrait confirmé" },
  { id: "4", date: "2024-05-19T09:00:00", type: "attribution", code: "BC-2024-0164", employe: "Pierre Moreau", service: "Direction", litrage: 30, quantite: 2, utilisateur: "Admin", details: "Email envoyé" },
  { id: "5", date: "2024-05-18T11:30:00", type: "expiration", code: "BC-2024-0150", employe: "Julie Bernard", service: "Technique", litrage: 10, quantite: 5, utilisateur: "Système", details: "Bon expiré automatiquement" },
  { id: "6", date: "2024-05-17T14:00:00", type: "annulation", code: "BC-2024-0148", employe: "Thomas Petit", service: "Commercial", litrage: 25, quantite: 1, utilisateur: "Admin", details: "Annulé sur demande employé" },
  { id: "7", date: "2024-05-15T08:00:00", type: "creation_stock", code: "LOT-2024-007", litrage: 10, quantite: 200, utilisateur: "Admin", details: "Réception fournisseur TotalEnergies" },
  { id: "8", date: "2024-04-20T10:00:00", type: "attribution", code: "BC-2024-0140", employe: "Marie Lefevre", service: "Logistique", litrage: 15, quantite: 4, utilisateur: "Admin", details: "Email envoyé" },
  { id: "9", date: "2024-04-15T09:30:00", type: "retrait", code: "BC-2024-0138", employe: "Jean Dupont", service: "Direction", litrage: 20, quantite: 2, utilisateur: "Admin", details: "Retrait confirmé" },
  { id: "10", date: "2024-03-10T11:00:00", type: "attribution", code: "BC-2024-0100", employe: "Claire Martin", service: "Commercial", litrage: 30, quantite: 1, utilisateur: "Admin", details: "Email envoyé" },
  { id: "11", date: "2024-02-28T14:30:00", type: "expiration", code: "BC-2024-0080", employe: "Luc Petit", service: "Technique", litrage: 15, quantite: 3, utilisateur: "Système", details: "Bon expiré automatiquement" },
  { id: "12", date: "2024-01-15T10:00:00", type: "creation_stock", code: "LOT-2024-001", litrage: 20, quantite: 500, utilisateur: "Admin", details: "Réception fournisseur Shell" },
];

const typeConfig: Record<string, { label: string; icon: React.ElementType; variant: "default" | "success" | "warning" | "destructive" | "outline" }> = {
  attribution: { label: "Attribution", icon: User, variant: "default" },
  retrait: { label: "Retrait", icon: CheckCircle2, variant: "success" },
  expiration: { label: "Expiration", icon: AlertTriangle, variant: "warning" },
  annulation: { label: "Annulation", icon: XCircle, variant: "destructive" },
  creation_stock: { label: "Stock", icon: Fuel, variant: "outline" },
};

type PeriodPreset = "today" | "week" | "month" | "year" | "custom";

export default function HistoriquePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [litrageFilter, setLitrageFilter] = useState<string>("all");
  const [periodPreset, setPeriodPreset] = useState<PeriodPreset>("month");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const services = [...new Set(mockHistory.filter(h => h.service).map((h) => h.service!))];
  const litrages = [...new Set(mockHistory.map((h) => h.litrage))].sort((a, b) => a - b);

  // Handle period presets
  const handlePeriodChange = (preset: PeriodPreset) => {
    setPeriodPreset(preset);
    const today = new Date();
    
    switch (preset) {
      case "today":
        setDateRange({ from: today, to: today });
        break;
      case "week":
        setDateRange({ from: subDays(today, 7), to: today });
        break;
      case "month":
        setDateRange({ from: startOfMonth(today), to: endOfMonth(today) });
        break;
      case "year":
        setDateRange({ from: startOfYear(today), to: endOfYear(today) });
        break;
      case "custom":
        // Keep current range
        break;
    }
  };

  // Filter history
  const filteredHistory = mockHistory
    .filter((entry) => {
      const matchesSearch =
        entry.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.employe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.details.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || entry.type === typeFilter;
      const matchesService = serviceFilter === "all" || entry.service === serviceFilter;
      const matchesLitrage = litrageFilter === "all" || entry.litrage.toString() === litrageFilter;
      
      // Date filter
      const entryDate = parseISO(entry.date);
      const matchesDate = dateRange?.from && dateRange?.to
        ? isWithinInterval(entryDate, { start: dateRange.from, end: dateRange.to })
        : true;

      return matchesSearch && matchesType && matchesService && matchesLitrage && matchesDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: filteredHistory.length,
    attributions: filteredHistory.filter((h) => h.type === "attribution").length,
    retraits: filteredHistory.filter((h) => h.type === "retrait").length,
    expirations: filteredHistory.filter((h) => h.type === "expiration").length,
    totalLitres: filteredHistory.reduce((acc, h) => acc + h.litrage * h.quantite, 0),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Historique & Traçabilité</h1>
          <p className="text-muted-foreground">
            Consultez l'historique complet des opérations
          </p>
        </div>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Period Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs value={periodPreset} onValueChange={(v) => handlePeriodChange(v as PeriodPreset)}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList>
                <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
                <TabsTrigger value="week">7 jours</TabsTrigger>
                <TabsTrigger value="month">Ce mois</TabsTrigger>
                <TabsTrigger value="year">Cette année</TabsTrigger>
                <TabsTrigger value="custom">Personnalisé</TabsTrigger>
              </TabsList>
              
              {periodPreset === "custom" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-auto">
                      <CalendarRange className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd MMM", { locale: fr })} -{" "}
                            {format(dateRange.to, "dd MMM yyyy", { locale: fr })}
                          </>
                        ) : (
                          format(dateRange.from, "dd MMM yyyy", { locale: fr })
                        )
                      ) : (
                        "Sélectionner une période"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total opérations</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Attributions</p>
            <p className="text-2xl font-bold text-primary">{stats.attributions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Retraits</p>
            <p className="text-2xl font-bold text-success">{stats.retraits}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Expirations</p>
            <p className="text-2xl font-bold text-warning">{stats.expirations}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total litres</p>
            <p className="text-2xl font-bold">{stats.totalLitres.toLocaleString()}L</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par code, employé ou détails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="attribution">Attribution</SelectItem>
                <SelectItem value="retrait">Retrait</SelectItem>
                <SelectItem value="expiration">Expiration</SelectItem>
                <SelectItem value="annulation">Annulation</SelectItem>
                <SelectItem value="creation_stock">Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous services</SelectItem>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={litrageFilter} onValueChange={setLitrageFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Litrage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous litrages</SelectItem>
                {litrages.map((litrage) => (
                  <SelectItem key={litrage} value={litrage.toString()}>
                    {litrage}L
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Heure</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Employé</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Bons</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead>Par</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Aucun résultat pour cette période
                </TableCell>
              </TableRow>
            ) : (
              paginatedHistory.map((entry) => {
                const config = typeConfig[entry.type];
                const IconComponent = config.icon;
                return (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{format(parseISO(entry.date), "dd/MM/yyyy", { locale: fr })}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(entry.date), "HH:mm", { locale: fr })}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={config.variant} className="gap-1">
                        <IconComponent className="h-3 w-3" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{entry.code}</TableCell>
                    <TableCell>{entry.employe || "-"}</TableCell>
                    <TableCell>{entry.service || "-"}</TableCell>
                    <TableCell>
                      <span className="font-medium">{entry.quantite}x {entry.litrage}L</span>
                      <span className="text-muted-foreground text-xs ml-1">
                        ({entry.quantite * entry.litrage}L)
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {entry.details}
                    </TableCell>
                    <TableCell className="text-sm">{entry.utilisateur}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {filteredHistory.length} résultats • Page {currentPage} sur {totalPages || 1}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
