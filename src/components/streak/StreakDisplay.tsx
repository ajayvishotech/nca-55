import { useStreak } from "@/contexts/StreakContext";
import { Flame, Trophy, Crown, Gem, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const StreakDisplay = () => {
  const { currentStreak, xpPoints, level, gems, streakFreezes, useStreakFreeze } = useStreak();
  const { toast } = useToast();

  const getStreakIcon = () => {
    if (currentStreak >= 31) {
      return <Crown className="h-8 w-8 text-yellow-500 animate-bounce" />;
    } else if (currentStreak >= 8) {
      return <Trophy className="h-8 w-8 text-orange-500 animate-pulse" />;
    } else {
      return (
        <Flame
          className="h-8 w-8 text-red-500"
          style={{
            filter: `brightness(${100 + currentStreak * 10}%)`,
            transform: `scale(${1 + currentStreak * 0.1})`,
          }}
        />
      );
    }
  };

  const getMotivationalMessage = () => {
    if (currentStreak >= 31) return "Legendary Status Achieved! 👑";
    if (currentStreak >= 8) return "You're on Fire! Keep Going! 🔥";
    if (currentStreak > 0) return "Keep the Streak Alive! ⚡";
    return "Start Your Journey Today! 🌟";
  };

  const getStreakTier = () => {
    if (currentStreak >= 365) return "Diamond";
    if (currentStreak >= 100) return "Gold";
    if (currentStreak >= 30) return "Silver";
    if (currentStreak >= 7) return "Bronze";
    return "Novice";
  };

  const handleUseStreakFreeze = () => {
    if (useStreakFreeze()) {
      toast({
        title: "Streak Freeze Activated!",
        description: "Your streak is protected for today.",
        duration: 3000,
      });
    } else {
      toast({
        title: "No Streak Freezes Available",
        description: "Complete more challenges to earn streak freezes!",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const xpToNextLevel = (level * 100) - xpPoints;
  const progress = ((xpPoints % 100) / 100) * 100;

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-full shadow-lg dark:bg-gray-800">
            {getStreakIcon()}
          </div>
          <div>
            <h3 className="text-2xl font-bold font-heading">
              {currentStreak} Day{currentStreak !== 1 ? 's' : ''} Streak
            </h3>
            <p className="text-sm text-muted-foreground">{getMotivationalMessage()}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Level {level}
          </Badge>
          <div className="flex items-center gap-2">
            <Gem className="h-5 w-5 text-blue-500" />
            <span className="font-bold">{gems}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>XP Progress</span>
          <span>{xpToNextLevel} XP to Level {level + 1}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex items-center justify-between pt-2">
        <Badge variant="outline" className="text-sm">
          {getStreakTier()} Tier
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={handleUseStreakFreeze}
          className="flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          Streak Freezes: {streakFreezes}
        </Button>
      </div>
    </Card>
  );
};