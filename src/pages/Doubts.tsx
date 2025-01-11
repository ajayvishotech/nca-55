import { useState } from "react";
import { MessageSquare } from "lucide-react";
import QuestionForm from "@/components/doubts/QuestionForm";
import DoubtCard from "@/components/doubts/DoubtCard";
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
  const [doubts, setDoubts] = useState<Doubt[]>(sampleDoubts);

  const handleNewQuestion = ({ subject, content }: { subject: string; content: string }) => {
    const newDoubt: Doubt = {
      id: doubts.length + 1,
      subject,
      question: content,
      userId: "currentUser",
      userName: "Current User",
      timestamp: "Just now",
      likes: 0,
      replies: [],
    };

    setDoubts([newDoubt, ...doubts]);
  };

  const handleLikeDoubt = (doubtId: number) => {
    setDoubts(
      doubts.map((doubt) =>
        doubt.id === doubtId
          ? { ...doubt, likes: doubt.likes + 1 }
          : doubt
      )
    );
  };

  const handleAddReply = (doubtId: number, content: string) => {
    const newReply: Reply = {
      id: Math.random(),
      userId: "currentUser",
      userType: "student",
      userName: "Current User",
      content,
      timestamp: "Just now",
      likes: 0,
    };

    setDoubts(doubts.map(doubt => 
      doubt.id === doubtId 
        ? { ...doubt, replies: [...doubt.replies, newReply] }
        : doubt
    ));
  };

  const handleLikeReply = (doubtId: number, replyId: number) => {
    setDoubts(doubts.map(doubt =>
      doubt.id === doubtId
        ? {
            ...doubt,
            replies: doubt.replies.map(reply =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            ),
          }
        : doubt
    ));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold text-gray-800 dark:text-gray-200">
          <MessageSquare className="inline-block mr-2 text-primary" />
          Doubts & Solutions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get help with your questions from our expert educators and fellow students
        </p>
      </div>

      <QuestionForm onSubmit={handleNewQuestion} />

      <motion.div
        className="grid gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {doubts.map((doubt) => (
          <DoubtCard
            key={doubt.id}
            doubt={doubt}
            onLike={handleLikeDoubt}
            onAddReply={handleAddReply}
            onLikeReply={handleLikeReply}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Doubts;