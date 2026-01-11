// import { useState } from "react";
// import {
//   Plus,
//   Search,
//   FileDown,
//   Eye,
//   Edit,
//   Ban,
//   MoreHorizontal,
//   ChevronLeft,
//   ChevronRight,
//   Settings,
//   CheckCircle,
// } from "lucide-react";
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
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { toast } from "sonner";
// import { ServiceModal, type Service } from "@/components/employes/ServiceModal";
// import { EmployeeModal, type Employee } from "@/components/employes/EmployeeModal";

// // Initial mock services
// const initialServices: Service[] = [
//   { id: "1", name: "Logistique", employeeCount: 1 },
//   { id: "2", name: "Commercial", employeeCount: 2 },
//   { id: "3", name: "Direction", employeeCount: 1 },
//   { id: "4", name: "Technique", employeeCount: 1 },
// ];

// // Initial mock employees
// const initialEmployees: Employee[] = [
//   {
//     id: "1",
//     name: "Martin Dubois",
//     email: "martin.dubois@universite.fr",
//     service: "Logistique",
//     poste: "Chef de service",
//     totalBons: 24,
//     totalConsomme: 2450,
//     statut: "actif",
//   },
//   {
//     id: "2",
//     name: "Sophie Laurent",
//     email: "sophie.laurent@universite.fr",
//     service: "Commercial",
//     poste: "Commerciale",
//     totalBons: 18,
//     totalConsomme: 2180,
//     statut: "actif",
//   },
//   {
//     id: "3",
//     name: "Pierre Moreau",
//     email: "pierre.moreau@universite.fr",
//     service: "Direction",
//     poste: "Directeur adjoint",
//     totalBons: 15,
//     totalConsomme: 1890,
//     statut: "actif",
//   },
//   {
//     id: "4",
//     name: "Julie Bernard",
//     email: "julie.bernard@universite.fr",
//     service: "Technique",
//     poste: "Technicienne",
//     totalBons: 12,
//     totalConsomme: 1750,
//     statut: "actif",
//   },
//   {
//     id: "5",
//     name: "Thomas Petit",
//     email: "thomas.petit@universite.fr",
//     service: "Commercial",
//     poste: "Commercial",
//     totalBons: 10,
//     totalConsomme: 1620,
//     statut: "inactif",
//   },
// ];

// export default function EmployesPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [serviceFilter, setServiceFilter] = useState<string>("all");
//   const [statusFilter, setStatusFilter] = useState<string>("all");

//   // Data state
//   const [services, setServices] = useState<Service[]>(initialServices);
//   const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

//   // Modal state
//   const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
//   const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

