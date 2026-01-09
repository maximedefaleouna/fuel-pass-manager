import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Car, 
  Building, 
  Calendar, 
  Fuel, 
  Download, 
  X, 
  RefreshCcw,
  QrCode,
  FileText,
  Clock
} from "lucide-react";

interface BonDetailModalProps {
  bon: {
    id: string;
    code: string;
    employe: string;
    service: string;
    montant: number;
    type: "montant" | "litres";
    vehicule: string;
    dateAttribution: string;
    dateExpiration: string;
    statut: "attribue" | "utilise" | "expire" | "annule" | "partiel";
  } | null;
  onClose: () => void;
}

const statusLabels = {
  attribue: "Attribué",
  utilise: "Utilisé",
  expire: "Expiré",
  annule: "Annulé",
  partiel: "Partiel",
};

const mockHistory = [
  { date: "2024-05-01 09:30", action: "Bon créé", user: "Admin" },
  { date: "2024-05-01 09:31", action: "Email envoyé à l'employé", user: "Système" },
  { date: "2024-05-15 14:22", action: "Utilisation: 80€ - Station Total Paris", user: "Martin Dubois" },
];

export function BonDetailModal({ bon, onClose }: BonDetailModalProps) {
  if (!bon) return null;

  return (
    <Dialog open={!!bon} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Fuel className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="block">{bon.code}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Détails du bon
                </span>
              </div>
            </DialogTitle>
            <Badge variant={bon.statut} className="text-sm">
              {statusLabels[bon.statut]}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <User className="h-4 w-4" />
                <span className="text-sm">Employé</span>
              </div>
              <p className="font-medium">{bon.employe}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Building className="h-4 w-4" />
                <span className="text-sm">Service</span>
              </div>
              <p className="font-medium">{bon.service}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Car className="h-4 w-4" />
                <span className="text-sm">Véhicule</span>
              </div>
              <p className="font-medium">{bon.vehicule}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Fuel className="h-4 w-4" />
                <span className="text-sm">Valeur</span>
              </div>
              <p className="font-medium text-lg">
                {bon.montant} {bon.type === "litres" ? "L" : "€"}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Attribution</p>
                <p className="font-medium">
                  {new Date(bon.dateAttribution).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Expiration</p>
                <p className="font-medium">
                  {new Date(bon.dateExpiration).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* History */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Historique
            </h4>
            <div className="space-y-3">
              {mockHistory.map((entry, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.date} • {entry.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex-1">
              <QrCode className="mr-2 h-4 w-4" />
              Télécharger QR
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            {bon.statut === "attribue" && (
              <>
                <Button variant="outline" className="flex-1">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Réattribuer
                </Button>
                <Button variant="destructive" className="flex-1">
                  <X className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
