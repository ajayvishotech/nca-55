import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Brain, Star, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

interface ProgressTrackerProps {
  totalQuizzes: number;
  completedQuizzes: number;
  correctAnswers: number;
  totalQuestions: number;
  achievements: Achievement[];
}

export const ProgressTracker = ({
  totalQuizzes,
  completedQuizzes,
  correctAnswers,
  totalQuestions,
  achievements,
}: ProgressTrackerProps) => {
  const accuracy = totalQuestions > 0 
    ? Math.round((correctAnswers / totalQuestions) * 100) 
    : 0;

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h3 className="font-heading text-xl font-bold">Your Progress</h3>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Star className="h-4 w-4" />
          {accuracy}% Accuracy
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Quizzes Completed</span>
            <span className="font-medium">{completedQuizzes}/{totalQuizzes}</span>
          </div>
          <Progress value={(completedQuizzes / totalQuizzes) * 100} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Correct Answers</span>
            <span className="font-medium">{correctAnswers}/{totalQuestions}</span>
          </div>
          <Progress value={(correctAnswers / totalQuestions) * 100} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <h4 className="font-medium">Achievements</h4>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border ${
                achievement.unlocked 
                  ? "bg-primary/10 border-primary" 
                  : "bg-muted/50 border-muted"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-2 ${
                  achievement.unlocked 
                    ? "bg-primary/20" 
                    : "bg-muted"
                }`}>
                  {achievement.icon}
                </div>
                <div>
                  <h5 className="font-medium">{achievement.title}</h5>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};