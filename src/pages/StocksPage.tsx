// import { useState } from "react";
// import {
//   Package,
//   Plus,
//   Minus,
//   AlertTriangle,
//   Search,
//   FileDown,
//   Edit,
//   History,
//   TrendingDown,
//   TrendingUp,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Progress } from "@/components/ui/progress";

// interface StockType {
//   id: string;
//   litrage: number;
//   quantiteInitiale: number;
//   quantiteActuelle: number;
//   seuilAlerte: number;
//   prixUnitaire: number;
//   dateReception: string;
//   fournisseur: string;
//   numeroLot: string;
// }

// interface StockMovement {
//   id: string;
//   litrageId: string;
//   litrage: number;
//   type: "entree" | "sortie";
//   quantite: number;
//   date: string;
//   motif: string;
//   utilisateur: string;
// }

// const mockStocks: StockType[] = [
//   {
//     id: "1",
//     litrage: 10,
//     quantiteInitiale: 500,
//     quantiteActuelle: 342,
//     seuilAlerte: 50,
//     prixUnitaire: 15.5,
//     dateReception: "2024-04-15",
//     fournisseur: "TotalEnergies",
//     numeroLot: "LOT-2024-001",
//   },
//   {
//     id: "2",
//     litrage: 15,
//     quantiteInitiale: 300,
//     quantiteActuelle: 45,
//     seuilAlerte: 40,
//     prixUnitaire: 22.0,
//     dateReception: "2024-04-15",
//     fournisseur: "TotalEnergies",
//     numeroLot: "LOT-2024-002",
//   },
//   {
//     id: "3",
//     litrage: 20,
//     quantiteInitiale: 400,
//     quantiteActuelle: 285,
//     seuilAlerte: 50,
//     prixUnitaire: 29.0,
//     dateReception: "2024-04-20",
//     fournisseur: "Shell",
//     numeroLot: "LOT-2024-003",
//   },
//   {
//     id: "4",
//     litrage: 25,
//     quantiteInitiale: 200,
//     quantiteActuelle: 178,
//     seuilAlerte: 30,
//     prixUnitaire: 36.0,
//     dateReception: "2024-05-01",
//     fournisseur: "Shell",
//     numeroLot: "LOT-2024-004",
//   },
//   {
//     id: "5",
//     litrage: 30,
//     quantiteInitiale: 150,
//     quantiteActuelle: 12,
//     seuilAlerte: 20,
//     prixUnitaire: 43.5,
//     dateReception: "2024-05-01",
//     fournisseur: "TotalEnergies",
//     numeroLot: "LOT-2024-005",
//   },
//   {
//     id: "6",
//     litrage: 50,
//     quantiteInitiale: 100,
//     quantiteActuelle: 67,
//     seuilAlerte: 15,
//     prixUnitaire: 72.0,
//     dateReception: "2024-05-10",
//     fournisseur: "Esso",
//     numeroLot: "LOT-2024-006",
//   },
// ];

// const mockMovements: StockMovement[] = [
//   {
//     id: "1",
//     litrageId: "1",
//     litrage: 10,
//     type: "sortie",
//     quantite: 5,
//     date: "2024-05-20",
//     motif: "Attribution employé",
//     utilisateur: "Admin",
//   },
//   {
//     id: "2",
//     litrageId: "2",
//     litrage: 15,
//     type: "sortie",
//     quantite: 10,
//     date: "2024-05-19",
//     motif: "Attribution employé",
//     utilisateur: "Admin",
//   },
//   {
//     id: "3",
//     litrageId: "1",
//     litrage: 10,
//     type: "entree",
//     quantite: 100,
//     date: "2024-05-15",
//     motif: "Réception fournisseur",
//     utilisateur: "Admin",
//   },
//   {
//     id: "4",
//     litrageId: "5",
//     litrage: 30,
//     type: "sortie",
//     quantite: 8,
//     date: "2024-05-18",
//     motif: "Attribution employé",
//     utilisateur: "Admin",
//   },
// ];

