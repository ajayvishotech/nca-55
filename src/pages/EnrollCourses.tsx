import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ 
  title, 
  description, 
  icon: Icon,
  onClick 
}: { 
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
}) => (
  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
    <CardHeader>
      <div className="flex items-center gap-2">
        <div className="p-1.5 md:p-2 rounded-full bg-blue-100">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
        </div>
        <CardTitle className="text-base md:text-xl">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-xs md:text-sm leading-relaxed">{description}</CardDescription>
    </CardContent>
  </Card>
);

const EnrollCourses = () => {
  const navigate = useNavigate();

  const courses = [
    {
      title: "School Level Foundation",
      description: "Build a strong academic foundation with comprehensive school-level courses designed for students preparing for higher education.",
      icon: BookOpen
    },
    {
      title: "Full-time Aspirant",
      description: "Intensive full-time programs for dedicated students pursuing competitive examinations with complete study materials and guidance.",
      icon: GraduationCap
    },
    {
      title: "Part-time Aspirant",
      description: "Flexible learning programs designed for working professionals and students who need to balance their studies with other commitments.",
      icon: Clock
    }
  ];

  return (
    <div className="container mx-auto py-4 md:py-8 px-3 md:px-8">
      <div className="mb-4 md:mb-8">
        <h1 className="text-lg md:text-3xl font-bold mb-1 md:mb-2">Course Enrollment</h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Choose the program that best fits your educational goals and schedule
        </p>
      </div>
      
      <div className="grid gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.title}
            {...course}
            onClick={() => {
              console.log(`Enrolling in ${course.title}`);
            }}
          />
        ))}
      </div>

      <div className="mt-4 md:mt-8 flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="text-xs md:text-sm"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default EnrollCourses;