// app/parametres/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Shield,
  Users,
  Fuel,
  Mail,
  Save,
  RefreshCw,
  Database,
  Clock,
  FileText,
  Download,
  Upload,
} from "lucide-react";

const companySettings = {
  name: "Entreprise ABC",
  address: "123 Rue de l'Industrie, 75000 Paris",
  email: "contact@entreprise-abc.fr",
  phone: "+33 1 23 45 67 89",
  siret: "123 456 789 00012",
};

const users = [
  {
    id: "1",
    name: "Admin Principal",
    email: "admin@entreprise.fr",
    role: "Administrateur",
    status: "active",
  },
  {
    id: "2",
    name: "Manager RH",
    email: "rh@entreprise.fr",
    role: "Gestionnaire",
    status: "active",
  },
  {
    id: "3",
    name: "Comptable",
    email: "compta@entreprise.fr",
    role: "Utilisateur",
    status: "active",
  },
  {
    id: "4",
    name: "Stagiaire",
    email: "stagiaire@entreprise.fr",
    role: "Lecteur",
    status: "inactive",
  },
];

const notificationSettings = {
  emailNotifications: true,
  expirationAlerts: true,
  lowStockAlerts: true,
  dailyReports: false,
  weeklyReports: true,
  monthlyReports: true,
  alertThreshold: 20, // %
};

