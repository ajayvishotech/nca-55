import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { TestTube, Timer, AlertCircle, Trophy, Brain, Target, Sparkles, Loader2 } from "lucide-react";
import { QuizGame } from "@/components/quiz/QuizGame";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type MockTest = Database['public']['Tables']['mock_tests']['Row'];

const MockTests = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const { data: tests, isLoading } = useQuery({
    queryKey: ['mock-tests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mock_tests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as MockTest[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            initial="hidden"
            animate="show"
          >
            <motion.li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
              <Timer className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Time-bound tests to simulate exam conditions</span>
            </motion.li>
            <motion.li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
              <Target className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Multiple choice questions with instant feedback</span>
            </motion.li>
            <motion.li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Earn points and track your progress</span>
            </motion.li>
            <motion.li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">Detailed performance analysis after completion</span>
            </motion.li>
          </motion.ul>
        </AlertDescription>
      </Alert>

      <motion.div 
        className="grid gap-4 md:grid-cols-2"
        initial="hidden"
        animate="show"
      >
        {tests?.map((test) => (
          <motion.div key={test.id}>
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
                        <span>{test.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span>{test.total_marks} Points</span>
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