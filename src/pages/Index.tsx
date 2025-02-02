import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Timer, Trophy, Crown, Gem, Shield } from "lucide-react";
import { StreakDisplay } from "@/components/streak/StreakDisplay";
import { QuizGame } from "@/components/quiz/QuizGame";
import { StreakProvider } from "@/contexts/StreakContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  // Fetch recent activities from different tables
  const { data: recentDoubts, isLoading: isLoadingDoubts } = useQuery({
    queryKey: ['recent-doubts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doubts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: recentMaterials, isLoading: isLoadingMaterials } = useQuery({
    queryKey: ['recent-materials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: recentAffairs, isLoading: isLoadingAffairs } = useQuery({
    queryKey: ['recent-affairs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('current_affairs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  const isLoading = isLoadingDoubts || isLoadingMaterials || isLoadingAffairs;

  return (
    <StreakProvider>
      <div className="space-y-3 md:space-y-6 animate-fadeIn px-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
          <div>
            <h1 className="text-base md:text-2xl font-bold font-heading">
              Welcome to your Milestone!
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Track your progress and stay updated with recent activities
            </p>
          </div>
        </div>

        <StreakDisplay />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Recent Study Materials */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Recent Study Materials
            </h3>
            {isLoadingMaterials ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="space-y-2">
                {recentMaterials?.map((material) => (
                  <div key={material.id} className="text-sm p-2 bg-accent/10 rounded">
                    {material.title}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Current Affairs */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Recent Current Affairs
            </h3>
            {isLoadingAffairs ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="space-y-2">
                {recentAffairs?.map((affair) => (
                  <div key={affair.id} className="text-sm p-2 bg-accent/10 rounded">
                    {affair.title}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Doubts */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Recent Doubts
            </h3>
            {isLoadingDoubts ? (
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <div className="space-y-2">
                {recentDoubts?.map((doubt) => (
                  <div key={doubt.id} className="text-sm p-2 bg-accent/10 rounded">
                    {doubt.title}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <QuizGame />
      </div>
    </StreakProvider>
  );
};

export default Index;