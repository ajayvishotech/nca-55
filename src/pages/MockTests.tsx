import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TestTube, Timer, AlertCircle } from "lucide-react";

const MockTests = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Mock Tests</h1>
        <p className="text-muted-foreground">Practice with sample questions</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Test Instructions</AlertTitle>
        <AlertDescription>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Total duration: 2 hours</li>
            <li>100 multiple choice questions</li>
            <li>Each question carries 2 marks</li>
            <li>No negative marking</li>
            <li>Submit before timer ends</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 hover:shadow-md transition-shadow">
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