import { Card } from "@/components/ui/card";
import { Book, ChevronRight, FileText, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const subjects = [
  {
    title: "NCERT Summary",
    items: [
      { name: "Economics - NCERT Summary", chapters: 4 },
      { name: "Geography - NCERT Summary", chapters: 7 },
      { name: "Polity - NCERT Summary", chapters: 7 },
      { name: "Science & Technology - NCERT Summary", chapters: 18 },
      { name: "History - NCERT Summary", chapters: 7 },
    ],
  },
  {
    title: "History",
    items: [
      { name: "Ancient History", chapters: 10 },
      { name: "Medieval History", chapters: 5 },
      { name: "Modern History", chapters: 8 },
      { name: "World History", chapters: 4 },
      { name: "Post-Independence History", chapters: 3 },
    ],
  },
  {
    title: "Art & Culture",
    items: [{ name: "Art & Culture", chapters: 6 }],
  },
  {
    title: "Geography",
    items: [
      { name: "Physical Geography", chapters: 8 },
      { name: "Indian Geography", chapters: 12 },
      { name: "Human Geography", chapters: 5 },
      { name: "World Geography", chapters: 8 },
    ],
  },
  {
    title: "Polity, Governance & IR",
    items: [
      { name: "Governance", chapters: 6 },
      { name: "International Relations", chapters: 5 },
      { name: "Indian Polity", chapters: 8 },
    ],
  },
  {
    title: "Economy",
    items: [{ name: "Indian Economy", chapters: 13 }],
  },
  {
    title: "Environment & Ecology",
    items: [{ name: "Environment & Ecology", chapters: 4 }],
  },
  {
    title: "Science & Technology",
    items: [{ name: "Science & Technology", chapters: 3 }],
  },
  {
    title: "Indian Society",
    items: [
      { name: "Social Issues", chapters: 8 },
      { name: "Social Justice", chapters: 3 },
    ],
  },
  {
    title: "Security Issues",
    items: [{ name: "Internal Security", chapters: 6 }],
  },
  {
    title: "Ethics, Integrity & Aptitude",
    items: [{ name: "Ethics, Integrity & Aptitude", chapters: 8 }],
  },
  {
    title: "Disaster Management",
    items: [{ name: "Disaster Management", chapters: 4 }],
  },
  {
    title: "CSAT - Paper II",
    items: [
      { name: "Decision Making", chapters: 1 },
      { name: "Reading Comprehension", chapters: 1 },
      { name: "Logical Reasoning and Analytical Ability", chapters: 9 },
      { name: "Verbal Ability", chapters: 2 },
      { name: "Quantitative Ability", chapters: 3 },
      { name: "Basic Numeracy", chapters: 14 },
    ],
  },
];

const ChapterPreview = ({ chapter }: { chapter: string }) => {
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

const Materials = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Study Materials</h1>
        <p className="text-muted-foreground">Access your course materials</p>
      </div>

      <div className="grid gap-4">
        {subjects.map((subject) => (
          <Card key={subject.title} className="p-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="items" className="border-none">
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
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Materials;
