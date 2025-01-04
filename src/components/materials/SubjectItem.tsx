import { Book, ChevronRight } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SubjectItemProps {
  subject: {
    title: string;
    items: {
      name: string;
      chapters: number;
    }[];
  };
}

const SubjectItem = ({ subject }: SubjectItemProps) => {
  return (
    <AccordionItem value={subject.title}>
      <AccordionTrigger className="hover:no-underline py-0">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Book className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col items-start">
            <p className="font-medium">{subject.title}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="mt-4 space-y-2">
          {subject.items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group"
              onClick={() => ChapterPreview({ chapter: item.name })}
            >
              <span className="text-sm text-gray-600">{item.name}</span>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{item.chapters} chapters</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SubjectItem;