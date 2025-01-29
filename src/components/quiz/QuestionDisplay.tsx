import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Question } from "./types";
import { motion } from "framer-motion";
import { FileText, Image, Video } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QuestionDisplayProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  isCorrect: boolean | null;
}

export const QuestionDisplay = ({ question, selectedAnswer, onAnswer, isCorrect }: QuestionDisplayProps) => {
  const renderAttachment = () => {
    if (!question.attachmentUrl) return null;

    const attachmentIcons = {
      pdf: <FileText className="h-5 w-5" />,
      image: <Image className="h-5 w-5" />,
      video: <Video className="h-5 w-5" />
    };

    return (
      <Card className="p-4 mb-4 bg-accent/10">
        <div className="flex items-center gap-2">
          {question.attachmentType && attachmentIcons[question.attachmentType]}
          <a 
            href={question.attachmentUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View Attachment
          </a>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <p className="text-lg font-medium">{question.question}</p>
        {renderAttachment()}
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              disabled={selectedAnswer !== null}
              onClick={() => onAnswer(index)}
              className={cn(
                "w-full h-auto py-4 px-6 text-left justify-start transition-all hover:scale-105",
                selectedAnswer === index && index === question.correctAnswer && "bg-green-500 text-white hover:bg-green-600",
                selectedAnswer === index && index !== question.correctAnswer && "bg-red-500 text-white hover:bg-red-600",
                selectedAnswer === null && "hover:border-primary hover:text-primary"
              )}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};