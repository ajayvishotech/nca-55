import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Zap } from "lucide-react";

interface ChapterPreviewProps {
  chapter: string;
}

const ChapterPreview = ({ chapter }: ChapterPreviewProps) => {
  // Define chapters based on the selected subject
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
      // Add more cases for other subjects
      default:
        return [];
    }
  };

  const chapters = getChapters();

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
            <div className="p-4 rounded-lg border bg-gray-50">
              <div className="flex items-center gap-3">
                <FileText className="text-orange-500" />
                <div>
                  <h3 className="font-medium">Notes</h3>
                  <p className="text-sm text-gray-500">Available on android app</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="text-primary" />
                  <h3 className="font-medium">Practice</h3>
                </div>
                <Button size="sm">START</Button>
              </div>
            </div>
          </div>

          {/* Video lessons section */}
          <div className="space-y-4">
            <h3 className="font-medium">Video Lessons</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="p-4 rounded-lg border bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                      <ChevronRight className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Lesson {index + 1}</h4>
                      <p className="text-sm text-gray-500">26 mins</p>
                    </div>
                  </div>
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