// export default function StocksPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddStockOpen, setIsAddStockOpen] = useState(false);
//   const [isMovementOpen, setIsMovementOpen] = useState(false);
//   const [selectedStock, setSelectedStock] = useState<StockType | null>(null);
//   const [movementType, setMovementType] = useState<"entree" | "sortie">(
//     "entree"
//   );
//   const [movementQuantity, setMovementQuantity] = useState("");
//   const [movementMotif, setMovementMotif] = useState("");
//   const [showMovements, setShowMovements] = useState(false);

//   // New stock form
//   const [newStock, setNewStock] = useState({
//     litrage: "",
//     quantite: "",
//     prixUnitaire: "",
//     fournisseur: "",
//     numeroLot: "",
//     seuilAlerte: "",
//   });

//   const lowStockItems = mockStocks.filter(
//     (s) => s.quantiteActuelle <= s.seuilAlerte
//   );
//   const totalValue = mockStocks.reduce(
//     (acc, s) => acc + s.quantiteActuelle * s.prixUnitaire,
//     0
//   );
//   const totalBons = mockStocks.reduce((acc, s) => acc + s.quantiteActuelle, 0);
//   const totalLitres = mockStocks.reduce(
//     (acc, s) => acc + s.quantiteActuelle * s.litrage,
//     0
//   );

//   const filteredStocks = mockStocks.filter(
//     (stock) =>
//       stock.litrage.toString().includes(searchTerm) ||
//       stock.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       stock.numeroLot.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleOpenMovement = (stock: StockType, type: "entree" | "sortie") => {
//     setSelectedStock(stock);
//     setMovementType(type);
//     setMovementQuantity("");
//     setMovementMotif("");
//     setIsMovementOpen(true);
//   };

