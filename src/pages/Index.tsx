
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Timer, Trophy, Crown, Gem, Shield } from "lucide-react";
import { StreakDisplay } from "@/components/streak/StreakDisplay";
import { QuizGame } from "@/components/quiz/QuizGame";
import { StreakProvider } from "@/contexts/StreakContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (profile) {
            setUserName(profile.full_name);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <StreakProvider>
      <div className="space-y-3 md:space-y-6 animate-fadeIn px-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
          <div>
            <h1 className="text-base md:text-2xl font-bold font-heading">
              Hello, {userName}
            </h1>
          </div>
        </div>

        <StreakDisplay />
        <QuizGame />
      </div>
    </StreakProvider>
  );
};

export default Index;
