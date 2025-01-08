import { Home, Book, Newspaper, TestTube, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Milestone", href: "/", icon: Home },
  { name: "Materials", href: "/materials", icon: Book },
  { name: "Affairs", href: "/current-affairs", icon: Newspaper },
  { name: "Tests", href: "/mock-tests", icon: TestTube },
  { name: "Doubts", href: "/doubts", icon: MessageSquare },
];

export const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <div className="flex justify-around items-center h-12">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-1 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "text-primary scale-110 transform" 
                  : "text-gray-500 hover:text-primary/70"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[8px] mt-0.5">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};