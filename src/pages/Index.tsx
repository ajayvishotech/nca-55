import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Book, Clock, Target } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Welcome back, Student!</h1>
          <p className="text-muted-foreground">
            Track your UPSC preparation progress
          </p>
        </div>
        <Select defaultValue="upsc">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upsc">UPSC CSE - GS</SelectItem>
            <SelectItem value="tnpsc">TNPSC</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6 card-hover">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Study Hours</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 card-hover">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <Book className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Materials Completed</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 card-hover">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-100 p-3">
              <TestTube className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mock Tests Taken</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 card-hover">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-orange-100 p-3">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold">65%</p>
            </div>
          </div>
          <Progress value={65} className="mt-4" />
        </Card>
      </div>

      <div className="flex justify-center">
        <button className="text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-2">
          <span className="text-lg">+</span> Add another goal
        </button>
      </div>
    </div>
  );
};

export default Index;