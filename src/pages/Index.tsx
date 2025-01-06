import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Clock, TestTube2, Target } from "lucide-react";
import { StreakDisplay } from "@/components/streak/StreakDisplay";
import { QuizGame } from "@/components/quiz/QuizGame";
import { StreakProvider } from "@/contexts/StreakContext";

const Index = () => {
  return (
    <StreakProvider>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">Welcome to your Milestone!</h1>
          </div>
        </div>

        <StreakDisplay />

        <QuizGame />
      </div>
    </StreakProvider>
  );
};

export default Index;