//   const getStockStatus = (stock: StockType) => {
//     const percentage = (stock.quantiteActuelle / stock.quantiteInitiale) * 100;
//     if (stock.quantiteActuelle <= stock.seuilAlerte)
//       return {
//         label: "Critique",
//         variant: "destructive" as const,
//         color: "bg-destructive",
//       };
//     if (percentage < 30)
//       return { label: "Bas", variant: "warning" as const, color: "bg-warning" };
//     return {
//       label: "Normal",
//       variant: "success" as const,
//       color: "bg-success",
//     };
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">Gestion des Stocks</h1>
//           <p className="text-muted-foreground">
//             Gérez l'inventaire des bons par type de litrage
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <Button
//             variant="outline"
//             onClick={() => setShowMovements(!showMovements)}
//           >
//             <History className="mr-2 h-4 w-4" />
//             {showMovements ? "Voir stocks" : "Mouvements"}
//           </Button>
//           <Button variant="outline">
//             <FileDown className="mr-2 h-4 w-4" />
//             Export
//           </Button>
//           <Button onClick={() => setIsAddStockOpen(true)}>
//             <Plus className="mr-2 h-4 w-4" />
//             Ajouter stock
//           </Button>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Total bons en stock
//                 </p>
//                 <p className="text-2xl font-bold">
//                   {totalBons.toLocaleString()}
//                 </p>
//               </div>
//               <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <Package className="h-5 w-5 text-primary" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Total litres</p>
//                 <p className="text-2xl font-bold">
//                   {totalLitres.toLocaleString()} L
//                 </p>
//               </div>
//               <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
//                 <TrendingUp className="h-5 w-5 text-success" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Valeur stock</p>
//                 <p className="text-2xl font-bold">
//                   {totalValue.toLocaleString()} €
//                 </p>
//               </div>
//               <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <TrendingUp className="h-5 w-5 text-primary" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card
//           className={
//             lowStockItems.length > 0
//               ? "border-destructive/50 bg-destructive/5"
//               : ""
//           }
//         >
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Alertes stock bas
//                 </p>
//                 <p className="text-2xl font-bold">{lowStockItems.length}</p>
//                 {lowStockItems.length > 0 && (
//                   <p className="text-xs text-destructive mt-1">
//                     {lowStockItems.map((s) => `${s.litrage}L`).join(", ")}
//                   </p>
//                 )}
//               </div>
//               <div
//                 className={`h-10 w-10 rounded-lg flex items-center justify-center ${
//                   lowStockItems.length > 0 ? "bg-destructive/10" : "bg-muted"
//                 }`}
//               >
//                 <AlertTriangle
//                   className={`h-5 w-5 ${
//                     lowStockItems.length > 0
//                       ? "text-destructive"
//                       : "text-muted-foreground"
//                   }`}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Rechercher par litrage, fournisseur ou numéro de lot..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {!showMovements ? (
//         /* Stock Table */
//         <div className="table-container">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Litrage</TableHead>
//                 <TableHead>Quantité</TableHead>
//                 <TableHead>Stock</TableHead>
//                 <TableHead>Prix unitaire</TableHead>
//                 <TableHead>Valeur</TableHead>
//                 <TableHead>Fournisseur</TableHead>
//                 <TableHead>N° Lot</TableHead>
//                 <TableHead>Statut</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredStocks.map((stock) => {
//                 const status = getStockStatus(stock);
//                 const percentage =
//                   (stock.quantiteActuelle / stock.quantiteInitiale) * 100;
//                 return (
//                   <TableRow key={stock.id}>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
//                           {stock.litrage}L
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="font-medium">
//                         {stock.quantiteActuelle} / {stock.quantiteInitiale}
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         Seuil: {stock.seuilAlerte}
//                       </div>
//                     </TableCell>
//                     <TableCell className="w-32">
//                       <div className="space-y-1">
//                         <Progress
//                           value={percentage}
//                           className={`h-2 ${status.color}`}
//                         />
//                         <span className="text-xs text-muted-foreground">
//                           {percentage.toFixed(0)}%
//                         </span>
//                       </div>
//                     </TableCell>
//                     <TableCell>{stock.prixUnitaire.toFixed(2)} €</TableCell>
//                     <TableCell className="font-medium">
//                       {(
//                         stock.quantiteActuelle * stock.prixUnitaire
//                       ).toLocaleString()}{" "}
//                       €
//                     </TableCell>
//                     <TableCell>{stock.fournisseur}</TableCell>
//                     <TableCell className="text-xs">{stock.numeroLot}</TableCell>
//                     <TableCell>
//                       <Badge variant={status.variant}>{status.label}</Badge>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleOpenMovement(stock, "entree")}
//                           className="text-success hover:text-success"
//                         >
//                           <Plus className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleOpenMovement(stock, "sortie")}
//                           className="text-destructive hover:text-destructive"
//                         >
//                           <Minus className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>
//       ) : (
//         /* Movements Table */
//         <div className="table-container">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Litrage</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead>Quantité</TableHead>
//                 <TableHead>Motif</TableHead>
//                 <TableHead>Utilisateur</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {mockMovements.map((movement) => (
//                 <TableRow key={movement.id}>
//                   <TableCell>
//                     {new Date(movement.date).toLocaleDateString("fr-FR")}
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant="outline">{movement.litrage}L</Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         movement.type === "entree" ? "success" : "destructive"
//                       }
//                     >
//                       {movement.type === "entree" ? (
//                         <>
//                           <TrendingUp className="h-3 w-3 mr-1" /> Entrée
//                         </>
//                       ) : (
//                         <>
//                           <TrendingDown className="h-3 w-3 mr-1" /> Sortie
//                         </>
//                       )}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="font-medium">
//                     {movement.quantite}
//                   </TableCell>
//                   <TableCell>{movement.motif}</TableCell>
//                   <TableCell>{movement.utilisateur}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}