//   const filteredEmployees = employees.filter((emp) => {
//     const matchesSearch =
//       emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesService = serviceFilter === "all" || emp.service === serviceFilter;
//     const matchesStatus = statusFilter === "all" || emp.statut === statusFilter;
//     return matchesSearch && matchesService && matchesStatus;
//   });

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   const handleServicesChange = (newServices: Service[]) => {
//     setServices(newServices);
//   };

//   const handleSaveEmployee = (employee: Employee) => {
//     const existingIndex = employees.findIndex((e) => e.id === employee.id);

//     if (existingIndex >= 0) {
//       // Update existing employee
//       const oldService = employees[existingIndex].service;
//       const newEmployees = [...employees];
//       newEmployees[existingIndex] = employee;
//       setEmployees(newEmployees);

//       // Update service employee counts if service changed
//       if (oldService !== employee.service) {
//         setServices((prev) =>
//           prev.map((s) => {
//             if (s.name === oldService) {
//               return { ...s, employeeCount: Math.max(0, s.employeeCount - 1) };
//             }
//             if (s.name === employee.service) {
//               return { ...s, employeeCount: s.employeeCount + 1 };
//             }
//             return s;
//           })
//         );
//       }
//     } else {
//       // Add new employee
//       setEmployees([...employees, employee]);

//       // Update service employee count
//       setServices((prev) =>
//         prev.map((s) =>
//           s.name === employee.service
//             ? { ...s, employeeCount: s.employeeCount + 1 }
//             : s
//         )
//       );
//     }
//     setEditingEmployee(null);
//   };

//   const handleToggleStatus = (emp: Employee) => {
//     const newStatus = emp.statut === "actif" ? "inactif" : "actif";
//     setEmployees((prev) =>
//       prev.map((e) => (e.id === emp.id ? { ...e, statut: newStatus } : e))
//     );
//     toast.success(
//       newStatus === "actif"
//         ? `${emp.name} a été réactivé`
//         : `${emp.name} a été désactivé`
//     );
//   };

//   const openEditModal = (emp: Employee) => {
//     setEditingEmployee(emp);
//     setIsEmployeeModalOpen(true);
//   };

//   const openAddModal = () => {
//     setEditingEmployee(null);
//     setIsEmployeeModalOpen(true);
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">Employés</h1>
//           <p className="text-muted-foreground">
//             Gérez les employés et leurs attributions de bons
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <Button variant="outline" onClick={() => setIsServiceModalOpen(true)}>
//             <Settings className="mr-2 h-4 w-4" />
//             Gérer les services
//           </Button>
//           <Button variant="outline">
//             <FileDown className="mr-2 h-4 w-4" />
//             Export
//           </Button>
//           <Button onClick={openAddModal}>
//             <Plus className="mr-2 h-4 w-4" />
//             Ajouter un employé
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
//                 placeholder="Rechercher par nom ou email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={serviceFilter} onValueChange={setServiceFilter}>
//               <SelectTrigger className="w-full sm:w-[180px]">
//                 <SelectValue placeholder="Service" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tous les services</SelectItem>
//                 {services.map((service) => (
//                   <SelectItem key={service.id} value={service.name}>
//                     {service.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full sm:w-[150px]">
//                 <SelectValue placeholder="Statut" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tous</SelectItem>
//                 <SelectItem value="actif">Actif</SelectItem>
//                 <SelectItem value="inactif">Inactif</SelectItem>
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
//               <TableHead>Employé</TableHead>
//               <TableHead>Service</TableHead>
//               <TableHead>Poste</TableHead>
//               <TableHead className="text-right">Bons reçus</TableHead>
//               <TableHead className="text-right">Total consommé</TableHead>
//               <TableHead>Statut</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredEmployees.map((emp) => (
//               <TableRow key={emp.id} className="cursor-pointer hover:bg-muted/50">
//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <Avatar className="h-9 w-9">
//                       <AvatarFallback className="bg-primary/10 text-primary text-sm">
//                         {getInitials(emp.name)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium">{emp.name}</p>
//                       <p className="text-sm text-muted-foreground">{emp.email}</p>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>{emp.service}</TableCell>
//                 <TableCell>{emp.poste}</TableCell>
//                 <TableCell className="text-right font-medium">{emp.totalBons}</TableCell>
//                 <TableCell className="text-right font-medium">
//                   {emp.totalConsomme.toLocaleString()} €
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant={emp.statut === "actif" ? "success" : "secondary"}>
//                     {emp.statut === "actif" ? "Actif" : "Inactif"}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem>
//                         <Eye className="mr-2 h-4 w-4" />
//                         Voir profil
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => openEditModal(emp)}>
//                         <Edit className="mr-2 h-4 w-4" />
//                         Modifier
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         className={emp.statut === "actif" ? "text-destructive" : "text-green-600"}
//                         onClick={() => handleToggleStatus(emp)}
//                       >
//                         {emp.statut === "actif" ? (
//                           <>
//                             <Ban className="mr-2 h-4 w-4" />
//                             Désactiver
//                           </>
//                         ) : (
//                           <>
//                             <CheckCircle className="mr-2 h-4 w-4" />
//                             Réactiver
//                           </>
//                         )}
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
//             Affichage de {filteredEmployees.length} sur {employees.length} employés
//           </p>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" disabled>
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
//               1
//             </Button>
//             <Button variant="outline" size="sm">
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <ServiceModal
//         open={isServiceModalOpen}
//         onOpenChange={setIsServiceModalOpen}
//         services={services}
//         onServicesChange={handleServicesChange}
//       />
//       <EmployeeModal
//         open={isEmployeeModalOpen}
//         onOpenChange={setIsEmployeeModalOpen}
//         employee={editingEmployee}
//         services={services}
//         onSave={handleSaveEmployee}
//       />
//     </div>
//   );
// }

import { useState } from "react";
import {
  Plus,
  Search,
  FileDown,
  Eye,
  Edit,
  Ban,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Settings,
  CheckCircle,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ServiceModal, type Service } from "@/components/employes/ServiceModal";
import {
  EmployeeModal,
  type Employee,
} from "@/components/employes/EmployeeModal";

// Initial mock services
const initialServices: Service[] = [
  { id: "1", name: "Logistique", employeeCount: 1 },
  { id: "2", name: "Commercial", employeeCount: 2 },
  { id: "3", name: "Direction", employeeCount: 1 },
  { id: "4", name: "Technique", employeeCount: 1 },
];

