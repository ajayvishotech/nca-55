import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { StreakProvider } from "./contexts/StreakContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Materials from "./pages/Materials";
import CurrentAffairs from "./pages/CurrentAffairs";
import MockTests from "./pages/MockTests";
import Doubts from "./pages/Doubts";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import EnrollCourses from "./pages/EnrollCourses";
import { ReactNode } from "react";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Create a wrapper component to properly type children
const QueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const App = () => (
  <QueryProvider>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <StreakProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Index />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/materials" element={<Materials />} />
                        <Route path="/current-affairs" element={<CurrentAffairs />} />
                        <Route path="/mock-tests" element={<MockTests />} />
                        <Route path="/doubts" element={<Doubts />} />
                        <Route path="/enroll-courses" element={<EnrollCourses />} />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </StreakProvider>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryProvider>
);

export default App;