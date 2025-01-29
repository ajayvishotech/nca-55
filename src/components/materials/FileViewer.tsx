import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface FileItem {
  id: string;
  name: string;
  type: string;
  fileId: string; // Google Drive file ID
}

export const FileViewer = () => {
  const [files] = useState<FileItem[]>([
    {
      id: "1",
      name: "Economics Notes Chapter 1",
      type: "pdf",
      fileId: "YOUR_GOOGLE_DRIVE_FILE_ID_1",
    },
    {
      id: "2",
      name: "Geography Study Material",
      type: "pdf",
      fileId: "YOUR_GOOGLE_DRIVE_FILE_ID_2",
    },
  ]);
  
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const { toast } = useToast();

  const getGoogleDriveViewerUrl = (fileId: string) => {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  const getGoogleDriveDownloadUrl = (fileId: string) => {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  };

  const handlePreview = (file: FileItem) => {
    setSelectedFile(file);
  };

  const handleDownload = (file: FileItem) => {
    try {
      window.open(getGoogleDriveDownloadUrl(file.fileId), '_blank');
      toast({
        title: "Download started",
        description: `${file.name} is being downloaded`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download file. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => (
          <Card key={file.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {file.type.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreview(file)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleDownload(file)}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
            <DialogDescription>
              Use the controls below to zoom or download the document
            </DialogDescription>
          </DialogHeader>
          {selectedFile && (
            <iframe
              src={getGoogleDriveViewerUrl(selectedFile.fileId)}
              className="w-full h-full rounded-md"
              title={selectedFile.name}
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};