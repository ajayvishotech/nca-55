import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Clock, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Welcome back, Student!</h1>
        <p className="text-muted-foreground">
          Track your progress and continue learning
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 card-hover">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Course Progress</p>
              <p className="text-2xl font-bold">65%</p>
            </div>
          </div>
          <Progress value={65} className="mt-4" />
        </Card>

        <Card className="p-6 card-hover">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-secondary/10 p-3">
              <Clock className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Study Time</p>
              <p className="text-2xl font-bold">12.5h</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 card-hover">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-accent/10 p-3">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mock Test Score</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-heading text-xl font-semibold mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
            <div className="rounded-full bg-primary/10 p-2">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Completed UPSC Mock Test</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
            <div className="rounded-full bg-secondary/10 p-2">
              <Clock className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <p className="font-medium">Studied Indian History</p>
              <p className="text-sm text-muted-foreground">5 hours ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;