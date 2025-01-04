import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Zap } from "lucide-react";

interface ChapterPreviewProps {
  chapter: string;
}

const ChapterPreview = ({ chapter }: ChapterPreviewProps) => {
  return (
    <div className="p-6 space-y-8">
      <div className="grid md:grid-cols-12 gap-6">
        {/* Left sidebar with chapters list */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="font-medium text-lg">Chapters</h3>
          <div className="space-y-2">
            <div className="text-primary cursor-pointer">NCERT Class 9th Summary</div>
            <div className="text-gray-600 cursor-pointer">NCERT Class 10th Summary</div>
            <div className="text-gray-600 cursor-pointer">NCERT Class 11th Summary</div>
            <div className="text-gray-600 cursor-pointer">NCERT Class 12th Summary</div>
          </div>
          <div className="pt-4">
            <h3 className="font-medium text-lg">Courses</h3>
          </div>
        </div>

        {/* Main content area */}
        <div className="md:col-span-9 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">1</span>
            </div>
            <h2 className="text-xl font-medium">NCERT Class 9th Summary</h2>
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

          {/* Lessons section */}
          <div className="space-y-4">
            <h3 className="font-medium">Lessons</h3>
            <div className="p-4 rounded-lg border bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <ChevronRight className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Microeconomics & Macroeconomics</h4>
                  <p className="text-sm text-gray-500">1 hr 26 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPreview;