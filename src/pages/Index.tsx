import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Timer, Trophy, Crown, Gem, Shield } from "lucide-react";
import { StreakDisplay } from "@/components/streak/StreakDisplay";
import { QuizGame } from "@/components/quiz/QuizGame";
import { StreakProvider } from "@/contexts/StreakContext";

const Index = () => {
  return (
    <StreakProvider>
      <div className="space-y-3 md:space-y-6 animate-fadeIn px-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
          <div>
            <h1 className="text-base md:text-2xl font-bold font-heading">
              Welcome to your Milestone!
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