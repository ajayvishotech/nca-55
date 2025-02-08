import { useState } from "react";
import { MessageSquare } from "lucide-react";
import QuestionForm from "@/components/doubts/QuestionForm";
import DoubtCard from "@/components/doubts/DoubtCard";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

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
  title: string;
  user_id: string;
  created_at: string;
  replies: Reply[];
}

const Doubts = () => {
  const queryClient = useQueryClient();

  const { data: doubts, isLoading } = useQuery({
    queryKey: ['doubts'],
    queryFn: async () => {
      const { data: doubtsData, error: doubtsError } = await supabase
        .from('doubts')
        .select(`
          *,
          replies:doubt_replies(*)
        `)
        .order('created_at', { ascending: false });

      if (doubtsError) throw doubtsError;
      return doubtsData as Doubt[];
    }
  });

  const createDoubtMutation = useMutation({
    mutationFn: async ({ subject, content, title }: { subject: string; content: string; title: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('doubts')
        .insert([
          {
            subject,
            content,
            title,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doubts'] });
    }
  });

  const addReplyMutation = useMutation({
    mutationFn: async ({ doubtId, content }: { doubtId: string; content: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('doubt_replies')
        .insert([
          {
            doubt_id: doubtId,
            content,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doubts'] });
    }
  });

  const handleNewQuestion = async (questionData: { subject: string; content: string; title: string }) => {
    try {
      await createDoubtMutation.mutateAsync(questionData);
    } catch (error) {
      console.error('Error creating doubt:', error);
    }
  };

  const handleAddReply = async (doubtId: string, content: string) => {
    try {
      await addReplyMutation.mutateAsync({ doubtId, content });
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
  }

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
        {doubts?.map((doubt) => (
          <DoubtCard
            key={doubt.id}
            doubt={doubt}
            onAddReply={handleAddReply}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Doubts;