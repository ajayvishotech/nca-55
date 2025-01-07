import { Book, ChevronRight, BookOpen, Users, Clock } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import ChapterPreview from "./ChapterPreview";
import { Badge } from "@/components/ui/badge";

interface SubjectItemProps {
  subject: {
    title: string;
    items: {
      name: string;
      chapters: number;
    }[];
  };
}

const getSubjectIcon = (name: string) => {
  if (name.includes("History")) return "📚";
  if (name.includes("Geography")) return "🌍";
  if (name.includes("Economics")) return "📊";
  if (name.includes("Science")) return "🔬";
  if (name.includes("Art")) return "🎨";
  if (name.includes("Polity")) return "⚖️";
  return "📖";
};

const SubjectItem = ({ subject }: SubjectItemProps) => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const handleChapterClick = (chapterName: string) => {
    setSelectedChapter(chapterName === selectedChapter ? null : chapterName);
  };

  return (
    <AccordionItem value={subject.title} className="border rounded-lg mb-4">
      <AccordionTrigger className="hover:no-underline py-4 px-6">
        <div className="flex items-center gap-4 w-full">
          <div className="rounded-full bg-primary/10 p-3">
            <Book className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col items-start">
            <h3 className="font-heading text-lg font-semibold">{subject.title}</h3>
            <p className="text-sm text-muted-foreground">
              {subject.items.length} courses available
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="mt-4 space-y-3 px-6 pb-4">
          {subject.items.map((item) => (
            <div key={item.name} className="space-y-3">
              <div
                onClick={() => handleChapterClick(item.name)}
                className="group relative flex items-center justify-between p-4 rounded-lg border bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{getSubjectIcon(item.name)}</div>
                  <div className="flex flex-col">
                    <h4 className="font-medium text-base group-hover:text-primary transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{item.chapters} chapters</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>~{item.chapters * 2}h</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 1000) + 500} enrolled</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="hidden md:inline-flex">
                    {item.chapters > 10 ? "Comprehensive" : "Quick Learn"}
                  </Badge>
                  <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${selectedChapter === item.name ? 'rotate-90' : ''}`} />
                </div>
              </div>
              {selectedChapter === item.name && (
                <div className="rounded-lg border bg-card/50 overflow-hidden">
                  <ChapterPreview chapter={item.name} />
                </div>
              )}
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SubjectItem;