// Initial mock employees
const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Martin Dubois",
    email: "martin.dubois@universite.fr",
    service: "Logistique",
    poste: "Chef de service",
    totalBons: 24,
    totalConsomme: 2450, // litres
    statut: "actif",
  },
  {
    id: "2",
    name: "Sophie Laurent",
    email: "sophie.laurent@universite.fr",
    service: "Commercial",
    poste: "Commerciale",
    totalBons: 18,
    totalConsomme: 2180,
    statut: "actif",
  },
  {
    id: "3",
    name: "Pierre Moreau",
    email: "pierre.moreau@universite.fr",
    service: "Direction",
    poste: "Directeur adjoint",
    totalBons: 15,
    totalConsomme: 1890,
    statut: "actif",
  },
  {
    id: "4",
    name: "Julie Bernard",
    email: "julie.bernard@universite.fr",
    service: "Technique",
    poste: "Technicienne",
    totalBons: 12,
    totalConsomme: 1750,
    statut: "actif",
  },
  {
    id: "5",
    name: "Thomas Petit",
    email: "thomas.petit@universite.fr",
    service: "Commercial",
    poste: "Commercial",
    totalBons: 10,
    totalConsomme: 1620,
    statut: "inactif",
  },
];

export default function EmployesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Data state
  const [services, setServices] = useState<Service[]>(initialServices);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  // Modal state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService =
      serviceFilter === "all" || emp.service === serviceFilter;
    const matchesStatus = statusFilter === "all" || emp.statut === statusFilter;
    return matchesSearch && matchesService && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleServicesChange = (newServices: Service[]) => {
    setServices(newServices);
  };

  const handleSaveEmployee = (employee: Employee) => {
    const existingIndex = employees.findIndex((e) => e.id === employee.id);

    if (existingIndex >= 0) {
      // Update existing employee
      const oldService = employees[existingIndex].service;
      const newEmployees = [...employees];
      newEmployees[existingIndex] = employee;
      setEmployees(newEmployees);

      // Update service employee counts if service changed
      if (oldService !== employee.service) {
        setServices((prev) =>
          prev.map((s) => {
            if (s.name === oldService) {
              return { ...s, employeeCount: Math.max(0, s.employeeCount - 1) };
            }
            if (s.name === employee.service) {
              return { ...s, employeeCount: s.employeeCount + 1 };
            }
            return s;
          })
        );
      }
    } else {
      // Add new employee
      setEmployees([...employees, employee]);

      // Update service employee count
      setServices((prev) =>
        prev.map((s) =>
          s.name === employee.service
            ? { ...s, employeeCount: s.employeeCount + 1 }
            : s
        )
      );
    }
    setEditingEmployee(null);
  };

  const handleToggleStatus = (emp: Employee) => {
    const newStatus = emp.statut === "actif" ? "inactif" : "actif";
    setEmployees((prev) =>
      prev.map((e) => (e.id === emp.id ? { ...e, statut: newStatus } : e))
    );
    toast.success(
      newStatus === "actif"
        ? `${emp.name} a été réactivé`
        : `${emp.name} a été désactivé`
    );
  };

  const openEditModal = (emp: Employee) => {
    setEditingEmployee(emp);
    setIsEmployeeModalOpen(true);
  };

  const openAddModal = () => {
    setEditingEmployee(null);
    setIsEmployeeModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Employés</h1>
          <p className="text-muted-foreground">
            Gérez les employés et leurs attributions de bons
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsServiceModalOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Gérer les services
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={openAddModal}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un employé
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
                placeholder="Rechercher par nom ou email..."
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
                  <SelectItem key={service.id} value={service.name}>
                    {service.name}
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
              <TableHead>Employé</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead className="text-right">Bons reçus</TableHead>
              <TableHead className="text-right">Total consommé</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((emp) => (
              <TableRow
                key={emp.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials(emp.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {emp.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{emp.service}</TableCell>
                <TableCell>{emp.poste}</TableCell>
                <TableCell className="text-right font-medium">
                  {emp.totalBons}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {emp.totalConsomme.toLocaleString()} L
                </TableCell>
                <TableCell>
                  <Badge
                    variant={emp.statut === "actif" ? "success" : "secondary"}
                  >
                    {emp.statut === "actif" ? "Actif" : "Inactif"}
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
                        Voir profil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditModal(emp)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className={
                          emp.statut === "actif"
                            ? "text-destructive"
                            : "text-green-600"
                        }
                        onClick={() => handleToggleStatus(emp)}
                      >
                        {emp.statut === "actif" ? (
                          <>
                            <Ban className="mr-2 h-4 w-4" />
                            Désactiver
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Réactiver
                          </>
                        )}
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
            Affichage de {filteredEmployees.length} sur {employees.length}{" "}
            employés
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ServiceModal
        open={isServiceModalOpen}
        onOpenChange={setIsServiceModalOpen}
        services={services}
        onServicesChange={handleServicesChange}
      />
      <EmployeeModal
        open={isEmployeeModalOpen}
        onOpenChange={setIsEmployeeModalOpen}
        employee={editingEmployee}
        services={services}
        onSave={handleSaveEmployee}
      />
    </div>
  );
}
