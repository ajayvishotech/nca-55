import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, ThumbsUp, Clock } from "lucide-react";

interface Doubt {
  id: number;
  subject: string;
  question: string;
  timestamp: string;
  status: "pending" | "answered";
  likes: number;
}

const sampleDoubts: Doubt[] = [
  {
    id: 1,
    subject: "Economics",
    question: "Can someone explain the difference between micro and macroeconomics?",
    timestamp: "2 hours ago",
    status: "answered",
    likes: 5,
  },
  {
    id: 2,
    subject: "History",
    question: "What were the main causes of the Industrial Revolution?",
    timestamp: "1 day ago",
    status: "pending",
    likes: 3,
  },
];

const Doubts = () => {
  const { toast } = useToast();
  const [doubts, setDoubts] = useState<Doubt[]>(sampleDoubts);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleAskQuestion = () => {
    if (!newQuestion.trim() || !selectedSubject) {
      toast({
        title: "Please fill in all fields",
        description: "Both subject and question are required.",
        variant: "destructive",
      });
      return;
    }

    const newDoubt: Doubt = {
      id: doubts.length + 1,
      subject: selectedSubject,
      question: newQuestion,
      timestamp: "Just now",
      status: "pending",
      likes: 0,
    };

    setDoubts([newDoubt, ...doubts]);
    setNewQuestion("");
    setSelectedSubject("");
    
    toast({
      title: "Question Posted!",
      description: "Our educators will answer your question soon.",
    });
  };

  const handleLike = (doubtId: number) => {
    setDoubts(
      doubts.map((doubt) =>
        doubt.id === doubtId
          ? { ...doubt, likes: doubt.likes + 1 }
          : doubt
      )
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Doubts & Solutions</h1>
        <p className="text-muted-foreground">
          Get help with your questions from our expert educators
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
          <CardDescription>
            Our educators will answer your question within 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={selectedSubject}
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Economics">Economics</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Geography">Geography</SelectItem>
              <SelectItem value="Polity">Polity</SelectItem>
              <SelectItem value="Science">Science & Technology</SelectItem>
            </SelectContent>
          </Select>
          
          <Textarea
            placeholder="Type your question here..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="min-h-[100px]"
          />
          
          <Button 
            onClick={handleAskQuestion}
            className="w-full"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Post Question
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {doubts.map((doubt) => (
          <Card key={doubt.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{doubt.subject}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {doubt.timestamp}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLike(doubt.id)}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {doubt.likes}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{doubt.question}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  doubt.status === "answered" 
                    ? "bg-success/10 text-success" 
                    : "bg-orange-100 text-orange-600"
                }`}>
                  {doubt.status === "answered" ? "Answered" : "Pending"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Doubts;