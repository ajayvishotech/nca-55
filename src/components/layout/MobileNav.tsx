import { Home, Book, Newspaper, TestTube, MessageSquare, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Milestone", href: "/", icon: Home },
  { name: "Study Materials", href: "/materials", icon: Book },
  { name: "Current Affairs", href: "/current-affairs", icon: Newspaper },
  { name: "Mock Tests", href: "/mock-tests", icon: TestTube },
  { name: "Doubts", href: "/doubts", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: User },
];

export const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <div className="flex justify-around items-center h-16">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                isActive ? "text-primary" : "text-gray-500"
              }`
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};