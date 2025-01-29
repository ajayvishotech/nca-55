import { Button } from "@/components/ui/button";
import { ChevronRight, FileText } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import NotesViewer from "./NotesViewer";
import { useState } from "react";

interface ChapterPreviewProps {
  chapter: string;
}

const ChapterPreview = ({ chapter }: ChapterPreviewProps) => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [showNotes, setShowNotes] = useState(false);

  const getChapters = () => {
    switch (chapter) {
      case "Economics - NCERT Summary":
        return [
          "Introduction to Economics",
          "Types of Economy",
          "Production Possibilities",
          "Basic Economic Problems"
        ];
      case "Geography - NCERT Summary":
        return [
          "Physical Features of India",
          "Climate",
          "Natural Vegetation",
          "Natural Resources",
          "Agriculture",
          "Industries",
          "Transport and Communication"
        ];
      default:
        return [];
    }
  };

  const chapters = getChapters();

  const handleNotesClick = () => {
    setShowNotes(!showNotes);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="grid md:grid-cols-12 gap-6">
        {/* Left sidebar with chapters list */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="font-medium text-lg">Chapters ({chapters.length})</h3>
          <div className="space-y-2">
            {chapters.map((chapterName, index) => (
              <div
                key={index}
                className={`p-2 rounded cursor-pointer transition-colors ${
                  index === 0 ? "text-primary" : "text-gray-600 hover:text-primary"
                }`}
              >
                {chapterName}
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="md:col-span-9 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">1</span>
            </div>
            <h2 className="text-xl font-medium">{chapters[0]}</h2>
          </div>

          {/* Notes and Practice section */}
          <div className="grid md:grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={handleNotesClick}
            >
              <div className="flex items-center gap-3">
                <FileText className="text-primary h-5 w-5" />
                <div>
                  <h3 className="font-medium">Notes</h3>
                  <p className="text-sm text-muted-foreground">View chapter notes</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ChevronRight className="text-primary" />
                  <h3 className="font-medium">Practice</h3>
                </div>
                <Button size="sm">START</Button>
              </div>
            </div>
          </div>

          {/* Notes viewer */}
          {showNotes && (
            <NotesViewer
              lessonNumber={1}
              title={`Notes: ${chapters[0]}`}
            />
          )}

          {/* Video lessons section */}
          <div className="space-y-4">
            <h3 className="font-medium">Video Lessons</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((lessonNum) => (
                <div key={lessonNum} className="space-y-4">
                  <div 
                    className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedLesson(selectedLesson === lessonNum ? null : lessonNum)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                          <ChevronRight className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Lesson {lessonNum}</h4>
                          <p className="text-sm text-muted-foreground">26 mins</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {selectedLesson === lessonNum ? "Hide" : "Watch"}
                      </Button>
                    </div>
                  </div>
                  {selectedLesson === lessonNum && (
                    <VideoPlayer
                      lessonNumber={lessonNum}
                      duration="26:00"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPreview;