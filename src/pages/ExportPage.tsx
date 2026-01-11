// app/exports/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Download,
  FileText,
  FileSpreadsheet,
  RefreshCw,
  Filter,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const exportHistory = [
  {
    id: "1",
    name: "Historique_complet_2024",
    type: "JSON",
    size: "2.4 MB",
    date: "2024-05-20T14:30:00",
    status: "completed",
    records: 1250,
  },
  {
    id: "2",
    name: "Attributions_mai_2024",
    type: "CSV",
    size: "1.1 MB",
    date: "2024-05-15T10:15:00",
    status: "completed",
    records: 450,
  },
  {
    id: "3",
    name: "Stocks_trimestre1",
    type: "Excel",
    size: "3.2 MB",
    date: "2024-04-30T16:45:00",
    status: "completed",
    records: 890,
  },
  {
    id: "4",
    name: "Retraits_avril_2024",
    type: "CSV",
    size: "0.9 MB",
    date: "2024-04-25T09:00:00",
    status: "completed",
    records: 320,
  },
  {
    id: "5",
    name: "Export_personnalise",
    type: "JSON",
    size: "4.1 MB",
    date: "2024-04-20T11:30:00",
    status: "completed",
    records: 1560,
  },
];

const exportTemplates = [
  {
    id: "1",
    name: "Rapport mensuel",
    description: "Toutes les opérations du mois",
    lastUsed: "2024-05-20",
    fields: ["date", "type", "employe", "service", "litrage", "quantite"],
  },
  {
    id: "2",
    name: "Suivi des stocks",
    description: "Mouvements de stock détaillés",
    lastUsed: "2024-05-15",
    fields: ["date", "type", "code", "quantite", "litrage", "fournisseur"],
  },
  {
    id: "3",
    name: "Attributions par service",
    description: "Répartition des attributions",
    lastUsed: "2024-05-10",
    fields: ["service", "employe", "quantite", "litrage", "date"],
  },
];

export default function ExportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Exports de données
          </h1>
          <p className="text-muted-foreground">
            Exportez et gérez vos données de carburant
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Nouvel export
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList>
          <TabsTrigger value="create">Créer un export</TabsTrigger>
          <TabsTrigger value="history">Historique des exports</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
        </TabsList>

        {/* Create Export Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Configuration de l'export</CardTitle>
                <CardDescription>
                  Sélectionnez les données à exporter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Type d'export */}
                <div className="space-y-4">
                  <h3 className="font-medium">Type d'export</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card
                      className={`cursor-pointer border-2 hover:border-primary transition-colors`}
                    >
                      <CardContent className="pt-6 flex flex-col items-center text-center">
                        <FileText className="h-8 w-8 mb-2 text-primary" />
                        <p className="font-medium">JSON</p>
                        <p className="text-sm text-muted-foreground">
                          Données structurées
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer border-2 hover:border-primary transition-colors`}
                    >
                      <CardContent className="pt-6 flex flex-col items-center text-center">
                        <FileSpreadsheet className="h-8 w-8 mb-2 text-primary" />
                        <p className="font-medium">Excel</p>
                        <p className="text-sm text-muted-foreground">
                          Tableaux Excel
                        </p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer border-2 hover:border-primary transition-colors`}
                    >
                      <CardContent className="pt-6 flex flex-col items-center text-center">
                        <FileText className="h-8 w-8 mb-2 text-primary" />
                        <p className="font-medium">CSV</p>
                        <p className="text-sm text-muted-foreground">
                          Données brutes
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Filtres */}
                <div className="space-y-4">
                  <h3 className="font-medium">Filtres</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-range">Période</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Aujourd'hui</SelectItem>
                          <SelectItem value="week">7 derniers jours</SelectItem>
                          <SelectItem value="month">Ce mois</SelectItem>
                          <SelectItem value="year">Cette année</SelectItem>
                          <SelectItem value="custom">Personnalisé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type d'opération</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les types</SelectItem>
                          <SelectItem value="attribution">
                            Attributions
                          </SelectItem>
                          <SelectItem value="retrait">Retraits</SelectItem>
                          <SelectItem value="expiration">
                            Expirations
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Champs à inclure */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Champs à inclure</h3>
                    <Button variant="ghost" size="sm">
                      Tout sélectionner
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: "date", label: "Date", checked: true },
                      { id: "type", label: "Type", checked: true },
                      { id: "code", label: "Code", checked: true },
                      { id: "employe", label: "Employé", checked: true },
                      { id: "service", label: "Service", checked: true },
                      { id: "litrage", label: "Litrage", checked: true },
                      { id: "quantite", label: "Quantité", checked: true },
                      { id: "details", label: "Détails", checked: false },
                      {
                        id: "utilisateur",
                        label: "Utilisateur",
                        checked: false,
                      },
                    ].map((field) => (
                      <div
                        key={field.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={field.id}
                          defaultChecked={field.checked}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={field.id} className="text-sm">
                          {field.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé</CardTitle>
                  <CardDescription>Prévisualisation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Format
                      </span>
                      <span className="font-medium">JSON</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Période
                      </span>
                      <span className="font-medium">Ce mois</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Champs inclus
                      </span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Est. taille
                      </span>
                      <span className="font-medium">~1.5 MB</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Générer l'export
                    </Button>
                    <Button variant="outline" className="w-full mt-2">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Planifier
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Modèles rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {exportTemplates.map((template) => (
                    <Button
                      key={template.id}
                      variant="outline"
                      className="w-full justify-start h-auto py-3"
                    >
                      <div className="text-left">
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historique des exports</CardTitle>
                  <CardDescription>
                    Liste de tous vos exports générés
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Enregistrements</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exportHistory.map((exportItem) => (
                    <TableRow key={exportItem.id}>
                      <TableCell className="font-medium">
                        {exportItem.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{exportItem.type}</Badge>
                      </TableCell>
                      <TableCell>{exportItem.size}</TableCell>
                      <TableCell>
                        {format(new Date(exportItem.date), "dd/MM/yyyy HH:mm", {
                          locale: fr,
                        })}
                      </TableCell>
                      <TableCell>
                        {exportItem.status === "completed" ? (
                          <Badge variant="success" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Terminé
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <Clock className="h-3 w-3" />
                            En cours
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {exportItem.records.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Champs inclus :</p>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.map((field) => (
                        <Badge
                          key={field}
                          variant="secondary"
                          className="text-xs"
                        >
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Dernière utilisation :{" "}
                    {format(new Date(template.lastUsed), "dd/MM/yyyy", {
                      locale: fr,
                    })}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">Utiliser</Button>
                    <Button variant="outline" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px]">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Nouveau modèle</p>
                    <p className="text-sm text-muted-foreground">
                      Créez un modèle personnalisé
                    </p>
                  </div>
                  <Button variant="outline">Créer</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
