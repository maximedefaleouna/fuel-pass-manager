// import { useState, useMemo } from "react";
// import {
//   Fuel,
//   Users,
//   Receipt,
//   AlertTriangle,
//   TrendingUp,
//   Plus,
//   FileDown,
//   Bell,
//   ArrowUpRight,
//   ArrowDownRight,
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { PeriodFilter, getDateRangeForPeriod } from "@/components/filters/PeriodFilter";
// import { format } from "date-fns";
// import { fr } from "date-fns/locale";

// const kpiData = [
//   {
//     title: "Total dépensé",
//     value: "45 320 €",
//     change: "+12%",
//     trend: "up",
//     icon: TrendingUp,
//     description: "Ce mois",
//   },
//   {
//     title: "Bons attribués",
//     value: "156",
//     change: "+8",
//     trend: "up",
//     icon: Fuel,
//     description: "Ce mois",
//   },
//   {
//     title: "Bons utilisés",
//     value: "142",
//     change: "91%",
//     trend: "up",
//     icon: Receipt,
//     description: "Taux d'utilisation",
//   },
//   {
//     title: "Bons expirés",
//     value: "3",
//     change: "-2",
//     trend: "down",
//     icon: AlertTriangle,
//     description: "Ce mois",
//   },
//   {
//     title: "Budget restant",
//     value: "24 680 €",
//     change: "35%",
//     trend: "neutral",
//     icon: Users,
//     description: "Du budget mensuel",
//   },
// ];

// const monthlyData = [
//   { month: "Jan", depense: 38000 },
//   { month: "Fév", depense: 42000 },
//   { month: "Mar", depense: 35000 },
//   { month: "Avr", depense: 48000 },
//   { month: "Mai", depense: 45320 },
//   { month: "Juin", depense: 0 },
// ];

// const serviceData = [
//   { name: "Direction", value: 15200, color: "hsl(215, 70%, 45%)" },
//   { name: "Logistique", value: 12800, color: "hsl(215, 70%, 55%)" },
//   { name: "Commercial", value: 9400, color: "hsl(215, 70%, 65%)" },
//   { name: "Technique", value: 7920, color: "hsl(215, 70%, 75%)" },
// ];

// const topConsumers = [
//   { name: "Martin Dubois", service: "Logistique", amount: 2450 },
//   { name: "Sophie Laurent", service: "Commercial", amount: 2180 },
//   { name: "Pierre Moreau", service: "Direction", amount: 1890 },
//   { name: "Julie Bernard", service: "Technique", amount: 1750 },
//   { name: "Thomas Petit", service: "Commercial", amount: 1620 },
// ];

// const recentAlerts = [
//   { id: 1, message: "3 bons arrivent à expiration dans 5 jours", type: "warning" },
//   { id: 2, message: "Budget du service Logistique atteint à 85%", type: "warning" },
//   { id: 3, message: "Anomalie détectée: véhicule AB-123-CD", type: "error" },
// ];

// export default function DashboardPage() {
//   const navigate = useNavigate();
//   const [dateRange, setDateRange] = useState(getDateRangeForPeriod("month"));

//   // Format the period display
//   const periodDisplay = useMemo(() => {
//     return `${format(dateRange.from, "dd MMM", { locale: fr })} - ${format(dateRange.to, "dd MMM yyyy", { locale: fr })}`;
//   }, [dateRange]);

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <p className="text-muted-foreground">Vue d'ensemble de vos bons de carburant</p>
//         </div>
//         <div className="flex gap-3">
//           <Button variant="outline" onClick={() => navigate("/exports")}>
//             <FileDown className="mr-2 h-4 w-4" />
//             Export rapide
//           </Button>
//           <Button onClick={() => navigate("/bons")}>
//             <Plus className="mr-2 h-4 w-4" />
//             Créer un bon
//           </Button>
//         </div>
//       </div>

