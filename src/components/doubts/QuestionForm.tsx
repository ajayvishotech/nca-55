import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import SubjectSelect from "./SubjectSelect";
import { useToast } from "@/hooks/use-toast";

interface QuestionFormProps {
  onSubmit: (question: { subject: string; content: string }) => void;
}

const QuestionForm = ({ onSubmit }: QuestionFormProps) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    if (!subject || !question.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both subject and question are required.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ subject, content: question });
    setQuestion("");
    setSubject("");
    
    toast({
      title: "Question Posted!",
      description: "Other students and staff will be able to help you soon.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-gray-200">
          <MessageSquare className="inline-block mr-2 text-primary" />
          Ask a Question
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SubjectSelect value={subject} onValueChange={setSubject} />
        <Textarea
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[100px]"
        />
        <Button 
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Post Question
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;