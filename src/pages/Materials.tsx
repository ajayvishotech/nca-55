import { Card } from "@/components/ui/card";
import { Book } from "lucide-react";

const Materials = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Study Materials</h1>
        <p className="text-muted-foreground">Access your course materials</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {["History", "Geography", "Economics", "Polity"].map((subject) => (
          <Card key={subject} className="p-6 cursor-pointer card-hover">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{subject}</p>
                <p className="text-sm text-muted-foreground">12 chapters</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Materials;