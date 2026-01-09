import { useState, useEffect } from "react";
import { User, Mail, Building, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Service } from "./ServiceModal";

export interface Employee {
  id: string;
  name: string;
  email: string;
  service: string;
  poste: string;
  totalBons: number;
  totalConsomme: number;
  statut: "actif" | "inactif";
}

interface EmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  services: Service[];
  onSave: (employee: Employee) => void;
}

export function EmployeeModal({
  open,
  onOpenChange,
  employee,
  services,
  onSave,
}: EmployeeModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    poste: "",
  });

  const isEditing = !!employee;

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        service: employee.service,
        poste: employee.poste,
      });
    } else {
      setFormData({ name: "", email: "", service: "", poste: "" });
    }
  }, [employee, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Le nom est requis");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("L'email est requis");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("L'email n'est pas valide");
      return;
    }

    if (!formData.service) {
      toast.error("Le service est requis");
      return;
    }

    if (!formData.poste.trim()) {
      toast.error("Le poste est requis");
      return;
    }

    const savedEmployee: Employee = {
      id: employee?.id || Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      service: formData.service,
      poste: formData.poste.trim(),
      totalBons: employee?.totalBons || 0,
      totalConsomme: employee?.totalConsomme || 0,
      statut: employee?.statut || "actif",
    };

    onSave(savedEmployee);
    onOpenChange(false);
    toast.success(
      isEditing ? "Employé modifié avec succès" : "Employé ajouté avec succès"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {isEditing ? "Modifier l'employé" : "Ajouter un employé"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de l'employé"
              : "Renseignez les informations du nouvel employé"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nom complet
            </Label>
            <Input
              id="name"
              placeholder="Jean Dupont"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jean.dupont@entreprise.fr"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Service
            </Label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un service" />
              </SelectTrigger>
              <SelectContent>
                {services.length === 0 ? (
                  <SelectItem value="none" disabled>
                    Aucun service disponible
                  </SelectItem>
                ) : (
                  services.map((service) => (
                    <SelectItem key={service.id} value={service.name}>
                      {service.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="poste" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Poste
            </Label>
            <Input
              id="poste"
              placeholder="Chef de projet"
              value={formData.poste}
              onChange={(e) => setFormData({ ...formData, poste: e.target.value })}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {isEditing ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
