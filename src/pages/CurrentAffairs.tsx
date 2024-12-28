import { Card } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

const CurrentAffairs = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Current Affairs</h1>
        <p className="text-muted-foreground">Stay updated with the latest news</p>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 cursor-pointer card-hover">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Newspaper className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Daily Update {i}</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CurrentAffairs;