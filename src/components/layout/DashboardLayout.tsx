import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50/40 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};