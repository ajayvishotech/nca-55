import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";

type CurrentAffair = Database['public']['Tables']['current_affairs']['Row'];

const CurrentAffairs = () => {
  const { data: affairs, isLoading } = useQuery({
    queryKey: ['current-affairs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('current_affairs')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as CurrentAffair[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Current Affairs</h1>
        <p className="text-muted-foreground">Stay updated with the latest developments</p>
      </div>

      <div className="grid gap-4">
        {affairs?.map((affair) => (
          <Card key={affair.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{affair.title}</h3>
                <p className="text-muted-foreground">{affair.content}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(affair.date), 'PPP')}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CurrentAffairs;