export default function ParametresPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de l'application
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="general" className="gap-2">
            <Settings className="h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Utilisateurs
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <Database className="h-4 w-4" />
            Avancé
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5" />
                  Informations société
                </CardTitle>
                <CardDescription>
                  Informations de base de votre entreprise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l'entreprise</Label>
                  <Input
                    id="company-name"
                    defaultValue={companySettings.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" defaultValue={companySettings.address} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={companySettings.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" defaultValue={companySettings.phone} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siret">SIRET</Label>
                  <Input id="siret" defaultValue={companySettings.siret} />
                </div>
              </CardContent>
            </Card>

            {/* Fuel Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Paramètres carburant</CardTitle>
                <CardDescription>
                  Configuration des bons de carburant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-litrage">Litrage par défaut</Label>
                  <Select defaultValue="20">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un litrage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10L</SelectItem>
                      <SelectItem value="15">15L</SelectItem>
                      <SelectItem value="20">20L</SelectItem>
                      <SelectItem value="25">25L</SelectItem>
                      <SelectItem value="30">30L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiration-days">
                    Durée de validité (jours)
                  </Label>
                  <Input
                    id="expiration-days"
                    type="number"
                    defaultValue="30"
                    min="1"
                    max="365"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-bons">
                    Maximum de bons par attribution
                  </Label>
                  <Input
                    id="max-bons"
                    type="number"
                    defaultValue="5"
                    min="1"
                    max="20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select defaultValue="EUR">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">Dollar ($)</SelectItem>
                      <SelectItem value="GBP">Livre (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Backup Settings */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sauvegarde et restauration</CardTitle>
                <CardDescription>
                  Gérez les sauvegardes de vos données
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Sauvegarde automatique</h3>
                        <p className="text-sm text-muted-foreground">
                          Crée des sauvegardes automatiques
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">
                        Fréquence des sauvegardes
                      </Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une fréquence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">
                            Toutes les heures
                          </SelectItem>
                          <SelectItem value="daily">Quotidienne</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                          <SelectItem value="monthly">Mensuelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Dernière sauvegarde</Label>
                      <div className="text-sm text-muted-foreground">
                        <p>Date : 20/05/2024 02:00</p>
                        <p>Taille : 24.5 MB</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Sauvegarder maintenant
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Upload className="mr-2 h-4 w-4" />
                        Restaurer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Paramètres de notification
              </CardTitle>
              <CardDescription>
                Configurez comment vous recevez les alertes et notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Settings */}
              <div className="space-y-4">
                <h3 className="font-medium">Notifications par email</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">
                        Notifications par email
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications par email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      defaultChecked={notificationSettings.emailNotifications}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="expiration-alerts">
                        Alertes d'expiration
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Alertes pour les bons qui expirent
                      </p>
                    </div>
                    <Switch
                      id="expiration-alerts"
                      defaultChecked={notificationSettings.expirationAlerts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="low-stock-alerts">
                        Alertes stock bas
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Alertes quand le stock est faible
                      </p>
                    </div>
                    <Switch
                      id="low-stock-alerts"
                      defaultChecked={notificationSettings.lowStockAlerts}
                    />
                  </div>
                </div>
              </div>

              {/* Report Settings */}
              <div className="space-y-4">
                <h3 className="font-medium">Rapports automatiques</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily-reports">Rapports quotidiens</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir un rapport quotidien
                      </p>
                    </div>
                    <Switch
                      id="daily-reports"
                      defaultChecked={notificationSettings.dailyReports}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-reports">
                        Rapports hebdomadaires
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Rapport hebdomadaire le lundi matin
                      </p>
                    </div>
                    <Switch
                      id="weekly-reports"
                      defaultChecked={notificationSettings.weeklyReports}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="monthly-reports">Rapports mensuels</Label>
                      <p className="text-sm text-muted-foreground">
                        Rapport mensuel le premier du mois
                      </p>
                    </div>
                    <Switch
                      id="monthly-reports"
                      defaultChecked={notificationSettings.monthlyReports}
                    />
                  </div>
                </div>
              </div>

              {/* Alert Settings */}
              <div className="space-y-4">
                <h3 className="font-medium">Seuils d'alerte</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="alert-threshold">
                      Seuil d'alerte stock bas (%)
                    </Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="alert-threshold"
                        type="range"
                        min="1"
                        max="50"
                        defaultValue={notificationSettings.alertThreshold}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-10">
                        {notificationSettings.alertThreshold}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Alerte lorsque le stock est inférieur à ce pourcentage
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sécurité et accès
              </CardTitle>
              <CardDescription>
                Gérez les paramètres de sécurité et les accès
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Policy */}
              <div className="space-y-4">
                <h3 className="font-medium">Politique de mot de passe</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Longueur minimale</Label>
                      <p className="text-sm text-muted-foreground">
                        Nombre minimum de caractères
                      </p>
                    </div>
                    <Select defaultValue="8">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Switch id="uppercase" />
                      <Label htmlFor="uppercase">Exiger des majuscules</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="numbers" defaultChecked />
                      <Label htmlFor="numbers">Exiger des chiffres</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="special" />
                      <Label htmlFor="special">
                        Exiger des caractères spéciaux
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Settings */}
              <div className="space-y-4">
                <h3 className="font-medium">Sessions et connexion</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Durée de session (minutes)</Label>
                      <p className="text-sm text-muted-foreground">
                        Temps avant déconnexion automatique
                      </p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="60">60</SelectItem>
                        <SelectItem value="120">120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Switch id="two-factor" />
                      <Label htmlFor="two-factor">
                        Authentification à deux facteurs
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="ip-check" defaultChecked />
                      <Label htmlFor="ip-check">
                        Vérification d'adresse IP
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Log */}
              <div className="space-y-4">
                <h3 className="font-medium">Journal d'audit</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Switch id="audit-log" defaultChecked />
                    <Label htmlFor="audit-log">
                      Activer le journal d'audit
                    </Label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Conservation des logs (jours)</Label>
                      <p className="text-sm text-muted-foreground">
                        Durée de conservation des journaux
                      </p>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="90">90</SelectItem>
                        <SelectItem value="180">180</SelectItem>
                        <SelectItem value="365">365</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Voir les journaux d'audit
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Users Settings */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestion des utilisateurs
                  </CardTitle>
                  <CardDescription>
                    Gérez les accès et permissions des utilisateurs
                  </CardDescription>
                </div>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Ajouter un utilisateur
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">
                      Utilisateurs ({users.length})
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Liste des utilisateurs ayant accès à l'application
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            user.status === "active" ? "success" : "secondary"
                          }
                        >
                          {user.status === "active" ? "Actif" : "Inactif"}
                        </Badge>
                        <Badge variant="outline">{user.role}</Badge>
                        <Button variant="ghost" size="sm">
                          Modifier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Roles & Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Rôles et permissions</CardTitle>
              <CardDescription>
                Définissez les permissions pour chaque rôle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      role: "Administrateur",
                      desc: "Accès complet à toutes les fonctionnalités",
                      users: 1,
                    },
                    {
                      role: "Gestionnaire",
                      desc: "Gestion des stocks et attributions",
                      users: 3,
                    },
                    {
                      role: "Utilisateur",
                      desc: "Visualisation et retraits uniquement",
                      users: 8,
                    },
                  ].map((role) => (
                    <Card key={role.role}>
                      <CardHeader>
                        <CardTitle className="text-lg">{role.role}</CardTitle>
                        <CardDescription>{role.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {role.users} utilisateur{role.users > 1 ? "s" : ""}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Configurer les permissions
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Paramètres avancés
              </CardTitle>
              <CardDescription>
                Paramètres techniques et maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* System Info */}
              <div className="space-y-4">
                <h3 className="font-medium">Informations système</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Version de l'application</Label>
                    <div className="text-sm text-muted-foreground">v2.1.0</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Dernière mise à jour</Label>
                    <div className="text-sm text-muted-foreground">
                      15/05/2024
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Taille de la base de données</Label>
                    <div className="text-sm text-muted-foreground">45.2 MB</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Enregistrements totaux</Label>
                    <div className="text-sm text-muted-foreground">12,548</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Maintenance */}
              <div className="space-y-4">
                <h3 className="font-medium">Maintenance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mode maintenance</Label>
                      <p className="text-sm text-muted-foreground">
                        Bloquer l'accès aux utilisateurs pendant la maintenance
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Vider le cache
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Générer un rapport système
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Dangerous Zone */}
              <div className="space-y-4">
                <h3 className="font-medium text-destructive">
                  Zone dangereuse
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Ces actions sont irréversibles. Soyez prudent.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive/10"
                    >
                      Réinitialiser toutes les données
                    </Button>
                    <Button variant="destructive">
                      Supprimer toutes les données
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
