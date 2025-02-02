import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Newspaper } from "lucide-react";

const CurrentAffairs = () => {
  const { data: affairs, isLoading } = useQuery({
    queryKey: ['current-affairs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('current_affairs')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Newspaper className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-heading text-2xl font-bold">Current Affairs</h1>
          <p className="text-muted-foreground">Stay updated with the latest news and events</p>
        </div>
      </div>

      <div className="grid gap-4">
        {affairs?.map((affair) => (
          <Card key={affair.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{affair.title}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(affair.date), 'PPP')}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{affair.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CurrentAffairs;