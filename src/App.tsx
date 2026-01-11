import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import BonsPage from "./pages/BonsPage";
import EmployesPage from "./pages/EmployesPage";
import VehiculesPage from "./pages/VehiculesPage";
import StatistiquesPage from "./pages/StatistiquesPage";
import StocksPage from "./pages/StocksPage";
import RetraitPage from "./pages/RetraitPage";
import HistoriquePage from "./pages/HistoriquePage";
import NotFound from "./pages/NotFound";
import ExportsPage from "./pages/ExportPage";
import ParametresPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes with layout */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/bons" element={<BonsPage />} />
            <Route path="/retrait" element={<RetraitPage />} />
            <Route path="/employes" element={<EmployesPage />} />
            <Route path="/vehicules" element={<VehiculesPage />} />
            <Route path="/historique" element={<HistoriquePage />} />
            <Route path="/statistiques" element={<StatistiquesPage />} />
            <Route path="/exports" element={<ExportsPage />} />
            <Route path="/parametres" element={<ParametresPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
