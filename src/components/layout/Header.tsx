import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LogOut, 
  Home, 
  GraduationCap, 
  Landmark, 
  BookOpenCheck,
  UserCircle,
  School,
  Edit2,
  Save,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState(['Demo-UPSC-CSE']);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const availableCourses = [
    { 
      id: 1, 
      name: "Competitive Exams",
      icon: GraduationCap,
      subcategories: [
        { id: 'upsc', name: 'UPSC-CSE', modes: ['Full Time', 'Part Time'] },
        { id: 'ssc', name: 'SSC', modes: ['Full Time', 'Part Time'] },
        { id: 'rrb', name: 'RRB', modes: ['Full Time', 'Part Time'] },
        { id: 'tnpsc', name: 'TNPSC', modes: ['Full Time', 'Part Time'] },
      ]
    },
    { 
      id: 2, 
      name: "Banking",
      icon: Landmark,
      subcategories: [
        { id: 'ibps', name: 'IBPS', modes: ['Full Time', 'Part Time'] },
        { id: 'sbi', name: 'SBI', modes: ['Full Time', 'Part Time'] },
        { id: 'rbi', name: 'RBI', modes: ['Full Time', 'Part Time'] },
      ]
    },
    { 
      id: 3, 
      name: "School",
      icon: School,
      subcategories: [
        { id: 'neet', name: 'NEET', modes: ['Full Time', 'Part Time'] },
        { id: 'jee', name: 'JEE Main & Advanced', modes: ['Full Time', 'Part Time'] },
        { id: 'kvpy', name: 'KVPY', modes: ['Full Time', 'Part Time'] },
      ]
    },
    { 
      id: 4, 
      name: "Teaching",
      icon: BookOpenCheck,
      subcategories: [
        { id: 'tet', name: 'TET', modes: ['Full Time', 'Part Time'] },
        { id: 'net', name: 'NET/SET', modes: ['Full Time', 'Part Time'] },
      ]
    },
  ];

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
  ];

  const handleEnrollCourse = (courseName: string) => {
    if (!enrolledCourses.includes(courseName)) {
      setEnrolledCourses([...enrolledCourses, courseName]);
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate("/login");
  };

  const handleSwitchCourse = (courseName: string) => {
    toast({
      title: "Course Switched",
      description: `Switched to ${courseName}`,
    });
  };

  const MobileMenu = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
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
                onClick={() => setMobileMenuOpen(false)}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Enroll in Courses</span>
              </Link>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
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
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-heading text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent transition-colors">
            Nanjil Edge
          </span>
        </Link>

        <div className="ml-2 md:ml-4 flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="gap-1 md:gap-2 bg-accent/5 hover:bg-accent/10 text-xs md:text-sm h-7 md:h-9"
              >
                {enrolledCourses.length > 2 
                  ? `${enrolledCourses.length} Courses` 
                  : enrolledCourses.join(', ')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {enrolledCourses.map((course) => (
                <DropdownMenuItem 
                  key={course}
                  className="gap-2 text-xs md:text-sm cursor-pointer"
                  onClick={() => handleSwitchCourse(course)}
                >
                  <GraduationCap className="h-3 w-3 md:h-4 md:w-4" />
                  {course}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
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
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/enroll-courses" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Enroll in Courses</span>
                  </Link>
                </DropdownMenuItem>
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
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <MobileMenu />
    </header>
  );
};
