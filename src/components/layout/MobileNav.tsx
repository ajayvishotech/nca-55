import { Trophy, BookOpen, Newspaper, TestTube2, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navigation = [
  { name: "Milestone", href: "/", icon: Trophy },
  { name: "Materials", href: "/materials", icon: BookOpen },
  { name: "Affairs", href: "/current-affairs", icon: Newspaper },
  { name: "Tests", href: "/mock-tests", icon: TestTube2 },
  { name: "Doubts", href: "/doubts", icon: MessageSquare },
];

export const MobileNav = () => {
  return (
    <motion.nav 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t md:hidden"
    >
      <div className="flex justify-around items-center h-14 px-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-1 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "text-primary scale-105 transform" 
                  : "text-gray-500 hover:text-primary/70"
              }`
            }
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <item.icon className="h-4 w-4" />
              <span className="text-[9px] mt-0.5 font-medium">{item.name}</span>
            </motion.div>
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
};