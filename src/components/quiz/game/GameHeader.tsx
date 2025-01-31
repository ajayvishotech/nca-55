import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Timer, Trophy } from "lucide-react";

interface GameHeaderProps {
  score: number;
  timeLeft: number;
}

export const GameHeader = ({ score, timeLeft }: GameHeaderProps) => {
  return (
    <motion.div 
      className="flex items-center justify-between"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <div className="flex items-center gap-2">
        <Brain className="h-6 w-6 text-purple-500 animate-pulse" />
        <h2 className="text-xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Knowledge Kingdom
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Badge variant="secondary" className="gap-1">
            <Trophy className="h-4 w-4" />
            Score: {score}
          </Badge>
        </motion.div>
        <motion.div
          animate={{
            scale: timeLeft <= 5 ? [1, 1.1, 1] : 1,
            color: timeLeft <= 5 ? ["#ef4444", "#ffffff", "#ef4444"] : "#ffffff",
          }}
          transition={{ repeat: timeLeft <= 5 ? Infinity : 0, duration: 0.5 }}
        >
          <Badge variant="outline" className="gap-1">
            <Timer className="h-4 w-4" />
            {timeLeft}s
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
};