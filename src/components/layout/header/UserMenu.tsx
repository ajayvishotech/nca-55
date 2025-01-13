import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, UserCircle, Edit2, Save, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const UserMenu = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const menuItems = [
    { icon: UserCircle, label: "My Profile", href: "/profile" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isEditing ? (
          <div className="p-2 space-y-2">
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
          <>
            <div className="p-2">
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DropdownMenuSeparator />
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.label} asChild>
                <Link to={item.href} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};