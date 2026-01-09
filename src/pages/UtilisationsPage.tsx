import { useState } from "react";
import {
  Search,
  FileDown,
  Eye,
  MoreHorizontal,
  MapPin,
  Calendar,
  Image,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

interface Utilisation {
  id: string;
  codeBon: string;
  employe: string;
  date: string;
  station: string;
  montantConsomme: number;
  type: "montant" | "litres";
  preuve: boolean;
  statut: "valide" | "en_attente" | "refuse";
}

const mockUtilisations: Utilisation[] = [
  {
    id: "1",
    codeBon: "BC-2024-0156",
    employe: "Martin Dubois",
    date: "2024-05-15 14:22",
    station: "TotalEnergies - Paris 12e",
    montantConsomme: 80,
    type: "montant",
    preuve: true,
    statut: "valide",
  },
  {
    id: "2",
    codeBon: "BC-2024-0157",
    employe: "Sophie Laurent",
    date: "2024-05-14 09:45",
    station: "Shell - Marseille Centre",
    montantConsomme: 45,
    type: "litres",
    preuve: true,
    statut: "valide",
  },
  {
    id: "3",
    codeBon: "BC-2024-0159",
    employe: "Julie Bernard",
    date: "2024-05-13 16:30",
    station: "BP - Lyon Part-Dieu",
    montantConsomme: 60,
    type: "montant",
    preuve: false,
    statut: "en_attente",
  },
  {
    id: "4",
    codeBon: "BC-2024-0155",
    employe: "Pierre Moreau",
    date: "2024-05-12 11:15",
    station: "Esso - Bordeaux",
    montantConsomme: 120,
    type: "montant",
    preuve: true,
    statut: "refuse",
  },
];

const statusLabels = {
  valide: "Validé",
  en_attente: "En attente",
  refuse: "Refusé",
};

export default function UtilisationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredUtilisations = mockUtilisations.filter((u) => {
    const matchesSearch =
      u.codeBon.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.employe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.station.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || u.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Utilisations</h1>
          <p className="text-muted-foreground">
            Historique des utilisations de bons de carburant
          </p>
        </div>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par code, employé ou station..."
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
                <SelectItem value="valide">Validé</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="refuse">Refusé</SelectItem>
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
              <TableHead>Code bon</TableHead>
              <TableHead>Employé</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Station</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead>Preuve</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUtilisations.map((util) => (
              <TableRow key={util.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{util.codeBon}</TableCell>
                <TableCell>{util.employe}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {util.date}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {util.station}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {util.montantConsomme} {util.type === "litres" ? "L" : "€"}
                </TableCell>
                <TableCell>
                  {util.preuve ? (
                    <Badge variant="success" className="gap-1">
                      <Image className="h-3 w-3" />
                      Photo
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Aucune</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      util.statut === "valide"
                        ? "success"
                        : util.statut === "en_attente"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {statusLabels[util.statut]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir détails
                      </DropdownMenuItem>
                      {util.statut === "en_attente" && (
                        <>
                          <DropdownMenuItem className="text-success">
                            <Check className="mr-2 h-4 w-4" />
                            Valider
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <X className="mr-2 h-4 w-4" />
                            Refuser
                          </DropdownMenuItem>
                        </>
                      )}
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
            Affichage de {filteredUtilisations.length} sur {mockUtilisations.length} utilisations
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