//       {/* Period Filter */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-wrap gap-4 items-center">
//             <PeriodFilter value={dateRange} onChange={setDateRange} />
//             <span className="text-sm text-muted-foreground">
//               Affichage des données pour: <strong>{periodDisplay}</strong>
//             </span>
//           </div>
//         </CardContent>
//       </Card>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         {kpiData.map((kpi, index) => (
//           <Card key={index} className="stat-card">
//             <CardContent className="p-4">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <p className="text-sm text-muted-foreground">{kpi.title}</p>
//                   <p className="text-2xl font-bold mt-1">{kpi.value}</p>
//                   <div className="flex items-center gap-1 mt-1">
//                     <span
//                       className={`text-xs font-medium flex items-center ${
//                         kpi.trend === "up"
//                           ? "text-success"
//                           : kpi.trend === "down"
//                           ? "text-destructive"
//                           : "text-muted-foreground"
//                       }`}
//                     >
//                       {kpi.trend === "up" && <ArrowUpRight className="h-3 w-3" />}
//                       {kpi.trend === "down" && <ArrowDownRight className="h-3 w-3" />}
//                       {kpi.change}
//                     </span>
//                     <span className="text-xs text-muted-foreground">{kpi.description}</span>
//                   </div>
//                 </div>
//                 <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                   <kpi.icon className="h-5 w-5 text-primary" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Charts Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Monthly Expenses Chart */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle className="text-lg">Dépenses par mois</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={280}>
//               <BarChart data={monthlyData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                 <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
//                 <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--card))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                   formatter={(value: number) => [`${value.toLocaleString()} €`, "Dépense"]}
//                 />
//                 <Bar dataKey="depense" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Service Distribution */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Dépenses par service</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={200}>
//               <PieChart>
//                 <Pie
//                   data={serviceData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={50}
//                   outerRadius={80}
//                   dataKey="value"
//                   paddingAngle={2}
//                 >
//                   {serviceData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--card))",
//                     border: "1px solid hsl(var(--border))",
//                     borderRadius: "8px",
//                   }}
//                   formatter={(value: number) => [`${value.toLocaleString()} €`, ""]}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="mt-4 space-y-2">
//               {serviceData.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between text-sm">
//                   <div className="flex items-center gap-2">
//                     <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
//                     <span>{item.name}</span>
//                   </div>
//                   <span className="font-medium">{item.value.toLocaleString()} €</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Bottom Row */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Top Consumers */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle className="text-lg">Top 5 consommateurs</CardTitle>
//             <Button variant="ghost" size="sm" onClick={() => navigate("/employes")}>
//               Voir tout
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {topConsumers.map((consumer, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
//                       {index + 1}
//                     </div>
//                     <div>
//                       <p className="font-medium text-sm">{consumer.name}</p>
//                       <p className="text-xs text-muted-foreground">{consumer.service}</p>
//                     </div>
//                   </div>
//                   <span className="font-semibold">{consumer.amount.toLocaleString()} €</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Recent Alerts */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle className="text-lg flex items-center gap-2">
//               <Bell className="h-5 w-5" />
//               Alertes récentes
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentAlerts.map((alert) => (
//                 <div
//                   key={alert.id}
//                   className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
//                 >
//                   <div
//                     className={`h-2 w-2 rounded-full mt-2 ${
//                       alert.type === "error" ? "bg-destructive" : "bg-warning"
//                     }`}
//                   />
//                   <div className="flex-1">
//                     <p className="text-sm">{alert.message}</p>
//                   </div>
//                   <Badge variant={alert.type === "error" ? "destructive" : "warning"}>
//                     {alert.type === "error" ? "Critique" : "Attention"}
//                   </Badge>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { useState, useMemo } from "react";
import {
  Fuel,
  Users,
  Receipt,
  AlertTriangle,
  TrendingUp,
  Plus,
  FileDown,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  PeriodFilter,
  getDateRangeForPeriod,
} from "@/components/filters/PeriodFilter";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// 🔹 Données fictives en litres
const kpiData = [
  {
    title: "Total litres consommés",
    value: "1 420 L",
    change: "+12%",
    trend: "up",
    icon: TrendingUp,
    description: "Ce mois",
  },
  {
    title: "Bons attribués",
    value: "156",
    change: "+8",
    trend: "up",
    icon: Fuel,
    description: "Ce mois",
  },
  {
    title: "Bons utilisés",
    value: "142",
    change: "91%",
    trend: "up",
    icon: Receipt,
    description: "Taux d'utilisation",
  },
  {
    title: "Bons expirés",
    value: "3",
    change: "-2",
    trend: "down",
    icon: AlertTriangle,
    description: "Ce mois",
  },
  {
    title: "Bons restants",
    value: "14",
    change: "35%",
    trend: "neutral",
    icon: Users,
    description: "Ce mois",
  },
];

const monthlyData = [
  { month: "Jan", litres: 3800 },
  { month: "Fév", litres: 4200 },
  { month: "Mar", litres: 3500 },
  { month: "Avr", litres: 4800 },
  { month: "Mai", litres: 4532 },
  { month: "Juin", litres: 0 },
];

const serviceData = [
  { name: "Direction", value: 1520, color: "hsl(215, 70%, 45%)" },
  { name: "Logistique", value: 1280, color: "hsl(215, 70%, 55%)" },
  { name: "Commercial", value: 940, color: "hsl(215, 70%, 65%)" },
  { name: "Technique", value: 792, color: "hsl(215, 70%, 75%)" },
];

const topConsumers = [
  { name: "Martin Dubois", service: "Logistique", amount: 245 },
  { name: "Sophie Laurent", service: "Commercial", amount: 218 },
  { name: "Pierre Moreau", service: "Direction", amount: 189 },
  { name: "Julie Bernard", service: "Technique", amount: 175 },
  { name: "Thomas Petit", service: "Commercial", amount: 162 },
];

const recentAlerts = [
  {
    id: 1,
    message: "3 bons arrivent à expiration dans 5 jours",
    type: "warning",
  },
  {
    id: 2,
    message: "Budget du service Logistique atteint à 85%",
    type: "warning",
  },
  { id: 3, message: "Anomalie détectée: véhicule AB-123-CD", type: "error" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState(getDateRangeForPeriod("month"));

  const periodDisplay = useMemo(() => {
    return `${format(dateRange.from, "dd MMM", { locale: fr })} - ${format(
      dateRange.to,
      "dd MMM yyyy",
      { locale: fr }
    )}`;
  }, [dateRange]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de vos bons de carburant (litres)
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/exports")}>
            <FileDown className="mr-2 h-4 w-4" />
            Export rapide
          </Button>
          <Button onClick={() => navigate("/bons")}>
            <Plus className="mr-2 h-4 w-4" />
            Créer un bon
          </Button>
        </div>
      </div>

      {/* Period Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <PeriodFilter value={dateRange} onChange={setDateRange} />
            <span className="text-sm text-muted-foreground">
              Affichage des données pour: <strong>{periodDisplay}</strong>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span
                      className={`text-xs font-medium flex items-center ${
                        kpi.trend === "up"
                          ? "text-success"
                          : kpi.trend === "down"
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {kpi.trend === "up" && (
                        <ArrowUpRight className="h-3 w-3" />
                      )}
                      {kpi.trend === "down" && (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {kpi.change}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {kpi.description}
                    </span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <kpi.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Litres Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Consommation par mois (L)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    `${value.toLocaleString()} L`,
                    "Consommation",
                  ]}
                />
                <Bar
                  dataKey="litres"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Consommation par service (L)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    `${value.toLocaleString()} L`,
                    "",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {serviceData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">
                    {item.value.toLocaleString()} L
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Consumers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Top 5 consommateurs (L)</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/employes")}
            >
              Voir tout
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topConsumers.map((consumer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{consumer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {consumer.service}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">
                    {consumer.amount.toLocaleString()} L
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alertes récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div
                    className={`h-2 w-2 rounded-full mt-2 ${
                      alert.type === "error" ? "bg-destructive" : "bg-warning"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <Badge
                    variant={alert.type === "error" ? "destructive" : "warning"}
                  >
                    {alert.type === "error" ? "Critique" : "Attention"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
