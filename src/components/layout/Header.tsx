import { LogOut, User } from "lucide-react";
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
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    navigate("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-4">
          <h1 className="font-heading text-sm md:text-xl font-bold text-primary hover:scale-105 transition-transform duration-200 cursor-default">
            Nanjil Career Academy
          </h1>
          <Select defaultValue="upsc">
            <SelectTrigger className="w-[120px] h-8 bg-white border-gray-200 hover:bg-gray-50 data-[state=open]:bg-primary data-[state=open]:text-white transition-colors duration-200">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upsc">UPSC CSE - GS</SelectItem>
              <SelectItem value="tnpsc">TNPSC</SelectItem>
              <SelectItem value="add">+ Add another goal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary/10 transition-colors duration-200"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-fadeIn">
              <DropdownMenuItem 
                className="hover:bg-primary/10 cursor-pointer transition-colors duration-200 p-2 text-sm"
                onClick={() => navigate('/dashboard')}
              >
                <span className="font-medium">Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 text-sm">
                <div className="space-y-2 w-full">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Study Hours</span>
                    <span className="font-medium">24h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Materials Completed</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mock Tests</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium">65%</span>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-primary/10 cursor-pointer transition-colors duration-200 p-2 text-sm"
                onClick={() => navigate('/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-destructive/10 cursor-pointer transition-colors duration-200 text-destructive p-2 text-sm"
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