//       {/* Add Stock Modal */}
//       <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Ajouter un nouveau type de stock</DialogTitle>
//             <DialogDescription>
//               Créez un nouveau type de bon avec son litrage et quantité initiale
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Litrage (L)</Label>
//                 <Input
//                   type="number"
//                   placeholder="Ex: 10"
//                   value={newStock.litrage}
//                   onChange={(e) =>
//                     setNewStock({ ...newStock, litrage: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Quantité</Label>
//                 <Input
//                   type="number"
//                   placeholder="Ex: 500"
//                   value={newStock.quantite}
//                   onChange={(e) =>
//                     setNewStock({ ...newStock, quantite: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Prix unitaire (€)</Label>
//                 <Input
//                   type="number"
//                   step="0.01"
//                   placeholder="Ex: 15.50"
//                   value={newStock.prixUnitaire}
//                   onChange={(e) =>
//                     setNewStock({ ...newStock, prixUnitaire: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Seuil d'alerte</Label>
//                 <Input
//                   type="number"
//                   placeholder="Ex: 50"
//                   value={newStock.seuilAlerte}
//                   onChange={(e) =>
//                     setNewStock({ ...newStock, seuilAlerte: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label>Fournisseur</Label>
//               <Select
//                 value={newStock.fournisseur}
//                 onValueChange={(value) =>
//                   setNewStock({ ...newStock, fournisseur: value })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Sélectionner un fournisseur" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="TotalEnergies">TotalEnergies</SelectItem>
//                   <SelectItem value="Shell">Shell</SelectItem>
//                   <SelectItem value="Esso">Esso</SelectItem>
//                   <SelectItem value="BP">BP</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Numéro de lot</Label>
//               <Input
//                 placeholder="Ex: LOT-2024-007"
//                 value={newStock.numeroLot}
//                 onChange={(e) =>
//                   setNewStock({ ...newStock, numeroLot: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsAddStockOpen(false)}>
//               Annuler
//             </Button>
//             <Button onClick={() => setIsAddStockOpen(false)}>
//               Ajouter le stock
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Movement Modal */}
//       <Dialog open={isMovementOpen} onOpenChange={setIsMovementOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>
//               {movementType === "entree"
//                 ? "Entrée de stock"
//                 : "Sortie de stock"}
//             </DialogTitle>
//             <DialogDescription>
//               {selectedStock && (
//                 <>
//                   Bons de {selectedStock.litrage}L - Stock actuel:{" "}
//                   {selectedStock.quantiteActuelle}
//                 </>
//               )}
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label>Quantité</Label>
//               <Input
//                 type="number"
//                 placeholder="Nombre de bons"
//                 value={movementQuantity}
//                 onChange={(e) => setMovementQuantity(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Motif</Label>
//               <Select value={movementMotif} onValueChange={setMovementMotif}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Sélectionner un motif" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {movementType === "entree" ? (
//                     <>
//                       <SelectItem value="reception">
//                         Réception fournisseur
//                       </SelectItem>
//                       <SelectItem value="retour">Retour employé</SelectItem>
//                       <SelectItem value="ajustement">
//                         Ajustement inventaire
//                       </SelectItem>
//                     </>
//                   ) : (
//                     <>
//                       <SelectItem value="attribution">
//                         Attribution employé
//                       </SelectItem>
//                       <SelectItem value="perte">Perte / Dégradation</SelectItem>
//                       <SelectItem value="ajustement">
//                         Ajustement inventaire
//                       </SelectItem>
//                     </>
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsMovementOpen(false)}>
//               Annuler
//             </Button>
//             <Button
//               onClick={() => setIsMovementOpen(false)}
//               variant={movementType === "entree" ? "success" : "destructive"}
//             >
//               {movementType === "entree" ? "Ajouter" : "Retirer"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

