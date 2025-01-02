import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Index from "./pages/Index";
import Materials from "./pages/Materials";
import CurrentAffairs from "./pages/CurrentAffairs";
import MockTests from "./pages/MockTests";
import Doubts from "./pages/Doubts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/current-affairs" element={<CurrentAffairs />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/doubts" element={<Doubts />} />
          </Routes>
        </DashboardLayout>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;