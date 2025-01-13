import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserMenu } from "./header/UserMenu";
import { CourseSelector } from "./header/CourseSelector";
import { MobileMenu } from "./header/MobileMenu";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 md:h-14 items-center">
        <Link to="/" className="flex items-center gap-1 md:gap-2">
          <span className="font-heading text-sm md:text-base font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Nanjil Career Academy
          </span>
        </Link>

        <div className="ml-2 md:ml-4 flex-1">
          <CourseSelector />
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
            <UserMenu />
          )}
        </div>
      </div>
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onOpenChange={setMobileMenuOpen}
      />
    </header>
  );
};