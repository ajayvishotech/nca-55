import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { StreakProvider } from "./contexts/StreakContext";
import Index from "./pages/Index";
import Materials from "./pages/Materials";
import CurrentAffairs from "./pages/CurrentAffairs";
import MockTests from "./pages/MockTests";
import Doubts from "./pages/Doubts";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <StreakProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/current-affairs" element={<CurrentAffairs />} />
              <Route path="/mock-tests" element={<MockTests />} />
              <Route path="/doubts" element={<Doubts />} />
            </Route>
          </Routes>
        </StreakProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;