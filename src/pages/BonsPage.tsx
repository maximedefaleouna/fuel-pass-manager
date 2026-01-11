// import { useState } from "react";
// import {
//   Plus,
//   Search,
//   Filter,
//   FileDown,
//   Eye,
//   Edit,
//   X,
//   MoreHorizontal,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   Send,
// } from "lucide-react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
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
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CreateBonModal } from "@/components/bons/CreateBonModal";
// import { BonDetailModal } from "@/components/bons/BonDetailModal";

// type BonStatus = "attribue" | "utilise" | "expire" | "annule" | "partiel";

// interface Bon {
//   id: string;
//   code: string;
//   employe: string;
//   service: string;
//   montant: number;
//   type: "montant" | "litres";
//   vehicule: string;
//   dateAttribution: string;
//   dateExpiration: string;
//   statut: BonStatus;
// }

// const mockBons: Bon[] = [
//   {
//     id: "1",
//     code: "BC-2024-0156",
//     employe: "Martin Dubois",
//     service: "Logistique",
//     montant: 150,
//     type: "montant",
//     vehicule: "AB-123-CD",
//     dateAttribution: "2024-05-01",
//     dateExpiration: "2024-05-31",
//     statut: "utilise",
//   },
//   {
//     id: "2",
//     code: "BC-2024-0157",
//     employe: "Sophie Laurent",
//     service: "Commercial",
//     montant: 80,
//     type: "litres",
//     vehicule: "EF-456-GH",
//     dateAttribution: "2024-05-03",
//     dateExpiration: "2024-06-02",
//     statut: "attribue",
//   },
//   {
//     id: "3",
//     code: "BC-2024-0158",
//     employe: "Pierre Moreau",
//     service: "Direction",
//     montant: 200,
//     type: "montant",
//     vehicule: "IJ-789-KL",
//     dateAttribution: "2024-04-15",
//     dateExpiration: "2024-05-15",
//     statut: "expire",
//   },
//   {
//     id: "4",
//     code: "BC-2024-0159",
//     employe: "Julie Bernard",
//     service: "Technique",
//     montant: 120,
//     type: "montant",
//     vehicule: "MN-012-OP",
//     dateAttribution: "2024-05-10",
//     dateExpiration: "2024-06-09",
//     statut: "partiel",
//   },
//   {
//     id: "5",
//     code: "BC-2024-0160",
//     employe: "Thomas Petit",
//     service: "Commercial",
//     montant: 100,
//     type: "montant",
//     vehicule: "QR-345-ST",
//     dateAttribution: "2024-05-12",
//     dateExpiration: "2024-06-11",
//     statut: "attribue",
//   },
//   {
//     id: "6",
//     code: "BC-2024-0161",
//     employe: "Marie Lefevre",
//     service: "Logistique",
//     montant: 50,
//     type: "litres",
//     vehicule: "UV-678-WX",
//     dateAttribution: "2024-04-20",
//     dateExpiration: "2024-05-20",
//     statut: "annule",
//   },
// ];

// const statusLabels: Record<BonStatus, string> = {
//   attribue: "Attribué",
//   utilise: "Utilisé",
//   expire: "Expiré",
//   annule: "Annulé",
//   partiel: "Partiel",
// };

// export default function BonsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [serviceFilter, setServiceFilter] = useState<string>("all");
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [selectedBon, setSelectedBon] = useState<Bon | null>(null);

//   const filteredBons = mockBons.filter((bon) => {
//     const matchesSearch =
//       bon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       bon.employe.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "all" || bon.statut === statusFilter;
//     const matchesService = serviceFilter === "all" || bon.service === serviceFilter;
//     return matchesSearch && matchesStatus && matchesService;
//   });

