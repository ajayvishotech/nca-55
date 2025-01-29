import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Maximize, Volume2, VolumeX, Subtitles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFileFromDrive } from "@/utils/driveUtils";
import { DriveFile } from "@/components/quiz/types";

interface VideoPlayerProps {
  lessonNumber: number;
  duration: string;
  driveFileId?: string;
}

const VideoPlayer = ({ lessonNumber, duration, driveFileId }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadVideoFromDrive = async () => {
      if (driveFileId) {
        try {
          const driveFile = await getFileFromDrive(driveFileId);
          setVideoUrl(driveFile.webViewLink);
        } catch (error) {
          console.error("Error loading video from Drive:", error);
        }
      } else {
        setVideoUrl(`/lesson-${lessonNumber}.mp4`);
      }
    };

    loadVideoFromDrive();
  }, [driveFileId, lessonNumber]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleDownload = async () => {
    if (driveFileId) {
      try {
        const driveFile = await getFileFromDrive(driveFileId);
        window.open(driveFile.webViewLink, '_blank');
      } catch (error) {
        console.error("Error downloading from Drive:", error);
      }
    } else {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `lesson-${lessonNumber}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        src={videoUrl}
        controls={false}
      >
        {showSubtitles && (
          <track
            kind="subtitles"
            src={`/subtitles-${lessonNumber}.vtt`}
            label="English"
            default
          />
        )}
      </video>
      
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-primary"
          onClick={handlePlayPause}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-primary"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        
        <div className="flex-1 mx-2">
          <input
            type="range"
            className="w-full"
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = Number(e.target.value);
              }
            }}
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-primary"
          onClick={() => setShowSubtitles(!showSubtitles)}
        >
          <Subtitles className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-primary"
          onClick={handleFullScreen}
        >
          <Maximize className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-primary"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
        </Button>
        
        <span className="text-white text-sm">{duration}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;