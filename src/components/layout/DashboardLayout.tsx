import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:block" />
        
        {/* Mobile Sidebar */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-[240px]">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <main className="flex-1 overflow-y-auto bg-gray-50/40 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};