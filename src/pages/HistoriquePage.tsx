// import { useState } from "react";
// import {
//   Search,
//   Calendar,
//   Filter,
//   FileDown,
//   ChevronLeft,
//   ChevronRight,
//   Eye,
//   Clock,
//   User,
//   Fuel,
//   CheckCircle2,
//   XCircle,
//   AlertTriangle,
//   ArrowUpDown,
//   CalendarDays,
//   CalendarRange,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar as CalendarComponent } from "@/components/ui/calendar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, isWithinInterval, parseISO } from "date-fns";
// import { fr } from "date-fns/locale";
// import { DateRange } from "react-day-picker";

// interface HistoryEntry {
//   id: string;
//   date: string;
//   type: "attribution" | "retrait" | "expiration" | "annulation" | "creation_stock";
//   code: string;
//   employe?: string;
//   service?: string;
//   litrage: number;
//   quantite: number;
//   utilisateur: string;
//   details: string;
// }

// const mockHistory: HistoryEntry[] = [
//   { id: "1", date: "2024-05-20T14:30:00", type: "retrait", code: "BC-2024-0165", employe: "Martin Dubois", service: "Logistique", litrage: 20, quantite: 3, utilisateur: "Admin", details: "Retrait confirmé" },
//   { id: "2", date: "2024-05-20T10:15:00", type: "attribution", code: "BC-2024-0166", employe: "Sophie Laurent", service: "Commercial", litrage: 15, quantite: 2, utilisateur: "Admin", details: "Email envoyé" },
//   { id: "3", date: "2024-05-19T16:45:00", type: "retrait", code: "BC-2024-0164", employe: "Pierre Moreau", service: "Direction", litrage: 30, quantite: 2, utilisateur: "Admin", details: "Retrait confirmé" },
//   { id: "4", date: "2024-05-19T09:00:00", type: "attribution", code: "BC-2024-0164", employe: "Pierre Moreau", service: "Direction", litrage: 30, quantite: 2, utilisateur: "Admin", details: "Email envoyé" },
//   { id: "5", date: "2024-05-18T11:30:00", type: "expiration", code: "BC-2024-0150", employe: "Julie Bernard", service: "Technique", litrage: 10, quantite: 5, utilisateur: "Système", details: "Bon expiré automatiquement" },
//   { id: "6", date: "2024-05-17T14:00:00", type: "annulation", code: "BC-2024-0148", employe: "Thomas Petit", service: "Commercial", litrage: 25, quantite: 1, utilisateur: "Admin", details: "Annulé sur demande employé" },
//   { id: "7", date: "2024-05-15T08:00:00", type: "creation_stock", code: "LOT-2024-007", litrage: 10, quantite: 200, utilisateur: "Admin", details: "Réception fournisseur TotalEnergies" },
//   { id: "8", date: "2024-04-20T10:00:00", type: "attribution", code: "BC-2024-0140", employe: "Marie Lefevre", service: "Logistique", litrage: 15, quantite: 4, utilisateur: "Admin", details: "Email envoyé" },
//   { id: "9", date: "2024-04-15T09:30:00", type: "retrait", code: "BC-2024-0138", employe: "Jean Dupont", service: "Direction", litrage: 20, quantite: 2, utilisateur: "Admin", details: "Retrait confirmé" },
//   { id: "10", date: "2024-03-10T11:00:00", type: "attribution", code: "BC-2024-0100", employe: "Claire Martin", service: "Commercial", litrage: 30, quantite: 1, utilisateur: "Admin", details: "Email envoyé" },
//   { id: "11", date: "2024-02-28T14:30:00", type: "expiration", code: "BC-2024-0080", employe: "Luc Petit", service: "Technique", litrage: 15, quantite: 3, utilisateur: "Système", details: "Bon expiré automatiquement" },
//   { id: "12", date: "2024-01-15T10:00:00", type: "creation_stock", code: "LOT-2024-001", litrage: 20, quantite: 500, utilisateur: "Admin", details: "Réception fournisseur Shell" },
// ];

// const typeConfig: Record<string, { label: string; icon: React.ElementType; variant: "default" | "success" | "warning" | "destructive" | "outline" }> = {
//   attribution: { label: "Attribution", icon: User, variant: "default" },
//   retrait: { label: "Retrait", icon: CheckCircle2, variant: "success" },
//   expiration: { label: "Expiration", icon: AlertTriangle, variant: "warning" },
//   annulation: { label: "Annulation", icon: XCircle, variant: "destructive" },
//   creation_stock: { label: "Stock", icon: Fuel, variant: "outline" },
// };

