import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Clock, TestTube2, Target } from "lucide-react";
import { StreakDisplay } from "@/components/streak/StreakDisplay";
import { QuizGame } from "@/components/quiz/QuizGame";
import { StreakProvider } from "@/contexts/StreakContext";
import DemoCourse from "@/components/demo/DemoCourse";
import { useState } from "react";

const Index = () => {
  const [isDemoCompleted, setIsDemoCompleted] = useState(false);
  // In a real app, this would be fetched from backend/localStorage
  const [isNewUser, setIsNewUser] = useState(true);

  const handleDemoComplete = () => {
    setIsDemoCompleted(true);
    setIsNewUser(false);
  };

  if (isNewUser && !isDemoCompleted) {
    return (
      <DemoCourse 
        courseName="UPSC-CSE"
        onComplete={handleDemoComplete}
      />
    );
  }

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