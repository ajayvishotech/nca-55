import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { MessageSquare, ThumbsUp, Clock, User, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface Reply {
  id: number;
  userId: string;
  userType: "student" | "staff";
  userName: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface Doubt {
  id: number;
  subject: string;
  question: string;
  userId: string;
  userName: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
}

const sampleDoubts: Doubt[] = [
  {
    id: 1,
    subject: "Economics",
    question: "Can someone explain the difference between micro and macroeconomics?",
    userId: "user1",
    userName: "Rahul S.",
    timestamp: "2 hours ago",
    likes: 5,
    replies: [
      {
        id: 1,
        userId: "staff1",
        userType: "staff",
        userName: "Prof. Kumar",
        content: "Microeconomics focuses on individual markets and decisions, while macroeconomics looks at the economy as a whole.",
        timestamp: "1 hour ago",
        likes: 3,
      },
      {
        id: 2,
        userId: "user2",
        userType: "student",
        userName: "Priya M.",
        content: "Thank you! That helps clarify. So would studying consumer behavior be micro or macro?",
        timestamp: "30 mins ago",
        likes: 1,
      }
    ]
  }
];

const Doubts = () => {
  const { toast } = useToast();
  const [doubts, setDoubts] = useState<Doubt[]>(sampleDoubts);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [activeDoubtId, setActiveDoubtId] = useState<number | null>(null);

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
      userId: "currentUser",
      userName: "Current User",
      timestamp: "Just now",
      likes: 0,
      replies: [],
    };

    setDoubts([newDoubt, ...doubts]);
    setNewQuestion("");
    setSelectedSubject("");
    
    toast({
      title: "Question Posted!",
      description: "Other students and staff will be able to help you soon.",
    });
  };

  const handleReply = (doubtId: number) => {
    if (!replyContent.trim()) {
      toast({
        title: "Please enter a reply",
        description: "Your reply cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    const newReply: Reply = {
      id: Math.random(),
      userId: "currentUser",
      userType: "student",
      userName: "Current User",
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
    };

    setDoubts(doubts.map(doubt => 
      doubt.id === doubtId 
        ? { ...doubt, replies: [...doubt.replies, newReply] }
        : doubt
    ));

    setReplyContent("");
    setActiveDoubtId(null);
    
    toast({
      title: "Reply Posted!",
      description: "Your response has been added to the discussion.",
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
          Get help with your questions from our expert educators and fellow students
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
          <CardDescription>
            Share your doubts with the community
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
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <CardTitle className="text-lg">{doubt.subject}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{doubt.userName}</span>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{doubt.timestamp}</span>
                    </CardDescription>
                  </div>
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
            <CardContent className="space-y-4">
              <p className="text-gray-800 dark:text-gray-200">{doubt.question}</p>
              
              <div className="space-y-4 mt-6">
                {doubt.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`ml-6 p-4 rounded-lg ${
                      reply.userType === "staff" 
                        ? "bg-primary/5 border border-primary/10" 
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {reply.userType === "staff" ? (
                        <Shield className="h-4 w-4 text-primary" />
                      ) : (
                        <User className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="font-medium">{reply.userName}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{reply.timestamp}</span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">{reply.content}</p>
                  </div>
                ))}
              </div>

              {activeDoubtId === doubt.id ? (
                <div className="mt-4 space-y-2">
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleReply(doubt.id)}>
                      Post Reply
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setActiveDoubtId(null);
                        setReplyContent("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setActiveDoubtId(doubt.id)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Reply
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Doubts;