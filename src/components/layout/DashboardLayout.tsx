import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="hidden md:block" />
        <main className="flex-1 overflow-y-auto bg-gray-50/40 p-3 md:p-6 pb-16 md:pb-6">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
};