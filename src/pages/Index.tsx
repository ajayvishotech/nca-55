import { Card } from "@/components/ui/card";
import { Brain, TestTube2, Newspaper } from "lucide-react";
import { StreakDisplay } from "@/components/streak/StreakDisplay";
import { QuizGame } from "@/components/quiz/QuizGame";
import { StreakProvider } from "@/contexts/StreakContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  // Fetch counts from all relevant tables
  const { data: counts, isLoading } = useQuery({
    queryKey: ['dashboard-counts'],
    queryFn: async () => {
      const [materials, tests, affairs] = await Promise.all([
        supabase.from('study_materials').select('id', { count: 'exact' }),
        supabase.from('mock_tests').select('id', { count: 'exact' }),
        supabase.from('current_affairs').select('id', { count: 'exact' })
      ]);
      
      return {
        materialsCount: materials.count || 0,
        testsCount: tests.count || 0,
        affairsCount: affairs.count || 0
      };
    }
  });

  return (
    <StreakProvider>
      <div className="space-y-3 md:space-y-6 animate-fadeIn px-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
          <div>
            <h1 className="text-base md:text-2xl font-bold font-heading">
              Welcome to your Milestone!
            </h1>
            <p className="text-muted-foreground">
              Track your progress across all learning materials
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Study Materials</h3>
                <p className="text-sm text-muted-foreground">
                  {isLoading ? "Loading..." : `${counts?.materialsCount || 0} materials available`}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TestTube2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Mock Tests</h3>
                <p className="text-sm text-muted-foreground">
                  {isLoading ? "Loading..." : `${counts?.testsCount || 0} tests available`}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Newspaper className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Current Affairs</h3>
                <p className="text-sm text-muted-foreground">
                  {isLoading ? "Loading..." : `${counts?.affairsCount || 0} updates available`}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <StreakDisplay />
        <QuizGame />
      </div>
    </StreakProvider>
  );
};

export default Index;