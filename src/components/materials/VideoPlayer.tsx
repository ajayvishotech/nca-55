import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Video {
  id: string;
  title: string;
  url: string;
  duration: number; // in seconds
}

interface VideoProgress {
  id: string;
  progress: number; // percentage watched
}

export const VideoPlayer = () => {
  const [videos] = useState<Video[]>([
    {
      id: "1",
      title: "Economics Fundamentals - Chapter 1",
      url: "https://www.youtube.com/embed/example1",
      duration: 1200,
    },
    {
      id: "2",
      title: "Geography Basics - Physical Features",
      url: "https://www.youtube.com/embed/example2",
      duration: 900,
    },
  ]);

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [progress, setProgress] = useState<VideoProgress[]>(() => {
    const savedProgress = localStorage.getItem("videoProgress");
    return savedProgress ? JSON.parse(savedProgress) : [];
  });
  const { toast } = useToast();

  const getVideoProgress = (videoId: string) => {
    const videoProgress = progress.find((p) => p.id === videoId);
    return videoProgress?.progress || 0;
  };

  const updateProgress = (videoId: string, newProgress: number) => {
    const updatedProgress = progress.some((p) => p.id === videoId)
      ? progress.map((p) =>
          p.id === videoId ? { ...p, progress: newProgress } : p
        )
      : [...progress, { id: videoId, progress: newProgress }];

    setProgress(updatedProgress);
    localStorage.setItem("videoProgress", JSON.stringify(updatedProgress));

    if (newProgress === 100) {
      toast({
        title: "Video Completed!",
        description: "Your progress has been saved.",
      });
    }
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    // If video hasn't been started, initialize progress
    if (!progress.some((p) => p.id === video.id)) {
      updateProgress(video.id, 0);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Course Videos</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => {
          const currentProgress = getVideoProgress(video.id);
          return (
            <Card key={video.id} className="p-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Duration: {formatDuration(video.duration)}
                    </p>
                  </div>
                  {currentProgress === 100 ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <PlayCircle className="h-5 w-5 text-primary" />
                  )}
                </div>

                <Progress value={currentProgress} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {currentProgress}% complete
                  </span>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleVideoSelect(video)}
                  >
                    {currentProgress > 0 ? "Continue" : "Start"} Watching
                  </Button>
                </div>
              </div>
            </Card>
          )}
        )}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          {selectedVideo && (
            <div className="relative w-full h-full">
              <iframe
                src={`${selectedVideo.url}?autoplay=1`}
                className="w-full h-full rounded-md"
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};