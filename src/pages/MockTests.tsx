import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { TestTube, Timer, AlertCircle, Trophy, Brain, Target, Sparkles } from "lucide-react";
import { QuizGame } from "@/components/quiz/QuizGame";
import { useState } from "react";

const MockTests = () => {
  const [selectedTest, setSelectedTest] = useState<number | null>(null);

  const tests = [
    {
      id: 1,
      title: "General Knowledge",
      duration: "2 hours",
      questions: 100,
      difficulty: "Medium",
      points: 200,
    },
    {
      id: 2,
      title: "Current Affairs",
      duration: "1.5 hours",
      questions: 75,
      difficulty: "Hard",
      points: 150,
    },
    {
      id: 3,
      title: "Aptitude Test",
      duration: "1 hour",
      questions: 50,
      difficulty: "Easy",
      points: 100,
    },
    {
      id: 4,
      title: "Subject Expertise",
      duration: "2.5 hours",
      questions: 125,
      difficulty: "Expert",
      points: 250,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const instructionItems = [
    { 
      id: 1, 
      icon: <Timer className="h-5 w-5 text-blue-500" />, 
      text: "Time-bound tests to simulate exam conditions",
    },
    { 
      id: 2, 
      icon: <Target className="h-5 w-5 text-purple-500" />, 
      text: "Multiple choice questions with instant feedback",
    },
    { 
      id: 3, 
      icon: <Trophy className="h-5 w-5 text-yellow-500" />, 
      text: "Earn points and track your progress",
    },
    { 
      id: 4, 
      icon: <Sparkles className="h-5 w-5 text-emerald-500" />, 
      text: "Detailed performance analysis after completion",
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-primary animate-pulse" />
          <h1 className="font-heading text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Mock Tests
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Challenge yourself with our comprehensive mock tests
        </p>
      </motion.div>

      <Alert className="bg-accent/10 border-accent">
        <AlertCircle className="h-5 w-5 text-accent" />
        <AlertTitle className="text-accent font-heading">Test Instructions</AlertTitle>
        <AlertDescription className="mt-2">
          <motion.ul 
            className="list-none space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {instructionItems.map((item) => (
              <motion.li 
                key={item.id}
                className="flex items-center gap-3 text-gray-800 dark:text-gray-200"
                variants={itemVariants}
              >
                {item.icon}
                <span className="font-medium">{item.text}</span>
              </motion.li>
            ))}
          </motion.ul>
        </AlertDescription>
      </Alert>

      <motion.div 
        className="grid gap-4 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {tests.map((test) => (
          <motion.div key={test.id} variants={itemVariants}>
            <Card className="group overflow-hidden">
              <motion.div 
                className="p-6 bg-gradient-to-br from-background to-accent/5 hover:to-accent/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                    <TestTube className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-heading font-semibold text-lg">{test.title}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Timer className="h-4 w-4" />
                        <span>{test.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Target className="h-4 w-4" />
                        <span>{test.questions} Questions</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span>{test.points} Points</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setSelectedTest(test.id)}
                    className="bg-primary/90 hover:bg-primary transition-colors"
                  >
                    Start Test
                  </Button>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {selectedTest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <QuizGame />
        </motion.div>
      )}
    </div>
  );
};

export default MockTests;