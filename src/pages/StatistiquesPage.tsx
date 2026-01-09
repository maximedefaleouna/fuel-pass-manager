import { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Car,
  Building,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { PeriodFilter, getDateRangeForPeriod } from "@/components/filters/PeriodFilter";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const monthlyTrend = [
  { month: "Jan", depense: 38000, bons: 120 },
  { month: "Fév", depense: 42000, bons: 135 },
  { month: "Mar", depense: 35000, bons: 110 },
  { month: "Avr", depense: 48000, bons: 150 },
  { month: "Mai", depense: 45320, bons: 142 },
];

const serviceData = [
  { name: "Direction", value: 15200, color: "hsl(215, 70%, 45%)" },
  { name: "Logistique", value: 22800, color: "hsl(215, 70%, 55%)" },
  { name: "Commercial", value: 18400, color: "hsl(215, 70%, 65%)" },
  { name: "Technique", value: 12920, color: "hsl(215, 70%, 75%)" },
];

const vehicleConsumption = [
  { vehicle: "AB-123-CD", litres: 450 },
  { vehicle: "EF-456-GH", litres: 380 },
  { vehicle: "IJ-789-KL", litres: 620 },
  { vehicle: "MN-012-OP", litres: 290 },
  { vehicle: "QR-345-ST", litres: 510 },
];

const employeeStats = [
  { name: "M. Dubois", service: "Logistique", depense: 2450, bons: 24 },
  { name: "S. Laurent", service: "Commercial", depense: 2180, bons: 18 },
  { name: "P. Moreau", service: "Direction", depense: 1890, bons: 15 },
  { name: "J. Bernard", service: "Technique", depense: 1750, bons: 12 },
  { name: "T. Petit", service: "Commercial", depense: 1620, bons: 10 },
];

export default function StatistiquesPage() {
  const [dateRange, setDateRange] = useState(getDateRangeForPeriod("month"));
  const [serviceFilter, setServiceFilter] = useState("all");

  // Format the period display
  const periodDisplay = useMemo(() => {
    return `${format(dateRange.from, "dd MMM yyyy", { locale: fr })} - ${format(dateRange.to, "dd MMM yyyy", { locale: fr })}`;
  }, [dateRange]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Statistiques</h1>
          <p className="text-muted-foreground">
            Analyse détaillée des consommations de carburant
          </p>
        </div>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exporter le rapport
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <PeriodFilter value={dateRange} onChange={setDateRange} />
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[180px]">
                <Building className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les services</SelectItem>
                <SelectItem value="direction">Direction</SelectItem>
                <SelectItem value="logistique">Logistique</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="technique">Technique</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground ml-auto">
              Période: {periodDisplay}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Évolution mensuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(v) => `${v / 1000}k€`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="depense"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                  name="Dépenses (€)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bons"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--success))" }}
                  name="Bons utilisés"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Répartition par service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={2}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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
                  formatter={(value: number) => [`${value.toLocaleString()} €`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Consumption */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Consommation par véhicule (L)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={vehicleConsumption} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="vehicle" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="litres" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Employees */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top consommateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeeStats.map((emp, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{emp.depense.toLocaleString()} €</p>
                        <p className="text-xs text-muted-foreground">{emp.bons} bons</p>
                      </div>
                    </div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(emp.depense / 2500) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
