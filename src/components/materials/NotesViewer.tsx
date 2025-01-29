import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { getFileFromDrive } from "@/utils/driveUtils";
import { DriveFile } from "@/components/quiz/types";

interface NotesViewerProps {
  lessonNumber: number;
  title: string;
  driveFileId?: string;
}

const NotesViewer = ({ lessonNumber, title, driveFileId }: NotesViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    const loadNotesFromDrive = async () => {
      if (driveFileId) {
        try {
          const driveFile = await getFileFromDrive(driveFileId);
          setPdfUrl(driveFile.webViewLink);
        } catch (error) {
          console.error("Error loading notes from Drive:", error);
        }
      } else {
        setPdfUrl(`/notes-${lessonNumber}.pdf`);
      }
    };

    loadNotesFromDrive();
  }, [driveFileId, lessonNumber]);

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
      link.href = pdfUrl;
      link.download = `notes-${lessonNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title={`Notes for ${title}`}
        />
      </div>
    </div>
  );
};

export default NotesViewer;