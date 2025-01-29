import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Maximize, Volume2, VolumeX, Subtitles } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  lessonNumber: number;
  duration: string;
}

const VideoPlayer = ({ lessonNumber, duration }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handleDownload = () => {
    // Implement download functionality here
    console.log(`Downloading Lesson ${lessonNumber}`);
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        src={`/lesson-${lessonNumber}.mp4`}
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