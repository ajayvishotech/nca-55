import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TestTube, Timer } from "lucide-react";

const MockTests = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Mock Tests</h1>
        <p className="text-muted-foreground">Practice with sample questions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 card-hover">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <TestTube className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Mock Test {i}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  <span>2 hours</span>
                </div>
              </div>
              <Button>Start Test</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MockTests;