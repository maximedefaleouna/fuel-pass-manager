import { useState } from "react";
import {
  Plus,
  Search,
  FileDown,
  Eye,
  Edit,
  MoreHorizontal,
  Car,
  Fuel,
  AlertTriangle,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

interface Vehicle {
  id: string;
  immatriculation: string;
  marque: string;
  modele: string;
  type: string;
  service: string;
  consommationMoyenne: number;
  totalBons: number;
  totalConsomme: number;
  statut: "actif" | "maintenance" | "inactif";
  alerte: boolean;
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    immatriculation: "AB-123-CD",
    marque: "Renault",
    modele: "Clio V",
    type: "Berline",
    service: "Logistique",
    consommationMoyenne: 6.2,
    totalBons: 18,
    totalConsomme: 1850,
    statut: "actif",
    alerte: false,
  },
  {
    id: "2",
    immatriculation: "EF-456-GH",
    marque: "Peugeot",
    modele: "308",
    type: "Berline",
    service: "Commercial",
    consommationMoyenne: 5.8,
    totalBons: 24,
    totalConsomme: 2340,
    statut: "actif",
    alerte: false,
  },
  {
    id: "3",
    immatriculation: "IJ-789-KL",
    marque: "Citroën",
    modele: "Berlingo",
    type: "Utilitaire",
    service: "Technique",
    consommationMoyenne: 7.5,
    totalBons: 32,
    totalConsomme: 4120,
    statut: "actif",
    alerte: true,
  },
  {
    id: "4",
    immatriculation: "MN-012-OP",
    marque: "Toyota",
    modele: "Yaris",
    type: "Citadine",
    service: "Direction",
    consommationMoyenne: 4.9,
    totalBons: 12,
    totalConsomme: 980,
    statut: "maintenance",
    alerte: false,
  },
  {
    id: "5",
    immatriculation: "QR-345-ST",
    marque: "Renault",
    modele: "Master",
    type: "Utilitaire",
    service: "Logistique",
    consommationMoyenne: 9.2,
    totalBons: 28,
    totalConsomme: 5680,
    statut: "actif",
    alerte: false,
  },
];

const statusLabels = {
  actif: "Actif",
  maintenance: "Maintenance",
  inactif: "Inactif",
};

export default function VehiculesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredVehicles = mockVehicles.filter((v) => {
    const matchesSearch =
      v.immatriculation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.modele.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === "all" || v.service === serviceFilter;
    const matchesStatus = statusFilter === "all" || v.statut === statusFilter;
    return matchesSearch && matchesService && matchesStatus;
  });

  const services = [...new Set(mockVehicles.map((v) => v.service))];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Véhicules</h1>
          <p className="text-muted-foreground">
            Gérez la flotte de véhicules et leurs consommations
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un véhicule
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
                placeholder="Rechercher par immatriculation, marque..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
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
              <TableHead>Véhicule</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="text-right">Conso. moy.</TableHead>
              <TableHead className="text-right">Bons liés</TableHead>
              <TableHead className="text-right">Total consommé</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Car className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{vehicle.immatriculation}</p>
                        {vehicle.alerte && (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.marque} {vehicle.modele}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{vehicle.service}</TableCell>
                <TableCell className="text-right">
                  {vehicle.consommationMoyenne} L/100km
                </TableCell>
                <TableCell className="text-right font-medium">{vehicle.totalBons}</TableCell>
                <TableCell className="text-right font-medium">
                  {vehicle.totalConsomme.toLocaleString()} €
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      vehicle.statut === "actif"
                        ? "success"
                        : vehicle.statut === "maintenance"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {statusLabels[vehicle.statut]}
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
                      <DropdownMenuItem>
                        <Fuel className="mr-2 h-4 w-4" />
                        Historique bons
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
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
            Affichage de {filteredVehicles.length} sur {mockVehicles.length} véhicules
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
