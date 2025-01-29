import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface NotesViewerProps {
  lessonNumber: number;
  title: string;
}

const NotesViewer = ({ lessonNumber, title }: NotesViewerProps) => {
  const handleDownload = () => {
    // Implement download functionality here
    console.log(`Downloading notes for lesson ${lessonNumber}`);
  };

  return (
    <div className="p-6 border rounded-lg bg-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-lg">{title}</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download Notes
        </Button>
      </div>
      <div className="prose max-w-none">
        {/* Add your notes content here */}
        <p>Notes content for lesson {lessonNumber} goes here...</p>
      </div>
    </div>
  );
};

export default NotesViewer;