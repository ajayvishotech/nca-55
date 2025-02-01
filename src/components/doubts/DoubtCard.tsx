import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, User, Clock } from "lucide-react";
import ReplySection from "./ReplySection";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface Reply {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

interface Doubt {
  id: string;
  subject: string;
  content: string;
  user_id: string;
  created_at: string;
  replies: Reply[];
}

interface DoubtCardProps {
  doubt: Doubt;
  onAddReply: (doubtId: string, content: string) => void;
}

const DoubtCard = ({ doubt, onAddReply }: DoubtCardProps) => {
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
                <span>{doubt.user_id}</span>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(doubt.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-800 dark:text-gray-200">{doubt.content}</p>
        
        <ReplySection
          replies={doubt.replies}
          onAddReply={(content) => onAddReply(doubt.id, content)}
        />
      </CardContent>
    </Card>
  );
};

export default DoubtCard;