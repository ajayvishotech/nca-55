import { Book, Home, TestTube, Newspaper, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Study Materials", href: "/materials", icon: Book },
  { name: "Current Affairs", href: "/current-affairs", icon: Newspaper },
  { name: "Mock Tests", href: "/mock-tests", icon: TestTube },
  { name: "Doubts & Solutions", href: "/doubts", icon: MessageSquare },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("border-r bg-gray-50/40", className)}>
      <div className="flex h-full flex-col gap-2">
        <div className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all duration-300 hover:translate-x-1 ${
                    isActive 
                      ? "bg-primary/10 text-primary font-medium shadow-sm" 
                      : "hover:bg-gray-100 hover:text-primary"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};