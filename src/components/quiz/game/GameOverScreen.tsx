import { Gem, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface GameOverScreenProps {
  score: number;
  streak: number;
  onPlayAgain: () => void;
}

export const GameOverScreen = ({ score, streak, onPlayAgain }: GameOverScreenProps) => {
  return (
    <motion.div 
      className="text-center space-y-4 py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Gem className="h-12 w-12 mx-auto text-blue-500 animate-pulse" />
      <h3 className="text-2xl font-bold">Quest Complete!</h3>
      <p className="text-muted-foreground">
        Final Score: {score} | Streak: {streak}
      </p>
      <Button onClick={onPlayAgain} className="gap-2">
        <Shield className="h-4 w-4" />
        Play Again
      </Button>
    </motion.div>
  );
};