//   const services = [...new Set(mockBons.map((b) => b.service))];

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">Bons de carburant</h1>
//           <p className="text-muted-foreground">
//             Gérez et suivez tous les bons de carburant
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <Button variant="outline">
//             <FileDown className="mr-2 h-4 w-4" />
//             Export
//           </Button>
//           <Button onClick={() => setIsCreateModalOpen(true)}>
//             <Plus className="mr-2 h-4 w-4" />
//             Créer un bon
//           </Button>
//         </div>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Rechercher par code ou employé..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full sm:w-[180px]">
//                 <SelectValue placeholder="Statut" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tous les statuts</SelectItem>
//                 <SelectItem value="attribue">Attribué</SelectItem>
//                 <SelectItem value="utilise">Utilisé</SelectItem>
//                 <SelectItem value="expire">Expiré</SelectItem>
//                 <SelectItem value="partiel">Partiel</SelectItem>
//                 <SelectItem value="annule">Annulé</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={serviceFilter} onValueChange={setServiceFilter}>
//               <SelectTrigger className="w-full sm:w-[180px]">
//                 <SelectValue placeholder="Service" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tous les services</SelectItem>
//                 {services.map((service) => (
//                   <SelectItem key={service} value={service}>
//                     {service}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Table */}
//       <div className="table-container">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Code</TableHead>
//               <TableHead>Employé</TableHead>
//               <TableHead>Service</TableHead>
//               <TableHead>Montant</TableHead>
//               <TableHead>Véhicule</TableHead>
//               <TableHead>Attribution</TableHead>
//               <TableHead>Expiration</TableHead>
//               <TableHead>Statut</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredBons.map((bon) => (
//               <TableRow key={bon.id} className="cursor-pointer hover:bg-muted/50">
//                 <TableCell className="font-medium">{bon.code}</TableCell>
//                 <TableCell>{bon.employe}</TableCell>
//                 <TableCell>{bon.service}</TableCell>
//                 <TableCell>
//                   {bon.montant} {bon.type === "litres" ? "L" : "€"}
//                 </TableCell>
//                 <TableCell>{bon.vehicule}</TableCell>
//                 <TableCell>{new Date(bon.dateAttribution).toLocaleDateString("fr-FR")}</TableCell>
//                 <TableCell>{new Date(bon.dateExpiration).toLocaleDateString("fr-FR")}</TableCell>
//                 <TableCell>
//                   <Badge variant={bon.statut}>{statusLabels[bon.statut]}</Badge>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem onClick={() => setSelectedBon(bon)}>
//                         <Eye className="mr-2 h-4 w-4" />
//                         Voir détails
//                       </DropdownMenuItem>
//                       {bon.statut === "attribue" && (
//                         <DropdownMenuItem
//                           onClick={() => {
//                             toast.success(`Email envoyé à ${bon.employe}`);
//                           }}
//                         >
//                           <Send className="mr-2 h-4 w-4" />
//                           Envoyer l'email
//                         </DropdownMenuItem>
//                       )}
//                       <DropdownMenuItem>
//                         <Edit className="mr-2 h-4 w-4" />
//                         Modifier
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem className="text-destructive">
//                         <X className="mr-2 h-4 w-4" />
//                         Annuler
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Pagination */}
//         <div className="flex items-center justify-between px-4 py-4 border-t border-border">
//           <p className="text-sm text-muted-foreground">
//             Affichage de {filteredBons.length} sur {mockBons.length} bons
//           </p>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" disabled>
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
//               1
//             </Button>
//             <Button variant="outline" size="sm">
//               2
//             </Button>
//             <Button variant="outline" size="sm">
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <CreateBonModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
//       <BonDetailModal bon={selectedBon} onClose={() => setSelectedBon(null)} />
//     </div>
//   );
// }

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  FileDown,
  Eye,
  Edit,
  X,
  MoreHorizontal,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { CreateBonModal } from "@/components/bons/CreateBonModal";
import { BonDetailModal } from "@/components/bons/BonDetailModal";

type BonStatus = "attribue" | "utilise" | "expire" | "annule" | "partiel";

interface Bon {
  id: string;
  code: string;
  employe: string;
  service: string;
  montant: number;
  type: "montant" | "litres";
  vehicule: string;
  dateAttribution: string;
  dateExpiration: string;
  statut: BonStatus;
}