// type PeriodPreset = "today" | "week" | "month" | "year" | "custom";

// export default function HistoriquePage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [typeFilter, setTypeFilter] = useState<string>("all");
//   const [serviceFilter, setServiceFilter] = useState<string>("all");
//   const [litrageFilter, setLitrageFilter] = useState<string>("all");
//   const [periodPreset, setPeriodPreset] = useState<PeriodPreset>("month");
//   const [dateRange, setDateRange] = useState<DateRange | undefined>({
//     from: startOfMonth(new Date()),
//     to: endOfMonth(new Date()),
//   });
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const services = [...new Set(mockHistory.filter(h => h.service).map((h) => h.service!))];
//   const litrages = [...new Set(mockHistory.map((h) => h.litrage))].sort((a, b) => a - b);

//   // Handle period presets
//   const handlePeriodChange = (preset: PeriodPreset) => {
//     setPeriodPreset(preset);
//     const today = new Date();

//     switch (preset) {
//       case "today":
//         setDateRange({ from: today, to: today });
//         break;
//       case "week":
//         setDateRange({ from: subDays(today, 7), to: today });
//         break;
//       case "month":
//         setDateRange({ from: startOfMonth(today), to: endOfMonth(today) });
//         break;
//       case "year":
//         setDateRange({ from: startOfYear(today), to: endOfYear(today) });
//         break;
//       case "custom":
//         // Keep current range
//         break;
//     }
//   };

//   // Filter history
//   const filteredHistory = mockHistory
//     .filter((entry) => {
//       const matchesSearch =
//         entry.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         entry.employe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         entry.details.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesType = typeFilter === "all" || entry.type === typeFilter;
//       const matchesService = serviceFilter === "all" || entry.service === serviceFilter;
//       const matchesLitrage = litrageFilter === "all" || entry.litrage.toString() === litrageFilter;

//       // Date filter
//       const entryDate = parseISO(entry.date);
//       const matchesDate = dateRange?.from && dateRange?.to
//         ? isWithinInterval(entryDate, { start: dateRange.from, end: dateRange.to })
//         : true;

//       return matchesSearch && matchesType && matchesService && matchesLitrage && matchesDate;
//     })
//     .sort((a, b) => {
//       const dateA = new Date(a.date).getTime();
//       const dateB = new Date(b.date).getTime();
//       return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
//     });

//   const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
//   const paginatedHistory = filteredHistory.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Stats
//   const stats = {
//     total: filteredHistory.length,
//     attributions: filteredHistory.filter((h) => h.type === "attribution").length,
//     retraits: filteredHistory.filter((h) => h.type === "retrait").length,
//     expirations: filteredHistory.filter((h) => h.type === "expiration").length,
//     totalLitres: filteredHistory.reduce((acc, h) => acc + h.litrage * h.quantite, 0),
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">Historique & Traçabilité</h1>
//           <p className="text-muted-foreground">
//             Consultez l'historique complet des opérations
//           </p>
//         </div>
//         <Button variant="outline">
//           <FileDown className="mr-2 h-4 w-4" />
//           Exporter
//         </Button>
//       </div>

//       {/* Period Tabs */}
//       <Card>
//         <CardContent className="pt-6">
//           <Tabs value={periodPreset} onValueChange={(v) => handlePeriodChange(v as PeriodPreset)}>
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <TabsList>
//                 <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
//                 <TabsTrigger value="week">7 jours</TabsTrigger>
//                 <TabsTrigger value="month">Ce mois</TabsTrigger>
//                 <TabsTrigger value="year">Cette année</TabsTrigger>
//                 <TabsTrigger value="custom">Personnalisé</TabsTrigger>
//               </TabsList>

