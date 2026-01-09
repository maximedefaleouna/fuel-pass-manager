import { useState } from "react";
import {
  Search,
  QrCode,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  Fuel,
  Clock,
  AlertTriangle,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface BonRetrait {
  id: string;
  code: string;
  codeRetrait: string;
  employe: string;
  email: string;
  service: string;
  litrage: number;
  quantite: number;
  dateAttribution: string;
  dateExpiration: string;
  statut: "en_attente" | "retire" | "expire" | "annule";
  vehicule?: string;
}

const mockBonsRetrait: BonRetrait[] = [
  {
    id: "1",
    code: "BC-2024-0165",
    codeRetrait: "RET-7845",
    employe: "Martin Dubois",
    email: "m.dubois@entreprise.com",
    service: "Logistique",
    litrage: 20,
    quantite: 3,
    dateAttribution: "2024-05-20",
    dateExpiration: "2024-06-20",
    statut: "en_attente",
    vehicule: "AB-123-CD",
  },
  {
    id: "2",
    code: "BC-2024-0166",
    codeRetrait: "RET-9521",
    employe: "Sophie Laurent",
    email: "s.laurent@entreprise.com",
    service: "Commercial",
    litrage: 15,
    quantite: 2,
    dateAttribution: "2024-05-19",
    dateExpiration: "2024-06-19",
    statut: "en_attente",
    vehicule: "EF-456-GH",
  },
  {
    id: "3",
    code: "BC-2024-0164",
    codeRetrait: "RET-3256",
    employe: "Pierre Moreau",
    email: "p.moreau@entreprise.com",
    service: "Direction",
    litrage: 30,
    quantite: 2,
    dateAttribution: "2024-05-18",
    dateExpiration: "2024-06-18",
    statut: "retire",
  },
  {
    id: "4",
    code: "BC-2024-0160",
    codeRetrait: "RET-1478",
    employe: "Julie Bernard",
    email: "j.bernard@entreprise.com",
    service: "Technique",
    litrage: 10,
    quantite: 5,
    dateAttribution: "2024-04-10",
    dateExpiration: "2024-05-10",
    statut: "expire",
  },
];

const statusConfig = {
  en_attente: { label: "En attente", variant: "warning" as const, icon: Clock },
  retire: { label: "Retiré", variant: "success" as const, icon: CheckCircle2 },
  expire: { label: "Expiré", variant: "destructive" as const, icon: AlertTriangle },
  annule: { label: "Annulé", variant: "destructive" as const, icon: XCircle },
};

export default function RetraitPage() {
  const [searchCode, setSearchCode] = useState("");
  const [foundBon, setFoundBon] = useState<BonRetrait | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [commentaire, setCommentaire] = useState("");
  const [searchError, setSearchError] = useState("");

  const pendingRetraits = mockBonsRetrait.filter((b) => b.statut === "en_attente");
  const todayRetraits = mockBonsRetrait.filter((b) => b.statut === "retire");

  const handleSearch = () => {
    setIsSearching(true);
    setSearchError("");
    
    // Simulate search
    setTimeout(() => {
      const bon = mockBonsRetrait.find(
        (b) => b.codeRetrait.toLowerCase() === searchCode.toLowerCase() ||
               b.code.toLowerCase() === searchCode.toLowerCase()
      );
      
      if (bon) {
        setFoundBon(bon);
        setSearchError("");
      } else {
        setFoundBon(null);
        setSearchError("Aucun bon trouvé avec ce code");
      }
      setIsSearching(false);
    }, 500);
  };

  const handleConfirmRetrait = () => {
    // In real app, this would update the database
    setIsConfirmOpen(false);
    setFoundBon(null);
    setSearchCode("");
    setCommentaire("");
  };

  const isExpired = (date: string) => new Date(date) < new Date();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Retrait des Bons</h1>
          <p className="text-muted-foreground">
            Validez les retraits de bons par les employés
          </p>
        </div>
      </div>

      {/* Search Section */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            Recherche de bon
          </CardTitle>
          <CardDescription>
            Entrez le code de retrait ou scannez le QR code du bon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Code de retrait (ex: RET-7845) ou code bon..."
                value={searchCode}
                onChange={(e) => {
                  setSearchCode(e.target.value.toUpperCase());
                  setSearchError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 text-lg h-12"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              size="lg"
              disabled={!searchCode || isSearching}
            >
              {isSearching ? "Recherche..." : "Rechercher"}
            </Button>
          </div>
          
          {searchError && (
            <div className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              {searchError}
            </div>
          )}

          {/* Found Bon Display */}
          {foundBon && (
            <div className="mt-6 p-6 rounded-lg border-2 border-primary/30 bg-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{foundBon.code}</h3>
                  <p className="text-sm text-muted-foreground">Code retrait: {foundBon.codeRetrait}</p>
                </div>
                <Badge variant={statusConfig[foundBon.statut].variant} className="text-sm px-3 py-1">
                  {statusConfig[foundBon.statut].label}
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Employé</p>
                    <p className="font-medium">{foundBon.employe}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Fuel className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Bons</p>
                    <p className="font-medium">{foundBon.quantite}x {foundBon.litrage}L</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total litres</p>
                    <p className="font-medium">{foundBon.quantite * foundBon.litrage}L</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isExpired(foundBon.dateExpiration) ? "bg-destructive/10" : "bg-success/10"}`}>
                    <Calendar className={`h-5 w-5 ${isExpired(foundBon.dateExpiration) ? "text-destructive" : "text-success"}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expiration</p>
                    <p className={`font-medium ${isExpired(foundBon.dateExpiration) ? "text-destructive" : ""}`}>
                      {new Date(foundBon.dateExpiration).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              </div>

              {foundBon.vehicule && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50">
                  <p className="text-sm"><span className="text-muted-foreground">Véhicule:</span> {foundBon.vehicule}</p>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                {foundBon.statut === "en_attente" && !isExpired(foundBon.dateExpiration) && (
                  <Button 
                    onClick={() => setIsConfirmOpen(true)} 
                    className="flex-1"
                    variant="success"
                    size="lg"
                  >
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Confirmer le retrait
                  </Button>
                )}
                {foundBon.statut === "retire" && (
                  <div className="flex-1 p-4 rounded-lg bg-success/10 text-success text-center">
                    <CheckCircle2 className="h-6 w-6 mx-auto mb-2" />
                    Ce bon a déjà été retiré
                  </div>
                )}
                {(foundBon.statut === "expire" || isExpired(foundBon.dateExpiration)) && (
                  <div className="flex-1 p-4 rounded-lg bg-destructive/10 text-destructive text-center">
                    <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
                    Ce bon est expiré
                  </div>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFoundBon(null);
                    setSearchCode("");
                  }}
                >
                  Nouvelle recherche
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pending Retraits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              En attente de retrait
              <Badge variant="warning" className="ml-2">{pendingRetraits.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingRetraits.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aucun retrait en attente
              </p>
            ) : (
              <div className="space-y-3">
                {pendingRetraits.map((bon) => (
                  <div
                    key={bon.id}
                    className="p-4 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSearchCode(bon.codeRetrait);
                      setFoundBon(bon);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{bon.employe}</p>
                        <p className="text-sm text-muted-foreground">
                          {bon.quantite}x {bon.litrage}L • {bon.codeRetrait}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{bon.quantite * bon.litrage}L</p>
                        <p className="text-xs text-muted-foreground">
                          Exp: {new Date(bon.dateExpiration).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Retraits récents
              <Badge variant="success" className="ml-2">{todayRetraits.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayRetraits.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aucun retrait aujourd'hui
              </p>
            ) : (
              <div className="space-y-3">
                {todayRetraits.map((bon) => (
                  <div
                    key={bon.id}
                    className="p-4 rounded-lg border bg-success/5 border-success/20"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{bon.employe}</p>
                        <p className="text-sm text-muted-foreground">
                          {bon.quantite}x {bon.litrage}L • {bon.code}
                        </p>
                      </div>
                      <Badge variant="success">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Retiré
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirm Modal */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer le retrait</DialogTitle>
            <DialogDescription>
              Vérifiez l'identité de l'employé avant de confirmer le retrait
            </DialogDescription>
          </DialogHeader>
          {foundBon && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-muted">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Employé</p>
                    <p className="font-medium">{foundBon.employe}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{foundBon.service}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm">{foundBon.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bons à remettre</p>
                    <p className="font-bold text-lg text-primary">
                      {foundBon.quantite}x {foundBon.litrage}L
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Commentaire (optionnel)</Label>
                <Textarea
                  placeholder="Notes sur le retrait..."
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Annuler
            </Button>
            <Button variant="success" onClick={handleConfirmRetrait}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirmer le retrait
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
