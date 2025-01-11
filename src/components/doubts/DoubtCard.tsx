import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, User, Clock, BookOpen } from "lucide-react";
import ReplySection from "./ReplySection";
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

interface DoubtCardProps {
  doubt: Doubt;
  onLike: (doubtId: number) => void;
  onAddReply: (doubtId: number, content: string) => void;
  onLikeReply: (doubtId: number, replyId: number) => void;
}

const DoubtCard = ({ doubt, onLike, onAddReply, onLikeReply }: DoubtCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {doubt.subject}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="h-4 w-4" />
                <span>{doubt.userName}</span>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{doubt.timestamp}</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLike(doubt.id)}
            className="text-gray-600 dark:text-gray-400"
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            {doubt.likes}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-800 dark:text-gray-200">{doubt.question}</p>
        
        <ReplySection
          replies={doubt.replies}
          onAddReply={(content) => onAddReply(doubt.id, content)}
          onLikeReply={(replyId) => onLikeReply(doubt.id, replyId)}
        />
      </CardContent>
    </Card>
  );
};

export default DoubtCard;