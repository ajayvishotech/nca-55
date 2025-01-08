import { LogOut, User, Clock, Book, TestTube, Target, Menu } from "lucide-react";
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
import { motion } from "framer-motion";

export const Header = () => {
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
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50"
    >
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="font-heading text-sm md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-default"
          >
            Nanjil Career Academy
          </motion.h1>
          <Select defaultValue="upsc">
            <SelectTrigger className="w-[120px] h-8 bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-gray-50 data-[state=open]:bg-primary data-[state=open]:text-white transition-all duration-200">
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
                className="h-9 w-9 rounded-full hover:bg-primary/10 transition-all duration-200"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <User className="h-5 w-5" />
                </motion.div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 p-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <DropdownMenuItem 
                  className="hover:bg-primary/10 cursor-pointer transition-all duration-200 p-3 rounded-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary animate-spin" />
                    <span className="font-medium">Dashboard</span>
                  </div>
                </DropdownMenuItem>
                <div className="p-3 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4 animate-pulse text-blue-500" />
                      Study Hours
                    </span>
                    <span className="font-medium">24h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Book className="h-4 w-4 animate-bounce text-green-500" />
                      Materials Done
                    </span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TestTube className="h-4 w-4 animate-pulse text-purple-500" />
                      Mock Tests
                    </span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Target className="h-4 w-4 animate-wiggle text-orange-500" />
                      Progress
                    </span>
                    <span className="font-medium">65%</span>
                  </div>
                </div>
                <DropdownMenuItem 
                  className="hover:bg-primary/10 cursor-pointer transition-all duration-200 p-3 rounded-lg"
                  onClick={() => navigate('/profile')}
                >
                  <User className="mr-2 h-4 w-4 text-primary" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-destructive/10 cursor-pointer transition-all duration-200 text-destructive p-3 rounded-lg"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};