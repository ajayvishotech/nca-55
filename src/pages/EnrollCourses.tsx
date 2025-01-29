import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, BookOpen, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  testDuration: string;
  marksPerQuestion: number;
  totalQuestions: number;
  lessonCount: number;
}

const courses = {
  'upsc-cse': {
    id: 'upsc-cse',
    name: 'UPSC-CSE',
    description: 'Comprehensive preparation for Civil Services Examination',
    duration: '24 months',
    testDuration: '3 hours',
    marksPerQuestion: 2.5,
    totalQuestions: 100,
    lessonCount: 48
  },
  'neet': {
    id: 'neet',
    name: 'NEET',
    description: 'Medical entrance examination preparation',
    duration: '12 months',
    testDuration: '2 hours',
    marksPerQuestion: 4,
    totalQuestions: 180,
    lessonCount: 36
  },
  'jee': {
    id: 'jee',
    name: 'JEE Main & Advanced',
    description: 'Engineering entrance examination preparation',
    duration: '18 months',
    testDuration: '3 hours',
    marksPerQuestion: 4,
    totalQuestions: 90,
    lessonCount: 42
  },
  'ssc': {
    id: 'ssc',
    name: 'SSC',
    description: 'Staff Selection Commission examination preparation',
    duration: '6 months',
    testDuration: '2 hours',
    marksPerQuestion: 2,
    totalQuestions: 100,
    lessonCount: 24
  },
  'tnpsc': {
    id: 'tnpsc',
    name: 'TNPSC',
    description: 'Tamil Nadu Public Service Commission examination preparation',
    duration: '12 months',
    testDuration: '2.5 hours',
    marksPerQuestion: 2,
    totalQuestions: 100,
    lessonCount: 32
  }
};

const CourseCard = ({ 
  title, 
  description, 
  icon: Icon,
  isSelected,
  onClick 
}: { 
  title: string;
  description: string;
  icon: React.ElementType;
  isSelected?: boolean;
  onClick: () => void;
}) => (
  <Card 
    className={`hover:shadow-lg transition-all cursor-pointer ${
      isSelected ? 'border-primary shadow-lg' : ''
    }`} 
    onClick={onClick}
  >
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
  const { toast } = useToast();
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const modes = [
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

  const handleEnroll = () => {
    if (!selectedMode || !selectedCourse) {
      toast({
        title: "Selection Required",
        description: "Please select both a mode and a course to enroll.",
        variant: "destructive"
      });
      return;
    }

    const course = courses[selectedCourse as keyof typeof courses];
    
    toast({
      title: "Successfully Enrolled!",
      description: `You've enrolled in ${course.name} as a ${selectedMode} student.`,
    });

    // Navigate to dashboard after successful enrollment
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto py-4 md:py-8 px-3 md:px-8 space-y-8">
      <div className="mb-4 md:mb-8">
        <h1 className="text-lg md:text-3xl font-bold mb-1 md:mb-2">Course Enrollment</h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Choose the program that best fits your educational goals and schedule
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-base md:text-xl font-semibold mb-4">Select Study Mode</h2>
          <div className="grid gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modes.map((mode) => (
              <CourseCard
                key={mode.title}
                {...mode}
                isSelected={selectedMode === mode.title}
                onClick={() => setSelectedMode(mode.title)}
              />
            ))}
          </div>
        </div>

        {selectedMode && (
          <div className="space-y-4">
            <h2 className="text-base md:text-xl font-semibold">Select Course</h2>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(courses).map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedCourse && (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Course Details</AlertTitle>
              <AlertDescription>
                <div className="mt-2 space-y-2">
                  <p>Duration: {courses[selectedCourse as keyof typeof courses].duration}</p>
                  <p>Test Duration: {courses[selectedCourse as keyof typeof courses].testDuration}</p>
                  <p>Total Questions per Test: {courses[selectedCourse as keyof typeof courses].totalQuestions}</p>
                  <p>Marks per Question: {courses[selectedCourse as keyof typeof courses].marksPerQuestion}</p>
                  <p>Number of Lessons: {courses[selectedCourse as keyof typeof courses].lessonCount}</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEnroll}
            disabled={!selectedMode || !selectedCourse}
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourses;