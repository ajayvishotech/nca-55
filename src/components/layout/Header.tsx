import { Bell, LogOut, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Add your logout logic here
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden hover:bg-primary/10 transition-colors duration-200" 
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="ml-4 flex items-center gap-4">
          <h1 className="font-heading text-base md:text-xl font-bold text-primary hover:scale-105 transition-transform duration-200 cursor-default">
            Nanjil Career Academy
          </h1>
          <Select defaultValue="upsc">
            <SelectTrigger className="w-[150px] h-9 bg-white border-gray-200 hover:bg-gray-50 data-[state=open]:bg-primary data-[state=open]:text-white transition-colors duration-200">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upsc">UPSC CSE - GS</SelectItem>
              <SelectItem value="tnpsc">TNPSC</SelectItem>
              <SelectItem value="add">+ Add another goal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-primary/10 transition-colors duration-200 relative group"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full group-hover:animate-pulse"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 transition-colors duration-200"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-fadeIn">
              <DropdownMenuItem 
                className="hover:bg-primary/10 cursor-pointer transition-colors duration-200"
                onClick={() => navigate('/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-destructive/10 cursor-pointer transition-colors duration-200 text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};