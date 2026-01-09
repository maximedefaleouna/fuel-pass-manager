import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Fuel, User, Car, Building, Send, Clock } from "lucide-react";
import { VoucherSelector, SelectedVoucher, StockItem } from "./VoucherSelector";

interface CreateBonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockEmployees = [
  { id: "1", name: "Martin Dubois", service: "Logistique", email: "m.dubois@entreprise.fr" },
  { id: "2", name: "Sophie Laurent", service: "Commercial", email: "s.laurent@entreprise.fr" },
  { id: "3", name: "Pierre Moreau", service: "Direction", email: "p.moreau@entreprise.fr" },
  { id: "4", name: "Julie Bernard", service: "Technique", email: "j.bernard@entreprise.fr" },
  { id: "5", name: "Thomas Petit", service: "Commercial", email: "t.petit@entreprise.fr" },
];

const mockVehicles = [
  { id: "1", plate: "AB-123-CD", model: "Renault Clio" },
  { id: "2", plate: "EF-456-GH", model: "Peugeot 308" },
  { id: "3", plate: "IJ-789-KL", model: "Citroën C3" },
  { id: "4", plate: "MN-012-OP", model: "Toyota Yaris" },
];

// Stock data - would come from backend in real app
const mockStocks: StockItem[] = [
  { id: "1", litrage: 10, quantiteDisponible: 342, prixUnitaire: 15.5 },
  { id: "2", litrage: 15, quantiteDisponible: 45, prixUnitaire: 22.0 },
  { id: "3", litrage: 20, quantiteDisponible: 285, prixUnitaire: 29.0 },
  { id: "4", litrage: 25, quantiteDisponible: 178, prixUnitaire: 36.0 },
  { id: "5", litrage: 30, quantiteDisponible: 12, prixUnitaire: 43.5 },
  { id: "6", litrage: 50, quantiteDisponible: 67, prixUnitaire: 72.0 },
];

export function CreateBonModal({ open, onOpenChange }: CreateBonModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedVouchers, setSelectedVouchers] = useState<SelectedVoucher[]>([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    vehicleId: "",
    expirationDate: "",
    station: "",
    comment: "",
  });

  const selectedEmployee = mockEmployees.find((e) => e.id === formData.employeeId);

  const resetForm = () => {
    setFormData({
      employeeId: "",
      vehicleId: "",
      expirationDate: "",
      station: "",
      comment: "",
    });
    setSelectedVouchers([]);
  };

  const handleSubmit = async (action: "attente" | "envoyer") => {
    // Validate required fields
    if (!formData.employeeId || selectedVouchers.length === 0 || !formData.expirationDate) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez sélectionner un employé, au moins un bon et une date d'expiration.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Calculate totals for the toast message
    const totalLitres = selectedVouchers.reduce((acc, v) => acc + (v.litrage * v.quantite), 0);
    const totalBons = selectedVouchers.reduce((acc, v) => acc + v.quantite, 0);
    const totalValeur = selectedVouchers.reduce((acc, v) => acc + (v.prixUnitaire * v.quantite), 0);

    // Simulate API call
    setTimeout(() => {
      if (action === "envoyer") {
        toast({
          title: "Bon créé et envoyé",
          description: `${totalBons} bon(s) (${totalLitres}L) attribués à ${selectedEmployee?.name}. Email envoyé à ${selectedEmployee?.email}.`,
        });
      } else {
        toast({
          title: "Bon créé en attente",
          description: `${totalBons} bon(s) (${totalLitres}L, ${totalValeur.toFixed(2)}€) créés. Vous pourrez les envoyer plus tard.`,
        });
      }
      setIsSubmitting(false);
      onOpenChange(false);
      resetForm();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5 text-primary" />
            Attribuer des bons de carburant
          </DialogTitle>
          <DialogDescription>
            Sélectionnez les bons à attribuer comme des billets de banque (ex: 2×20L + 1×10L = 50L)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Employee Selection */}
          <div className="space-y-2">
            <Label htmlFor="employee" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Employé *
            </Label>
            <Select
              value={formData.employeeId}
              onValueChange={(value) =>
                setFormData({ ...formData, employeeId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un employé" />
              </SelectTrigger>
              <SelectContent>
                {mockEmployees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    <div className="flex flex-col">
                      <span>{employee.name}</span>
                      <span className="text-xs text-muted-foreground">{employee.service}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service (auto-filled) */}
          {selectedEmployee && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Service
              </Label>
              <Input value={selectedEmployee.service} disabled />
            </div>
          )}

          {/* Vehicle */}
          <div className="space-y-2">
            <Label htmlFor="vehicle" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Véhicule (optionnel)
            </Label>
            <Select
              value={formData.vehicleId}
              onValueChange={(value) =>
                setFormData({ ...formData, vehicleId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un véhicule" />
              </SelectTrigger>
              <SelectContent>
                {mockVehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.plate} - {vehicle.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Voucher Selector - LIKE BANK BILLS */}
          <VoucherSelector
            stocks={mockStocks}
            selectedVouchers={selectedVouchers}
            onChange={setSelectedVouchers}
          />

          {/* Expiration Date */}
          <div className="space-y-2">
            <Label htmlFor="expiration" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date d'expiration *
            </Label>
            <Input
              id="expiration"
              type="date"
              value={formData.expirationDate}
              onChange={(e) =>
                setFormData({ ...formData, expirationDate: e.target.value })
              }
              required
            />
          </div>

          {/* Station */}
          <div className="space-y-2">
            <Label htmlFor="station">Station autorisée (optionnel)</Label>
            <Input
              id="station"
              placeholder="Ex: TotalEnergies, toutes stations..."
              value={formData.station}
              onChange={(e) =>
                setFormData({ ...formData, station: e.target.value })
              }
            />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Commentaire</Label>
            <Textarea
              id="comment"
              placeholder="Ajouter un commentaire..."
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              rows={2}
            />
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="sm:mr-auto"
            >
              Annuler
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              disabled={isSubmitting || selectedVouchers.length === 0}
              onClick={() => handleSubmit("attente")}
            >
              <Clock className="mr-2 h-4 w-4" />
              {isSubmitting ? "Création..." : "Créer en attente"}
            </Button>
            <Button 
              type="button" 
              disabled={isSubmitting || selectedVouchers.length === 0}
              onClick={() => handleSubmit("envoyer")}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Envoi..." : "Créer et envoyer"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
