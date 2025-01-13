import { useState, useEffect } from "react";
import { useStreak } from "@/contexts/StreakContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Trophy, Brain, Timer, Crown, Sparkles, Gem, Sword, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PowerUpBar } from "./PowerUpBar";
import { QuestionDisplay } from "./QuestionDisplay";
import { Question } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { GameBackground3D } from "./GameBackground3D";

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which country recently launched the world's first AI safety institute?",
    options: [
      "United Kingdom 🇬🇧",
      "United States 🇺🇸",
      "China 🇨🇳",
      "India 🇮🇳"
    ],
    correctAnswer: 0,
    category: "Technology"
  },
  {
    id: 2,
    question: "What's the trending climate action everyone's talking about? 🌍",
    options: [
      "Plant 1M trees",
      "Ban plastic straws",
      "30x30 Initiative",
      "Carbon tax"
    ],
    correctAnswer: 2,
    category: "Environment"
  },
  // Add more questions as needed
];

export const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready");
  const [powerUps, setPowerUps] = useState({
    fiftyFifty: 2,
    timeBoost: 1,
    doublePoints: 1,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { addXP, addGems } = useStreak();
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleGameOver();
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState("playing");
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestion(0);
    setStreak(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);

    const correct = answerIndex === SAMPLE_QUESTIONS[currentQuestion].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      const points = streak >= 2 ? 20 : 10;
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
      addXP(points);
      addGems(1);
      
      toast({
        title: streak >= 2 ? "Combo! 🔥" : "Correct! ✨",
        description: `+${points} XP | +1 Gem`,
        className: "bg-green-500 text-white",
      });
    } else {
      setStreak(0);
      toast({
        title: "Not quite! 🎯",
        description: "Keep trying!",
        variant: "destructive",
      });
    }

    setTimeout(() => {
      if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setTimeLeft(30);
      } else {
        handleGameOver();
      }
    }, 1500);
  };

  const handleGameOver = () => {
    setGameState("finished");
    toast({
      title: "Quest Complete! 🎉",
      description: `Final Score: ${score} | XP Earned: ${score}`,
    });
  };

  const usePowerUp = (type: keyof typeof powerUps) => {
    if (powerUps[type] > 0) {
      setPowerUps((prev) => ({ ...prev, [type]: prev[type] - 1 }));
      switch (type) {
        case "fiftyFifty":
          toast({
            title: "50/50 Power-Up Used! ⚡",
            description: "Two incorrect answers removed!",
          });
          break;
        case "timeBoost":
          setTimeLeft((prev) => prev + 15);
          toast({
            title: "Time Boost Used! ⏰",
            description: "+15 seconds added!",
          });
          break;
        case "doublePoints":
          toast({
            title: "Double Points Active! 🌟",
            description: "Next correct answer worth 2x points!",
          });
          break;
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:from-purple-950/80 dark:to-blue-950/80 relative overflow-hidden backdrop-blur-sm">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        <AnimatePresence mode="wait">
          {gameState === "ready" && (
            <motion.div 
              className="text-center space-y-6 py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            >
              <GameBackground3D />
              
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotateZ: [-5, 5, -5],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <Crown className="h-24 w-24 mx-auto text-yellow-500 drop-shadow-xl" />
                <motion.div
                  className="absolute -inset-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-yellow-500/20 blur-xl" />
                </motion.div>
              </motion.div>

              <motion.h3 
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 drop-shadow-lg"
                variants={itemVariants}
              >
                Ready to Challenge?
              </motion.h3>
              
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground"
                variants={itemVariants}
              >
                Test your knowledge of current affairs!
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-4"
              >
                <Button 
                  onClick={startGame} 
                  className="gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  <Sword className="h-6 w-6" />
                  Start Quest
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(155, 135, 245, 0)",
                        "0 0 0 10px rgba(155, 135, 245, 0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1}/{SAMPLE_QUESTIONS.length}
                  </p>
                  <Progress value={(currentQuestion / SAMPLE_QUESTIONS.length) * 100} className="w-32" />
                </div>
                <PowerUpBar 
                  powerUps={powerUps}
                  onUsePowerUp={usePowerUp}
                  disabled={selectedAnswer !== null}
                />
              </div>

              <QuestionDisplay
                question={SAMPLE_QUESTIONS[currentQuestion]}
                selectedAnswer={selectedAnswer}
                onAnswer={handleAnswer}
                isCorrect={isCorrect}
              />
            </motion.div>
          )}

          {gameState === "finished" && (
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
              <Button onClick={startGame} className="gap-2">
                <Shield className="h-4 w-4" />
                Play Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
      >
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple-500/10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-blue-500/10"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </motion.div>
    </Card>
  );
};