import { useState } from "react";
import {
  Package,
  Plus,
  Minus,
  AlertTriangle,
  Search,
  FileDown,
  History,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface StockType {
  id: string;
  litrage: number;
  quantiteInitiale: number;
  quantiteActuelle: number;
  seuilAlerte: number;
  fournisseur: string;
  numeroLot: string;
}

interface StockMovement {
  id: string;
  litrageId: string;
  litrage: number;
  type: "entree" | "sortie";
  quantite: number;
  date: string;
  motif: string;
  utilisateur: string;
}

const mockStocks: StockType[] = [
  {
    id: "1",
    litrage: 10,
    quantiteInitiale: 500,
    quantiteActuelle: 342,
    seuilAlerte: 50,
    fournisseur: "TotalEnergies",
    numeroLot: "LOT-2024-001",
  },
  {
    id: "2",
    litrage: 15,
    quantiteInitiale: 300,
    quantiteActuelle: 45,
    seuilAlerte: 40,
    fournisseur: "TotalEnergies",
    numeroLot: "LOT-2024-002",
  },
  {
    id: "3",
    litrage: 20,
    quantiteInitiale: 400,
    quantiteActuelle: 285,
    seuilAlerte: 50,
    fournisseur: "Shell",
    numeroLot: "LOT-2024-003",
  },
  {
    id: "4",
    litrage: 25,
    quantiteInitiale: 200,
    quantiteActuelle: 178,
    seuilAlerte: 30,
    fournisseur: "Shell",
    numeroLot: "LOT-2024-004",
  },
  {
    id: "5",
    litrage: 30,
    quantiteInitiale: 150,
    quantiteActuelle: 12,
    seuilAlerte: 20,
    fournisseur: "TotalEnergies",
    numeroLot: "LOT-2024-005",
  },
  {
    id: "6",
    litrage: 50,
    quantiteInitiale: 100,
    quantiteActuelle: 67,
    seuilAlerte: 15,
    fournisseur: "Esso",
    numeroLot: "LOT-2024-006",
  },
];

const mockMovements: StockMovement[] = [
  {
    id: "1",
    litrageId: "1",
    litrage: 10,
    type: "sortie",
    quantite: 5,
    date: "2024-05-20",
    motif: "Attribution employé",
    utilisateur: "Admin",
  },
  {
    id: "2",
    litrageId: "2",
    litrage: 15,
    type: "sortie",
    quantite: 10,
    date: "2024-05-19",
    motif: "Attribution employé",
    utilisateur: "Admin",
  },
  {
    id: "3",
    litrageId: "1",
    litrage: 10,
    type: "entree",
    quantite: 100,
    date: "2024-05-15",
    motif: "Réception fournisseur",
    utilisateur: "Admin",
  },
  {
    id: "4",
    litrageId: "5",
    litrage: 30,
    type: "sortie",
    quantite: 8,
    date: "2024-05-18",
    motif: "Attribution employé",
    utilisateur: "Admin",
  },
];

export default function StocksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [isMovementOpen, setIsMovementOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockType | null>(null);
  const [movementType, setMovementType] = useState<"entree" | "sortie">(
    "entree"
  );
  const [movementQuantity, setMovementQuantity] = useState("");
  const [movementMotif, setMovementMotif] = useState("");
  const [showMovements, setShowMovements] = useState(false);

  // New stock form
  const [newStock, setNewStock] = useState({
    litrage: "",
    quantite: "",
    fournisseur: "",
    numeroLot: "",
    seuilAlerte: "",
  });

  const lowStockItems = mockStocks.filter(
    (s) => s.quantiteActuelle <= s.seuilAlerte
  );
  const totalBons = mockStocks.reduce((acc, s) => acc + s.quantiteActuelle, 0);
  const totalLitres = mockStocks.reduce(
    (acc, s) => acc + s.quantiteActuelle * s.litrage,
    0
  );

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.litrage.toString().includes(searchTerm) ||
      stock.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.numeroLot.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenMovement = (stock: StockType, type: "entree" | "sortie") => {
    setSelectedStock(stock);
    setMovementType(type);
    setMovementQuantity("");
    setMovementMotif("");
    setIsMovementOpen(true);
  };

  const getStockStatus = (stock: StockType) => {
    const percentage = (stock.quantiteActuelle / stock.quantiteInitiale) * 100;
    if (stock.quantiteActuelle <= stock.seuilAlerte)
      return {
        label: "Critique",
        variant: "destructive" as const,
        color: "bg-destructive",
      };
    if (percentage < 30)
      return { label: "Bas", variant: "warning" as const, color: "bg-warning" };
    return {
      label: "Normal",
      variant: "success" as const,
      color: "bg-success",
    };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Stocks</h1>
          <p className="text-muted-foreground">
            Gérez l'inventaire des bons par type de litrage
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowMovements(!showMovements)}
          >
            <History className="mr-2 h-4 w-4" />
            {showMovements ? "Voir stocks" : "Mouvements"}
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddStockOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter stock
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total bons en stock
                </p>
                <p className="text-2xl font-bold">
                  {totalBons.toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total litres</p>
                <p className="text-2xl font-bold">
                  {totalLitres.toLocaleString()} L
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={
            lowStockItems.length > 0
              ? "border-destructive/50 bg-destructive/5"
              : ""
          }
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Alertes stock bas
                </p>
                <p className="text-2xl font-bold">{lowStockItems.length}</p>
                {lowStockItems.length > 0 && (
                  <p className="text-xs text-destructive mt-1">
                    {lowStockItems.map((s) => `${s.litrage}L`).join(", ")}
                  </p>
                )}
              </div>
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  lowStockItems.length > 0 ? "bg-destructive/10" : "bg-muted"
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 ${
                    lowStockItems.length > 0
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par litrage, fournisseur ou numéro de lot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {!showMovements ? (
        /* Stock Table */
        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Litrage</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>N° Lot</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((stock) => {
                const status = getStockStatus(stock);
                const percentage =
                  (stock.quantiteActuelle / stock.quantiteInitiale) * 100;
                return (
                  <TableRow key={stock.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {stock.litrage}L
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {stock.quantiteActuelle} / {stock.quantiteInitiale}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Seuil: {stock.seuilAlerte}
                      </div>
                    </TableCell>
                    <TableCell className="w-32">
                      <div className="space-y-1">
                        <Progress
                          value={percentage}
                          className={`h-2 ${status.color}`}
                        />
                        <span className="text-xs text-muted-foreground">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{stock.fournisseur}</TableCell>
                    <TableCell className="text-xs">{stock.numeroLot}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenMovement(stock, "entree")}
                          className="text-success hover:text-success"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenMovement(stock, "sortie")}
                          className="text-destructive hover:text-destructive"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* Movements Table */
        <div className="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Litrage</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Motif</TableHead>
                <TableHead>Utilisateur</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>
                    {new Date(movement.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{movement.litrage}L</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        movement.type === "entree" ? "success" : "destructive"
                      }
                    >
                      {movement.type === "entree" ? (
                        <>
                          <TrendingUp className="h-3 w-3 mr-1" /> Entrée
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-3 w-3 mr-1" /> Sortie
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {movement.quantite}
                  </TableCell>
                  <TableCell>{movement.motif}</TableCell>
                  <TableCell>{movement.utilisateur}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Stock Modal */}
      <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau type de stock</DialogTitle>
            <DialogDescription>
              Créez un nouveau type de bon avec son litrage et quantité initiale
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Litrage (L)</Label>
                <Input
                  type="number"
                  placeholder="Ex: 10"
                  value={newStock.litrage}
                  onChange={(e) =>
                    setNewStock({ ...newStock, litrage: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Quantité</Label>
                <Input
                  type="number"
                  placeholder="Ex: 500"
                  value={newStock.quantite}
                  onChange={(e) =>
                    setNewStock({ ...newStock, quantite: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Seuil d'alerte</Label>
                <Input
                  type="number"
                  placeholder="Ex: 50"
                  value={newStock.seuilAlerte}
                  onChange={(e) =>
                    setNewStock({ ...newStock, seuilAlerte: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Fournisseur</Label>
                <Select
                  value={newStock.fournisseur}
                  onValueChange={(value) =>
                    setNewStock({ ...newStock, fournisseur: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un fournisseur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TotalEnergies">TotalEnergies</SelectItem>
                    <SelectItem value="Shell">Shell</SelectItem>
                    <SelectItem value="Esso">Esso</SelectItem>
                    <SelectItem value="BP">BP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Numéro de lot</Label>
              <Input
                placeholder="Ex: LOT-2024-007"
                value={newStock.numeroLot}
                onChange={(e) =>
                  setNewStock({ ...newStock, numeroLot: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStockOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsAddStockOpen(false)}>
              Ajouter le stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Movement Modal */}
      <Dialog open={isMovementOpen} onOpenChange={setIsMovementOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {movementType === "entree"
                ? "Entrée de stock"
                : "Sortie de stock"}
            </DialogTitle>
            <DialogDescription>
              {selectedStock && (
                <>
                  Bons de {selectedStock.litrage}L - Stock actuel:{" "}
                  {selectedStock.quantiteActuelle}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Litrage</Label>
              <Input value={selectedStock?.litrage} disabled />
            </div>
            <div className="space-y-2">
              <Label>Quantité</Label>
              <Input
                type="number"
                placeholder="Ex: 10"
                value={movementQuantity}
                onChange={(e) => setMovementQuantity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Motif</Label>
              <Input
                placeholder="Ex: Attribution employé / Réception fournisseur"
                value={movementMotif}
                onChange={(e) => setMovementMotif(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMovementOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                console.log({
                  stockId: selectedStock?.id,
                  type: movementType,
                  quantite: Number(movementQuantity),
                  motif: movementMotif,
                });
                setIsMovementOpen(false);
              }}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
