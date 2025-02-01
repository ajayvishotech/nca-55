import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import VideoPlayer from "../materials/VideoPlayer";
import NotesViewer from "../materials/NotesViewer";
import { useToast } from "@/hooks/use-toast";
import { Lock, PlayCircle, FileText, TestTubes, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DemoCourse as DemoCourseType } from "@/types/demo";
import { useQuery } from "@tanstack/react-query";

interface DemoCourseProps {
  courseName: string;
  onComplete: () => void;
}

const DemoCourse = ({ courseName, onComplete }: DemoCourseProps) => {
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [currentSection, setCurrentSection] = useState<'video' | 'notes' | 'test' | null>(null);

  const { data: courseData, isLoading } = useQuery({
    queryKey: ['demo-course', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('demo_courses')
        .select('*')
        .eq('course_id', courseId)
        .single();

      if (error) {
        toast({
          title: "Error loading course",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      return data as DemoCourseType;
    },
  });

  const handleSectionComplete = () => {
    setProgress(prev => Math.min(prev + 33.33, 100));
    if (progress >= 99) {
      toast({
        title: "Demo Course Completed!",
        description: "You can now enroll in the full course.",
      });
      onComplete();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Demo Course: {courseData.course_name}</h2>
        <Progress value={progress} className="w-[200px]" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Introduction Video</h3>
          </div>
          {currentSection === 'video' ? (
            <VideoPlayer
              lessonNumber={0}
              duration="10:00"
              driveFileId={courseData.video_url || undefined}
            />
          ) : (
            <Button onClick={() => setCurrentSection('video')}>
              Start Video Lesson
            </Button>
          )}
        </Card>

        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">Course Notes</h3>
          </div>
          {currentSection === 'notes' ? (
            <NotesViewer
              lessonNumber={0}
              title="Demo Notes"
              driveFileId={courseData.notes_url || undefined}
            />
          ) : (
            <Button onClick={() => setCurrentSection('notes')}>
              View Notes
            </Button>
          )}
        </Card>

        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <TestTubes className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold">Practice Test</h3>
          </div>
          {progress < 66 ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Complete previous sections first</span>
            </div>
          ) : (
            <Button 
              onClick={() => {
                setCurrentSection('test');
                handleSectionComplete();
              }}
            >
              Take Test
            </Button>
          )}
        </Card>
      </div>

      {progress === 100 && (
        <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200">
          <div className="flex items-center gap-4">
            <Trophy className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
                Congratulations!
              </h3>
              <p className="text-green-600 dark:text-green-400">
                You've completed the demo course. Ready to start your learning journey?
              </p>
            </div>
            <Button 
              className="ml-auto"
              onClick={() => navigate('/enroll-courses')}
            >
              Enroll Now
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DemoCourse;