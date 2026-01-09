import { useState } from "react";
import { Plus, Edit, Trash2, Building, X } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export interface Service {
  id: string;
  name: string;
  employeeCount: number;
}

interface ServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  services: Service[];
  onServicesChange: (services: Service[]) => void;
}

export function ServiceModal({
  open,
  onOpenChange,
  services,
  onServicesChange,
}: ServiceModalProps) {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newServiceName, setNewServiceName] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddService = () => {
    if (!newServiceName.trim()) {
      toast.error("Le nom du service est requis");
      return;
    }

    if (services.some((s) => s.name.toLowerCase() === newServiceName.toLowerCase())) {
      toast.error("Ce service existe déjà");
      return;
    }

    const newService: Service = {
      id: Date.now().toString(),
      name: newServiceName.trim(),
      employeeCount: 0,
    };

    onServicesChange([...services, newService]);
    setNewServiceName("");
    setIsAddingNew(false);
    toast.success(`Service "${newService.name}" créé`);
  };

  const handleUpdateService = () => {
    if (!editingService || !editingService.name.trim()) {
      toast.error("Le nom du service est requis");
      return;
    }

    if (
      services.some(
        (s) =>
          s.id !== editingService.id &&
          s.name.toLowerCase() === editingService.name.toLowerCase()
      )
    ) {
      toast.error("Ce service existe déjà");
      return;
    }

    onServicesChange(
      services.map((s) => (s.id === editingService.id ? editingService : s))
    );
    setEditingService(null);
    toast.success("Service modifié");
  };

  const handleDeleteService = (service: Service) => {
    if (service.employeeCount > 0) {
      toast.error(
        `Impossible de supprimer ce service car il contient ${service.employeeCount} employé(s)`
      );
      return;
    }

    onServicesChange(services.filter((s) => s.id !== service.id));
    toast.success(`Service "${service.name}" supprimé`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Gestion des services
          </DialogTitle>
          <DialogDescription>
            Créez, modifiez ou supprimez les services de l'organisation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Add new service form */}
          {isAddingNew ? (
            <div className="flex gap-2 items-end p-3 border rounded-lg bg-muted/50">
              <div className="flex-1 space-y-2">
                <Label>Nouveau service</Label>
                <Input
                  placeholder="Nom du service"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddService()}
                  autoFocus
                />
              </div>
              <Button size="sm" onClick={handleAddService}>
                Ajouter
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsAddingNew(false);
                  setNewServiceName("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsAddingNew(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un service
            </Button>
          )}

          {/* Services list */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du service</TableHead>
                  <TableHead className="text-center w-[100px]">Employés</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      Aucun service créé
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        {editingService?.id === service.id ? (
                          <Input
                            value={editingService.name}
                            onChange={(e) =>
                              setEditingService({ ...editingService, name: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleUpdateService();
                              if (e.key === "Escape") setEditingService(null);
                            }}
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium">{service.name}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">{service.employeeCount}</TableCell>
                      <TableCell className="text-right">
                        {editingService?.id === service.id ? (
                          <div className="flex justify-end gap-1">
                            <Button size="sm" onClick={handleUpdateService}>
                              Enregistrer
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingService(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setEditingService(service)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteService(service)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
