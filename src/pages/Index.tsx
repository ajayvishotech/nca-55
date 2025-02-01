import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Timer, Trophy, Crown, Gem, Shield } from "lucide-react";
import { StreakDisplay } from "@/components/streak/StreakDisplay";
import { QuizGame } from "@/components/quiz/QuizGame";
import { StreakProvider } from "@/contexts/StreakContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: studyProgress } = useQuery({
    queryKey: ['study-progress'],
    queryFn: async () => {
      const { data: materials } = await supabase
        .from('study_materials')
        .select('*');
      
      const { data: tests } = await supabase
        .from('mock_tests')
        .select('*');
      
      const { data: affairs } = await supabase
        .from('current_affairs')
        .select('*');
        
      return {
        materialsCount: materials?.length || 0,
        testsCount: tests?.length || 0,
        affairsCount: affairs?.length || 0
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
                  {studyProgress?.materialsCount || 0} materials available
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Mock Tests</h3>
                <p className="text-sm text-muted-foreground">
                  {studyProgress?.testsCount || 0} tests available
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Timer className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Current Affairs</h3>
                <p className="text-sm text-muted-foreground">
                  {studyProgress?.affairsCount || 0} updates available
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