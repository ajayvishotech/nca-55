import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Clock, TestTube2, Target } from "lucide-react";
import { StreakDisplay } from "@/components/streak/StreakDisplay";
import { StreakProvider } from "@/contexts/StreakContext";

const Index = () => {
  return (
    <StreakProvider>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">Welcome back, Student!</h1>
          </div>
        </div>

        <StreakDisplay />

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-6 card-hover">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Clock className="h-6 w-6 text-blue-600 animate-[spin_3s_linear_infinite]" />
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
                <Book className="h-6 w-6 text-green-600 animate-[bounce_1s_ease-in-out_infinite]" />
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
                <TestTube2 className="h-6 w-6 text-purple-600 animate-[wiggle_1s_ease-in-out_infinite]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mock Tests Taken</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-hover group">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-orange-100 p-3 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">65%</p>
              </div>
            </div>
            <Progress value={65} className="mt-4 animate-pulse" />
          </Card>
        </div>
      </div>
    </StreakProvider>
  );
};

export default Index;