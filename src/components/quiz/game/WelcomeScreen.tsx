import { Crown, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export const WelcomeScreen = ({ onStartGame }: WelcomeScreenProps) => {
  return (
    <motion.div 
      className="text-center space-y-4 py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Crown className="h-16 w-16 mx-auto text-yellow-500" />
      </motion.div>
      <motion.h3 
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
      >
        Ready to Challenge?
      </motion.h3>
      <motion.p className="text-muted-foreground">
        Test your knowledge of current affairs!
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={onStartGame} 
          className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Sword className="h-5 w-5" />
          Start Quest
        </Button>
      </motion.div>
    </motion.div>
  );
};