//               {periodPreset === "custom" && (
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button variant="outline" className="w-auto">
//                       <CalendarRange className="mr-2 h-4 w-4" />
//                       {dateRange?.from ? (
//                         dateRange.to ? (
//                           <>
//                             {format(dateRange.from, "dd MMM", { locale: fr })} -{" "}
//                             {format(dateRange.to, "dd MMM yyyy", { locale: fr })}
//                           </>
//                         ) : (
//                           format(dateRange.from, "dd MMM yyyy", { locale: fr })
//                         )
//                       ) : (
//                         "Sélectionner une période"
//                       )}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="end">
//                     <CalendarComponent
//                       initialFocus
//                       mode="range"
//                       defaultMonth={dateRange?.from}
//                       selected={dateRange}
//                       onSelect={setDateRange}
//                       numberOfMonths={2}
//                       locale={fr}
//                     />
//                   </PopoverContent>
//                 </Popover>
//               )}
//             </div>
//           </Tabs>
//         </CardContent>
//       </Card>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <p className="text-sm text-muted-foreground">Total opérations</p>
//             <p className="text-2xl font-bold">{stats.total}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <p className="text-sm text-muted-foreground">Attributions</p>
//             <p className="text-2xl font-bold text-primary">{stats.attributions}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <p className="text-sm text-muted-foreground">Retraits</p>
//             <p className="text-2xl font-bold text-success">{stats.retraits}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <p className="text-sm text-muted-foreground">Expirations</p>
//             <p className="text-2xl font-bold text-warning">{stats.expirations}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <p className="text-sm text-muted-foreground">Total litres</p>
//             <p className="text-2xl font-bold">{stats.totalLitres.toLocaleString()}L</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Rechercher par code, employé ou détails..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger className="w-full sm:w-[160px]">
//                 <SelectValue placeholder="Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tous types</SelectItem>
//                 <SelectItem value="attribution">Attribution</SelectItem>
//                 <SelectItem value="retrait">Retrait</SelectItem>
//                 <SelectItem value="expiration">Expiration</SelectItem>
//                 <SelectItem value="annulation">Annulation</SelectItem>
//                 <SelectItem value="creation_stock">Stock</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={serviceFilter} onValueChange={setServiceFilter}>
//               <SelectTrigger className="w-full sm:w-[160px]">
//                 <SelectValue placeholder="Service" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tous services</SelectItem>
//                 {services.map((service) => (
//                   <SelectItem key={service} value={service}>
//                     {service}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Select value={litrageFilter} onValueChange={setLitrageFilter}>
//               <SelectTrigger className="w-full sm:w-[140px]">
//                 <SelectValue placeholder="Litrage" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tous litrages</SelectItem>
//                 {litrages.map((litrage) => (
//                   <SelectItem key={litrage} value={litrage.toString()}>
//                     {litrage}L
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
//             >
//               <ArrowUpDown className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Table */}
//       <div className="table-container">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Date & Heure</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Code</TableHead>
//               <TableHead>Employé</TableHead>
//               <TableHead>Service</TableHead>
//               <TableHead>Bons</TableHead>
//               <TableHead>Détails</TableHead>
//               <TableHead>Par</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedHistory.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
//                   Aucun résultat pour cette période
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginatedHistory.map((entry) => {
//                 const config = typeConfig[entry.type];
//                 const IconComponent = config.icon;
//                 return (
//                   <TableRow key={entry.id}>
//                     <TableCell>
//                       <div>
//                         <p className="font-medium">{format(parseISO(entry.date), "dd/MM/yyyy", { locale: fr })}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {format(parseISO(entry.date), "HH:mm", { locale: fr })}
//                         </p>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={config.variant} className="gap-1">
//                         <IconComponent className="h-3 w-3" />
//                         {config.label}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="font-mono text-sm">{entry.code}</TableCell>
//                     <TableCell>{entry.employe || "-"}</TableCell>
//                     <TableCell>{entry.service || "-"}</TableCell>
//                     <TableCell>
//                       <span className="font-medium">{entry.quantite}x {entry.litrage}L</span>
//                       <span className="text-muted-foreground text-xs ml-1">
//                         ({entry.quantite * entry.litrage}L)
//                       </span>
//                     </TableCell>
//                     <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
//                       {entry.details}
//                     </TableCell>
//                     <TableCell className="text-sm">{entry.utilisateur}</TableCell>
//                   </TableRow>
//                 );
//               })
//             )}
//           </TableBody>
//         </Table>

//         {/* Pagination */}
//         <div className="flex items-center justify-between px-4 py-4 border-t border-border">
//           <p className="text-sm text-muted-foreground">
//             {filteredHistory.length} résultats • Page {currentPage} sur {totalPages || 1}
//           </p>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               const page = i + 1;
//               return (
//                 <Button
//                   key={page}
//                   variant={currentPage === page ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setCurrentPage(page)}
//                 >
//                   {page}
//                 </Button>
//               );
//             })}
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages || totalPages === 0}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
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
  Download,
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
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subDays,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { fr } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface HistoryEntry {
  id: string;
  date: string;
  type:
    | "attribution"
    | "retrait"
    | "expiration"
    | "annulation"
    | "creation_stock";
  code: string;
  employe?: string;
  service?: string;
  litrage: number;
  quantite: number;
  utilisateur: string;
  details: string;
}

const mockHistory: HistoryEntry[] = [
  {
    id: "1",
    date: "2024-05-20T14:30:00",
    type: "retrait",
    code: "BC-2024-0165",
    employe: "Martin Dubois",
    service: "Logistique",
    litrage: 20,
    quantite: 3,
    utilisateur: "Admin",
    details: "Retrait confirmé",
  },
  {
    id: "2",
    date: "2024-05-20T10:15:00",
    type: "attribution",
    code: "BC-2024-0166",
    employe: "Sophie Laurent",
    service: "Commercial",
    litrage: 15,
    quantite: 2,
    utilisateur: "Admin",
    details: "Email envoyé",
  },
  {
    id: "3",
    date: "2024-05-19T16:45:00",
    type: "retrait",
    code: "BC-2024-0164",
    employe: "Pierre Moreau",
    service: "Direction",
    litrage: 30,
    quantite: 2,
    utilisateur: "Admin",
    details: "Retrait confirmé",
  },
  {
    id: "4",
    date: "2024-05-19T09:00:00",
    type: "attribution",
    code: "BC-2024-0164",
    employe: "Pierre Moreau",
    service: "Direction",
    litrage: 30,
    quantite: 2,
    utilisateur: "Admin",
    details: "Email envoyé",
  },
  {
    id: "5",
    date: "2024-05-18T11:30:00",
    type: "expiration",
    code: "BC-2024-0150",
    employe: "Julie Bernard",
    service: "Technique",
    litrage: 10,
    quantite: 5,
    utilisateur: "Système",
    details: "Bon expiré automatiquement",
  },
  {
    id: "6",
    date: "2024-05-17T14:00:00",
    type: "annulation",
    code: "BC-2024-0148",
    employe: "Thomas Petit",
    service: "Commercial",
    litrage: 25,
    quantite: 1,
    utilisateur: "Admin",
    details: "Annulé sur demande employé",
  },
  {
    id: "7",
    date: "2024-05-15T08:00:00",
    type: "creation_stock",
    code: "LOT-2024-007",
    litrage: 10,
    quantite: 200,
    utilisateur: "Admin",
    details: "Réception fournisseur TotalEnergies",
  },
  {
    id: "8",
    date: "2024-04-20T10:00:00",
    type: "attribution",
    code: "BC-2024-0140",
    employe: "Marie Lefevre",
    service: "Logistique",
    litrage: 15,
    quantite: 4,
    utilisateur: "Admin",
    details: "Email envoyé",
  },
  {
    id: "9",
    date: "2024-04-15T09:30:00",
    type: "retrait",
    code: "BC-2024-0138",
    employe: "Jean Dupont",
    service: "Direction",
    litrage: 20,
    quantite: 2,
    utilisateur: "Admin",
    details: "Retrait confirmé",
  },
  {
    id: "10",
    date: "2024-03-10T11:00:00",
    type: "attribution",
    code: "BC-2024-0100",
    employe: "Claire Martin",
    service: "Commercial",
    litrage: 30,
    quantite: 1,
    utilisateur: "Admin",
    details: "Email envoyé",
  },
  {
    id: "11",
    date: "2024-02-28T14:30:00",
    type: "expiration",
    code: "BC-2024-0080",
    employe: "Luc Petit",
    service: "Technique",
    litrage: 15,
    quantite: 3,
    utilisateur: "Système",
    details: "Bon expiré automatiquement",
  },
  {
    id: "12",
    date: "2024-01-15T10:00:00",
    type: "creation_stock",
    code: "LOT-2024-001",
    litrage: 20,
    quantite: 500,
    utilisateur: "Admin",
    details: "Réception fournisseur Shell",
  },
  {
    id: "13",
    date: "2024-05-21T09:15:00",
    type: "attribution",
    code: "BC-2024-0167",
    employe: "Alice Durand",
    service: "RH",
    litrage: 25,
    quantite: 2,
    utilisateur: "Admin",
    details: "Nouvelle attribution",
  },
  {
    id: "14",
    date: "2024-05-21T14:20:00",
    type: "retrait",
    code: "BC-2024-0167",
    employe: "Alice Durand",
    service: "RH",
    litrage: 25,
    quantite: 2,
    utilisateur: "Admin",
    details: "Retrait effectué",
  },
  {
    id: "15",
    date: "2024-05-22T11:45:00",
    type: "annulation",
    code: "BC-2024-0168",
    employe: "Robert Chevalier",
    service: "Technique",
    litrage: 10,
    quantite: 3,
    utilisateur: "Admin",
    details: "Erreur de saisie",
  },
];

const typeConfig: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    variant: "default" | "success" | "warning" | "destructive" | "outline";
  }
