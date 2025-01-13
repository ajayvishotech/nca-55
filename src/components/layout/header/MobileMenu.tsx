import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Home, LogOut, Edit2, Save, X, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileMenu = ({ isOpen, onOpenChange }: MobileMenuProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-0">
        <div className="flex flex-col h-full bg-background">
          <div className="p-4 border-b">
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Edit Profile</h2>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => {
                      setIsEditing(false);
                      toast({
                        title: "Profile updated",
                        description: "Your changes have been saved successfully."
                      });
                    }}>
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Input 
                  defaultValue="John Doe"
                  placeholder="Name"
                  className="w-full"
                />
                <Input 
                  defaultValue="john.doe@example.com"
                  placeholder="Email"
                  className="w-full"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="font-semibold">John Doe</h2>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-auto">
            <nav className="flex flex-col p-4 space-y-2">
              <Link
                to="/enroll-courses"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent"
                onClick={() => onOpenChange(false)}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Enroll in Courses</span>
              </Link>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent"
                  onClick={() => onOpenChange(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};