const mockBons: Bon[] = [
  {
    id: "1",
    code: "BC-2024-0156",
    employe: "Martin Dubois",
    service: "Logistique",
    montant: 150,
    type: "montant",
    vehicule: "AB-123-CD",
    dateAttribution: "2024-05-01",
    dateExpiration: "2024-05-31",
    statut: "utilise",
  },
  {
    id: "2",
    code: "BC-2024-0157",
    employe: "Sophie Laurent",
    service: "Commercial",
    montant: 80,
    type: "litres",
    vehicule: "EF-456-GH",
    dateAttribution: "2024-05-03",
    dateExpiration: "2024-06-02",
    statut: "attribue",
  },
  {
    id: "3",
    code: "BC-2024-0158",
    employe: "Pierre Moreau",
    service: "Direction",
    montant: 200,
    type: "montant",
    vehicule: "IJ-789-KL",
    dateAttribution: "2024-04-15",
    dateExpiration: "2024-05-15",
    statut: "expire",
  },
  {
    id: "4",
    code: "BC-2024-0159",
    employe: "Julie Bernard",
    service: "Technique",
    montant: 120,
    type: "montant",
    vehicule: "MN-012-OP",
    dateAttribution: "2024-05-10",
    dateExpiration: "2024-06-09",
    statut: "partiel",
  },
  {
    id: "5",
    code: "BC-2024-0160",
    employe: "Thomas Petit",
    service: "Commercial",
    montant: 100,
    type: "montant",
    vehicule: "QR-345-ST",
    dateAttribution: "2024-05-12",
    dateExpiration: "2024-06-11",
    statut: "attribue",
  },
  {
    id: "6",
    code: "BC-2024-0161",
    employe: "Marie Lefevre",
    service: "Logistique",
    montant: 50,
    type: "litres",
    vehicule: "UV-678-WX",
    dateAttribution: "2024-04-20",
    dateExpiration: "2024-05-20",
    statut: "annule",
  },
];

const statusLabels: Record<BonStatus, string> = {
  attribue: "Attribué",
  utilise: "Utilisé",
  expire: "Expiré",
  annule: "Annulé",
  partiel: "Partiel",
};

const ITEMS_PER_PAGE = 3;

export default function BonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBon, setSelectedBon] = useState<Bon | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBons = mockBons.filter((bon) => {
    const matchesSearch =
      bon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bon.employe.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bon.statut === statusFilter;
    const matchesService =
      serviceFilter === "all" || bon.service === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const services = [...new Set(mockBons.map((b) => b.service))];

  // Pagination
  const totalPages = Math.ceil(filteredBons.length / ITEMS_PER_PAGE);
  const paginatedBons = filteredBons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bons de carburant</h1>
          <p className="text-muted-foreground">
            Gérez et suivez tous les bons de carburant
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Créer un bon
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par code ou employé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="attribue">Attribué</SelectItem>
                <SelectItem value="utilise">Utilisé</SelectItem>
                <SelectItem value="expire">Expiré</SelectItem>
                <SelectItem value="partiel">Partiel</SelectItem>
                <SelectItem value="annule">Annulé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
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
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Employé</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Véhicule</TableHead>
              <TableHead>Attribution</TableHead>
              <TableHead>Expiration</TableHead>
              <TableHead>Litres</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBons.map((bon) => (
              <TableRow
                key={bon.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">{bon.code}</TableCell>
                <TableCell>{bon.employe}</TableCell>
                <TableCell>{bon.service}</TableCell>
                <TableCell>{bon.vehicule}</TableCell>
                <TableCell>
                  {new Date(bon.dateAttribution).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  {new Date(bon.dateExpiration).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>{bon.montant} L</TableCell>
                <TableCell>
                  <Badge variant={bon.statut}>{statusLabels[bon.statut]}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedBon(bon)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir détails
                      </DropdownMenuItem>
                      {bon.statut === "attribue" && (
                        <DropdownMenuItem
                          onClick={() =>
                            toast.success(`Email envoyé à ${bon.employe}`)
                          }
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer l'email
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <X className="mr-2 h-4 w-4" />
                        Annuler
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Affichage de {(currentPage - 1) * ITEMS_PER_PAGE + 1} à{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredBons.length)} sur{" "}
            {filteredBons.length} bons
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateBonModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
      <BonDetailModal bon={selectedBon} onClose={() => setSelectedBon(null)} />
    </div>
  );
}
