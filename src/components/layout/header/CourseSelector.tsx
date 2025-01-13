import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useState } from "react";

export const CourseSelector = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(['UPSC-CSE']);

  const handleEnrollCourse = (courseName: string) => {
    if (!enrolledCourses.includes(courseName)) {
      setEnrolledCourses([...enrolledCourses, courseName]);
    }
  };

  return (
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
            className="gap-2 text-xs md:text-sm"
          >
            <GraduationCap className="h-3 w-3 md:h-4 md:w-4" />
            {course}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};