> = {
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

  // Calcul des données filtrées
  const filteredHistory = mockHistory.filter((entry) => {
    // Filtre de recherche
    const matchesSearch =
      searchTerm === "" ||
      entry.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.employe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtre par type
    const matchesType = typeFilter === "all" || entry.type === typeFilter;

    // Filtre par service
    const matchesService =
      serviceFilter === "all" || entry.service === serviceFilter;

    // Filtre par litrage
    const matchesLitrage =
      litrageFilter === "all" || entry.litrage.toString() === litrageFilter;

    // Filtre par date
    const entryDate = parseISO(entry.date);
    const matchesDate =
      dateRange?.from && dateRange?.to
        ? isWithinInterval(entryDate, {
            start: dateRange.from,
            end: dateRange.to,
          })
        : true;

    return (
      matchesSearch &&
      matchesType &&
      matchesService &&
      matchesLitrage &&
      matchesDate
    );
  });

  // Tri des données
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  // Calcul des services disponibles (basés sur les données filtrées)
  const services = [
    ...new Set(sortedHistory.filter((h) => h.service).map((h) => h.service!)),
  ].sort();

  // Calcul des litrages disponibles (basés sur les données filtrées)
  const litrages = [...new Set(sortedHistory.map((h) => h.litrage))].sort(
    (a, b) => a - b
  );

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(sortedHistory.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistory = sortedHistory.slice(startIndex, endIndex);

  // Statistiques
  const stats = {
    total: sortedHistory.length,
    attributions: sortedHistory.filter((h) => h.type === "attribution").length,
    retraits: sortedHistory.filter((h) => h.type === "retrait").length,
    expirations: sortedHistory.filter((h) => h.type === "expiration").length,
    annulations: sortedHistory.filter((h) => h.type === "annulation").length,
    stocks: sortedHistory.filter((h) => h.type === "creation_stock").length,
    totalLitres: sortedHistory.reduce(
      (acc, h) => acc + h.litrage * h.quantite,
      0
    ),
    totalBons: sortedHistory.reduce((acc, h) => acc + h.quantite, 0),
  };

  // Réinitialiser la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    typeFilter,
    serviceFilter,
    litrageFilter,
    dateRange,
    sortOrder,
  ]);

  // Gestion des périodes prédéfinies
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
        setDateRange({
          from: startOfMonth(today),
          to: endOfMonth(today),
        });
        break;
      case "year":
        setDateRange({
          from: startOfYear(today),
          to: endOfYear(today),
        });
        break;
      case "custom":
        // Garder la plage actuelle
        break;
    }
  };

  // Réinitialiser tous les filtres
  const handleResetFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setServiceFilter("all");
    setLitrageFilter("all");
    setSortOrder("desc");
    setPeriodPreset("month");
    setDateRange({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    });
  };

  // Exporter les données
  const handleExport = () => {
    const dataStr = JSON.stringify(sortedHistory, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;
    const exportFileDefaultName = `historique-carburant-${format(
      new Date(),
      "yyyy-MM-dd"
    )}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Historique & Traçabilité
          </h1>
          <p className="text-muted-foreground">
            Consultez l'historique complet des opérations de carburant
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleExport}
          disabled={sortedHistory.length === 0}
        >
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Onglets de période */}
      <Card>
        <CardContent className="pt-6">
          <Tabs
            value={periodPreset}
            onValueChange={(v) => handlePeriodChange(v as PeriodPreset)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="flex-wrap">
                <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
                <TabsTrigger value="week">7 jours</TabsTrigger>
                <TabsTrigger value="month">Ce mois</TabsTrigger>
                <TabsTrigger value="year">Cette année</TabsTrigger>
                <TabsTrigger value="custom">Personnalisé</TabsTrigger>
              </TabsList>

              {periodPreset === "custom" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <CalendarRange className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd MMM", { locale: fr })} -{" "}
                            {format(dateRange.to, "dd MMM yyyy", {
                              locale: fr,
                            })}
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

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">
              Total opérations
            </p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Attributions</p>
            <p className="text-2xl font-bold text-blue-600">
              {stats.attributions}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Retraits</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.retraits}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Expirations</p>
            <p className="text-2xl font-bold text-amber-600">
              {stats.expirations}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total litres</p>
            <p className="text-2xl font-bold">
              {stats.totalLitres.toLocaleString()}L
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total bons</p>
            <p className="text-2xl font-bold">{stats.totalBons}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filtres</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              disabled={
                searchTerm === "" &&
                typeFilter === "all" &&
                serviceFilter === "all" &&
                litrageFilter === "all" &&
                periodPreset === "month" &&
                sortOrder === "desc"
              }
            >
              Réinitialiser
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par code, employé ou détails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtres avancés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type d'opération" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="attribution">Attribution</SelectItem>
                  <SelectItem value="retrait">Retrait</SelectItem>
                  <SelectItem value="expiration">Expiration</SelectItem>
                  <SelectItem value="annulation">Annulation</SelectItem>
                  <SelectItem value="creation_stock">Création stock</SelectItem>
                </SelectContent>
              </Select>

              {/* Service */}
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les services</SelectItem>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Litrage */}
              <Select value={litrageFilter} onValueChange={setLitrageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Litrage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les litrages</SelectItem>
                  {litrages.map((litrage) => (
                    <SelectItem key={litrage} value={litrage.toString()}>
                      {litrage}L
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Tri */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                }
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {sortOrder === "desc" ? "Plus récent" : "Plus ancien"}
              </Button>
            </div>

            {/* Résumé des filtres */}
            {(searchTerm !== "" ||
              typeFilter !== "all" ||
              serviceFilter !== "all" ||
              litrageFilter !== "all") && (
              <div className="flex flex-wrap gap-2 mt-2">
                {searchTerm !== "" && (
                  <Badge variant="secondary" className="gap-1">
                    Recherche: "{searchTerm}"
                  </Badge>
                )}
                {typeFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Type: {typeConfig[typeFilter]?.label || typeFilter}
                  </Badge>
                )}
                {serviceFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Service: {serviceFilter}
                  </Badge>
                )}
                {litrageFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Litrage: {litrageFilter}L
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tableau */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Date & Heure</TableHead>
                  <TableHead className="w-[120px]">Type</TableHead>
                  <TableHead className="w-[150px]">Code</TableHead>
                  <TableHead>Employé</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead className="w-[140px]">Bons</TableHead>
                  <TableHead>Détails</TableHead>
                  <TableHead className="w-[100px]">Par</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedHistory.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-12 text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-12 w-12 text-muted-foreground/50" />
                        <p className="text-lg font-medium">
                          Aucune opération trouvée
                        </p>
                        <p className="text-sm">
                          Aucune opération ne correspond à vos critères de
                          recherche
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleResetFilters}
                          className="mt-2"
                        >
                          Réinitialiser les filtres
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedHistory.map((entry) => {
                    const config = typeConfig[entry.type];
                    const IconComponent = config.icon;
                    const totalLitres = entry.litrage * entry.quantite;

                    return (
                      <TableRow key={entry.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {format(parseISO(entry.date), "dd/MM/yyyy", {
                                locale: fr,
                              })}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(parseISO(entry.date), "HH:mm", {
                                locale: fr,
                              })}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={config.variant}
                            className="gap-1.5 w-full justify-start"
                          >
                            <IconComponent className="h-3 w-3" />
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm font-medium">
                          {entry.code}
                        </TableCell>
                        <TableCell>
                          {entry.employe || (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {entry.service || (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {entry.quantite} × {entry.litrage}L
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Total: {totalLitres}L
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[250px]">
                          <p className="truncate text-sm">{entry.details}</p>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">
                            {entry.utilisateur}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {sortedHistory.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                Affichage de {startIndex + 1} à{" "}
                {Math.min(endIndex, sortedHistory.length)} sur{" "}
                {sortedHistory.length} opération
                {sortedHistory.length > 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
