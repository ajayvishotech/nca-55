
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, Download, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CurrentAffairs = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Today's newspaper is being downloaded.",
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Current Affairs</h1>
        <p className="text-[#7E69AB]">Stay updated with the latest news</p>
      </div>

      <Button 
        onClick={handleDownload}
        className="w-full md:w-auto mb-4 bg-[#7E69AB] hover:bg-[#7E69AB]/90"
      >
        <Newspaper className="h-5 w-5 mr-2" />
        Today's Newspaper
      </Button>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-[#7E69AB]/10 p-3">
                  <Newspaper className="h-6 w-6 text-[#7E69AB]" />
                </div>
                <div>
                  <p className="font-medium text-[#7E69AB]">Daily Update {i}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 text-[#7E69AB]" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CurrentAffairs;
