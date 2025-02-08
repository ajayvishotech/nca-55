
import { BookOpen, Newspaper, MessageSquare, Trophy, TestTube2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navigation = [
  { name: "Milestone", href: "/", icon: Trophy },
  { 
    name: "Study Materials", 
    href: "/materials", 
    icon: BookOpen,
    color: "text-primary hover:text-primary/80"
  },
  { 
    name: "Current Affairs", 
    href: "/current-affairs", 
    icon: Newspaper,
    color: "text-secondary hover:text-secondary/80"
  },
  { name: "Mock Tests", href: "/mock-tests", icon: TestTube2 },
  { 
    name: "Doubts & Solutions", 
    href: "/doubts", 
    icon: MessageSquare,
    color: "text-accent hover:text-accent/80"
  },
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn("border-r bg-white/50 backdrop-blur-sm", className)}
    >
      <div className="flex h-full flex-col gap-2">
        <div className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-300",
                      "hover:bg-primary/5 hover:translate-x-1",
                      item.color || "text-gray-500 hover:text-primary",
                      isActive && "bg-primary/10 font-medium shadow-sm"
                    )
                  }
                >
                  <item.icon className={cn(
                    "h-5 w-5",
                    item.color || "text-gray-500"
                  )} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </motion.div>
  );
};
