import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Reply {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

interface ReplySectionProps {
  replies: Reply[];
  onAddReply: (content: string) => void;
}

const ReplySection = ({ replies, onAddReply }: ReplySectionProps) => {
  const { toast } = useToast();
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: "Please enter a reply",
        description: "Your reply cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    onAddReply(replyContent);
    setReplyContent("");
    
    toast({
      title: "Reply Posted!",
      description: "Your response has been added to the discussion.",
    });
  };

  return (
    <div className="space-y-4 mt-4">
      {replies.map((reply) => (
        <motion.div
          key={reply.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {reply.user_id}
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-gray-800 dark:text-gray-200">{reply.content}</p>
        </motion.div>
      ))}
      
      <div className="mt-4 space-y-2">
        <Textarea
          placeholder="Write your reply..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="min-h-[80px]"
        />
        <div className="flex gap-2">
          <Button onClick={handleSubmitReply}>
            Post Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplySection;