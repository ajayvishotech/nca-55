import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, CheckSquare, BarChart2, PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: "upsc",
    name: "UPSC CSE-GS",
    stats: {
      materialsCompleted: "45/80",
      mockTestsTaken: "12",
      overallProgress: 65,
    },
  },
  {
    id: "tnpsc",
    name: "TNPSC",
    stats: {
      materialsCompleted: "30/50",
      mockTestsTaken: "8",
      overallProgress: 55,
    },
  },
];

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Welcome back, Student!</h1>
        <p className="text-muted-foreground">
          Track your progress and continue learning
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold">My Goals</h2>
            <Select
              value={selectedCourse.id}
              onValueChange={(value) => {
                const course = courses.find((c) => c.id === value);
                if (course) setSelectedCourse(course);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Materials Completed</p>
                  <p className="text-lg font-semibold">{selectedCourse.stats.materialsCompleted}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-secondary/10 p-2">
                  <CheckSquare className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mock Tests Taken</p>
                  <p className="text-lg font-semibold">{selectedCourse.stats.mockTestsTaken}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-accent/10 p-2">
                  <BarChart2 className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedCourse.stats.overallProgress} className="flex-1" />
                    <span className="text-sm font-medium">{selectedCourse.stats.overallProgress}%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add another goal
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;